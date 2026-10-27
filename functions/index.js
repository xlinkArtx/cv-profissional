const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');

initializeApp();

/**
 * Inicializa os campos de controlo das exportações no documento principal
 * users/{uid}. Admin SDK ignora as regras do Firestore, sem expor ao cliente
 * permissão para alterar downloadsLimit ou paid.
 *
 * Também corrige documentos antigos na próxima vez que forem escritos.
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
