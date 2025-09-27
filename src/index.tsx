import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import reportWebVitals from './reportWebVitals'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase, ref, get } from 'firebase/database'
import { initializeWordOfDay } from './lib/words'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKv2GXqiIYPbySfLdjSh-XNxboaVRohxM",
  authDomain: "wordle-kz.firebaseapp.com",
  projectId: "wordle-kz",
  storageBucket: "wordle-kz.appspot.com",
  messagingSenderId: "1066241302523",
  appId: "1:1066241302523:web:36f79c8d4ebb25636c755e",
  measurementId: "G-HL4VTWPBG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)

const SERVER_TIMESTAMP_STORAGE_KEY = 'wordle:serverTimestamp'

const storeServerTimestamp = (timestamp: number) => {
  try {
    window.localStorage.setItem(
      SERVER_TIMESTAMP_STORAGE_KEY,
      String(timestamp)
    )
  } catch (storageError) {
    console.warn('Unable to persist server timestamp', storageError)
  }
}

const readStoredServerTimestamp = (): number | null => {
  try {
    const rawTimestamp = window.localStorage.getItem(
      SERVER_TIMESTAMP_STORAGE_KEY
    )

    if (!rawTimestamp) {
      return null
    }

    const parsedTimestamp = Number(rawTimestamp)

    return Number.isFinite(parsedTimestamp) ? parsedTimestamp : null
  } catch (storageError) {
    console.warn('Unable to read cached server timestamp', storageError)
    return null
  }
}

const fetchGoogleTime = async (): Promise<number> => {
  const database = getDatabase(app)
  const offsetSnapshot = await get(ref(database, '.info/serverTimeOffset'))
  const offsetValue = offsetSnapshot.val()
  const offset = Number(offsetValue)

  if (Number.isFinite(offset)) {
    return Date.now() + offset
  }

  throw new Error('Google time offset unavailable')
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

const bootstrap = async () => {
  let resolvedTimestamp: number | null = null

  try {
    const googleTimestamp = await fetchGoogleTime()
    storeServerTimestamp(googleTimestamp)
    resolvedTimestamp = googleTimestamp
  } catch (error) {
    console.error('Failed to fetch Google server time', error)
    const cachedServerTimestamp = readStoredServerTimestamp()

    if (cachedServerTimestamp !== null) {
      console.info('Using cached server timestamp for word of the day')
      resolvedTimestamp = cachedServerTimestamp
    }
  } finally {
    initializeWordOfDay(resolvedTimestamp ?? Date.now())
    renderApplication()
  }
}

bootstrap()
