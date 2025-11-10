// scripts/fixAnnouncementDates.js
import fs from "fs";
import path from "path";

// Paths
const sourcePath = path.join(process.cwd(), "scripts", "announcement.json");
const destPath = path.join(process.cwd(), "src", "data", "announcement.json");

// Read JSON
let data;
try {
  data = JSON.parse(fs.readFileSync(sourcePath, "utf-8"));
} catch (err) {
  console.error("❌ Failed to read or parse announcement.json:", err);
  process.exit(1);
}

// Add missing dates
const updatedData = data.map((item) => ({
  ...item,
  date: item.date || new Date().toISOString(),
}));

// Write back to scripts folder (optional)
fs.writeFileSync(sourcePath, JSON.stringify(updatedData, null, 2));

// Also sync to src/data so frontend can import it
fs.mkdirSync(path.dirname(destPath), { recursive: true });
fs.writeFileSync(destPath, JSON.stringify(updatedData, null, 2));

console.log("✅ Announcement dates updated and synced to src/data!");
