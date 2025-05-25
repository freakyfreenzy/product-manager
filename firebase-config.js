// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyAsRwnx-jF3bjQuxS005cs9F0I3NSSIJQE",
  authDomain: "productmanager-5be2e.firebaseapp.com",
  projectId: "productmanager-5be2e",
  storageBucket: "productmanager-5be2e.firebasestorage.app",
  messagingSenderId: "835810941538",
  appId: "1:835810941538:web:08ca9be0f0d85be81a4f3b",
  measurementId: "G-WJ9V68G9Y3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db };

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
