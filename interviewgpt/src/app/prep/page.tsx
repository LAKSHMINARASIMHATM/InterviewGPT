"use client";

import { useState, useMemo } from "react";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Clock, Shield, Briefcase, Award, CheckCircle2,
  ChevronRight, Terminal, Sparkles, Code2, Cpu, Check,
  HelpCircle, ChevronDown, MessageSquare, ListTodo, Edit3, Send
} from "lucide-react";
import "./prep.css";

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
    <div className="prep-page">
      <div className="prep-glow-1" />
      <div className="prep-glow-2" />

      <div className="prep-container">

        {/* Navigation Breadcrumb */}
        <div className="prep-top-bar">
          <Link
            href="/companies"
            className="prep-back-link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Companies
          </Link>

          <span className="prep-readiness-badge">
            <Award className="w-4 h-4 text-emerald-400" /> Prep Readiness: <strong className="prep-readiness-value">{prepPercentage}%</strong>
          </span>
        </div>

        {/* Hero Header Card */}
        <div className="prep-hero">
          <div className="prep-hero-content">
            <div className="prep-hero-info">
              <div className="prep-hero-icon-container">
                <Award className="w-9 h-9" />
              </div>
              <div className="prep-hero-text">
                <h1>Ultimate Interview Preparation Guide</h1>
                <p>
                  A standardized 5-round syllabus covering aptitude, core algorithms, system design, and behavioral interviews modeled after FAANG standards.
                </p>
              </div>
            </div>

            {/* Overall Preparation Progress Bar */}
            <div className="prep-progress-panel">
              <div className="prep-progress-header">
                <span>Overall Readiness</span>
                <span className="prep-progress-label-active">{prepPercentage}%</span>
              </div>
              <div className="prep-progress-bar-container">
                <div
                  className="prep-progress-bar-fill"
                  style={{ width: `${prepPercentage}%` }}
                />
              </div>
              <div className="prep-progress-footer">
                <span>{completedRoundsCount} of {totalRounds} steps completed</span>
                <span className="prep-progress-footer-badge">FAANG Standard Syllabus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Workspace */}
        <div className="prep-workspace">

          {/* Left Column: Syllabus Roadmap Timeline (Avatar Bar) */}
          <div className="prep-sidebar">
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
                  className={`prep-step-btn ${isSelected ? "active" : ""}`}
                >
                  {isSelected && (
                    <div className="prep-step-btn-indicator" />
                  )}

                  <span>{r.icon}</span>

                  {isCompleted && (
                    <div className="prep-step-completed-badge">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3.5px]" />
                    </div>
                  )}

                  <div className="prep-step-tooltip">
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
                className="prep-content-card"
              >
                {/* Header info */}
                <div className="prep-card-header">
                  <div>
                    <span className="prep-step-meta">
                      Step {selectedRoundIdx + 1} workspace
                    </span>
                    <h2 className="prep-step-title">
                      {currentRound.name}
                    </h2>
                  </div>
                  <div className="prep-badges-row">
                    <span className="prep-badge prep-badge-gray">
                      <Clock className="w-4 h-4 text-gray-400" /> {currentRound.duration}
                    </span>
                    <span className="prep-badge prep-badge-emerald">
                      <Shield className="w-4 h-4 text-emerald-400" /> {currentRound.type}
                    </span>
                  </div>
                </div>

                {/* Overview Description */}
                <div>
                  <h3 className="prep-section-title">
                    Round Goal
                  </h3>
                  <p className="prep-section-desc">
                    {currentRound.desc}
                  </p>
                </div>

                <div className="prep-split-layout">
                  {/* Left Column: Vertical Navigation Tabs (Avatars) */}
                  <div className="prep-tabs-nav">
                    {/* Strategy Avatar */}
                    <button
                      onClick={() => setActiveTab("strategy")}
                      className={`prep-tab-btn ${activeTab === "strategy" ? "active" : ""}`}
                    >
                      <div className="prep-tab-avatar">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="prep-tab-label">
                        Strategy &amp; Focus
                      </span>
                    </button>

                    {/* Practice Avatar */}
                    <button
                      onClick={() => setActiveTab("practice")}
                      className={`prep-tab-btn ${activeTab === "practice" ? "active" : ""}`}
                    >
                      <div className="prep-tab-avatar">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <span className="prep-tab-label">
                        Practice Scenarios
                      </span>
                    </button>

                    {/* Sandbox Avatar */}
                    <button
                      onClick={() => setActiveTab("sandbox")}
                      className={`prep-tab-btn ${activeTab === "sandbox" ? "active" : ""}`}
                    >
                      <div className="prep-tab-avatar">
                        <Edit3 className="w-5 h-5" />
                      </div>
                      <span className="prep-tab-label">
                        Answer Sandbox
                      </span>
                    </button>
                  </div>

                  {/* Right Column: Active Section Content Area */}
                  <div className="prep-tab-content">
                    <AnimatePresence mode="wait">
                      {activeTab === "strategy" && (
                        <motion.div
                          key="strategy-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div>
                            <div className="prep-coach-panel">
                              <h4 className="prep-coach-header">
                                <Terminal className="w-4 h-4" /> AI Coaching Advice
                              </h4>
                              <p className="prep-coach-text">{currentRound.guidance}</p>
                            </div>
                            
                            {currentRound.concepts && currentRound.concepts.length > 0 && (
                              <div className="prep-info-block">
                                <h4 className="prep-info-block-header">
                                  <Terminal className="w-4 h-4 text-emerald-400" /> Core Concepts
                                </h4>
                                <div className="prep-concepts-row">
                                  {currentRound.concepts.map((c, i) => (
                                    <span key={i} className="prep-concept-pill">{c}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="prep-info-block">
                              <h4 className="prep-info-block-header">
                                <ListTodo className="w-4 h-4 text-emerald-400" /> Evaluation Criteria
                              </h4>
                              <div className="prep-checklist">
                                {currentRound.expectations.map((exp, idx) => {
                                  const expKey = `general-${selectedRoundIdx}-${idx}`;
                                  const isTicked = !!completedExpectations[expKey];
                                  return (
                                    <button key={idx} onClick={() => toggleExpectation(expKey)} className="prep-checklist-item">
                                      <div className={`prep-checkbox-box ${isTicked ? "checked" : ""}`}>
                                        {isTicked && <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3px]" />}
                                      </div>
                                      <span className={`prep-checklist-label ${isTicked ? "line-through" : ""}`}>{exp}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="prep-info-block">
                              <h4 className="prep-info-block-header">
                                <Sparkles className="w-4 h-4 text-emerald-400" /> Core Topics
                              </h4>
                              <div className="prep-topics-row">
                                {currentRound.topics.map((t, i) => (
                                  <span key={i} className="prep-topic-pill">{t}</span>
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
                          <div className="prep-ai-generator-panel">
                            <div className="prep-ai-generator-header">
                              <div>
                                <h4 className="prep-ai-generator-title">
                                  <Sparkles className="w-4 h-4 text-emerald-400" /> AI Practice Scenario Generator
                                </h4>
                                <p className="prep-ai-generator-desc">Generate a FAANG-style question, solve it manually, then get the AI reference solution.</p>
                              </div>
                              <button
                                onClick={() => { handleGenerateAiQuestion(selectedRoundIdx); setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); }}
                                disabled={generatingQuestion}
                                className="prep-ai-btn"
                              >
                                {generatingQuestion ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Generating...</> : <><Sparkles className="w-3.5 h-3.5" /> Generate Question</>}
                              </button>
                            </div>
                            {generatedQuestions[selectedRoundIdx] && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="prep-live-question-card">
                                <div className="prep-live-question-top">
                                  <span className="prep-live-question-badge">Live AI Question</span>
                                  <button onClick={() => { setGeneratedQuestions(prev => { const n = { ...prev }; delete n[selectedRoundIdx]; return n; }); setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); setAiQuestionDrafts(prev => ({ ...prev, [selectedRoundIdx]: "" })); }} className="prep-live-question-reset">Reset</button>
                                </div>
                                <h5 className="prep-live-question-title">
                                  <HelpCircle className="w-4 h-4 text-emerald-400 inline" /> {generatedQuestions[selectedRoundIdx].title}
                                </h5>
                                <div className="prep-live-question-desc">{generatedQuestions[selectedRoundIdx].desc}</div>
                                <div className="prep-textarea-wrapper">
                                  <label className="prep-textarea-label"><Edit3 className="w-3.5 h-3.5 text-emerald-400" /> Your answer:</label>
                                  <textarea value={aiQuestionDrafts[selectedRoundIdx] || ""} onChange={(e) => setAiQuestionDrafts(prev => ({ ...prev, [selectedRoundIdx]: e.target.value }))} placeholder="Type your approach here..." rows={6} className="prep-textarea" />
                                </div>
                                <div className="prep-textarea-footer">
                                  <span className="prep-char-counter">{(aiQuestionDrafts[selectedRoundIdx] || "").length} chars</span>
                                  <button onClick={() => { if (revealSolutionIdx[selectedRoundIdx]) { setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); } else { aiSolutions[selectedRoundIdx] ? setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: true })) : handleFetchSolution(selectedRoundIdx); } }} disabled={fetchingSolution || !(aiQuestionDrafts[selectedRoundIdx] || "").trim()} className="prep-ai-btn">
                                    {fetchingSolution ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Fetching...</> : <><Sparkles className="w-3.5 h-3.5" /> {revealSolutionIdx[selectedRoundIdx] ? "Hide Solution" : "Get AI Solution"}</>}
                                  </button>
                                </div>
                                <AnimatePresence>
                                  {revealSolutionIdx[selectedRoundIdx] && aiSolutions[selectedRoundIdx] && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                      <div className="prep-solution-card">
                                        <strong className="prep-solution-header"><Sparkles className="w-3 h-3" /> AI Optimal Solution</strong>
                                        <p className="prep-solution-text">{aiSolutions[selectedRoundIdx]}</p>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            )}
                          </div>
                          <h4 className="prep-pattern-questions-header">Common Patterned Questions</h4>
                          <div className="prep-accordion-list">
                            {currentRound.questions.map((q, idx) => {
                              const isExp = expandedQuestionIdx === idx;
                              return (
                                <div key={idx} className={`prep-accordion-item ${isExp ? "expanded" : ""}`}>
                                  <button onClick={() => setExpandedQuestionIdx(isExp ? null : idx)} className="prep-accordion-trigger">
                                    <span className="prep-accordion-title">{q.title}</span>
                                    <span className="prep-accordion-badge">
                                      Hint <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExp ? "rotate-180" : ""}`} />
                                    </span>
                                  </button>
                                  <AnimatePresence>
                                    {isExp && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                        <div className="prep-accordion-body">
                                          <div>
                                            <strong className="prep-hint-title"><Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Hint</strong>
                                            <p className="prep-hint-desc">{q.hint}</p>
                                          </div>
                                          <div>
                                            <strong className="prep-blueprint-title"><Cpu className="w-3.5 h-3.5 text-emerald-400" /> Blueprint</strong>
                                            <div className="prep-blueprint-list">
                                              {q.blueprint.map((step, sIdx) => (
                                                <div key={sIdx} className="prep-blueprint-item">
                                                  <span className="prep-blueprint-step-num">{sIdx + 1}</span>
                                                  <span className="prep-blueprint-text">{step}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
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
                          className="space-y-6"
                        >
                          <p className="text-xs text-gray-500 leading-relaxed">Draft your response outline, design contracts, or STAR points. Submit to get AI evaluation.</p>
                          <textarea
                            value={sandboxDrafts[selectedRoundIdx] || ""}
                            onChange={(e) => setSandboxDrafts(prev => ({ ...prev, [selectedRoundIdx]: e.target.value }))}
                            placeholder={`Draft your answer for ${currentRound.name}...\nCoding: Algorithmic approach + complexity.\nSystem Design: Schema, scaling, APIs.\nBehavioral: Situation → Task → Action → Result`}
                            rows={9}
                            className="prep-textarea"
                          />
                          <div className="prep-textarea-footer">
                            <span className="prep-char-counter">{(sandboxDrafts[selectedRoundIdx] || "").length} characters</span>
                            <button
                              onClick={() => handleSandboxSubmit(selectedRoundIdx)}
                              disabled={submittingSandbox || !(sandboxDrafts[selectedRoundIdx] || "").trim()}
                              className="prep-ai-btn"
                            >
                              {submittingSandbox ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Evaluating...</> : <><Send className="w-3.5 h-3.5" /> Submit for Evaluation</>}
                            </button>
                          </div>
                          <AnimatePresence>
                            {sandboxFeedback[selectedRoundIdx] && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="prep-feedback-card">
                                <Cpu className="prep-feedback-icon" />
                                <div>
                                  <strong className="prep-feedback-title">AI Feedback</strong>
                                  <p className="prep-feedback-desc">{sandboxFeedback[selectedRoundIdx]}</p>
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
                <div className="prep-card-footer">
                  <button
                    onClick={() => toggleRoundCompletion(selectedRoundIdx)}
                    className={`prep-footer-main-btn ${completedRounds[selectedRoundIdx] ? "completed" : "todo"}`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {completedRounds[selectedRoundIdx] ? "Round Prepared" : "Mark Step as Completed"}
                  </button>

                  <div className="prep-footer-nav-group">
                    <button
                      onClick={() => {
                        setSelectedRoundIdx(prev => Math.max(prev - 1, 0));
                        setExpandedQuestionIdx(null);
                      }}
                      disabled={selectedRoundIdx === 0}
                      className="prep-footer-nav-btn"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRoundIdx(prev => Math.min(prev + 1, GENERAL_PREP_ROUNDS.length - 1));
                        setExpandedQuestionIdx(null);
                      }}
                      disabled={selectedRoundIdx === GENERAL_PREP_ROUNDS.length - 1}
                      className="prep-footer-nav-btn prep-footer-nav-btn-primary"
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
