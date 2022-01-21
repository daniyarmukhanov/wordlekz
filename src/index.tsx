import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import reportWebVitals from './reportWebVitals'
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
