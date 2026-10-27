const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

/**
 * Cria os campos por defeito assim que uma nova conta Firebase é registada.
 * set(..., {merge:true}) preserva os outros dados da conta.
 */
exports.initializeDownloadFieldsOnSignup = functions.auth.user().onCreate(async (user) => {
  await db.doc(`users/${user.uid}`).set({
    downloadsUsed: 0,
    downloadsLimit: 10
  }, { merge: true });
});

/**
 * Corrige documentos de contas antigas na próxima escrita em users/{uid}.
 * O Admin SDK ignora as regras do Firestore; o cliente continua sem permissão
 * para alterar downloadsLimit ou paid.
 */
exports.initializeDownloadFields = onDocumentWritten('users/{uid}', async (event) => {
  const snapshot = event.data && event.data.after;
  if (!snapshot || !snapshot.exists) return;

  const data = snapshot.data() || {};
  const updates = {};

  if (!Number.isInteger(data.downloadsUsed) || data.downloadsUsed < 0) {
    updates.downloadsUsed = 0;
  }

  if (!Number.isInteger(data.downloadsLimit) || data.downloadsLimit < 0) {
    updates.downloadsLimit = 10;
  }

  if (Object.keys(updates).length > 0) {
    await snapshot.ref.set(updates, { merge: true });
  }
});
