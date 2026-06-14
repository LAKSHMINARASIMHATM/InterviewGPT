const fs = require('fs');
const filePath = './data/solutions.js';
let s = fs.readFileSync(filePath, 'utf8');
// Search for the sequence: brace, comma, newline, comma, newline, indent, "4001"
s = s.replace(/\},\n,\n  "4001": \{/g, '},\n  "4001": {');
fs.writeFileSync(filePath, s);
console.log('Fixed solutions.js');
