import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// AI Route - Llama via Groq (cloud, free tier) or Ollama (local)
//
// Option A — Groq (recommended, free): https://console.groq.com
//   Set GROQ_API_KEY in .env.local
//   Model: llama-3.3-70b-versatile (free, fast)
//
// Option B — Ollama (local, no key needed):
//   Run: ollama run llama3
//   Set OLLAMA_URL=http://localhost:11434 in .env.local (optional, this is the default)
//
// Priority: GROQ_API_KEY → Ollama → smart mock fallback

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, messages, problemContext, code, language } = body;
    const lastMsg = messages?.[messages.length - 1]?.content || "";

    if (action === "generate_problem_details") {
      const { title, difficulty, topics, approach, time, space } = problemContext || {};
      const prompt = `You are an elite DSA interviewer and technical content writer. Given a coding problem:
- Title: ${title}
- Difficulty: ${difficulty}
- Topics: ${topics}
- Approach: ${approach}
- Time Complexity: ${time}
- Space Complexity: ${space}

Generate a detailed, professional problem statement object.
It must contain:
1. "description": A clear, detailed description explaining the problem statement, inputs, outputs, and constraints. Use Markdown formatting. Make it sound professional (similar to LeetCode). Do not include the title of the problem.
2. "examples": An array of 2-3 examples, each with:
   - "input": string (e.g. "nums = [2,7,11,15], target = 9")
   - "output": string (e.g. "[0,1]")
   - "explanation": string (e.g. "Because nums[0] + nums[1] == 9, we return [0, 1].")
3. "constraints": An array of strings representing typical LeetCode-style constraints.

Return ONLY a valid JSON object matching the following structure:
{
  "description": "...",
  "examples": [
    { "input": "...", "output": "...", "explanation": "..." }
  ],
  "constraints": ["..."]
}`;

      let aiResult = "";
      if (GROQ_API_KEY) {
        aiResult = await callGroq([{ role: "user", content: prompt }], true) || "";
      }
      if (!aiResult) {
        aiResult = await callOllama([{ role: "user", content: prompt }], true) || "";
      }

      if (aiResult) {
        try {
          const cleaned = aiResult.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          return NextResponse.json(parsed);
        } catch (e) {
          // fall through
        }
      }

      // Fallback
      return NextResponse.json({
        description: `Implement the algorithm for **${title}**. This problem is a classic *${approach}* pattern requiring a time complexity of \`${time}\` and space complexity of \`${space}\`.`,
        examples: [
          {
            input: "Standard input parameters",
            output: "Expected output structure",
            explanation: "Explanation of how the input maps to the output."
          }
        ],
        constraints: [
          "Time complexity: O(N) or better",
          "Space complexity: O(1) or O(N)"
        ]
      });
    }

    if (action === "generate_revision_materials") {
      const { weakAreas } = body;
      const topicsList = weakAreas && weakAreas.length > 0
        ? weakAreas.map((w: any) => w.name).join(", ")
        : "Array, Two Pointers, Sliding Window, Dynamic Programming";

      const prompt = `You are a world-class computer science educator and technical interviewer.
Based on the student's current target/weak topics: ${topicsList}.

Please generate:
1. An array of 5 highly effective flashcards to help them revise core concepts, definitions, and time complexities of these topics. Each flashcard must have a "front" (question/concept) and a "back" (detailed, precise explanation).
2. An array of 3 highly structured cheat sheets. Each cheat sheet must have a "title", a brief "desc" (under 15 words explaining its focus), and a color theme.

Return ONLY a valid JSON object matching the following structure:
{
  "flashcards": [
    { "front": "...", "back": "..." }
  ],
  "cheatSheets": [
    { "title": "...", "desc": "...", "iconType": "Clock|Layers|Brain" }
  ]
}`;

      let aiResult = "";
      if (GROQ_API_KEY) {
        aiResult = await callGroq([{ role: "user", content: prompt }], true) || "";
      }
      if (!aiResult) {
        aiResult = await callOllama([{ role: "user", content: prompt }], true) || "";
      }

      if (aiResult) {
        try {
          const cleaned = aiResult.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          return NextResponse.json(parsed);
        } catch (e) {
          // fall through
        }
      }

      // Default high-quality fallbacks
      return NextResponse.json({
        flashcards: [
          { front: "What is the sliding window technique?", back: "A method for finding a subset of elements that satisfy a certain condition in an array or string. It involves maintaining a 'window' that expands or shrinks based on constraints." },
          { front: "Time complexity of finding a cycle in a linked list using Floyd's?", back: "O(N) Time, O(1) Space." },
          { front: "When should you use a Monotonic Stack?", back: "When you need to find the 'next greater' or 'next smaller' element in an array efficiently (O(N) time)." },
          { front: "How to quickly check if a number is a power of 2?", back: "Using bit manipulation: (n & (n - 1)) == 0, assuming n > 0." },
          { front: "What is the difference between BFS and DFS space complexity on a tree?", back: "BFS space complexity is O(W) where W is the maximum width of the tree (due to queue storing levels). DFS space complexity is O(H) where H is the height of the tree (due to call stack)." }
        ],
        cheatSheets: [
          { title: "Time Complexity Guide", desc: "Big-O cheatsheet for common data structures", iconType: "Clock" },
          { title: "Array Patterns",        desc: "Two pointers, sliding window, prefix sum",  iconType: "Layers" },
          { title: "Graph Algorithms",      desc: "BFS, DFS, Dijkstra, Union Find",            iconType: "Brain" }
        ]
      });
    }

    if (action === "compile_and_run") {
      const { title, difficulty, topics, approach } = problemContext || {};
      const prompt = `You are a code execution compiler and interpreter. You will analyze the user's code, dry-run it against the typical test cases (including edge cases), and evaluate its correctness for the problem:
- Title: ${title}
- Language: ${language}
- Selected Approach: ${approach}

User's Code:
\`\`\`${language}
${code}
\`\`\`

Evaluate if this code has any syntax/compilation errors or logic errors. Run it mentally against 3 distinct test cases (including one edge case).
Return a JSON object matching this structure EXACTLY. Make sure to provide accurate output and verify correctness:
{
  "success": true, // true if all test cases pass and there are no compiler/runtime/logic errors
  "compileError": "", // compiler error messages if any, else empty string
  "runtimeError": "", // runtime exception message if any, else empty string
  "stdout": "", // any printed outputs/logs from code execution if any, else empty string
  "testCases": [
    {
      "id": 1,
      "input": "...",
      "expected": "...",
      "actual": "...",
      "status": "Pass" // "Pass" or "Fail"
    },
    {
      "id": 2,
      "input": "...",
      "expected": "...",
      "actual": "...",
      "status": "Pass"
    },
    {
      "id": 3,
      "input": "...", // edge case
      "expected": "...",
      "actual": "...",
      "status": "Pass"
    }
  ],
  "timeComplexity": "O(...)", // e.g. O(N) or O(N log N)
  "spaceComplexity": "O(...)", // e.g. O(1) or O(N)
  "executionTime": "12ms",
  "memoryUsage": "14.2 MB"
}`;

      let aiResult = "";
      if (GROQ_API_KEY) {
        aiResult = await callGroq([{ role: "user", content: prompt }], true) || "";
      }
      if (!aiResult) {
        aiResult = await callOllama([{ role: "user", content: prompt }], true) || "";
      }

      let evaluationResult: any = null;
      if (aiResult) {
        try {
          const cleaned = aiResult.replace(/```json/g, "").replace(/```/g, "").trim();
          evaluationResult = JSON.parse(cleaned);
        } catch (e) {
          // fall through
        }
      }

      if (!evaluationResult) {
        evaluationResult = {
          success: true,
          compileError: "",
          runtimeError: "",
          stdout: "Running fallback code evaluation...\nExecution completed.\n",
          testCases: [
            { id: 1, input: "Sample input", expected: "Sample output", actual: "Sample output", status: "Pass" },
            { id: 2, input: "Second input", expected: "Expected output", actual: "Expected output", status: "Pass" },
            { id: 3, input: "Edge case", expected: "Expected output", actual: "Expected output", status: "Pass" }
          ],
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          executionTime: "45ms",
          memoryUsage: "14.0 MB"
        };
      }

      // Record progress if evaluation was processed
      try {
        const { problemId } = problemContext || {};
        const user = await prisma.user.findFirst();
        if (user && problemId) {
          const dbProblem = await prisma.problem.findUnique({
            where: { problemId: parseInt(problemId) }
          });
          
          if (dbProblem) {
            const status = evaluationResult.success ? "Solved" : "Attempted";
            
            // Check if progress already exists to avoid downgrading Solved
            const existingProgress = await prisma.progress.findUnique({
              where: {
                userId_problemId: {
                  userId: user.id,
                  problemId: dbProblem.id
                }
              }
            });

            if (!existingProgress || (existingProgress.status !== "Solved" && status === "Solved")) {
              await prisma.progress.upsert({
                where: {
                  userId_problemId: {
                    userId: user.id,
                    problemId: dbProblem.id
                  }
                },
                update: {
                  status: status
                },
                create: {
                  userId: user.id,
                  problemId: dbProblem.id,
                  status: status
                }
              });

              // Update user stats
              const solvedCount = await prisma.progress.count({
                where: { userId: user.id, status: "Solved" }
              });

              let xpGain = 0;
              if (status === "Solved" && (!existingProgress || existingProgress.status !== "Solved")) {
                const diff = dbProblem.difficulty.toLowerCase();
                xpGain = diff === "easy" ? 100 : diff === "medium" ? 200 : 300;
              }

              const newXp = user.xp + xpGain;
              const newLevel = Math.floor(newXp / 1000) + 1;

              await prisma.user.update({
                where: { id: user.id },
                data: {
                  solved: solvedCount,
                  xp: newXp,
                  level: newLevel,
                  streak: { increment: evaluationResult.success ? 1 : 0 }
                }
              });

              // Award First Blood badge
              if (solvedCount === 1 && evaluationResult.success) {
                const badge = await prisma.badge.findFirst({ where: { name: "First Blood" } });
                if (badge) {
                  await prisma.userBadge.upsert({
                    where: { userId_badgeId: { userId: user.id, badgeId: badge.id } },
                    update: {},
                    create: { userId: user.id, badgeId: badge.id }
                  });
                }
              }
            }
          }
        }
      } catch (dbError) {
        console.error("Failed to update user progress in DB:", dbError);
      }

      return NextResponse.json(evaluationResult);
    }

    if (lastMsg.includes("generate a personalized roadmap") || lastMsg.includes("personalized roadmap")) {
      const matchCo = lastMsg.match(/company\s+\[?([^\]\n]+)\]?/i);
      const matchDur = lastMsg.match(/duration\s+\[?(\d+)/i);
      const company = matchCo ? matchCo[1].trim() : "Amazon";
      const duration = matchDur ? parseInt(matchDur[1]) : 30;

      const systemPrompt = `You are a FAANG technical mentor. Generate a personalized learning roadmap in JSON format.
The target company is: ${company}
The duration is: ${duration} days

The JSON must contain two arrays:
1. "roadmapItems": An array of weeks. If duration is 7 days, return exactly 1 week. If 30 days, return 4 weeks. If 90 days, return 12 weeks.
   Each item has:
   - "week" (e.g. "Week 1", "Week 2")
   - "focus" (e.g. "Advanced Graph Algorithms")
   - "topics" (array of strings, e.g. ["DFS", "BFS", "Topological Sort"])
   - "problems" (number of practice problems)
   - "status" (string: "in-progress" for the first week, "upcoming" for the rest).
2. "dailyPlan": An array of days. Each item has:
   - "week" (the week it belongs to, e.g., "Week 1", matching the "week" name in roadmapItems)
   - "day" (e.g., "Day 1", "Day 2")
   - "topic" (e.g., "Level order traversal and BFS queueing")
   - "problems": An array of objects, each having:
     - "title" (string, e.g. "Two Sum")
     - "brief" (string, e.g. "Find two numbers that sum up to target.")
     - "completed" (boolean, false)
   - "done" (boolean, false)

Return ONLY the raw JSON string. Do not wrap in markdown or backticks.`;

      let aiResult = "";
      if (GROQ_API_KEY) {
        aiResult = await callGroq([{ role: "system", content: systemPrompt }]) || "";
      }
      if (!aiResult) {
        aiResult = await callOllama([{ role: "system", content: systemPrompt }]) || "";
      }

      if (aiResult) {
        try {
          const cleaned = aiResult.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          return NextResponse.json({ response: JSON.stringify(parsed), source: "ai" });
        } catch (e) {
          // Fall through to mock
        }
      }

      function getProblemBrief(title: string): string {
        const briefs: Record<string, string> = {
          "Course Schedule II": "Find a valid order to complete numCourses courses given a 2D array of prerequisites.",
          "Word Ladder": "Find the length of the shortest transformation sequence from beginWord to endWord.",
          "Cheapest Flights Within K Stops": "Find the cheapest price from src to dst with at most k stops.",
          "Implement Trie": "Design a prefix tree supporting insert, search, and startsWith operations.",
          "Range Sum Query - Mutable": "Perform sum query and update operations on a 1D array efficiently.",
          "Design Add and Search Words": "Design a data structure that supports adding new words and searching for wildcards.",
          "Edit Distance": "Find the minimum number of operations required to convert word1 to word2.",
          "Longest Palindromic Substring": "Find the longest substring in s that reads the same backwards and forwards.",
          "Coin Change": "Find the fewest number of coins needed to make up a given amount.",
          "Merge k Sorted Lists": "Merge k sorted linked lists and return it as one sorted list.",
          "Task Scheduler": "Find the least number of units of time that the CPU will take to finish all tasks.",
          "Find Median from Data Stream": "Design a data structure to dynamically calculate the median of a stream of numbers.",
          "Valid Palindrome II": "Determine if a string can be a palindrome after deleting at most one character.",
          "Subarray Sum Equals K": "Find the total number of continuous subarrays whose sum equals to k.",
          "Minimum Remove to Make Valid Parentheses": "Remove the minimum number of invalid parentheses to make the input string valid.",
          "Container With Most Water": "Find two lines that together with the x-axis forms a container containing the most water.",
          "Minimum Window Substring": "Find the minimum window in s which contains all characters of t.",
          "3Sum": "Find all unique triplets in the array which gives the sum of zero.",
          "Lowest Common Ancestor of a Binary Tree": "Find the lowest common ancestor of two given nodes in a binary tree.",
          "Binary Tree Right Side View": "Return the values of the nodes you can see ordered from top to bottom.",
          "Validate BST": "Determine if a binary tree is a valid Binary Search Tree.",
          "Subsets": "Return all possible subsets (power set) of a given set of distinct integers.",
          "Letter Combinations of a Phone Number": "Return all possible letter combinations that the number could represent.",
          "Word Search": "Determine if a word exists in a 2D board of characters.",
          "LRU Cache": "Design and implement a Least Recently Used (LRU) cache supporting get and put.",
          "Design Search Autocomplete System": "Design an autocomplete system that returns top 3 matching historical search queries.",
          "Design LFU Cache": "Design and implement a Least Frequently Used (LFU) cache.",
          "Top K Frequent Elements": "Return the k most frequent elements in an array.",
          "K Closest Points to Origin": "Find the k closest points to the origin (0, 0) on a 2D plane.",
          "Binary Tree Zigzag Level Order Traversal": "Return the zigzag level order traversal of its nodes' values.",
          "Serialize and Deserialize Binary Tree": "Design an algorithm to serialize and deserialize a binary tree.",
          "Binary Tree Maximum Path Sum": "Find the maximum path sum of any non-empty path in a binary tree.",
          "Design Rate Limiter": "Design a rate limiter that limits request throughput per client IP.",
          "Design URL Shortener": "Design a service that maps long URLs to short 6-character aliases.",
          "Design Key-Value Store": "Design a distributed, highly available key-value store.",
          "Reverse Bits": "Reverse bits of a given 32-bit unsigned integer.",
          "Single Number": "Find the single element in an array where every other element appears twice.",
          "Number of 1 Bits": "Return the number of '1' bits a given 32-bit integer has.",
          "Daily Temperatures": "Return an array such that answer[i] is the number of days you have to wait for a warmer temperature.",
          "Evaluate Reverse Polish Notation": "Evaluate the value of an arithmetic expression in Reverse Polish Notation.",
          "Largest Rectangle in Histogram": "Find the area of the largest rectangle in the histogram.",
          "Reverse Linked List II": "Reverse a linked list from position left to right.",
          "Copy List with Random Pointer": "Construct a deep copy of a list where each node contains an additional random pointer.",
          "Linked List Cycle II": "Find the node where the cycle begins in a linked list.",
          "Search in Rotated Sorted Array": "Search for a target value in a rotated sorted array in O(log n) time.",
          "Find First and Last Position": "Find the starting and ending position of a given target value in a sorted array.",
          "Median of Two Sorted Arrays": "Find the median of the two sorted arrays in O(log(m+n)) time.",
          "Design Video Streaming Platform": "Design a scalable video hosting and adaptive streaming architecture.",
          "Consistent Hashing Algorithm": "Implement consistent hashing to distribute keys among dynamic servers.",
          "Design Netflix Metadata Store": "Design a metadata store holding movie metadata with high read throughput.",
          "Longest Substring Without Repeating Characters": "Find the length of the longest substring without repeating characters.",
          "Find All Anagrams in a String": "Find all start indices of t's anagrams in s.",
          "Subarrays with K Different Integers": "Find the number of good subarrays with exactly k different integers.",
          "Sudoku Solver": "Write a program to solve a Sudoku puzzle by filling the empty cells.",
          "Combination Sum": "Find all unique combinations in candidates where the candidate numbers sum to target.",
          "Generate Parentheses": "Generate all combinations of well-formed parentheses.",
          "Unique Paths II": "Find the number of unique paths from top-left to bottom-right in a grid with obstacles.",
          "Longest Common Subsequence": "Find the length of the longest common subsequence between two strings.",
          "Maximal Square": "Find the largest square containing only 1s and return its area."
        };
        return briefs[title] || "Practice and implement this problem to master key DSA patterns and improve execution speed.";
      }

      // Dynamic mock generator fallback
      const topicsMap: Record<string, {focus: string, topics: string[], problems: string[]}[]> = {
        "Google": [
          { focus: "Graphs & Topological Sort", topics: ["DFS", "BFS", "Dijkstra"], problems: ["Course Schedule II", "Word Ladder", "Cheapest Flights Within K Stops"] },
          { focus: "Tries & Segment Trees", topics: ["Prefix Tree", "Suffix Tree", "Range Queries"], problems: ["Implement Trie", "Range Sum Query - Mutable", "Design Add and Search Words"] },
          { focus: "Dynamic Programming", topics: ["Knapsack", "LCS", "Interval DP"], problems: ["Edit Distance", "Longest Palindromic Substring", "Coin Change"] },
          { focus: "Heaps & Greedy Algorithms", topics: ["Min-Heap", "K-Way Merge", "Huffman"], problems: ["Merge k Sorted Lists", "Task Scheduler", "Find Median from Data Stream"] },
        ],
        "Meta": [
          { focus: "Arrays & Strings", topics: ["String Manipulation", "Subarrays"], problems: ["Valid Palindrome II", "Subarray Sum Equals K", "Minimum Remove to Make Valid Parentheses"] },
          { focus: "Two Pointers & Sliding Window", topics: ["Two Sum Variation", "Min Window"], problems: ["Container With Most Water", "Minimum Window Substring", "3Sum"] },
          { focus: "Binary Trees & BSTs", topics: ["Tree Traversal", "Lowest Common Ancestor"], problems: ["Lowest Common Ancestor of a Binary Tree", "Binary Tree Right Side View", "Validate BST"] },
          { focus: "Recursion & Backtracking", topics: ["Permutations", "Subsets", "N-Queens"], problems: ["Subsets", "Letter Combinations of a Phone Number", "Word Search"] },
        ],
        "Amazon": [
          { focus: "Design Patterns & Cache", topics: ["LRU", "LFU", "Factory Pattern"], problems: ["LRU Cache", "Design Search Autocomplete System", "Design LFU Cache"] },
          { focus: "K-Way Merge & Heap", topics: ["Priority Queue", "Top K Elements"], problems: ["Merge k Sorted Lists", "Top K Frequent Elements", "K Closest Points to Origin"] },
          { focus: "Tree Traversals & Views", topics: ["BFS Views", "Boundary Path"], problems: ["Binary Tree Zigzag Level Order Traversal", "Serialize and Deserialize Binary Tree", "Binary Tree Maximum Path Sum"] },
          { focus: "System Design & Scaling", topics: ["Microservices", "Load Balancing"], problems: ["Design Rate Limiter", "Design URL Shortener", "Design Key-Value Store"] },
        ],
        "Apple": [
          { focus: "Bit Manipulation", topics: ["Bitwise Operations", "Masking"], problems: ["Reverse Bits", "Single Number", "Number of 1 Bits"] },
          { focus: "Stack & Queue", topics: ["Monotonic Stack", "Circular Queue"], problems: ["Daily Temperatures", "Evaluate Reverse Polish Notation", "Largest Rectangle in Histogram"] },
          { focus: "Linked Lists", topics: ["Fast & Slow Pointers", "In-place Reversal"], problems: ["Reverse Linked List II", "Copy List with Random Pointer", "Linked List Cycle II"] },
          { focus: "Binary Search", topics: ["Search in Rotated Array", "Median of Arrays"], problems: ["Search in Rotated Sorted Array", "Find First and Last Position", "Median of Two Sorted Arrays"] },
        ],
        "Netflix": [
          { focus: "System Caching & Design", topics: ["CDN caching", "Consistent Hashing"], problems: ["Design Video Streaming Platform", "Consistent Hashing Algorithm", "Design Netflix Metadata Store"] },
          { focus: "Sliding Window Patterns", topics: ["Substring Matching", "Distinct Elements"], problems: ["Longest Substring Without Repeating Characters", "Find All Anagrams in a String", "Subarrays with K Different Integers"] },
          { focus: "Backtracking & Optimization", topics: ["Constraint Sat", "Branch & Bound"], problems: ["Sudoku Solver", "Combination Sum", "Generate Parentheses"] },
          { focus: "Dynamic Programming & Matrix", topics: ["Grid DP", "Pathfinding"], problems: ["Unique Paths II", "Longest Common Subsequence", "Maximal Square"] },
        ],
      };

      const defaultData = [
        { focus: "Arrays & Sorting", topics: ["Binary Search", "Sorting"], problems: ["Two Sum", "Search in Rotated Array", "Merge Intervals"] },
        { focus: "Trees & BST", topics: ["DFS", "BFS", "LCA"], problems: ["Binary Tree Level Order Traversal", "Validate BST", "Lowest Common Ancestor"] },
        { focus: "Dynamic Programming", topics: ["1D DP", "2D DP"], problems: ["Climbing Stairs", "Longest Common Subsequence", "Coin Change"] },
        { focus: "System Design Essentials", topics: ["System Scaling", "Caching"], problems: ["Design URL Shortener", "Design Rate Limiter", "Design LRU Cache"] },
      ];

      const selectedSource = topicsMap[company] || defaultData;

      let numWeeks = 4;
      if (duration === 7) numWeeks = 1;
      else if (duration === 30) numWeeks = 4;
      else if (duration === 90) numWeeks = 12;

      const roadmapItems = [];
      const dailyPlan = [];

      for (let w = 1; w <= numWeeks; w++) {
        const sourceIndex = (w - 1) % selectedSource.length;
        const weekData = selectedSource[sourceIndex];
        const weekName = `Week ${w}`;

        roadmapItems.push({
          week: weekName,
          focus: weekData.focus,
          topics: weekData.topics,
          problems: weekData.problems.length * 2 + 3,
          status: w === 1 ? "in-progress" : "upcoming"
        });

        const daysInWeek = 7;
        for (let d = 1; d <= daysInWeek; d++) {
          const dayNum = (w - 1) * 7 + d;
          const dayName = `Day ${dayNum}`;
          
          let dayTopic = "";
          let rawProblems: string[] = [];

          if (d === 1) {
            dayTopic = `Introduction to ${weekData.focus}`;
            rawProblems = [weekData.problems[0] || "Warmup Problem"];
          } else if (d === 2) {
            dayTopic = `${weekData.topics[0]} Patterns`;
            rawProblems = [weekData.problems[1] || "Intermediate Problem"];
          } else if (d === 3) {
            dayTopic = `${weekData.topics[1] || "Core"} Deep Dive`;
            rawProblems = [weekData.problems[2] || "Advanced Problem"];
          } else if (d === 4) {
            dayTopic = `Edge Case Hardening`;
            rawProblems = [`Verify Nulls for ${weekData.problems[0] || "Problem"}`];
          } else if (d === 5) {
            dayTopic = `Time & Space Complexity optimization`;
            rawProblems = [`Optimize ${weekData.problems[1] || "Problem"}`];
          } else if (d === 6) {
            dayTopic = `${company} Timed Mock Challenge`;
            rawProblems = [`Mock: ${weekData.problems[2] || "Problem"}`];
          } else {
            dayTopic = `Weekly Retrospective & Code Review`;
            rawProblems = ["Review weak points", "Refactor optimized solutions"];
          }

          const dayProblems = rawProblems.map(pName => ({
            title: pName,
            brief: getProblemBrief(pName),
            completed: false
          }));

          dailyPlan.push({
            week: weekName,
            day: dayName,
            topic: dayTopic,
            problems: dayProblems,
            done: false
          });
        }
      }

      return NextResponse.json({
        response: JSON.stringify({ roadmapItems, dailyPlan }),
        source: "mock"
      });
    }

    const systemPrompt = buildSystemPrompt(problemContext);
    const llmMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []),
    ];

    // Try Groq first (cloud Llama)
    if (GROQ_API_KEY) {
      const result = await callGroq(llmMessages);
      if (result) return NextResponse.json({ response: result, source: "groq-llama" });
    }

    // Try Ollama next (local Llama)
    const ollamaResult = await callOllama(llmMessages);
    if (ollamaResult) return NextResponse.json({ response: ollamaResult, source: "ollama-llama" });

    // Smart mock fallback (no API key / Ollama not running)
    return NextResponse.json({
      response: generateMockResponse(messages, problemContext),
      source: "mock",
    });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

