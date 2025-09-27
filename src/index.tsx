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

const fetchGoogleTime = async (): Promise<number> => {
  const database = getDatabase(app)
  const offsetSnapshot = await get(ref(database, '.info/serverTimeOffset'))
  const offset = offsetSnapshot.val()

  if (typeof offset === 'number') {
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
  try {
    const googleTimestamp = await fetchGoogleTime()
    initializeWordOfDay(googleTimestamp)
  } catch (error) {
    console.error('Falling back to device time for word of the day', error)
    initializeWordOfDay(Date.now())
  } finally {
    renderApplication()
  }
}

bootstrap()
