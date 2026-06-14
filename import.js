const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, 'leetcode-company-wise-problems-main');

// 1. Gather all companies and problems
const companiesFolders = fs.readdirSync(base).filter(f => fs.statSync(path.join(base, f)).isDirectory());

const problemData = new Map();
const allCompaniesSet = new Set();

// Regular expression for parsing CSV. Handles quotes.
function parseCSVLine(line) {
    let result = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
        let char = line[i];
        if (char === '"' && line[i+1] === '"') {
            cur += '"';
            i++;
        } else if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim());
    return result;
}

companiesFolders.forEach(company => {
    let csvPath = path.join(base, company, '5. All.csv');
    if (fs.existsSync(csvPath)) {
        allCompaniesSet.add(company);
        let lines = fs.readFileSync(csvPath, 'utf8').split('\n');
        for (let i = 1; i < lines.length; i++) {
            let l = lines[i].trim();
            if (!l) continue;
            let parts = parseCSVLine(l);
            if (parts.length >= 6) {
                let diff = parts[0];
                let title = parts[1];
                let frequency = parts[2];
                let acceptance = parts[3];
                let link = parts[4];
                let topics = parts[5];
                
                // Capitalize difficulty properly
                diff = diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase();
                
                if (!problemData.has(title)) {
                    problemData.set(title, { diff, topics, companies: new Set() });
                }
                problemData.get(title).companies.add(company);
            }
        }
    }
});

// 2. Load leetcode_problems.json to map titles to IDs
const leetcodeJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend', 'leetcode_problems.json'), 'utf8'));
const titleToId = {};
leetcodeJson.forEach(p => {
    titleToId[p.title] = p.id;
});

// 3. Update existing problems and identify new ones
let existingProblems = require('./backend/data/problems.js');
let newProblems = [];

for (let [title, data] of problemData.entries()) {
    let id = titleToId[title];
    if (!id) {
        continue;
    }
    
    let existingProb = existingProblems.find(p => p.title === title || p.id === id);
    if (existingProb) {
        // Append new companies
        let currentCompanies = new Set(existingProb.companies || []);
        for (let c of data.companies) {
            currentCompanies.add(c);
        }
        existingProb.companies = Array.from(currentCompanies);
    } else {
        // Prepare new problem
        newProblems.push({
            id: id,
            title: title,
            difficulty: data.diff,
            topics: data.topics,
            approach: "Optimal approach",
            time: "O(n)",
            space: "O(1)",
            companies: Array.from(data.companies)
        });
    }
}

// 4. Overwrite problems.js
let problemsOutput = "const PROBLEMS = [\n" + existingProblems.concat(newProblems).map(p => "    " + JSON.stringify(p)).join(",\n") + "\n];\n\nmodule.exports = PROBLEMS;\n";
fs.writeFileSync(path.join(__dirname, 'backend', 'data', 'problems.js'), problemsOutput);

// 5. Append boilerplate to descriptions.js
let descriptionsPath = path.join(__dirname, 'backend', 'data', 'descriptions.js');
let descText = fs.readFileSync(descriptionsPath, 'utf8');

descText = descText.replace(/};\s*module\.exports\s*=\s*DESCRIPTIONS;\s*$/, '');
if (!descText.trim().endsWith(',')) {
    descText = descText.trim() + ",\n";
} else {
    descText = descText.trim() + "\n";
}

let descAdditions = "";
for (let p of newProblems) {
    descAdditions += `  "${p.id}": {
    "content": "<h2>${p.title}</h2>\\n<p>This problem is frequently asked by ${p.companies.slice(0,3).join(", ")}.</p>\\n<p><strong>Example:</strong><br/>Input: ...<br/>Output: ...</p>",
    "testcase": "Testcase 1\\nTestcase 2"
  },\n`;
}
descText += descAdditions + "};\n\nmodule.exports = DESCRIPTIONS;\n";
fs.writeFileSync(descriptionsPath, descText);

// 6. Append boilerplate to solutions.js
let solutionsPath = path.join(__dirname, 'backend', 'data', 'solutions.js');
let solText = fs.readFileSync(solutionsPath, 'utf8');

solText = solText.replace(/};\s*module\.exports\s*=\s*SOLUTIONS;\s*$/, '');
if (!solText.trim().endsWith(',')) {
    solText = solText.trim() + ",\n";
} else {
    solText = solText.trim() + "\n";
}

let solAdditions = "";
for (let p of newProblems) {
    solAdditions += `  ${p.id}: {
    "python": \`class Solution:\\n    def solve(self):\\n        # TODO: Implement ${p.title}\\n        pass\`,
    "java": \`class Solution {\\n    public void solve() {\\n        // TODO: Implement ${p.title}\\n    }\\n}\`,
    "cpp": \`class Solution {\\npublic:\\n    void solve() {\\n        // TODO: Implement ${p.title}\\n    }\\n};\`,
    "javascript": \`class Solution {\\n    solve() {\\n        // TODO: Implement ${p.title}\\n    }\\n}\`
  },\n`;
}
solText += solAdditions + "};\n\nmodule.exports = SOLUTIONS;\n";
fs.writeFileSync(solutionsPath, solText);

// 7. Update companies.js
let companiesJSPath = path.join(__dirname, 'backend', 'data', 'companies.js');
let existingCompaniesContent = fs.readFileSync(companiesJSPath, 'utf8');

// Match `const COMPANIES = [...]` inside companies.js
let compRegex = /const COMPANIES = \[([\s\S]*?)\];/;
let compMatch = existingCompaniesContent.match(compRegex);
if (compMatch) {
    let existingCompaniesText = compMatch[1];
    let newCompanies = [];
    for (let c of allCompaniesSet) {
        if (!existingCompaniesText.includes(`name: "${c}"`)) {
            let color = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
            newCompanies.push(`    { name: "${c}", slug: "${c.toLowerCase().replace(/\\s+/g, '-')}", emoji: "🏢", color: "${color}", bgColor: "#111111", desc: "${c} problems" }`);
        }
    }
    
    if (newCompanies.length > 0) {
        let updatedCompaniesText = existingCompaniesText.replace(/\\s*$/, '') + ",\n" + newCompanies.join(",\n") + "\n";
        let newContent = existingCompaniesContent.replace(compRegex, `const COMPANIES = [\n${updatedCompaniesText}\n];`);
        fs.writeFileSync(companiesJSPath, newContent);
    }
}

console.log("Added " + newProblems.length + " new problems.");
console.log("Updated companies.js");
