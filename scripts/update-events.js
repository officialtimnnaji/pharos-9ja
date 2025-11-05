const fs = require('fs');
const path = require('path');

// Path to your events.json
const eventsPath = path.join(__dirname, '../src/data/events.json');

// Read existing events
const data = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));

// Rotate events:
// 1. Move the first ongoing event to "past" (optional)
// 2. Move the first upcoming event to ongoing
// 3. Keep the rest intact

// Optional: maintain a past section
if (!data.past) data.past = [];

if (data.ongoing.length > 0) {
  const pastEvent = data.ongoing.shift();
  data.past.push(pastEvent);
}

if (data.upcoming.length > 0) {
  const nextEvent = data.upcoming.shift();
  data.ongoing.push(nextEvent);
}

// Save updated events.json
fs.writeFileSync(eventsPath, JSON.stringify(data, null, 2), 'utf-8');

console.log('events.json updated successfully!');
