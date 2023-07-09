// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAepteDcicDWrSnVCwnsBnWf7br4fBwLSE",
  authDomain: "react-spotify-clone-fd9da.firebaseapp.com",
  projectId: "react-spotify-clone-fd9da",
  storageBucket: "react-spotify-clone-fd9da.appspot.com",
  messagingSenderId: "1060226267359",
  appId: "1:1060226267359:web:36ed6c5493494bb033116a",
  measurementId: "G-YGS569PV54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app)