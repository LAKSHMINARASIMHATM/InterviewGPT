// This script merges all solution batch files into one solutions.js
const fs = require('fs');
const path = require('path');

const batchDir = path.join(__dirname, 'solution_batches');
const outFile = path.join(__dirname, 'data', 'solutions.js');

// Read all batch files and merge
const files = fs.readdirSync(batchDir).filter(f => f.endsWith('.json')).sort();
let allSolutions = {};

for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(batchDir, file), 'utf8'));
    Object.assign(allSolutions, data);
}

// Build JS module
let js = `// Pre-written detailed solutions for all 500 LeetCode problems\n`;
js += `// Each solution includes: explanation, Python, Java, C++ with comments\n\n`;
js += `const SOLUTIONS = {\n\n`;

const ids = Object.keys(allSolutions).map(Number).sort((a,b) => a-b);
for (const id of ids) {
    const s = allSolutions[id];
    const esc = str => (str||'').replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
    js += `    ${id}: {\n`;
    js += `        explanation: \`${esc(s.explanation)}\`,\n`;
    js += `        python: \`${esc(s.python)}\`,\n`;
    js += `        java: \`${esc(s.java)}\`,\n`;
    js += `        cpp: \`${esc(s.cpp)}\`\n`;
    js += `    },\n\n`;
}

js += `};\n\nmodule.exports = SOLUTIONS;\n`;
fs.writeFileSync(outFile, js, 'utf8');
console.log(`✅ Built solutions.js with ${ids.length} problems from ${files.length} batch files.`);
