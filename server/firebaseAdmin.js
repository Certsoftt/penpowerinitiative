import admin from 'firebase-admin'

const projectId = process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID
const clientEmail = process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!admin.apps.length && projectId && clientEmail && privateKey) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export const adminDb = admin.apps.length ? admin.firestore() : null
export const adminAuth = admin.apps.length ? admin.auth() : null
