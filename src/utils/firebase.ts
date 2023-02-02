import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBf6SkBp8sBcgFtoIogNWCeNT1_YyITWos",
  authDomain: "geenia.firebaseapp.com",
  projectId: "geenia",
  storageBucket: "geenia.appspot.com",
  messagingSenderId: "653400552385",
  appId: "1:653400552385:web:d5f5aa25a9fac3775eb540",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
