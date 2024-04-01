import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTP7qMHtTsAWHCnMAEaOgTWRygrzBfl3I",
  authDomain: "honours-a40c7.firebaseapp.com",
  projectId: "honours-a40c7",
  storageBucket: "honours-a40c7.appspot.com",
  messagingSenderId: "407305178223",
  appId: "1:407305178223:web:570d5ae94bfe613376519a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export default app;
