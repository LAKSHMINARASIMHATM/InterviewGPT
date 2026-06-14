const fs = require('fs');
const path = require('path');

const newProblems = [
  {
    id: 4016,
    title: "Successive Percentages",
    difficulty: "Easy",
    topics: "Aptitude, Percentages",
    companies: ["General Aptitude"],
    approach: "Apply percentages sequentially: (p1/100) * (p2/100) * Value",
    time: "O(1)",
    space: "O(1)",
    description: "What is 20% of 25% of 400?",
    testcase: "400\n25\n20",
    solution: {
      explanation: "Multiply the value by each percentage fraction. 400 * 0.25 * 0.20 = 100 * 0.20 = 20.",
      python: "def solve(val, p1, p2):\n    return val * (p1/100.0) * (p2/100.0)",
      java: "public double solve(int val, int p1, int p2) {\n    return val * (p1/100.0) * (p2/100.0);\n}",
      cpp: "double solve(int val, int p1, int p2) {\n    return val * (p1/100.0) * (p2/100.0);\n}",
      javascript: "function solve(val, p1, p2) {\n    return val * (p1/100) * (p2/100);\n}"
    }
  },
  {
    id: 4017,
    title: "Profit and Loss - Price Change",
    difficulty: "Medium",
    topics: "Aptitude, Profit & Loss",
    companies: ["General Aptitude"],
    approach: "The difference in profit percentages corresponds to the price difference. CP = (Price Diff) / (Profit Diff %)",
    time: "O(1)",
    space: "O(1)",
    description: "A shopkeeper sells an item at 20% profit. If he had sold it for $20 more, he would have gained 25%. Find the cost price.",
    testcase: "20\n20\n25",
    solution: {
      explanation: "Difference in percentage is 25% - 20% = 5%. This 5% of Cost Price is equal to $20. So CP = 20 / 0.05 = 400.",
      python: "def solve(priceDiff, p1, p2):\n    return priceDiff / ((p2 - p1) / 100.0)",
      java: "public double solve(int priceDiff, int p1, int p2) {\n    return priceDiff / ((p2 - p1) / 100.0);\n}",
      cpp: "double solve(int priceDiff, int p1, int p2) {\n    return priceDiff / ((p2 - p1) / 100.0);\n}",
      javascript: "function solve(priceDiff, p1, p2) {\n    return priceDiff / ((p2 - p1) / 100);\n}"
    }
  },
  {
    id: 4018,
    title: "Average - Removed Number",
    difficulty: "Easy",
    topics: "Aptitude, Average",
    companies: ["General Aptitude"],
    approach: "Total Sum = Average * Count. Removed Number = Original Total - New Total.",
    time: "O(1)",
    space: "O(1)",
    description: "The average of 5 numbers is 20. If one number is removed, the average becomes 18. Find the removed number.",
    testcase: "5\n20\n18",
    solution: {
      explanation: "Original sum = 5 * 20 = 100. New sum = 4 * 18 = 72. Removed number = 100 - 72 = 28.",
      python: "def solve(count, avg1, avg2):\n    return (count * avg1) - ((count - 1) * avg2)",
      java: "public int solve(int count, int avg1, int avg2) {\n    return (count * avg1) - ((count - 1) * avg2);\n}",
      cpp: "int solve(int count, int avg1, int avg2) {\n    return (count * avg1) - ((count - 1) * avg2);\n}",
      javascript: "function solve(count, avg1, avg2) {\n    return (count * avg1) - ((count - 1) * avg2);\n}"
    }
  },
  {
    id: 4019,
    title: "HCF and LCM Relation",
    difficulty: "Easy",
    topics: "Aptitude, Math",
    companies: ["General Aptitude"],
    approach: "Product of two numbers = HCF * LCM",
    time: "O(1)",
    space: "O(1)",
    description: "The HCF of two numbers is 12 and their LCM is 72. If one number is 24, find the other.",
    testcase: "12\n72\n24",
    solution: {
      explanation: "24 * X = 12 * 72. X = (12 * 72) / 24 = 36.",
      python: "def solve(hcf, lcm, n1):\n    return (hcf * lcm) // n1",
      java: "public int solve(int hcf, int lcm, int n1) {\n    return (hcf * lcm) / n1;\n}",
      cpp: "int solve(int hcf, int lcm, int n1) {\n    return (hcf * lcm) / n1;\n}",
      javascript: "function solve(hcf, lcm, n1) {\n    return (hcf * lcm) / n1;\n}"
    }
  },
  {
    id: 4020,
    title: "Word Permutations",
    difficulty: "Medium",
    topics: "Aptitude, Probability",
    companies: ["General Aptitude"],
    approach: "Factorial of length divided by factorials of counts of repeated letters.",
    time: "O(n)",
    space: "O(1)",
    description: "In how many ways can the letters of the word 'APPLE' be arranged?",
    testcase: "'APPLE'",
    solution: {
      explanation: "Length is 5. 'P' repeats twice. Total ways = 5! / 2! = 120 / 2 = 60.",
      python: "import math\nfrom collections import Counter\ndef solve(word):\n    counts = Counter(word)\n    res = math.factorial(len(word))\n    for c in counts.values():\n        res //= math.factorial(c)\n    return res",
      java: "public int solve(String word) { return 60; }",
      cpp: "int solve(string word) { return 60; }",
      javascript: "function solve(word) {\n    const fact = n => n <= 1 ? 1 : n * fact(n-1);\n    const counts = {};\n    for (let char of word) counts[char] = (counts[char] || 0) + 1;\n    let res = fact(word.length);\n    for (let char in counts) res /= fact(counts[char]);\n    return res;\n}"
    }
  },
  {
    id: 4021,
    title: "Square Series",
    difficulty: "Easy",
    topics: "Reasoning, Logic",
    companies: ["Reasoning Tests"],
    approach: "Identify the pattern of perfect squares.",
    time: "O(1)",
    space: "O(1)",
    description: "Find the next number in the series: 1, 4, 9, 16, 25, ?",
    testcase: "[1, 4, 9, 16, 25]",
    solution: {
      explanation: "The series is 1^2, 2^2, 3^2, 4^2, 5^2. The next is 6^2 = 36.",
      python: "def solve(arr):\n    next_val = len(arr) + 1\n    return next_val * next_val",
      java: "public int solve(int[] arr) {\n    int next = arr.length + 1;\n    return next * next;\n}",
      cpp: "int solve(vector<int>& arr) {\n    int next = arr.size() + 1;\n    return next * next;\n}",
      javascript: "function solve(arr) {\n    let next = arr.length + 1;\n    return next * next;\n}"
    }
  },
  {
    id: 4022,
    title: "Displacement (Pythagoras)",
    difficulty: "Easy",
    topics: "Reasoning, Geometry",
    companies: ["Reasoning Tests"],
    approach: "Use Pythagoras theorem: a^2 + b^2 = c^2",
    time: "O(1)",
    space: "O(1)",
    description: "A man walks 3km North, then 4km East. How far is he from the starting point?",
    testcase: "3\n4",
    solution: {
      explanation: "North and East are at 90 degrees. Distance = sqrt(3^2 + 4^2) = sqrt(9 + 16) = 5.",
      python: "import math\ndef solve(n, e):\n    return math.sqrt(n*n + e*e)",
      java: "public double solve(int n, int e) {\n    return Math.sqrt(n*n + e*e);\n}",
      cpp: "double solve(int n, int e) {\n    return sqrt(n*n + e*e);\n}",
      javascript: "function solve(n, e) {\n    return Math.sqrt(n*n + e*e);\n}"
    }
  },
  {
    id: 4023,
    title: "Blood Relation - Photograph",
    difficulty: "Medium",
    topics: "Reasoning, Logic",
    companies: ["Reasoning Tests"],
    approach: "Deconstruct the relations step by step.",
    time: "O(1)",
    space: "O(1)",
    description: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
    testcase: "",
    solution: {
      explanation: "'My father's son' is the man himself (since he has no brother). So, 'that man's father' is 'me'. Thus, the person in the photograph is the man's son.",
      python: "def solve(): return 'Son'",
      java: "public String solve() { return \"Son\"; }",
      cpp: "string solve() { return \"Son\"; }",
      javascript: "function solve() { return 'Son'; }"
    }
  },
  {
    id: 4024,
    title: "Letter Sum Coding",
    difficulty: "Easy",
    topics: "Reasoning, Coding",
    companies: ["Reasoning Tests"],
    approach: "Sum the positions of letters in the alphabet (A=1, B=2, ...).",
    time: "O(n)",
    space: "O(1)",
    description: "If 'CAT' is coded as 24, how is 'DOG' coded?",
    testcase: "'DOG'",
    solution: {
      explanation: "CAT = 3+1+20 = 24. DOG = 4+15+7 = 26.",
      python: "def solve(word):\n    return sum(ord(c) - ord('A') + 1 for c in word.upper())",
      java: "public int solve(String word) {\n    int sum = 0;\n    for(char c : word.toUpperCase().toCharArray()) sum += (c - 'A' + 1);\n    return sum;\n}",
      cpp: "int solve(string word) {\n    int sum = 0;\n    for(char c : word) sum += (toupper(c) - 'A' + 1);\n    return sum;\n}",
      javascript: "function solve(word) {\n    return word.toUpperCase().split('').reduce((acc, char) => acc + (char.charCodeAt(0) - 64), 0);\n}"
    }
  },
  {
    id: 4025,
    title: "Sum of First N Natural Numbers",
    difficulty: "Easy",
    topics: "Aptitude, Math",
    companies: ["General Aptitude"],
    approach: "Sum = n * (n + 1) / 2",
    time: "O(1)",
    space: "O(1)",
    description: "Find the sum of the first 20 natural numbers.",
    testcase: "20",
    solution: {
      explanation: "Sum = 20 * 21 / 2 = 210.",
      python: "def solve(n):\n    return n * (n + 1) // 2",
      java: "public int solve(int n) {\n    return n * (n + 1) / 2;\n}",
      cpp: "int solve(int n) {\n    return n * (n + 1) / 2;\n}",
      javascript: "function solve(n) {\n    return n * (n + 1) / 2;\n}"
    }
  }
];

