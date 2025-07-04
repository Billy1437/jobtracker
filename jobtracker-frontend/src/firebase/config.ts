// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "job-tracker-8caee.firebaseapp.com",
  projectId: "job-tracker-8caee",
  storageBucket: "job-tracker-8caee.firebasestorage.app",
  messagingSenderId: "909479761726",
  appId: "1:909479761726:web:1f5ac483003147f4387e6f",
  measurementId: "G-71YKP4HGE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);