// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Z5wMVBw9nCpytqfDI8os1m7nY9pN168",
  authDomain: "reviva-23c97.firebaseapp.com",
  projectId: "reviva-23c97",
  storageBucket: "reviva-23c97.firebasestorage.app",
  messagingSenderId: "170254762522",
  appId: "1:170254762522:web:b722f460b63754e0ab07a3",
  measurementId: "G-GZBW4V3ZYW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Safely initialize analytics only if supported
let analytics: ReturnType<typeof getAnalytics> | null = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };