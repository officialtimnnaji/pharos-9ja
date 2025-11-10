import fs from "fs";
import path from "path";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase config
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

// ✅ Updated path
const filePath = path.join(process.cwd(), "scripts", "announcement.json");

// Check if the file exists
if (!fs.existsSync(filePath)) {
  console.error("❌ announcement.json not found in scripts folder!");
  process.exit(1);
}

// Load JSON data
let data;
try {
  data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
} catch (err) {
  console.error("❌ Failed to read or parse announcement.json:", err);
  process.exit(1);
}

async function saveAnnouncements() {
  for (const item of data) {
    try {
      await addDoc(collection(db, "announcements"), {
        ...item,
        date: new Date()
      });
      console.log("✅ Saved announcement:", item.title);
    } catch (err) {
      console.error("❌ Error saving:", item.title, err);
    }
  }
  console.log("🎉 All announcements saved!");
}

saveAnnouncements();
