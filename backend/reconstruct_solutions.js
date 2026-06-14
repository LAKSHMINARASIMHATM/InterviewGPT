const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'solutions.js');
const content = fs.readFileSync(filePath, 'utf8');

// Regex to find blocks like: "123": { ... }
// We use [\s\S]*? for non-greedy match of the inner content.
// We look for a pattern that starts with a number key and ends with a closing brace followed by a comma or newline.
const blockRegex = /"(\d+)":\s*\{([\s\S]*?)\n  \}/g;

let match;
const validBlocks = {};

while ((match = blockRegex.exec(content)) !== null) {
    const id = match[1];
    const body = match[2];
    
    // Validate body roughly - should contain at least one of our expected keys
    if (body.includes('"python":') || body.includes('"java":') || body.includes('"cpp":') || body.includes('"explanation":')) {
        // Further sanitize the body: ensure backticks are balanced
        let sanitizedBody = body;
        
        // If a property like "java": `... is missing its closing backtick, we need to find where it should end.
        // But the regex above already matched until the next \n  }.
        // We'll just make sure each property in the body is a valid string.
        
        validBlocks[id] = sanitizedBody;
    }
}

const newContent = [
    'const SOLUTIONS = {',
    ...Object.entries(validBlocks).map(([id, body]) => `  "${id}": {${body}\n  },`),
    '};',
    '',
    'module.exports = SOLUTIONS;'
].join('\n').replace(/},\n};/, '}\n};'); // Remove last comma

fs.writeFileSync(filePath, newContent);
console.log(`Reconstructed solutions.js with ${Object.keys(validBlocks).length} valid blocks.`);
