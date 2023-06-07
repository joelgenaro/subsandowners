// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNH2q9YDMvu2nSfAWg_-4yg_Bk9UrQ28o",
  authDomain: "fence-calculator-127fb.firebaseapp.com",
  databaseURL: "https://fence-calculator-127fb-default-rtdb.firebaseio.com",
  projectId: "fence-calculator-127fb",
  storageBucket: "fence-calculator-127fb.appspot.com",
  messagingSenderId: "410588364811",
  appId: "1:410588364811:web:f0eb6d0950c2624c28470e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
