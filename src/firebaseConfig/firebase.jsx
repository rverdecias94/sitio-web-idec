
import { initializeApp } from "firebase/app";
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

export const db = getFirestore(app);