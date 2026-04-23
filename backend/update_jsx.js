const fs = require('fs');

const data = fs.readFileSync('generated_problems.json', 'utf8');
const problems = JSON.parse(data);

// Format for leetcode_solutions.jsx
const problemsStr = JSON.stringify(problems.map(p => ({
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    topics: p.topics,
    approach: p.approach,
    time: p.time,
    space: p.space,
    companies: p.companies
})));

let jsx = fs.readFileSync('../leetcode_solutions.jsx', 'utf8');
jsx = jsx.replace(/const PROBLEMS = \[.*?\];/s, `const PROBLEMS = ${problemsStr};`);
fs.writeFileSync('../leetcode_solutions.jsx', jsx);
console.log("Updated leetcode_solutions.jsx with 500 problems");
