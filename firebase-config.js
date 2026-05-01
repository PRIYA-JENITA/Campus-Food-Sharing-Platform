// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5RTGyJzPQL6ckgmiPsL3oPXDlt2WzhYM",
  authDomain: "campusfoodsharing.firebaseapp.com",
  projectId: "campusfoodsharing",
  storageBucket: "campusfoodsharing.firebasestorage.app",
  messagingSenderId: "493320462805",
  appId: "1:493320462805:web:9f92eee87a6b0055a91d5c",
  measurementId: "G-FY3KVYT96C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
