const fs = require('fs');
const path = require('path');

let existingSolutions = require('./backend/data/solutions.js');
const leetcodeJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend', 'leetcode_problems.json'), 'utf8'));

const idToSlug = {};
leetcodeJson.forEach(p => {
    idToSlug[p.id] = p.slug;
});

const kamyuBase = path.join('d:', 'temp_kamyu');

let countPy = 0, countJava = 0, countCpp = 0, countJs = 0;

for (let id of Object.keys(existingSolutions)) {
    let slug = idToSlug[id];
    if (!slug) continue;

    let s = existingSolutions[id];

    // Python
    let pyPath = path.join(kamyuBase, 'Python', slug + '.py');
    if (!fs.existsSync(pyPath)) pyPath = path.join(kamyuBase, 'Python3', slug + '.py');
    if (fs.existsSync(pyPath)) {
        s.python = fs.readFileSync(pyPath, 'utf8').trim();
        countPy++;
    }

    // Java
    let javaPath = path.join(kamyuBase, 'Java', slug + '.java');
    if (fs.existsSync(javaPath)) {
        s.java = fs.readFileSync(javaPath, 'utf8').trim();
        countJava++;
    }

    // C++
    let cppPath = path.join(kamyuBase, 'C++', slug + '.cpp');
    if (fs.existsSync(cppPath)) {
        s.cpp = fs.readFileSync(cppPath, 'utf8').trim();
        countCpp++;
    }

    // JS/TS
    let tsPath = path.join(kamyuBase, 'TypeScript', slug + '.ts');
    if (fs.existsSync(tsPath)) {
        s.javascript = fs.readFileSync(tsPath, 'utf8').trim();
        countJs++;
    } else {
        let jsPath = path.join(kamyuBase, 'JavaScript', slug + '.js');
        if (fs.existsSync(jsPath)) {
            s.javascript = fs.readFileSync(jsPath, 'utf8').trim();
            countJs++;
        }
    }
}

// Write back to solutions.js
let jsOutput = `const SOLUTIONS = {\n`;
const ids = Object.keys(existingSolutions).map(Number).sort((a,b) => a-b);
for (const id of ids) {
    const s = existingSolutions[id];
    const esc = str => (str||'').replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
    jsOutput += `  ${id}: {\n`;
    if (s.explanation) jsOutput += `    "explanation": \`${esc(s.explanation)}\`,\n`;
    jsOutput += `    "python": \`${esc(s.python)}\`,\n`;
    jsOutput += `    "java": \`${esc(s.java)}\`,\n`;
    jsOutput += `    "cpp": \`${esc(s.cpp)}\`,\n`;
    jsOutput += `    "javascript": \`${esc(s.javascript)}\`\n`;
    jsOutput += `  },\n`;
}
jsOutput += `};\n\nmodule.exports = SOLUTIONS;\n`;

fs.writeFileSync(path.join(__dirname, 'backend', 'data', 'solutions.js'), jsOutput);

console.log(`Updated solutions with real implementations:`);
console.log(`Python: ${countPy}, Java: ${countJava}, C++: ${countCpp}, JS/TS: ${countJs}`);
