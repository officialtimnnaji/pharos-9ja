// scripts/syncAndSaveAnnouncements.js
import fs from "fs";
import path from "path";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// 1️⃣ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAmDDG5-MA0LQ81Xca0hmT8B3vp5wSMkZ8",
  authDomain: "pharos9ja-1efd5.firebaseapp.com",
  projectId: "pharos9ja-1efd5",
  storageBucket: "pharos9ja-1efd5.firebasestorage.app",
  messagingSenderId: "968051962383",
  appId: "1:968051962383:web:c73a2567735be28dcde97a",
  measurementId: "G-CY9CWMFPLF"
};

// 2️⃣ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3️⃣ Paths
const scriptsPath = path.join(process.cwd(), "scripts", "announcement.json");
const frontendPath = path.join(process.cwd(), "src", "data", "announcement.json");

// 4️⃣ Load JSON
let data;
try {
  data = JSON.parse(fs.readFileSync(scriptsPath, "utf-8"));
} catch (err) {
  console.error("❌ Failed to read or parse announcement.json:", err);
  process.exit(1);
}

// 5️⃣ Fix missing dates
const updatedData = data.map((item) => ({
  ...item,
  date: item.date || new Date().toISOString(),
}));

// 6️⃣ Save back to scripts folder
fs.writeFileSync(scriptsPath, JSON.stringify(updatedData, null, 2));

// 7️⃣ Sync to src/data for frontend
fs.mkdirSync(path.dirname(frontendPath), { recursive: true });
fs.writeFileSync(frontendPath, JSON.stringify(updatedData, null, 2));

console.log("✅ Announcement JSON synced to frontend!");

// 8️⃣ Save to Firestore
async function saveToFirestore() {
  for (const item of updatedData) {
    try {
      await addDoc(collection(db, "announcements"), {
        ...item,
        date: new Date(item.date) // Ensure Firestore Date type
      });
      console.log("✅ Saved to Firestore:", item.title);
    } catch (err) {
      console.error("❌ Error saving to Firestore:", item.title, err);
    }
  }
  console.log("🎉 All announcements saved to Firestore!");
}

saveToFirestore();
