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
  apiKey: "AIzaSyCA8vPvfXTiKa3Cih2xGyLmxG6YWjCUe5U",
  authDomain: "reviva-4f3d6.firebaseapp.com",
  projectId: "reviva-4f3d6",
  storageBucket: "reviva-4f3d6.firebasestorage.app",
  messagingSenderId: "350430675243",
  appId: "1:350430675243:web:1095eb5e0358bfa617c56e",
  measurementId: "G-8NK8PRYQ59"
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