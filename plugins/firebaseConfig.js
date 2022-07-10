import { initializeApp, getApps } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getFunctions } from 'firebase/functions'
import { getAuth } from 'firebase/auth'

if (!getApps().length) {
  // Create a web app in Firebase project to get these keys
  const config = {
    apiKey: 'XXXX-XXXX-XXXX-XXXX',
    authDomain: 'XXXX-XXXX-XXXX-XXXX',
    projectId: 'XXXX-XXXX-XXXX-XXXX',
    storageBucket: 'XXXX-XXXX-XXXX-XXXX',
    messagingSenderId: 'XXXX-XXXX-XXXX-XXXX',
    appId: 'XXXX-XXXX-XXXX-XXXX',
    measurementId: 'XXXX-XXXX-XXXX-XXXX',
  }
  // Initialize Firebase
  const app = initializeApp(config)
  const functions = getFunctions(app)
  // const analytics = getAnalytics(app)
}
export const auth = getAuth()
