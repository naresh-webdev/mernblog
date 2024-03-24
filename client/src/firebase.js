// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mern-blog-9eb1d.firebaseapp.com",
  projectId: "mern-blog-9eb1d",
  storageBucket: "mern-blog-9eb1d.appspot.com",
  messagingSenderId: "830291739819",
  appId: "1:830291739819:web:a6ff08416bd6ba123ae3ee",
  measurementId: "G-DK2X05X3N4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Remove the line of code that assigns a value to the 'analytics' variable since it is not being used.
// const analytics = getAnalytics(app);
