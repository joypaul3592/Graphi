// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_krtBxeg-no1hoBH33tztcR65u1QSMQ4",
  authDomain: "graphi-b5822.firebaseapp.com",
  projectId: "graphi-b5822",
  storageBucket: "graphi-b5822.appspot.com",
  messagingSenderId: "157898007781",
  appId: "1:157898007781:web:a487ddc7c74d12a607600c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;