import { type FirebaseApp, getApps, initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseConfigurado = Boolean(
  firebaseConfig.apiKey
  && firebaseConfig.authDomain
  && firebaseConfig.projectId
  && firebaseConfig.appId,
)

let app: FirebaseApp | null = null

function obterAppFirebase () {
  if (!firebaseConfigurado) {
    throw new Error('Firebase não configurado. Preencha as variáveis VITE_FIREBASE_* no arquivo .env.')
  }

  if (!app) {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig)
  }

  return app
}

export function obterFirebaseAuth () {
  return getAuth(obterAppFirebase())
}

export async function entrarComGoogleFirebase () {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: 'select_account',
  })

  const resultado = await signInWithPopup(obterFirebaseAuth(), provider)

  return resultado.user.getIdToken()
}

export async function sairDoFirebase () {
  if (!firebaseConfigurado) {
    return
  }

  await signOut(obterFirebaseAuth())
}
