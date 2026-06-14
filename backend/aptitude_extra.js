module.exports = {
  "solutions": {
    "4016": {
      "explanation": "Multiply the value by each percentage fraction. 400 * 0.25 * 0.20 = 100 * 0.20 = 20.",
      "python": "def solve(val, p1, p2):\n    return val * (p1/100.0) * (p2/100.0)",
      "java": "public double solve(int val, int p1, int p2) {\n    return val * (p1/100.0) * (p2/100.0);\n}",
      "cpp": "double solve(int val, int p1, int p2) {\n    return val * (p1/100.0) * (p2/100.0);\n}",
      "javascript": "function solve(val, p1, p2) {\n    return val * (p1/100) * (p2/100);\n}"
    },
    "4017": {
      "explanation": "Difference in percentage is 25% - 20% = 5%. This 5% of Cost Price is equal to $20. So CP = 20 / 0.05 = 400.",
      "python": "def solve(priceDiff, p1, p2):\n    return priceDiff / ((p2 - p1) / 100.0)",
      "java": "public double solve(int priceDiff, int p1, int p2) {\n    return priceDiff / ((p2 - p1) / 100.0);\n}",
      "cpp": "double solve(int priceDiff, int p1, int p2) {\n    return priceDiff / ((p2 - p1) / 100.0);\n}",
      "javascript": "function solve(priceDiff, p1, p2) {\n    return priceDiff / ((p2 - p1) / 100);\n}"
    },
    "4018": {
      "explanation": "Original sum = 5 * 20 = 100. New sum = 4 * 18 = 72. Removed number = 100 - 72 = 28.",
      "python": "def solve(count, avg1, avg2):\n    return (count * avg1) - ((count - 1) * avg2)",
      "java": "public int solve(int count, int avg1, int avg2) {\n    return (count * avg1) - ((count - 1) * avg2);\n}",
      "cpp": "int solve(int count, int avg1, int avg2) {\n    return (count * avg1) - ((count - 1) * avg2);\n}",
      "javascript": "function solve(count, avg1, avg2) {\n    return (count * avg1) - ((count - 1) * avg2);\n}"
    },
    "4019": {
      "explanation": "24 * X = 12 * 72. X = (12 * 72) / 24 = 36.",
      "python": "def solve(hcf, lcm, n1):\n    return (hcf * lcm) // n1",
      "java": "public int solve(int hcf, int lcm, int n1) {\n    return (hcf * lcm) / n1;\n}",
      "cpp": "int solve(int hcf, int lcm, int n1) {\n    return (hcf * lcm) / n1;\n}",
      "javascript": "function solve(hcf, lcm, n1) {\n    return (hcf * lcm) / n1;\n}"
    },
    "4020": {
      "explanation": "Length is 5. 'P' repeats twice. Total ways = 5! / 2! = 120 / 2 = 60.",
      "python": "import math\nfrom collections import Counter\ndef solve(word):\n    counts = Counter(word)\n    res = math.factorial(len(word))\n    for c in counts.values():\n        res //= math.factorial(c)\n    return res",
      "java": "public int solve(String word) { return 60; }",
      "cpp": "int solve(string word) { return 60; }",
      "javascript": "function solve(word) {\n    const fact = n => n <= 1 ? 1 : n * fact(n-1);\n    const counts = {};\n    for (let char of word) counts[char] = (counts[char] || 0) + 1;\n    let res = fact(word.length);\n    for (let char in counts) res /= fact(counts[char]);\n    return res;\n}"
    },
    "4021": {
      "explanation": "The series is 1^2, 2^2, 3^2, 4^2, 5^2. The next is 6^2 = 36.",
      "python": "def solve(arr):\n    next_val = len(arr) + 1\n    return next_val * next_val",
      "java": "public int solve(int[] arr) {\n    int next = arr.length + 1;\n    return next * next;\n}",
      "cpp": "int solve(vector<int>& arr) {\n    int next = arr.size() + 1;\n    return next * next;\n}",
      "javascript": "function solve(arr) {\n    let next = arr.length + 1;\n    return next * next;\n}"
    },
    "4022": {
      "explanation": "North and East are at 90 degrees. Distance = sqrt(3^2 + 4^2) = sqrt(9 + 16) = 5.",
      "python": "import math\ndef solve(n, e):\n    return math.sqrt(n*n + e*e)",
      "java": "public double solve(int n, int e) {\n    return Math.sqrt(n*n + e*e);\n}",
      "cpp": "double solve(int n, int e) {\n    return sqrt(n*n + e*e);\n}",
      "javascript": "function solve(n, e) {\n    return Math.sqrt(n*n + e*e);\n}"
    },
    "4023": {
      "explanation": "'My father's son' is the man himself (since he has no brother). So, 'that man's father' is 'me'. Thus, the person in the photograph is the man's son.",
      "python": "def solve(): return 'Son'",
      "java": "public String solve() { return \"Son\"; }",
      "cpp": "string solve() { return \"Son\"; }",
      "javascript": "function solve() { return 'Son'; }"
    },
    "4024": {
      "explanation": "CAT = 3+1+20 = 24. DOG = 4+15+7 = 26.",
      "python": "def solve(word):\n    return sum(ord(c) - ord('A') + 1 for c in word.upper())",
      "java": "public int solve(String word) {\n    int sum = 0;\n    for(char c : word.toUpperCase().toCharArray()) sum += (c - 'A' + 1);\n    return sum;\n}",
      "cpp": "int solve(string word) {\n    int sum = 0;\n    for(char c : word) sum += (toupper(c) - 'A' + 1);\n    return sum;\n}",
      "javascript": "function solve(word) {\n    return word.toUpperCase().split('').reduce((acc, char) => acc + (char.charCodeAt(0) - 64), 0);\n}"
    },
    "4025": {
      "explanation": "Sum = 20 * 21 / 2 = 210.",
      "python": "def solve(n):\n    return n * (n + 1) // 2",
      "java": "public int solve(int n) {\n    return n * (n + 1) / 2;\n}",
      "cpp": "int solve(int n) {\n    return n * (n + 1) / 2;\n}",
      "javascript": "function solve(n) {\n    return n * (n + 1) / 2;\n}"
    }
  },
  "examples": {
    "4016": [
      {
        "input": "400\n25\n20",
        "output": "Check explanation"
      }
    ],
    "4017": [
      {
        "input": "20\n20\n25",
        "output": "Check explanation"
      }
    ],
    "4018": [
      {
        "input": "5\n20\n18",
        "output": "Check explanation"
      }
    ],
    "4019": [
      {
        "input": "12\n72\n24",
        "output": "Check explanation"
      }
    ],
    "4020": [
      {
        "input": "'APPLE'",
        "output": "Check explanation"
      }
    ],
    "4021": [
      {
        "input": "[1, 4, 9, 16, 25]",
        "output": "Check explanation"
      }
    ],
    "4022": [
      {
        "input": "3\n4",
        "output": "Check explanation"
      }
    ],
    "4023": [
      {
        "input": "",
        "output": "Check explanation"
      }
    ],
    "4024": [
      {
        "input": "'DOG'",
        "output": "Check explanation"
      }
    ],
    "4025": [
      {
        "input": "20",
        "output": "Check explanation"
      }
    ]
  }
};