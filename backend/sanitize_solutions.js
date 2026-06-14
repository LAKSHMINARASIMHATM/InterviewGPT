const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'solutions.js');
let content = fs.readFileSync(filePath, 'utf8');
let lines = content.split('\n');

let newLines = [];
newLines.push('const SOLUTIONS = {');

let inValidBlock = false;
let currentBlock = [];

// Regex to match "ID": {
const idStartRegex = /^\s*"?(\d+)"?:\s*\{/;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (idStartRegex.test(line)) {
        inValidBlock = true;
        currentBlock = [line];
    } else if (inValidBlock) {
        currentBlock.push(line);
        // Check for block end
        if (line.trim() === '},' || line.trim() === '}') {
            // We found the end of a block. 
            // We should check if the block is actually valid JSON-ish
            // But for now, let's just keep it if it's within the SOLUTIONS object.
            newLines.push(...currentBlock);
            inValidBlock = false;
        }
    }
}

// Ensure the last block ends correctly (remove trailing comma if needed, though JS objects allow it)
let finalContent = newLines.join('\n');
// Basic cleanup of trailing commas before closing
finalContent = finalContent.replace(/,\s*$/, '');
finalContent += '\n};\n\nmodule.exports = SOLUTIONS;\n';

fs.writeFileSync(filePath, finalContent);
console.log('Sanitized solutions.js. Extracted valid problem blocks.');
