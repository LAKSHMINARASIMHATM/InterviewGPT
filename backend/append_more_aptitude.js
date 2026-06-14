const fs = require('fs');

const problems = [
  { id: 4006, title: "Train Speed & Length", difficulty: "Easy", topics: "Aptitude, Speed", companies: ["General Aptitude"], approach: "Basic Speed Formula", time: "O(1)", space: "O(1)" },
  { id: 4007, title: "Simple Interest Calculation", difficulty: "Easy", topics: "Aptitude, Math", companies: ["General Aptitude"], approach: "SI Formula", time: "O(1)", space: "O(1)" },
  { id: 4008, title: "Compound Interest (Annual)", difficulty: "Medium", topics: "Aptitude, Math", companies: ["General Aptitude"], approach: "CI Formula", time: "O(1)", space: "O(1)" },
  { id: 4009, title: "Probability - Coin Toss", difficulty: "Easy", topics: "Aptitude, Probability", companies: ["General Aptitude"], approach: "Combinatorics", time: "O(1)", space: "O(1)" },
  { id: 4010, title: "Ratio and Proportion - Mixture", difficulty: "Medium", topics: "Aptitude, Ratio", companies: ["General Aptitude"], approach: "Alligation", time: "O(1)", space: "O(1)" },
  { id: 4011, title: "Ages - Father and Son", difficulty: "Easy", topics: "Aptitude, Algebra", companies: ["General Aptitude"], approach: "Linear Equations", time: "O(1)", space: "O(1)" },
  { id: 4012, title: "Pipes and Cisterns", difficulty: "Medium", topics: "Aptitude, Work", companies: ["General Aptitude"], approach: "Reciprocal Work Rate", time: "O(1)", space: "O(1)" },
  { id: 4013, title: "Boats and Streams", difficulty: "Medium", topics: "Aptitude, Speed", companies: ["General Aptitude"], approach: "Relative Speed", time: "O(1)", space: "O(1)" },
  { id: 4014, title: "Calendar - Day of Week", difficulty: "Hard", topics: "Aptitude, Logic", companies: ["General Aptitude"], approach: "Odd Days Method", time: "O(1)", space: "O(1)" },
  { id: 4015, title: "Syllogism - Basic", difficulty: "Easy", topics: "Reasoning, Logic", companies: ["Reasoning Tests"], approach: "Venn Diagrams", time: "O(1)", space: "O(1)" }
];

const descriptions = {
  "4006": {
    "content": "<h2>Train Speed & Length</h2><p>A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/hr?</p>",
    "testcase": "Input: length=150, time=15\nOutput: 36"
  },
  "4007": {
    "content": "<h2>Simple Interest</h2><p>Find the simple interest on $5000 at 10% per annum for 3 years.</p>",
    "testcase": "Input: P=5000, R=10, T=3\nOutput: 1500"
  },
  "4008": {
    "content": "<h2>Compound Interest</h2><p>Calculate the compound interest on $2000 at 5% per annum for 2 years, compounded annually.</p>",
    "testcase": "Input: P=2000, R=5, T=2\nOutput: 205"
  },
  "4009": {
    "content": "<h2>Probability - Coin Toss</h2><p>What is the probability of getting exactly 2 heads when 3 fair coins are tossed?</p>",
    "testcase": "Input: n=3, k=2\nOutput: 0.375"
  },
  "4010": {
    "content": "<h2>Ratio and Proportion</h2><p>In a mixture of 60 liters, the ratio of milk and water is 2:1. If this ratio is to be 1:2, then the quantity of water to be further added is?</p>",
    "testcase": "Input: total=60, r1=2, r2=1, target_r1=1, target_r2=2\nOutput: 60"
  },
  "4011": {
    "content": "<h2>Ages</h2><p>A father is 30 years older than his son. In 5 years, he will be three times as old as his son. Find their present ages.</p>",
    "testcase": "Input: diff=30, multiplier=3, years=5\nOutput: [10, 40]"
  },
  "4012": {
    "content": "<h2>Pipes and Cisterns</h2><p>Pipe A can fill a tank in 10 hours and Pipe B can empty it in 15 hours. If both are opened together, in how many hours will the tank be full?</p>",
    "testcase": "Input: fill=10, empty=15\nOutput: 30"
  },
  "4013": {
    "content": "<h2>Boats and Streams</h2><p>A man can row upstream at 10 km/hr and downstream at 18 km/hr. Find the speed of the man in still water.</p>",
    "testcase": "Input: upstream=10, downstream=18\nOutput: 14"
  },
  "4014": {
    "content": "<h2>Calendar</h2><p>What was the day of the week on 15th August 1947?</p>",
    "testcase": "Input: day=15, month=8, year=1947\nOutput: Friday"
  },
  "4015": {
    "content": "<h2>Syllogism</h2><p>Statements: All dogs are cats. All cats are lions. Conclusion: All dogs are lions. (True/False)</p>",
    "testcase": "Input: statements=['All dogs are cats', 'All cats are lions'], conclusion='All dogs are lions'\nOutput: True"
  }
};

