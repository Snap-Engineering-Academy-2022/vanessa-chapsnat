// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import "firebase/firebase-firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiOmIoefhgaINlLa_w6v9c5J1x4dVTNHM",
  authDomain: "vanessas-chapsnat.firebaseapp.com",
  projectId: "vanessas-chapsnat",
  storageBucket: "vanessas-chapsnat.appspot.com",
  messagingSenderId: "140147061968",
  appId: "1:140147061968:web:15b4349a734c5b2ed15ad5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