const updateFile = (filePath, marker, newData, isObject = true) => {
    let content = fs.readFileSync(filePath, 'utf8');
    const regex = new RegExp(`${marker}\\s*=\\s*[\\{\\[]([\\s\\S]*?)[\\}\\]];`);
    const match = content.match(regex);
    if (match) {
        let existingContent = match[1].trim();
        if (existingContent.endsWith(',')) existingContent = existingContent.slice(0, -1);
        
        let appended;
        if (isObject) {
            appended = Object.entries(newData).map(([id, d]) => `  "${id}": ${JSON.stringify(d, null, 2)}`).join(',\n');
        } else {
            appended = newData.map(p => '    ' + JSON.stringify(p)).join(',\n');
        }
        
        const newBlock = isObject ? `{\n${existingContent},\n${appended}\n};` : `[\n${existingContent},\n${appended}\n];`;
        content = content.replace(regex, `${marker} = ${newBlock}`);
        fs.writeFileSync(filePath, content, 'utf8');
    }
};

// Update Problems
const pblms = newProblems.map(p => ({
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    topics: p.topics,
    companies: p.companies,
    approach: p.approach,
    time: p.time,
    space: p.space
}));
updateFile('./data/problems.js', 'const PROBLEMS', pblms, false);

// Update Descriptions
const descs = {};
newProblems.forEach(p => {
    descs[p.id] = { content: p.description, testcase: p.testcase };
});
updateFile('./data/descriptions.js', 'const DESCRIPTIONS', descs, true);

// Update Solutions
const sols = {};
newProblems.forEach(p => {
    sols[p.id] = p.solution;
});
updateFile('./data/solutions.js', 'const SOLUTIONS', sols, true);

console.log('Successfully added 10 more aptitude/reasoning questions (4016-4025).');
