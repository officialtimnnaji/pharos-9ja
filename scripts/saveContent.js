// scripts/saveContent.js
import fs from "fs";
import path from "path";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// 🔑 Your Firebase config (same as firebase.js)
const firebaseConfig = {
  apiKey: "AIzaSyAmDDG5-MA0LQ81Xca0hmT8B3vp5wSMkZ8",
  authDomain: "pharos9ja-1efd5.firebaseapp.com",
  projectId: "pharos9ja-1efd5",
  storageBucket: "pharos9ja-1efd5.firebasestorage.app",
  messagingSenderId: "968051962383",
  appId: "1:968051962383:web:c73a2567735be28dcde97a",
  measurementId: "G-CY9CWMFPLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Path to content.json
const filePath = path.join(process.cwd(), "scripts", "content.json");

// Check if file exists
if (!fs.existsSync(filePath)) {
  console.error("❌ content.json not found in scripts folder!");
  process.exit(1);
}

// Load JSON data
let data;
try {
  data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
} catch (err) {
  console.error("❌ Failed to read or parse content.json:", err);
  process.exit(1);
}

async function saveContent() {
  for (const item of data) {
    try {
      await addDoc(collection(db, "communityContent"), {
        ...item,
        status: "approved", // auto-approved since we're preloading
        likes: 0,
        timestamp: serverTimestamp(),
      });
      console.log("✅ Saved content:", item.title);
    } catch (err) {
      console.error("❌ Error saving:", item.title, err);
    }
  }
  console.log("🎉 All content saved!");
}

saveContent();