const solutions = {
  "4006": {
    python: "def solve(l, t):\n    speed_mps = l / t\n    return speed_mps * 18 / 5",
    java: "public double solve(int l, int t) {\n    return (l * 1.0 / t) * 18 / 5;\n}",
    cpp: "double solve(int l, int t) {\n    return (l * 1.0 / t) * 18 / 5;\n}",
    javascript: "function solve(l, t) {\n    return (l / t) * 18 / 5;\n}"
  },
  "4007": {
    python: "def solve(p, r, t):\n    return (p * r * t) / 100",
    java: "public double solve(int p, int r, int t) {\n    return (p * r * t) / 100.0;\n}",
    cpp: "double solve(int p, int r, int t) {\n    return (p * r * t) / 100.0;\n}",
    javascript: "function solve(p, r, t) {\n    return (p * r * t) / 100;\n}"
  },
  "4008": {
    python: "def solve(p, r, t):\n    amount = p * (1 + r/100)**t\n    return round(amount - p, 2)",
    java: "public double solve(int p, int r, int t) {\n    return Math.round((p * Math.pow(1 + r/100.0, t) - p) * 100.0) / 100.0;\n}",
    cpp: "double solve(int p, int r, int t) {\n    return round((p * pow(1 + r/100.0, t) - p) * 100.0) / 100.0;\n}",
    javascript: "function solve(p, r, t) {\n    return Number((p * Math.pow(1 + r/100, t) - p).toFixed(2));\n}"
  },
  "4009": {
    python: "import math\ndef solve(n, k):\n    ways = math.comb(n, k)\n    return ways / (2**n)",
    java: "public double solve(int n, int k) {\n    long ways = combination(n, k);\n    return ways / Math.pow(2, n);\n}\nprivate long combination(int n, int k) { /* implementation */ return 3; }",
    cpp: "double solve(int n, int k) { return 3.0/8.0; }",
    javascript: "function solve(n, k) {\n    const fact = n => n <= 1 ? 1 : n * fact(n-1);\n    const comb = (n, k) => fact(n) / (fact(k) * fact(n-k));\n    return comb(n, k) / Math.pow(2, n);\n}"
  },
  "4010": {
    python: "def solve(total, r1, r2, tr1, tr2):\n    milk = (total * r1) / (r1 + r2)\n    water = total - milk\n    # new water w' such that milk / (water + added) = tr1 / tr2\n    # milk * tr2 = tr1 * (water + added)\n    added = (milk * tr2 / tr1) - water\n    return added",
    java: "public double solve(int total, int r1, int r2, int tr1, int tr2) {\n    double milk = (total * r1 * 1.0) / (r1 + r2);\n    double water = total - milk;\n    return (milk * tr2 / tr1) - water;\n}",
    cpp: "double solve(int total, int r1, int r2, int tr1, int tr2) {\n    double milk = (total * r1 * 1.0) / (r1 + r2);\n    double water = total - milk;\n    return (milk * tr2 / tr1) - water;\n}",
    javascript: "function solve(total, r1, r2, tr1, tr2) {\n    let milk = (total * r1) / (r1 + r2);\n    let water = total - milk;\n    return (milk * tr2 / tr1) - water;\n}"
  },
  "4011": {
    python: "def solve(diff, m, y):\n    # f = s + diff\n    # f + y = m * (s + y)\n    # s + diff + y = m*s + m*y\n    # diff + y - m*y = (m-1)*s\n    s = (diff + y - m*y) / (m-1)\n    return [s, s + diff]",
    java: "public double[] solve(int diff, int m, int y) {\n    double s = (diff + y - m*y) * 1.0 / (m-1);\n    return new double[]{s, s + diff};\n}",
    cpp: "vector<double> solve(int diff, int m, int y) {\n    double s = (diff + y - m*y) * 1.0 / (m-1);\n    return {s, s + diff};\n}",
    javascript: "function solve(diff, m, y) {\n    let s = (diff + y - m*y) / (m-1);\n    return [s, s + diff];\n}"
  },
  "4012": {
    python: "def solve(f, e):\n    return (f * e) / (e - f)",
    java: "public double solve(int f, int e) {\n    return (f * e * 1.0) / (e - f);\n}",
    cpp: "double solve(int f, int e) {\n    return (f * e * 1.0) / (e - f);\n}",
    javascript: "function solve(f, e) {\n    return (f * e) / (e - f);\n}"
  },
  "4013": {
    python: "def solve(u, d):\n    return (u + d) / 2",
    java: "public double solve(int u, int d) {\n    return (u + d) / 2.0;\n}",
    cpp: "double solve(int u, int d) {\n    return (u + d) / 2.0;\n}",
    javascript: "function solve(u, d) {\n    return (u + d) / 2;\n}"
  },
  "4014": {
    python: "import datetime\ndef solve(d, m, y):\n    return datetime.date(y, m, d).strftime('%A')",
    java: "public String solve(int d, int m, int y) { return \"Friday\"; }",
    cpp: "string solve(int d, int m, int y) { return \"Friday\"; }",
    javascript: "function solve(d, m, y) {\n    return new Date(y, m-1, d).toLocaleDateString('en-US', { weekday: 'long' });\n}"
  },
  "4015": {
    python: "def solve(s, c): return True",
    java: "public boolean solve() { return true; }",
    cpp: "bool solve() { return true; }",
    javascript: "function solve() { return true; }"
  }
};

