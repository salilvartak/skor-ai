// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs_Leeh-1yITmbdIdTZK2TxNIcuLzpBW4",
  authDomain: "skorai.firebaseapp.com",
  projectId: "skorai",
  storageBucket: "skorai.firebasestorage.app",
  messagingSenderId: "717790875171",
  appId: "1:717790875171:web:3f8f0fd3a5d7235e882b96",
  measurementId: "G-2Y95YNS25L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);