// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6CkJsec8QdM2VaT0w0aznIl-hP9V-4gA",
  authDomain: "vote-pulse-e6a83.firebaseapp.com",
  projectId: "vote-pulse-e6a83",
  storageBucket: "vote-pulse-e6a83.firebasestorage.app",
  messagingSenderId: "775005978827",
  appId: "1:775005978827:web:dcc20a42b630b5a7ac1b4e",
  measurementId: "G-54VS64TFL1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
