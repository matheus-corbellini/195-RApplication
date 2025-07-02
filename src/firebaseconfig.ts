import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKp3QZDxVHrdELwwhcAac29eO_IoQwDWE",
  authDomain: "rapplication-27495.firebaseapp.com",
  projectId: "rapplication-27495",
  storageBucket: "rapplication-27495.firebasestorage.app",
  messagingSenderId: "349892426179",
  appId: "1:349892426179:web:0230f76e40f028acab2576",
  measurementId: "G-WT4CTVJJR7",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
export default app;
