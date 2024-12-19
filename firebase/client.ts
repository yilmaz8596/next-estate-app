// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfA1_r6R-SoqgVwgp-ea-5dLCrZFTzLTk",
  authDomain: "fire-homes-5e1aa.firebaseapp.com",
  projectId: "fire-homes-5e1aa",
  storageBucket: "fire-homes-5e1aa.firebasestorage.app",
  messagingSenderId: "677323752443",
  appId: "1:677323752443:web:0978033562e62a1503415e"
};

// Initialize Firebase
const currentApps = getApps();
let auth:Auth
let storage:FirebaseStorage

if (!currentApps.length) {
 const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
} else {
    const app = currentApps[0];
    auth = getAuth(app);
    storage = getStorage(app);
}

export {
    auth,
    storage
}