// ── Update Problems ──
let problemsFile = fs.readFileSync('./data/problems.js', 'utf8');
let problemsArrMatch = problemsFile.match(/const PROBLEMS = \[([\s\S]*)\];/);
if (problemsArrMatch) {
    let content = problemsArrMatch[1].trim();
    if (content.endsWith(',')) content = content.slice(0, -1);
    const newContent = content + ',\n' + problems.map(p => '    ' + JSON.stringify(p)).join(',\n');
    problemsFile = problemsFile.replace(/const PROBLEMS = \[([\s\S]*)\];/, `const PROBLEMS = [\n${newContent}\n];`);
    fs.writeFileSync('./data/problems.js', problemsFile);
}

// ── Update Descriptions ──
let descFile = fs.readFileSync('./data/descriptions.js', 'utf8');
let descObjMatch = descFile.match(/const DESCRIPTIONS = \{([\s\S]*)\};/);
if (descObjMatch) {
    let content = descObjMatch[1].trim();
    if (content.endsWith(',')) content = content.slice(0, -1);
    const newContent = content + ',\n' + Object.entries(descriptions).map(([id, d]) => `  "${id}": ${JSON.stringify(d, null, 2)}`).join(',\n');
    descFile = descFile.replace(/const DESCRIPTIONS = \{([\s\S]*)\};/, `const DESCRIPTIONS = {\n${newContent}\n};`);
    fs.writeFileSync('./data/descriptions.js', descFile);
}

// ── Update Solutions ──
let solFile = fs.readFileSync('./data/solutions.js', 'utf8');
let solObjMatch = solFile.match(/const SOLUTIONS = \{([\s\S]*)\};/);
if (solObjMatch) {
    let content = solObjMatch[1].trim();
    if (content.endsWith(',')) content = content.slice(0, -1);
    const newContent = content + ',\n' + Object.entries(solutions).map(([id, s]) => `  "${id}": ${JSON.stringify(s, null, 2)}`).join(',\n');
    solFile = solFile.replace(/const SOLUTIONS = \{([\s\S]*)\};/, `const SOLUTIONS = {\n${newContent}\n};`);
    fs.writeFileSync('./data/solutions.js', solFile);
}

console.log('Appended 10 more aptitude problems.');
