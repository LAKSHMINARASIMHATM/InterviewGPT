const fs = require('fs');
const path = require('path');

const problemsToAdd = [
    {
        id: 4001,
        title: "Clock Angle",
        difficulty: "Easy",
        topics: "Aptitude, Math",
        companies: ["General Aptitude"],
        approach: "Calculate the exact angle between the hour and minute hand of a clock. The hour hand moves 360 degrees in 12 hours (30 deg/hour, 0.5 deg/min). The minute hand moves 360 degrees in 60 minutes (6 deg/min).",
        time: "O(1)",
        space: "O(1)",
        description: `<p>Given two integers, <code>hour</code> and <code>minute</code>, return the smaller angle (in degrees) formed between the hour and the minute hand.</p><p>Returns the angle as a double/float.</p>`,
        examples: [
            { input: "hour = 12, minute = 30", output: "165", explanation: "The minute hand is at 180 degrees. The hour hand is at 15 degrees." },
            { input: "hour = 3, minute = 30", output: "75", explanation: "The minute hand is at 180 degrees. The hour hand is at 105 degrees." }
        ],
        testcase: "12\n30",
        solution: {
            explanation: "Find the position of hour hand and minute hand, take the absolute difference. Since we need the smaller angle, return min(diff, 360-diff).",
            python: `class Solution:\n    def solve(self, hour, minute):\n        h_angle = (hour % 12) * 30 + minute * 0.5\n        m_angle = minute * 6\n        diff = abs(h_angle - m_angle)\n        return min(diff, 360 - diff)`,
            java: `class Solution {\n    public double solve(int hour, int minute) {\n        double hAngle = (hour % 12) * 30 + minute * 0.5;\n        double mAngle = minute * 6;\n        double diff = Math.abs(hAngle - mAngle);\n        return Math.min(diff, 360 - diff);\n    }\n}`,
            cpp: `class Solution {\npublic:\n    double solve(int hour, int minute) {\n        double hAngle = (hour % 12) * 30 + minute * 0.5;\n        double mAngle = minute * 6;\n        double diff = abs(hAngle - mAngle);\n        return min(diff, 360 - diff);\n    }\n};`,
            javascript: `class Solution {\n    solve(hour, minute) {\n        const hAngle = (hour % 12) * 30 + minute * 0.5;\n        const mAngle = minute * 6;\n        const diff = Math.abs(hAngle - mAngle);\n        return Math.min(diff, 360 - diff);\n    }\n}`
        }
    },
    {
        id: 4002,
        title: "Work and Time",
        difficulty: "Easy",
        topics: "Aptitude, Math",
        companies: ["General Aptitude"],
        approach: "If A can do a work in 'a' days and B can do it in 'b' days, their combined work per day is 1/a + 1/b. The total time taken is (a*b)/(a+b).",
        time: "O(1)",
        space: "O(1)",
        description: `<p>Person A can complete a task in <code>a</code> days, and Person B can complete it in <code>b</code> days. Return the number of days it will take for them to complete the task working together.</p><p>Return the exact float/double value.</p>`,
        examples: [
            { input: "a = 10, b = 15", output: "6.0", explanation: "Together they do 1/10 + 1/15 = 1/6 of the work per day." }
        ],
        testcase: "10\n15",
        solution: {
            explanation: "Use the standard formula (a * b) / (a + b) for work and time problems involving two people.",
            python: `class Solution:\n    def solve(self, a, b):\n        return float(a * b) / (a + b)`,
            java: `class Solution {\n    public double solve(int a, int b) {\n        return (double)(a * b) / (a + b);\n    }\n}`,
            cpp: `class Solution {\npublic:\n    double solve(int a, int b) {\n        return (double)(a * b) / (a + b);\n    }\n};`,
            javascript: `class Solution {\n    solve(a, b) {\n        return (a * b) / (a + b);\n    }\n}`
        }
    },
    {
        id: 4003,
        title: "Missing Number in Series",
        difficulty: "Medium",
        topics: "Reasoning, Arrays",
        companies: ["Reasoning Tests"],
        approach: "Given an arithmetic or simple quadratic sequence, identify the difference array to find the next element.",
        time: "O(n)",
        space: "O(n)",
        description: `<p>Given an array of integers representing a series with a constant first or second difference, return the next number in the series.</p><p>The sequence will always have a recognizable polynomial pattern (degree 1 or 2).</p>`,
        examples: [
            { input: "arr = [2, 6, 12, 20, 30]", output: "42", explanation: "Differences are 4, 6, 8, 10. The next difference is 12. So 30 + 12 = 42." }
        ],
        testcase: "[2, 6, 12, 20, 30]",
        solution: {
            explanation: "Calculate the differences between adjacent elements. If constant, add it to the last element. Otherwise, calculate the second differences, find the next first difference, and then the next element.",
            python: `class Solution:\n    def solve(self, arr):\n        diff1 = [arr[i]-arr[i-1] for i in range(1, len(arr))]\n        diff2 = [diff1[i]-diff1[i-1] for i in range(1, len(diff1))]\n        if len(set(diff1)) == 1:\n            return arr[-1] + diff1[-1]\n        return arr[-1] + diff1[-1] + diff2[-1]`,
            java: `class Solution {\n    public int solve(int[] arr) {\n        int n = arr.length;\n        if (n < 2) return 0;\n        int d1 = arr[1] - arr[0];\n        int d2 = arr[2] - arr[1];\n        if (d1 == d2) return arr[n-1] + d1;\n        int diff2 = d2 - d1;\n        int lastD1 = arr[n-1] - arr[n-2];\n        return arr[n-1] + lastD1 + diff2;\n    }\n}`,
            cpp: `class Solution {\npublic:\n    int solve(vector<int>& arr) {\n        int n = arr.size();\n        if (n < 2) return 0;\n        int d1 = arr[1] - arr[0];\n        int d2 = arr[2] - arr[1];\n        if (d1 == d2) return arr[n-1] + d1;\n        int diff2 = d2 - d1;\n        int lastD1 = arr[n-1] - arr[n-2];\n        return arr[n-1] + lastD1 + diff2;\n    }\n};`,
            javascript: `class Solution {\n    solve(arr) {\n        const n = arr.length;\n        if (n < 2) return 0;\n        const d1 = arr[1] - arr[0];\n        const d2 = arr[2] - arr[1];\n        if (d1 === d2) return arr[n-1] + d1;\n        const diff2 = d2 - d1;\n        const lastD1 = arr[n-1] - arr[n-2];\n        return arr[n-1] + lastD1 + diff2;\n    }\n}`
        }
    },
    {
        id: 4004,
        title: "Two Trains Meeting",
        difficulty: "Medium",
        topics: "Aptitude, Math",
        companies: ["General Aptitude"],
        approach: "If two trains start towards each other from distance D at speeds S1 and S2, the time taken to meet is D / (S1 + S2).",
        time: "O(1)",
        space: "O(1)",
        description: `<p>Two trains are <code>distance</code> km apart and start moving towards each other at the exact same time. The first train travels at <code>speed1</code> km/h and the second train travels at <code>speed2</code> km/h. Return the time in hours it will take for them to meet.</p>`,
        examples: [
            { input: "distance = 300, speed1 = 60, speed2 = 40", output: "3.0", explanation: "Relative speed is 60+40 = 100 km/h. Time = 300/100 = 3 hours." }
        ],
        testcase: "300\n60\n40",
        solution: {
            explanation: "Add the two speeds to get the relative speed (since they are moving in opposite directions). Then divide the distance by the relative speed.",
            python: `class Solution:\n    def solve(self, distance, speed1, speed2):\n        return float(distance) / (speed1 + speed2)`,
            java: `class Solution {\n    public double solve(int distance, int speed1, int speed2) {\n        return (double)distance / (speed1 + speed2);\n    }\n}`,
            cpp: `class Solution {\npublic:\n    double solve(int distance, int speed1, int speed2) {\n        return (double)distance / (speed1 + speed2);\n    }\n};`,
            javascript: `class Solution {\n    solve(distance, speed1, speed2) {\n        return distance / (speed1 + speed2);\n    }\n}`
        }
    },
    {
        id: 4005,
        title: "Trailing Zeroes in Factorial",
        difficulty: "Medium",
        topics: "Aptitude, Math",
        companies: ["General Aptitude"],
        approach: "Count the number of factors of 5 in n!. We divide n by 5, 25, 125, etc., and sum the quotients.",
        time: "O(log n)",
        space: "O(1)",
        description: `<p>Given an integer <code>n</code>, return the number of trailing zeroes in <code>n!</code>.</p>`,
        examples: [
            { input: "n = 5", output: "1", explanation: "5! = 120, one trailing zero." },
            { input: "n = 100", output: "24", explanation: "100! has 24 trailing zeroes." }
        ],
        testcase: "100",
        solution: {
            explanation: "A trailing zero is produced by 2 * 5. In a factorial, there are always more 2s than 5s. So we just need to count how many 5s there are in the prime factors of the numbers from 1 to n.",
            python: `class Solution:\n    def solve(self, n):\n        res = 0\n        while n > 0:\n            n //= 5\n            res += n\n        return res`,
            java: `class Solution {\n    public int solve(int n) {\n        int res = 0;\n        while (n > 0) {\n            n /= 5;\n            res += n;\n        }\n        return res;\n    }\n}`,
            cpp: `class Solution {\npublic:\n    int solve(int n) {\n        int res = 0;\n        while (n > 0) {\n            n /= 5;\n            res += n;\n        }\n        return res;\n    }\n};`,
            javascript: `class Solution {\n    solve(n) {\n        let res = 0;\n        while (n > 0) {\n            n = Math.floor(n / 5);\n            res += n;\n        }\n        return res;\n    }\n}`
        }
    }
];

