// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-blog-dbb70.firebaseapp.com",
  projectId: "mern-blog-dbb70",
  storageBucket: "mern-blog-dbb70.appspot.com",
  messagingSenderId: "379715756206",
  appId: "1:379715756206:web:e25a25e474ad96c4b3cd3f"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);