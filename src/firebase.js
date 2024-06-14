// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAkcvGcITH6BygbQxPFuEk98RCeq8PU46Y",
  authDomain: "parinaya-efbcf.firebaseapp.com",
  projectId: "parinaya-efbcf",
  storageBucket: "parinaya-efbcf.appspot.com",
  messagingSenderId: "414155486363",
  appId: "1:414155486363:web:2384ea786240377e1b023e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage}


