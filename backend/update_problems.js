const fs = require('fs');

// Read the generated JSON
const data = fs.readFileSync('generated_problems.json', 'utf8');
const problems = JSON.parse(data);

// Format as JS module
let jsContent = `const PROBLEMS = [\n`;
for (let p of problems) {
    let companyArrStr = p.companies ? `["${p.companies.split(',').join('", "')}"]` : `[]`;
    if (companyArrStr === `[""]`) companyArrStr = `[]`;
    
    jsContent += `    { id: ${p.id}, title: ${JSON.stringify(p.title)}, difficulty: "${p.difficulty}", topics: "${p.topics}", approach: ${JSON.stringify(p.approach)}, time: "${p.time}", space: "${p.space}", companies: ${companyArrStr} },\n`;
}
jsContent += `];\n\nmodule.exports = PROBLEMS;\n`;

fs.writeFileSync('data/problems.js', jsContent);
console.log("Updated data/problems.js with", problems.length, "problems.");
