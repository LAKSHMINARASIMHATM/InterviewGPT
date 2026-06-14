const fs = require('fs');
const lines = fs.readFileSync('./data/solutions.js', 'utf8').split('\n');
const idx = lines.findIndex(l => l.includes('  42: {'));
if (idx !== -1) {
  const jsIdx = lines.findIndex((l, i) => i > idx && l.includes('javascript'));
  console.log(lines.slice(jsIdx - 2, jsIdx + 2).join('\n'));
} else {
  console.log('not found');
}
