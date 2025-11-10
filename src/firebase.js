// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmDDG5-MA0LQ81Xca0hmT8B3vp5wSMkZ8",
  authDomain: "pharos9ja-1efd5.firebaseapp.com",
  projectId: "pharos9ja-1efd5",
  storageBucket: "pharos9ja-1efd5.firebasestorage.app",
  messagingSenderId: "968051962383",
  appId: "1:968051962383:web:c73a2567735be28dcde97a",
  measurementId: "G-CY9CWMFPLF"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app); // ✅ This is correct for authentication

// Export services for use in components
export { db, auth };
