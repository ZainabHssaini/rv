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
  apiKey: "AIzaSyASi3TNbjxrLIQ_t14pRC-phaG6DTCRrBA",
  authDomain: "reviva-2cb77.firebaseapp.com",
  projectId: "reviva-2cb77",
  storageBucket: "reviva-2cb77.firebasestorage.app",
  messagingSenderId: "892854798565",
  appId: "1:892854798565:web:34d0fe6f508a277ca6ac0c"
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