"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Clock, Shield, Briefcase, Award, CheckCircle2,
  ChevronRight, Terminal, Sparkles, Code2, Cpu, Check,
  HelpCircle, ChevronDown, MessageSquare, ListTodo, Edit3, Send
} from "lucide-react";

interface QuestionItem {
  title: string;
  hint: string;
  blueprint: string[];
}

interface PrepRound {
  name: string;
  type: string;
  duration: string;
  icon: string;
  desc: string;
  topics: string[];
  questions: QuestionItem[];
  expectations: string[];
  guidance: string;
  concepts?: string[];
}

const GENERAL_PREP_ROUNDS: PrepRound[] = [
  {
    name: "Round 1: OA & Aptitude Screen",
    type: "Coding & Aptitude",
    duration: "60-90 mins",
    icon: "💻",
    desc: "The initial gateway screen evaluating quick programming syntax, quantitative aptitude, and core logical puzzles.",
    topics: ["Arrays & Strings", "Math & Probability", "Logical Puzzles", "Complexity Analysis"],
    guidance: "Speed and edge-case correctness are crucial here. Code a simple brute-force approach first, verify basic syntax constraints, and then optimize. Always test boundary inputs (empty arrays, max limits) before clicking submit.",
    expectations: [
      "Code compiles without warnings and passes all performance limits.",
      "Identify speed/work rate patterns in quantitative aptitude queries.",
      "Clear explanation of time complexity tradeoffs (O(N) space vs time).",
      "Correct handling of integer overflows or null checks."
    ],
    questions: [
      {
        title: "Two Sum (O(N) single-pass hash map search)",
        hint: "Store seen numbers in a Hash Map to locate the complement instantly.",
        blueprint: [
          "Initialize an empty map: value -> index.",
          "Iterate over the array, calculate complement = target - nums[i].",
          "If complement exists in map, return [map[complement], i].",
          "Otherwise, store nums[i] in the map."
        ]
      },
      {
        title: "Valid Parentheses (Stack verification)",
        hint: "Use a Stack to verify that closing brackets match the last opened bracket.",
        blueprint: [
          "Iterate through strings of bracket tokens.",
          "Push open characters onto a stack.",
          "For closing characters, pop from the stack and verify matching pairs.",
          "Ensure stack is empty at the end of the iteration."
        ]
      },
      {
        title: "Aptitude: Work-Rate Formula",
        hint: "Use the standard Work = Rate × Time logic.",
        blueprint: [
          "10 men complete the task in 15 days, total work capacity = 150 man-days.",
          "For 15 men: Days = Total Work / Men count.",
          "Days = 150 / 15 = 10 days."
        ]
      },
      {
        title: "Aptitude: Consecutive Probability without Replacement",
        hint: "Multiply individual probabilities of sequential events.",
        blueprint: [
          "Bag has 5 red and 3 blue balls (Total = 8).",
          "Probability of first red ball = 5/8.",
          "After removal, 4 red and 3 blue remain (Total = 7).",
          "Probability of second red ball = 4/7.",
          "Total Probability = (5/8) * (4/7) = 20/56 = 5/14."
        ]
      }
    ]
  },
  {
    name: "Round 2: Core Data Structures & Algorithms",
    type: "Coding & DSA (Level 1)",
    duration: "45-60 mins",
    icon: "🧩",
    desc: "Live programming focusing on translating algorithmic thoughts into clean, modular code using standard structures.",
    topics: ["Linked Lists", "Stacks & Queues", "Sliding Window", "Two Pointers"],
    guidance: "Think out loud. Do not start writing code until your interviewer agrees with your approach. Once approved, write modular classes, name variables clearly, and dry-run with a trace table.",
    expectations: [
      "Modularize code instead of writing a single huge block.",
      "Understand standard index limits and boundaries.",
      "Choose optimal O(N) sliding window algorithms over nested O(N^2) loops."
    ],
    questions: [
      {
        title: "Longest Substring Without Repeating Characters (Sliding Window)",
        hint: "Use a sliding window with left and right pointers, tracking character frequencies.",
        blueprint: [
          "Maintain a map of char -> index to track the last seen location.",
          "Expand window with right pointer. If character repeats, slide left pointer past its last seen position.",
          "Update max length at each step."
        ]
      },
      {
        title: "Group Anagrams (Hash Map hashing)",
        hint: "Group strings using their sorted representation as the Hash Map key.",
        blueprint: [
          "Iterate over string array.",
          "Sort each string alphabetically to form key.",
          "Append original string to map[key].",
          "Return values of map."
        ]
      },
      {
        title: "Container With Most Water (Two Pointers)",
        hint: "Place pointers at extremes and move the pointer with the smaller height inward.",
        blueprint: [
          "Initialize left = 0, right = length - 1.",
          "Calculate current area: min(height[left], height[right]) * (right - left).",
          "Slide pointer pointing to the shorter vertical line.",
          "Update global max area."
        ]
      }
    ]
  },
  {
    name: "Round 3: Advanced DSA & Problem Solving",
    type: "Coding & DSA (Level 2)",
    duration: "45-60 mins",
    icon: "🌲",
    desc: "Assessing complex recursion, trees, graphs, and dynamic programming optimization states.",
    topics: ["Trees & Graphs", "DFS/BFS", "Backtracking", "Dynamic Programming"],
    guidance: "Break the problem down. For recursion, explicitly define your base cases first. For Dynamic Programming, draw the recursion tree, identify overlapping subproblems, and state your state transition equation.",
    expectations: [
      "Formulate backtracking state parameters correctly.",
      "Perform graph searches (DFS/BFS) tracking visited states to prevent cycles.",
      "Optimize recursion depth from exponential to polynomial using memoization or bottom-up tabulation."
    ],
    questions: [
      {
        title: "Lowest Common Ancestor of a Binary Tree (Recursion)",
        hint: "Recurse left and right child nodes. If p or q matches current node, return current.",
        blueprint: [
          "Base Case: If root is null, p, or q, return root.",
          "Recurse left and right subtrees.",
          "If both left and right return non-null, current node is the LCA.",
          "Otherwise, return the non-null value from subtrees."
        ]
      },
      {
        title: "Number of Islands (Graph BFS/DFS grid traversal)",
        hint: "Perform DFS/BFS starting from land ('1') to sink all connected land nodes to water ('0').",
        blueprint: [
          "Iterate through 2D grid.",
          "Upon encountering '1', increment island count and initiate DFS/BFS.",
          "DFS: Visit 4-directional neighbors recursively, changing '1' to '0'.",
          "Ensure grid boundaries are respected."
        ]
      },
      {
        title: "Word Search II (Backtracking + Trie prefix mapping)",
        hint: "Insert all target words into a Trie, then perform DFS backtracking on the 2D grid.",
        blueprint: [
          "Build Trie from dictionary words.",
          "Iterate over grid coordinates. If starting character is in Trie root, trigger DFS.",
          "Backtrack by temporarily marking grid cells as visited (e.g. '#') and cleaning up on backtrack exit."
        ]
      }
    ]
  },
  {
    name: "Round 4: System Design & Architecture",
    type: "High-Level Design",
    duration: "45-60 mins",
    icon: "🏗️",
    desc: "Designing highly scalable, reliable, and decoupled distributed systems for millions of users.",
    topics: ["API Design", "Database Sharding", "Caching & CDN", "Consistent Hashing"],
    guidance: "This is an open-ended architectural discussion. Clarify requirements (functional & non-functional) in the first 5 minutes. Estimate scale (reads/writes, QPS, storage) before designing the high-level system layout.",
    expectations: [
      "Define clean API contracts and database schema schemas.",
      "Explain horizontal database scaling constraints (SQL replication vs NoSQL sharding).",
      "Mitigate bottlenecks like single points of failure (SPOF) using caches, queues, and CDN distribution."
    ],
    concepts: [
      "Consistent Hashing & Data Partitioning",
      "Message Queues (Kafka/SQS) for pub-sub decoupling",
      "Cache eviction policies (LRU, LFU) & write-through strategies",
      "WebSockets vs Long Polling for real-time channels"
    ],
    questions: [
      {
        title: "Design a URL Shortener (TinyURL)",
        hint: "Focus on high redirect throughput and hash generation collision mitigation.",
        blueprint: [
          "API contract: POST /api/v1/shorten (longUrl) -> shortUrl; GET /{shortKey} -> redirects.",
          "Estimate scale: 100M URLs generated/month, ratio 10:1 reads to writes.",
          "Database: NoSQL key-value (e.g. MongoDB/DynamoDB) mapping shortKey -> longUrl.",
          "Hash generator: Base62 encoding of an auto-incrementing counter or unique ID generator (e.g., Snowflake)."
        ]
      },
      {
        title: "Design a Global Rate Limiter",
        hint: "Choose between Token Bucket, Sliding Window, or Leaky Bucket. Design for low-latency cluster checks.",
        blueprint: [
          "Algorithm: Token Bucket is standard. Store token count and last updated timestamp.",
          "Low Latency: Use an in-memory Redis cluster with Lua scripts for atomic decrement operations.",
          "Middleware placement: API Gateway or custom reverse proxy filters requests before service reach."
        ]
      },
      {
        title: "Design a Real-Time Chat System",
        hint: "Manage millions of persistent connections using WebSockets and design message queues.",
        blueprint: [
          "Connection: Gateway layer holding active WebSockets linked to connection managers.",
          "Messaging: Message queue (e.g., Kafka) routes messages to appropriate nodes.",
          "Presence Service: Key-value Redis tracking user ID -> status (online/offline) with a heartbeat mechanism."
        ]
      }
    ]
  },
  {
    name: "Round 5: Behavioral & Cultural Fit",
    type: "Behavioral & Leadership",
    duration: "45 mins",
    icon: "🌟",
    desc: "Evaluating work ethics, responding to ambiguity, collaboration, and alignment with leadership principles.",
    topics: ["Ambiguity", "Conflict Resolution", "Ownership", "Growth Mindset"],
    guidance: "Structure your answers using the STAR method (Situation, Task, Action, Result). Highlight your specific contribution, focus on learning from failures, and show high emotional intelligence (EQ).",
    expectations: [
      "Demonstrate high ownership and initiative to solve ambiguous blocks.",
      "Show collaborative compromise during technical disagreements with managers or peers.",
      "Provide quantitative results showing impact (e.g. reduced load time by 30%)."
    ],
    questions: [
      {
        title: "Dealing with Ambiguity",
        hint: "Highlight your approach to gathering requirements and defining steps when tasks are unclear.",
        blueprint: [
          "Situation: Had to implement a metrics engine without clear data requirements.",
          "Task: Determine the database structure, metrics definition, and access patterns.",
          "Action: Interviewed stakeholders, designed a temporary schema, and gathered feedback early.",
          "Result: Delivered engine on time, reducing query times by 15%."
        ]
      },
      {
        title: "Resolving Team Conflict",
        hint: "Focus on technical consensus, empathy, and data-driven decision making.",
        blueprint: [
          "Situation: Teammate and I disagreed on database choice (SQL vs NoSQL).",
          "Task: Resolve technical direction without delaying project kickoff.",
          "Action: Organized a benchmarking session comparing read/write latency under realistic scale.",
          "Result: Data showed SQL was 30% faster for relational reporting. Teammate agreed, project launched successfully."
        ]
      }
    ]
  }
];

