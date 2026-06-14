const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'solutions.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const newLines = [];
const keys = ['explanation', 'python', 'java', 'cpp', 'javascript'];
let inString = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line starts a new property or a new block
    const isNewProperty = keys.some(k => line.trim().startsWith(`"${k}": \``));
    const isNewBlock = /^\s*(\d+):\s*\{/.test(line);
    const isBlockEnd = /^\s*\},?/.test(line);

    if ((isNewProperty || isNewBlock || isBlockEnd) && inString) {
        // We are starting something new but we are still in a string!
        // Close the previous string.
        // We need to insert the closing backtick at the end of the PREVIOUS line.
        if (newLines.length > 0) {
            newLines[newLines.length - 1] += '`,';
        }
        inString = false;
    }

    if (isNewProperty) {
        // If the line contains both opening and closing backticks (on the same line), it's fine.
        // Otherwise, mark as inString.
        const backtickCount = (line.match(/`/g) || []).length;
        if (backtickCount === 1) {
            inString = true;
        }
    } else if (inString) {
        // Check if this line closes the string
        if (line.includes('`')) {
            inString = false;
        }
    }

    newLines.push(line);
}

// Final check
if (inString) {
    newLines[newLines.length - 1] += '`';
}

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Fixed unclosed template literals in solutions.js.');
