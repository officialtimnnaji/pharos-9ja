import fs from "fs";
import path from "path";

// Paths
const sourcePath = path.join(process.cwd(), "scripts", "announcement.json");
const destDir = path.join(process.cwd(), "src", "data");
const destPath = path.join(destDir, "announcement.json");

// Make sure src/data exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy file
fs.copyFileSync(sourcePath, destPath);
console.log(`✅ announcement.json copied to src/data/`);
