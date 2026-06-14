const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'solutions.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const newLines = ['const SOLUTIONS = {'];
const idRegex = /^\s*(\d+):\s*\{/;

let currentId = null;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(idRegex);
    
    if (match) {
        // If we were in a block, close it before starting a new one
        if (currentId !== null) {
            newLines.push('  },');
        }
        currentId = match[1];
        newLines.push(line);
    } else if (currentId !== null) {
        // Filter out any lines that look like they don't belong (e.g. raw class definitions outside strings)
        // But for now, let's just keep everything and hope the closing brace fix is enough
        if (line.trim() === 'module.exports = SOLUTIONS;' || line.trim() === '};') {
            continue;
        }
        newLines.push(line);
    }
}

// Close the last block
if (currentId !== null) {
    newLines.push('  }');
}

newLines.push('};');
newLines.push('');
newLines.push('module.exports = SOLUTIONS;');

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Fixed object structure in solutions.js by ensuring block closure.');
