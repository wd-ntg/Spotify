// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {getAuth} from 'firebase/auth'
import {getStorage, ref} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZFqJwWIsGqZ2WIhR4WHkJMxoGCsUUqEk",
  authDomain: "spotify-clone-e79cd.firebaseapp.com",
  projectId: "spotify-clone-e79cd",
  storageBucket: "spotify-clone-e79cd.appspot.com",
  messagingSenderId: "956959984200",
  appId: "1:956959984200:web:f75e0359be715c5bbce67d",
  measurementId: "G-PNY5RSTJ4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app)

export const auth = getAuth()
export const storage = getStorage()