export default function GeneralPrepPage() {
  const [selectedRoundIdx, setSelectedRoundIdx] = useState<number>(0);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ strategy: true });
  const [activeTab, setActiveTab] = useState<string>("strategy");

  // Progress state trackers
  const [completedRounds, setCompletedRounds] = useState<Record<number, boolean>>({});
  const [completedExpectations, setCompletedExpectations] = useState<Record<string, boolean>>({});

  // Interactive Question hints expander
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(null);

  // Sandbox simulated assessment state
  const [sandboxDrafts, setSandboxDrafts] = useState<Record<string, string>>({});
  const [submittingSandbox, setSubmittingSandbox] = useState(false);
  const [sandboxFeedback, setSandboxFeedback] = useState<Record<string, string>>({});

  // AI custom question generation state
  const [generatedQuestions, setGeneratedQuestions] = useState<Record<number, { title: string; desc: string }>>({});
  const [generatingQuestion, setGeneratingQuestion] = useState(false);
  const [revealSolutionIdx, setRevealSolutionIdx] = useState<Record<number, boolean>>({});
  const [aiQuestionDrafts, setAiQuestionDrafts] = useState<Record<number, string>>({});
  const [aiSolutions, setAiSolutions] = useState<Record<number, string>>({});
  const [fetchingSolution, setFetchingSolution] = useState(false);
  const [hoveredRoundIdx, setHoveredRoundIdx] = useState<number | null>(null);

  const currentRound = GENERAL_PREP_ROUNDS[selectedRoundIdx];

  // Calculate overall preparation progress
  const totalRounds = GENERAL_PREP_ROUNDS.length;
  const completedRoundsCount = Object.values(completedRounds).filter(Boolean).length;
  const prepPercentage = Math.round((completedRoundsCount / totalRounds) * 100);

  const toggleRoundCompletion = (idx: number) => {
    setCompletedRounds(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleExpectation = (key: string) => {
    setCompletedExpectations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSandboxSubmit = async (roundIdx: number) => {
    const draftText = sandboxDrafts[roundIdx] || "";
    if (!draftText.trim()) return;

    setSubmittingSandbox(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Please act as a FAANG interviewer. Evaluate my drafted answer for this interview round. Provide constructive feedback, readiness rating, strengths, and areas of improvement.

**Round Name:** ${currentRound.name}
**Round Type:** ${currentRound.type}
**Topics:** ${currentRound.topics.join(", ")}
**My Drafted Answer:**
${draftText}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error("AI evaluation request failed.");
      }

      const data = await response.json();
      setSandboxFeedback(prev => ({ ...prev, [roundIdx]: data.response }));
    } catch (error) {
      console.error("AI sandbox error:", error);
      setSandboxFeedback(prev => ({
        ...prev,
        [roundIdx]: "⚠️ Network error connecting to AI Coach. Please check if the backend is running, or verify your API keys."
      }));
    } finally {
      setSubmittingSandbox(false);
    }
  };

  const handleGenerateAiQuestion = async (roundIdx: number) => {
    setGeneratingQuestion(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Please generate a unique, realistic FAANG interview practice question specifically for this round.
              
**Round Name:** ${currentRound.name}
**Round Type:** ${currentRound.type}
**Topics:** ${currentRound.topics.join(", ")}

Guidelines:
1. For OA & Aptitude: Generate an aptitude challenge (e.g. math/probability/relative velocity) or basic coding exercise.
2. For DSA Level 1: Generate an algorithmic coding question on Stacks, Queues, Linked Lists, sliding windows, or two pointers.
3. For DSA Level 2: Generate an advanced algorithms question on Trees, Graphs, Backtracking, DFS/BFS, or Dynamic Programming.
4. For High-Level Design: Generate a distributed system design scenario.
5. For Behavioral: Generate a soft-skills/leadership behavioral scenario.

Output your response in the following exact JSON format:
{
  "questionTitle": "Brief question title",
  "questionDescription": "Detailed description/context of the question"
}
Make sure it is valid JSON and contains nothing else.`
            }
          ]
        })
      });

      if (!response.ok) throw new Error("Question generation failed.");
      const data = await response.json();

      let parsed;
      try {
        parsed = JSON.parse(data.response);
      } catch {
        parsed = {
          questionTitle: "AI Recommended Scenario",
          questionDescription: data.response
        };
      }

      setGeneratedQuestions(prev => ({
        ...prev,
        [roundIdx]: {
          title: parsed.questionTitle || "AI Scenario",
          desc: parsed.questionDescription || "Custom question details"
        }
      }));
    } catch (error) {
      console.error("AI question generation error:", error);
    } finally {
      setGeneratingQuestion(false);
    }
  };

  const handleFetchSolution = async (roundIdx: number) => {
    const question = generatedQuestions[roundIdx];
    if (!question) return;

    setFetchingSolution(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `For the following FAANG interview practice question, please provide the optimal solution blueprint:

**Round Name:** ${currentRound.name}
**Round Type:** ${currentRound.type}
**Question Title:** ${question.title}
**Question Description:** ${question.desc}

Format requirements:
- If Coding/DSA: Provide an optimal code skeleton/solution, time complexity, space complexity.
- If System Design: Provide API contract, database schema suggestion, scaling blueprint.
- If Behavioral: Provide a response blueprint structured using the STAR method.

Please write the optimal solution in clean, well-formatted markdown.`
            }
          ]
        })
      });

      if (!response.ok) throw new Error("Solution retrieval failed.");
      const data = await response.json();
      setAiSolutions(prev => ({ ...prev, [roundIdx]: data.response }));
      setRevealSolutionIdx(prev => ({ ...prev, [roundIdx]: true }));
    } catch (error) {
      console.error("AI solution retrieval error:", error);
    } finally {
      setFetchingSolution(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040706] pb-32 relative overflow-hidden">
      {/* Premium ambient light glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none bg-emerald-500/20" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-5 pointer-events-none bg-white/10" />

      <div className="w-full px-6 md:px-12 lg:px-16 pt-10 pb-12 relative z-10">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Companies
          </Link>

          <span className="text-xs text-gray-400 bg-white/5 px-4.5 py-2 rounded-2xl border border-white/5 font-semibold flex items-center gap-2 shadow-inner">
            <Award className="w-4 h-4 text-emerald-400" /> Prep Readiness: <strong className="text-emerald-300 font-extrabold ml-1">{prepPercentage}%</strong>
          </span>
        </div>

        {/* Hero Header Card */}
        <div className="glass-card p-10 mb-12 relative overflow-hidden border-emerald-500/10">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-10 pointer-events-none bg-gradient-to-br from-emerald-500 to-teal-500" />

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border border-white/10 bg-gradient-to-br from-emerald-600/20 to-teal-600/5">
                <Award className="w-9 h-9 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                  Ultimate Interview Preparation Guide
                </h1>
                <p className="text-gray-400 text-base mt-2 max-w-2xl leading-relaxed">
                  A standardized 5-round syllabus covering aptitude, core algorithms, system design, and behavioral interviews modeled after FAANG standards.
                </p>
              </div>
            </div>

            {/* Overall Preparation Progress Bar */}
            <div className="w-full xl:w-96 p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-3.5 shadow-inner">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
                <span>Overall Readiness</span>
                <span className="text-emerald-400">{prepPercentage}%</span>
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                <div
                  className="h-full transition-all duration-700 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 shadow-lg"
                  style={{ width: `${prepPercentage}%` }}
                />
              </div>
              <div className="text-[10px] text-gray-500 leading-normal flex justify-between">
                <span>{completedRoundsCount} of {totalRounds} steps completed</span>
                <span className="font-semibold uppercase text-emerald-400/80">FAANG Standard Syllabus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Workspace */}
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Left Column: Syllabus Roadmap Timeline (Avatar Bar) */}
          <div className="flex flex-row md:flex-col gap-3.5 items-center flex-shrink-0 w-full md:w-auto bg-white/[0.01] border border-white/5 p-3.5 rounded-2xl md:py-6 md:px-3 relative z-20">
            {GENERAL_PREP_ROUNDS.map((r, idx) => {
              const isSelected = selectedRoundIdx === idx;
              const isCompleted = !!completedRounds[idx];
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedRoundIdx(idx);
                    setExpandedQuestionIdx(null);
                  }}
                  title={r.name}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl transition-all duration-300 cursor-pointer relative group ${isSelected
                      ? "bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105"
                      : "bg-white/[0.01] border-white/10 hover:bg-white/[0.04] hover:border-white/20 hover:scale-105"
                    }`}
                >
                  {/* Active selection accent line */}
                  {isSelected && (
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-500 rounded-full hidden md:block" />
                  )}

                  <span>{r.icon}</span>

                  {/* Completed overlay status badge */}
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-emerald-500 rounded flex items-center justify-center border-2 border-[#07080c] shadow-md shadow-emerald-500/20">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3.5px]" />
                    </div>
                  )}

                  {/* Premium floating tooltip */}
                  <div className="absolute left-full ml-3 hidden md:block opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 bg-[#07080c] border border-white/10 text-[10px] font-extrabold text-gray-200 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xl z-50">
                    <span className="text-emerald-400 font-mono mr-1">Step {idx + 1}:</span>
                    {r.name.split(": ")[1]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Immersive command center */}
          <div className="flex-1 min-w-0 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoundIdx}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-10 flex flex-col gap-8 shadow-2xl relative border border-white/10 min-h-[650px]"
              >
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                      Step {selectedRoundIdx + 1} workspace
                    </span>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
                      <span>{currentRound.icon}</span> {currentRound.name}
                    </h2>
                  </div>
                  <div className="flex gap-2.5 flex-wrap">
                    <span className="text-xs font-semibold bg-white/5 text-gray-300 px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" /> {currentRound.duration}
                    </span>
                    <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-300 px-3.5 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-emerald-400" /> {currentRound.type}
                    </span>
                  </div>
                </div>

                {/* Overview Description */}
                <div>
                  <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-3">
                    Round Goal
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {currentRound.desc}
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch mt-6 flex-grow">
                  {/* Left Column: Vertical Navigation Tabs (Avatars) */}
                  <div className="flex lg:flex-col justify-start items-center gap-6 lg:border-r lg:border-white/5 lg:pr-8 flex-shrink-0 w-full lg:w-auto">
                    {/* Strategy Avatar */}
                    <button
                      onClick={() => setActiveTab("strategy")}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          activeTab === "strategy" 
                            ? "shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-110" 
                            : "border-white/10 bg-white/5 opacity-50 group-hover:opacity-80 group-hover:scale-105"
                        }`}
                        style={{ 
                          borderColor: activeTab === "strategy" ? "#10b981" : "transparent",
                          backgroundColor: activeTab === "strategy" ? "rgba(16,185,129,0.15)" : "",
                          color: activeTab === "strategy" ? "#10b981" : "#9ca3af"
                        }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span 
                        className={`text-[10px] font-bold tracking-tight text-center max-w-[80px] transition-all duration-300 ${
                          activeTab === "strategy" ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        Strategy &amp; Focus
                      </span>
                    </button>

                    {/* Practice Avatar */}
                    <button
                      onClick={() => setActiveTab("practice")}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          activeTab === "practice" 
                            ? "shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-110" 
                            : "border-white/10 bg-white/5 opacity-50 group-hover:opacity-80 group-hover:scale-105"
                        }`}
                        style={{ 
                          borderColor: activeTab === "practice" ? "#10b981" : "transparent",
                          backgroundColor: activeTab === "practice" ? "rgba(16,185,129,0.15)" : "",
                          color: activeTab === "practice" ? "#10b981" : "#9ca3af"
                        }}
                      >
                        <Code2 className="w-5 h-5" />
                      </div>
                      <span 
                        className={`text-[10px] font-bold tracking-tight text-center max-w-[80px] transition-all duration-300 ${
                          activeTab === "practice" ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        Practice Scenarios
                      </span>
                    </button>

                    {/* Sandbox Avatar */}
                    <button
                      onClick={() => setActiveTab("sandbox")}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          activeTab === "sandbox" 
                            ? "shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-110" 
                            : "border-white/10 bg-white/5 opacity-50 group-hover:opacity-80 group-hover:scale-105"
                        }`}
                        style={{ 
                          borderColor: activeTab === "sandbox" ? "#10b981" : "transparent",
                          backgroundColor: activeTab === "sandbox" ? "rgba(16,185,129,0.15)" : "",
                          color: activeTab === "sandbox" ? "#10b981" : "#9ca3af"
                        }}
                      >
                        <Edit3 className="w-5 h-5" />
                      </div>
                      <span 
                        className={`text-[10px] font-bold tracking-tight text-center max-w-[80px] transition-all duration-300 ${
                          activeTab === "sandbox" ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        Answer Sandbox
                      </span>
                    </button>
                  </div>

                  {/* Right Column: Active Section Content Area */}
                  <div className="flex-1 min-w-0 w-full relative">
                    <AnimatePresence mode="wait">
                      {activeTab === "strategy" && (
                        <motion.div
                          key="strategy-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="space-y-6">
                            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6">
                              <h4 className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                                <Terminal className="w-4 h-4" /> AI Coaching Advice
                              </h4>
                              <p className="text-sm text-gray-300 leading-relaxed">{currentRound.guidance}</p>
                            </div>
                            
                            {currentRound.concepts && currentRound.concepts.length > 0 && (
                              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <Terminal className="w-4 h-4 text-emerald-400" /> Core Concepts
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {currentRound.concepts.map((c, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-amber-500/5 border border-amber-500/10 text-amber-300 rounded-xl text-xs font-bold">{c}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                              <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <ListTodo className="w-4 h-4 text-emerald-400" /> Evaluation Criteria
                              </h4>
                              <div className="space-y-3">
                                {currentRound.expectations.map((exp, idx) => {
                                  const expKey = `general-${selectedRoundIdx}-${idx}`;
                                  const isTicked = !!completedExpectations[expKey];
                                  return (
                                    <button key={idx} onClick={() => toggleExpectation(expKey)} className="w-full flex items-start gap-3 text-left text-xs text-gray-400 hover:text-white transition-colors cursor-pointer group">
                                      <div className="mt-0.5 flex-shrink-0">
                                        {isTicked ? (
                                          <div className="w-4 h-4 bg-emerald-500/10 border border-emerald-500 rounded flex items-center justify-center">
                                            <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3px]" />
                                          </div>
                                        ) : (
                                          <div className="w-4 h-4 rounded border border-white/20 group-hover:border-emerald-500/40 transition-colors" />
                                        )}
                                      </div>
                                      <span className={isTicked ? "line-through text-gray-600" : ""}>{exp}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                              <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-emerald-400" /> Core Topics
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {currentRound.topics.map((t, i) => (
                                  <span key={i} className="px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 text-emerald-300 rounded-xl text-xs font-semibold">{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "practice" && (
                        <motion.div
                          key="practice-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="bg-gradient-to-br from-emerald-950/20 to-teal-950/10 border border-emerald-500/20 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                              <div>
                                <h4 className="text-sm font-extrabold text-emerald-300 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-emerald-400" /> AI Practice Scenario Generator
                                </h4>
                                <p className="text-xs text-gray-400 mt-1">Generate a FAANG-style question, solve it manually, then get the AI reference solution.</p>
                              </div>
                              <button
                                onClick={() => { handleGenerateAiQuestion(selectedRoundIdx); setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); }}
                                disabled={generatingQuestion}
                                className="px-4 py-2.5 bg-emerald-600 border border-emerald-500 rounded-xl text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                              >
                                {generatingQuestion ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Generating...</> : <><Sparkles className="w-3.5 h-3.5" /> Generate Question</>}
                              </button>
                            </div>
                            {generatedQuestions[selectedRoundIdx] && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 pt-4 border-t border-white/5 space-y-4">
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 space-y-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">Live AI Question</span>
                                    <button onClick={() => { setGeneratedQuestions(prev => { const n = { ...prev }; delete n[selectedRoundIdx]; return n; }); setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); setAiQuestionDrafts(prev => ({ ...prev, [selectedRoundIdx]: "" })); }} className="text-[10px] text-gray-500 hover:text-white transition-colors">Reset</button>
                                  </div>
                                  <h5 className="text-base font-extrabold text-white flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-emerald-400 inline" /> {generatedQuestions[selectedRoundIdx].title}
                                  </h5>
                                  <div className="text-sm text-gray-300 leading-relaxed bg-white/[0.01] border border-white/10 p-4 rounded-xl whitespace-pre-wrap">{generatedQuestions[selectedRoundIdx].desc}</div>
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 flex items-center gap-1.5"><Edit3 className="w-3.5 h-3.5 text-emerald-400" /> Your answer:</label>
                                    <textarea value={aiQuestionDrafts[selectedRoundIdx] || ""} onChange={(e) => setAiQuestionDrafts(prev => ({ ...prev, [selectedRoundIdx]: e.target.value }))} placeholder="Type your approach here..." rows={6} className="w-full bg-[#07080c] border border-white/10 rounded-xl p-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-gray-600 resize-none leading-relaxed" />
                                  </div>
                                  <div className="flex justify-between items-center gap-3">
                                    <span className="text-[10px] text-gray-500 font-mono">{(aiQuestionDrafts[selectedRoundIdx] || "").length} chars</span>
                                    <button onClick={() => { if (revealSolutionIdx[selectedRoundIdx]) { setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); } else { aiSolutions[selectedRoundIdx] ? setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: true })) : handleFetchSolution(selectedRoundIdx); } }} disabled={fetchingSolution || !(aiQuestionDrafts[selectedRoundIdx] || "").trim()} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 border border-emerald-500 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer">
                                      {fetchingSolution ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Fetching...</> : <><Sparkles className="w-3.5 h-3.5" /> {revealSolutionIdx[selectedRoundIdx] ? "Hide Solution" : "Get AI Solution"}</>}
                                    </button>
                                  </div>
                                  <AnimatePresence>
                                    {revealSolutionIdx[selectedRoundIdx] && aiSolutions[selectedRoundIdx] && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="bg-[#07080c] rounded-xl p-5 border border-emerald-500/20 space-y-2">
                                          <strong className="text-emerald-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> AI Optimal Solution</strong>
                                          <p className="text-sm font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">{aiSolutions[selectedRoundIdx]}</p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </motion.div>
                            )}
                          </div>
                          <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Common Patterned Questions</h4>
                          <div className="space-y-3">
                            {currentRound.questions.map((q, idx) => {
                              const isExp = expandedQuestionIdx === idx;
                              return (
                                <div key={idx} className={`border rounded-2xl overflow-hidden transition-all ${isExp ? "border-emerald-500/30 bg-white/[0.02]" : "border-white/5 bg-white/[0.01] hover:border-white/10"}`}>
                                  <button onClick={() => setExpandedQuestionIdx(isExp ? null : idx)} className="w-full p-5 flex justify-between items-center text-left cursor-pointer">
                                    <span className="text-sm font-bold text-gray-200">{q.title}</span>
                                    <span className="text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-xl flex items-center gap-1.5 font-semibold">
                                      Hint <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExp ? "rotate-180" : ""}`} />
                                    </span>
                                  </button>
                                  <AnimatePresence>
                                    {isExp && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-white/5 bg-white/[0.01] px-5 pb-5 pt-4 space-y-4 text-xs text-gray-300">
                                        <div>
                                          <strong className="text-emerald-300 uppercase text-[10px] tracking-wider flex items-center gap-1.5 mb-1"><Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Hint</strong>
                                          <p className="leading-relaxed">{q.hint}</p>
                                        </div>
                                        <div className="border-t border-white/5 pt-3">
                                          <strong className="text-emerald-300 uppercase text-[10px] tracking-wider flex items-center gap-1.5 mb-2"><Cpu className="w-3.5 h-3.5 text-emerald-400" /> Blueprint</strong>
                                          <ol className="space-y-2">
                                            {q.blueprint.map((step, sIdx) => (
                                              <li key={sIdx} className="flex gap-2 items-start">
                                                <span className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{sIdx + 1}</span>
                                                <span className="leading-relaxed">{step}</span>
                                              </li>
                                            ))}
                                          </ol>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "sandbox" && (
                        <motion.div
                          key="sandbox-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <p className="text-xs text-gray-500">Draft your response outline, design contracts, or STAR points. Submit to get AI evaluation.</p>
                          <textarea
                            value={sandboxDrafts[selectedRoundIdx] || ""}
                            onChange={(e) => setSandboxDrafts(prev => ({ ...prev, [selectedRoundIdx]: e.target.value }))}
                            placeholder={`Draft your answer for ${currentRound.name}...\nCoding: Algorithmic approach + complexity.\nSystem Design: Schema, scaling, APIs.\nBehavioral: Situation → Task → Action → Result`}
                            rows={8}
                            className="w-full bg-[#07080c] border border-white/10 rounded-xl p-5 text-xs font-mono text-gray-300 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all placeholder:text-gray-600 resize-none leading-relaxed"
                          />
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-[10px] text-gray-500 font-mono">{(sandboxDrafts[selectedRoundIdx] || "").length} characters</span>
                            <button
                              onClick={() => handleSandboxSubmit(selectedRoundIdx)}
                              disabled={submittingSandbox || !(sandboxDrafts[selectedRoundIdx] || "").trim()}
                              className="px-5 py-2.5 bg-emerald-600 border border-emerald-500 rounded-xl text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              {submittingSandbox ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Evaluating...</> : <><Send className="w-3.5 h-3.5" /> Submit for Evaluation</>}
                            </button>
                          </div>
                          <AnimatePresence>
                            {sandboxFeedback[selectedRoundIdx] && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-start gap-4 text-xs text-gray-300">
                                <Cpu className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-emerald-300 uppercase text-[10px] tracking-wider block mb-1">AI Feedback</strong>
                                  <p className="leading-relaxed font-medium">{sandboxFeedback[selectedRoundIdx]}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>


                {/* Dashboard Action Footer */}
                <div className="border-t border-white/5 pt-8 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={() => toggleRoundCompletion(selectedRoundIdx)}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${completedRounds[selectedRoundIdx]
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {completedRounds[selectedRoundIdx] ? "Round Prepared" : "Mark Step as Completed"}
                  </button>

                  <div className="flex w-full sm:w-auto gap-3">
                    <button
                      onClick={() => {
                        setSelectedRoundIdx(prev => Math.max(prev - 1, 0));
                        setExpandedQuestionIdx(null);
                      }}
                      disabled={selectedRoundIdx === 0}
                      className="flex-1 sm:flex-initial px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRoundIdx(prev => Math.min(prev + 1, GENERAL_PREP_ROUNDS.length - 1));
                        setExpandedQuestionIdx(null);
                      }}
                      disabled={selectedRoundIdx === GENERAL_PREP_ROUNDS.length - 1}
                      className="flex-1 sm:flex-initial px-5 py-3 bg-emerald-600 border border-emerald-500 rounded-xl text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      Next Step
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
