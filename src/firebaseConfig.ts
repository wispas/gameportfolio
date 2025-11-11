import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvIaIe0N8_JJmUyF4rRCCNThcz4aDstVQ",
    authDomain: "portfolio-d11e4.firebaseapp.com",
    projectId: "portfolio-d11e4",
    storageBucket: "portfolio-d11e4.firebasestorage.app",
    messagingSenderId: "433869931831",
    appId: "1:433869931831:web:319857406263ab917606b2",
    measurementId: "G-7D6DVKNJ3G"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
