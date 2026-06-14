const fs = require('fs');
let text = fs.readFileSync('backend/data/companies.js', 'utf8');
text = text.replace(/},\r?\n,\r?\n/g, '},\n');
fs.writeFileSync('backend/data/companies.js', text);
console.log('Fixed double comma.');
