// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDh0XRlnBVvflnmfTIVN8cgmqCV9Faephw",
    authDomain: "taskmaster-f670f.firebaseapp.com",
    projectId: "taskmaster-f670f",
    storageBucket: "taskmaster-f670f.appspot.com",
    messagingSenderId: "200206662485",
    appId: "1:200206662485:web:07f81a3e1fd17e078f0ddc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);