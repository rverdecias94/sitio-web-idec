
/* import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB-YaI1sLJSeFnSfq57bIE-flhBOMKIcnM",
  authDomain: "web-site-idec.firebaseapp.com",
  projectId: "web-site-idec",
  storageBucket: "web-site-idec.appspot.com",
  messagingSenderId: "1001994316155",
  appId: "1:1001994316155:web:9e548ac83b621c069035de"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); */

// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoQbDkx90JG2p6snRtbkpIfpEvO0XU7qY",
  authDomain: "clubdj-ee0df.firebaseapp.com",
  projectId: "clubdj-ee0df",
  storageBucket: "clubdj-ee0df.appspot.com",
  messagingSenderId: "957787452442",
  appId: "1:957787452442:web:8800e112e271e932a74da3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);