const functions = require('firebase-functions/v1');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

async function ensureFields(uid) {
  const ref = db.doc(`users/${uid}`);
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.exists ? snap.data() : {};
    const updates = {};

    if (!Number.isInteger(data.downloadsUsed) || data.downloadsUsed < 0) {
      updates.downloadsUsed = 0;
    }
    if (!Number.isInteger(data.downloadsLimit) || data.downloadsLimit < 0) {
      updates.downloadsLimit = 10;
    }

    if (Object.keys(updates).length > 0) {
      tx.set(ref, updates, { merge: true });
    }
  });
}

// Cria os campos quando uma conta nova é registada (Google ou email).
exports.initializeDownloadFieldsOnSignup = functions.auth.user().onCreate(async (user) => {
  await ensureFields(user.uid);
});

// Também cria os campos para contas antigas quando entram no site.
exports.ensureDownloadFieldsOnAccess = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'É necessário iniciar sessão.');
  }
  await ensureFields(request.auth.uid);
  return { ok: true };
});

// Recupera documentos antigos quando forem escritos, sem substituir valores existentes.
exports.initializeDownloadFields = onDocumentWritten('users/{uid}', async (event) => {
  const snapshot = event.data && event.data.after;
  if (!snapshot || !snapshot.exists) return;
  await ensureFields(event.params.uid);
});