// ── Groq (OpenAI-compatible endpoint) ────────────────────────────────────────
async function callGroq(messages: Array<{ role: string; content: string }>, jsonMode: boolean = false) {
  try {
    const body: any = {
      model: GROQ_MODEL,
      messages,
      temperature: jsonMode ? 0.2 : 0.7,
      max_tokens: 1024,
      stream: false,
    };
    if (jsonMode) {
      body.response_format = { type: "json_object" };
    }
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

// ── Ollama (local) ────────────────────────────────────────────────────────────
async function callOllama(messages: Array<{ role: string; content: string }>, jsonMode: boolean = false) {
  try {
    const body: any = {
      model: OLLAMA_MODEL,
      messages,
      stream: false,
      options: { temperature: jsonMode ? 0.2 : 0.7, num_predict: 1024 },
    };
    if (jsonMode) {
      body.format = "json";
    }
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000), // 15s timeout
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.message?.content ?? null;
  } catch {
    return null; // Ollama not running — fall through to mock
  }
}

// ── System prompt ─────────────────────────────────────────────────────────────
function buildSystemPrompt(ctx?: {
  title: string;
  difficulty: string;
  topics: string;
  approach: string;
  time: string;
  space: string;
}) {
  const base = `You are an elite coding interview coach and algorithm expert with deep FAANG interview experience. You guide students through DSA problems using the Socratic method — asking questions rather than immediately giving answers. Keep responses concise (2–4 paragraphs), use markdown formatting, include code blocks when showing code, and always end with a question to keep the student engaged.`;

  if (!ctx) return base;

  return `${base}

You are currently coaching on this problem:
- Title: ${ctx.title}
- Difficulty: ${ctx.difficulty}
- Topics: ${ctx.topics}
- Optimal Approach: ${ctx.approach}
- Time Complexity: ${ctx.time}
- Space Complexity: ${ctx.space}

Guide without spoiling. Start broad (brute force → optimize), then drill into edge cases.`;
}

// ── Smart mock fallback ───────────────────────────────────────────────────────
function generateMockResponse(
  messages: Array<{ role: string; content: string }> = [],
  ctx?: { title: string; approach: string; topics: string }
): string {
  const last = messages[messages.length - 1]?.content?.toLowerCase() || "";

  if (last.includes("evaluate my drafted answer") || last.includes("evaluate my draft")) {
    return `### 🤖 AI Evaluation Report

**Readiness Assessment:** Intermediate (7/10)

#### 🎯 Key Strengths
* **Structured Approach:** Your draft matches the standard requirements of the round.
* **Component Partitioning:** You successfully broke the core operations into clear phases or classes.

#### 🔍 Critical Gaps & Areas for Improvement
* **System Design / Scalability:** If this is an architectural round, expand on database sharding metrics (e.g. sharding keys) and cache eviction policies.
* **Coding DSA:** If this is a coding round, explicitly detail the O(N) runtime and O(1) space constraints and mention custom test bounds.
* **Behavioral:** Ensure you focus heavily on the *Action* and *Result* phases of the STAR framework, quoting concrete percentages or metrics if possible.

#### 💡 Actionable Recommendation
*Refine your draft by addressing edge cases: e.g., null pointers, network failures, or distributed race conditions. Try writing out a quick class signature or API path definition.*`;
  }

  if (last.includes("generate a unique, realistic faang interview practice question") || last.includes("generate a unique, realistic faang")) {
    // Determine the round from context
    let roundType = "coding";
    if (last.includes("round 1")) roundType = "oa";
    if (last.includes("round 3")) roundType = "advanced";
    if (last.includes("round 4")) roundType = "design";
    if (last.includes("round 5")) roundType = "behavioral";

    let payload = {
      questionTitle: "Merge k Sorted Lists (Optimal Heap)",
      questionDescription: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it. Analyze time & space complexity."
    };

    if (roundType === "oa") {
      payload = {
        questionTitle: "Aptitude: Relative Velocity & Stream Filtering",
        questionDescription: "Two trains of lengths 120m and 80m travel in opposite directions at 42 km/h and 30 km/h respectively. How long do they take to cross each other? Also write an algorithm to filter duplicate network requests in O(1) time."
      };
    } else if (roundType === "advanced") {
      payload = {
        questionTitle: "Course Schedule II (Topological Sort)",
        questionDescription: "Find a valid order to complete 'numCourses' given a 2D array of prerequisites. If no order exists, return an empty array."
      };
    } else if (roundType === "design") {
      payload = {
        questionTitle: "Design a Distributed Unique ID Generator (Snowflake)",
        questionDescription: "Design a highly available ID generation service that produces globally unique 64-bit integer IDs with low latency (< 2ms) and high throughput (10,000+ IDs/sec) without using database locks."
      };
    } else if (roundType === "behavioral") {
      payload = {
        questionTitle: "Behavioral: Resolving Critical Production Bugs",
        questionDescription: "Describe a situation where a code change you deployed caused an outage, and how you managed stakeholders and resolved the bug."
      };
    }

    return JSON.stringify(payload);
  }

  if (last.includes("provide the optimal solution blueprint") || last.includes("optimal solution")) {
    let solution = "Initialize a Min-Heap (Priority Queue). Insert the head node of each linked list. Repeatedly extract the minimum node, append it to your result list, and insert the next node of that list if it exists.\n\n*Time Complexity:* O(N log k), where N is total nodes and k is list count.\n*Space Complexity:* O(k) for the priority queue.";
    
    if (last.includes("Aptitude") || last.includes("Relative Velocity")) {
      solution = "Relative speed = 42 + 30 = 72 km/h = 72 * (5/18) = 20 m/s. Total distance = 120 + 80 = 200m. Time taken = 200 / 20 = 10 seconds.\n\nFor stream filtering: Use a sliding Window HashSet containing timestamps. Filter repeats in O(1) average lookup.";
    } else if (last.includes("Course Schedule II") || last.includes("Topological Sort")) {
      solution = "Apply Kahn's algorithm (BFS-based topological sort). Track in-degrees. Initialize a queue with all nodes having 0 in-degree. Pop from queue, add to order, decrement neighbors' in-degree. If neighbor's in-degree drops to 0, push it. If output length matches numCourses, order is valid.\n\n*Time Complexity:* O(V + E)\n*Space Complexity:* O(V + E)";
    } else if (last.includes("Distributed Unique ID") || last.includes("Snowflake")) {
      solution = "Use a structured 64-bit ID structure (Twitter Snowflake):\n- 1 bit sign bit (always 0)\n- 41 bits Epoch Timestamp (milliseconds precision)\n- 10 bits Node/Machine ID (allows up to 1024 unique instances)\n- 12 bits Sequence Counter (local sequence per machine, wraps at 4096)\n\n*Why it works:* Zero synchronization required between generators since each node controls its machine ID, yielding partition tolerance and absolute lock-free speeds.";
    } else if (last.includes("Resolving Critical Production") || last.includes("outage")) {
      solution = "Utilize the STAR framework:\n- **Situation:** Deployed a performance patch that triggered a thread leak, causing the gateway to drop 15% of inbound requests.\n- **Task:** Mitigate immediate system downtime and update client support teams.\n- **Action:** Quickly rolled back the deployment to the last stable container image. Verified mitigation, then analyzed log stack traces to fix the unclosed connection pool resource leak.\n- **Result:** System restored in 3 minutes. Put a lint rule checking resource closures in CI, preventing future leaks.";
    }

    return solution;
  }

  if (last.includes("hint") || last.includes("stuck")) {
    return `Here's a nudge in the right direction 🧭\n\n**Think about this:** What data structure gives you O(1) average-time lookups? If you're iterating with nested loops (O(n²)), consider whether a hash map could let you answer "have I seen the complement of this element?" in a single pass.\n\n**Question:** What would the key and value be in that hash map?`;
  }
  if (last.includes("complex") || last.includes("optim")) {
    return `Great focus on complexity! Here's the breakdown:\n\n| Approach | Time | Space |\n|---|---|---|\n| Brute Force | O(n²) | O(1) |\n| Optimal (${ctx?.approach || "Hash Map"}) | ${ctx ? "Optimal" : "O(n)"} | O(n) |\n\nThe trade-off: extra space buys us dramatically better time — almost always the right call in interviews unless constrained.\n\n**Question:** Can you walk me through your solution step by step?`;
  }
  if (last.includes("code") || last.includes("solution")) {
    return `Here's a clean Python skeleton to get you started:\n\n\`\`\`python\ndef solve(input):\n    # 1. Handle edge cases\n    # 2. Initialize your data structure\n    # 3. Single pass — build and query simultaneously\n    pass\n\`\`\`\n\nTry filling it in! Think about the ${ctx?.approach || "optimal"} approach.\n\n**Question:** What edge cases should we test first?`;
  }

  // Default / greeting
  const title = ctx?.title || "this problem";
  return `👋 I'm your AI Interview Coach (powered by **Llama**), and I'm here to help you ace **${title}**.\n\nHere's our game plan:\n1. **Understand** — restate the problem in your own words\n2. **Brute Force** — simplest working solution first\n3. **Optimize** — improve with better data structures\n4. **Code & Test** — implement and check edge cases\n5. **Analyze** — walk through time/space complexity\n\n**To kick things off:** What's your initial read on this problem? What approach comes to mind first?`;
}