// Add to problems.js
const probPath = path.join(__dirname, 'data', 'problems.js');
let probContent = fs.readFileSync(probPath, 'utf8');
const pblmsArray = problemsToAdd.map(p => ({
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    topics: p.topics,
    companies: p.companies,
    approach: p.approach,
    time: p.time,
    space: p.space
}));
probContent = probContent.replace(/];\s*$/, '');
probContent += ',\n' + pblmsArray.map(p => '  ' + JSON.stringify(p)).join(',\n') + '\n];\n';
fs.writeFileSync(probPath, probContent, 'utf8');

// Add to descriptions.js
const descPath = path.join(__dirname, 'data', 'descriptions.js');
let descContent = fs.readFileSync(descPath, 'utf8');
descContent = descContent.replace(/};\s*$/, '');
problemsToAdd.forEach(p => {
    const descData = {
        content: p.description,
        testcase: p.testcase
    };
    descContent += `,\n  "${p.id}": ${JSON.stringify(descData, null, 4)}`;
});
descContent += '\n};\n';
fs.writeFileSync(descPath, descContent, 'utf8');

// Add to solutions.js
const solPath = path.join(__dirname, 'data', 'solutions.js');
let solContent = fs.readFileSync(solPath, 'utf8');
solContent = solContent.replace(/};\s*$/, '');
problemsToAdd.forEach(p => {
    // Generate JS string
    const solStr = `,\n  "${p.id}": {\n    "explanation": \`${p.solution.explanation.replace(/`/g, '\\`')}\`,\n    "python": \`${p.solution.python.replace(/`/g, '\\`')}\`,\n    "java": \`${p.solution.java.replace(/`/g, '\\`')}\`,\n    "cpp": \`${p.solution.cpp.replace(/`/g, '\\`')}\`,\n    "javascript": \`${p.solution.javascript.replace(/`/g, '\\`')}\`\n  }`;
    solContent += solStr;
});
solContent += '\n};\n';
fs.writeFileSync(solPath, solContent, 'utf8');

console.log('Added 5 aptitude and reasoning problems successfully!');
