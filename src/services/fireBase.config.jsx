// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtu6zdg68JELFZPnmHMJCmoCFdfF8TGDs",
  authDomain: "first-d3087.firebaseapp.com",
  projectId: "first-d3087",
  storageBucket: "first-d3087.firebasestorage.app",
  messagingSenderId: "935729800911",
  appId: "1:935729800911:web:1c800a4d03416ac216f9ba",
  measurementId: "G-W49W134X3S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);