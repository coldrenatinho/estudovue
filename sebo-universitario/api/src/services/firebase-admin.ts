import admin from 'firebase-admin'

function privateKeyFormatada () {
  return process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
}

function credencialPorJsonBase64 () {
  const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64

  if (!serviceAccountBase64) {
    return null
  }

  const json = Buffer.from(serviceAccountBase64, 'base64').toString('utf8')

  return admin.credential.cert(JSON.parse(json))
}

function credencialPorVariaveis () {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = privateKeyFormatada()

  if (!projectId || !clientEmail || !privateKey) {
    return null
  }

  return admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  })
}

export function firebaseAdminConfigurado () {
  return Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
    || (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY)
    || process.env.GOOGLE_APPLICATION_CREDENTIALS,
  )
}

function obterFirebaseAdmin () {
  if (admin.apps.length > 0) {
    return admin.app()
  }

  if (!firebaseAdminConfigurado()) {
    throw new Error('Firebase Admin não configurado no backend.')
  }

  const credential = credencialPorJsonBase64()
    || credencialPorVariaveis()
    || admin.credential.applicationDefault()

  return admin.initializeApp({ credential })
}

export async function verificarFirebaseIdToken (idToken: string) {
  return obterFirebaseAdmin().auth().verifyIdToken(idToken)
}
