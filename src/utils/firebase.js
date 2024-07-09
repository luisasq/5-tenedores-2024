import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDljWhnewenHE4LvXIwIg0eacG0fhlghAk",
  authDomain: "tenedores-2024.firebaseapp.com",
  projectId: "tenedores-2024",
  storageBucket: "tenedores-2024.appspot.com",
  messagingSenderId: "285683235546",
  appId: "1:285683235546:web:3e14604872d7c7d2a9c3e3"
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initializeApp);