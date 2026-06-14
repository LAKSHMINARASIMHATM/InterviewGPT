"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Target, Lightbulb, Code2 } from "lucide-react";
import { topics, getProblemsForTopic } from "@/lib/data";
import { getDifficultyBg, getTopicIcon } from "@/lib/utils";
import "./topic-detail.css";


const patternExplanations: Record<string, string> = {
  "Array": "Arrays are the most fundamental data structure. Master sliding window, two pointers, prefix sums, and kadane's algorithm. Most array problems can be solved in O(n) or O(n log n).",
  "String": "String problems often involve hash maps for character counting, sliding window for substrings, and DP for edit distance/palindromes. Know KMP for pattern matching.",
  "Hash Map": "Hash maps provide O(1) average lookup. Use them for two-sum patterns, frequency counting, grouping, and caching. Critical for reducing time complexity.",
  "Sliding Window": "Use sliding window when dealing with contiguous subarrays/substrings. Fixed window for 'exactly k' problems, variable window for 'at most k' problems.",
  "Two Pointers": "Two pointers work on sorted arrays or when searching for pairs. Common patterns: opposite ends (two sum), same direction (remove duplicates), and fast/slow (cycle detection).",
  "Linked List": "Know reversal, finding middle (slow/fast), cycle detection (Floyd's), and merge. Most linked list problems are about pointer manipulation.",
  "Stack": "Stacks are LIFO. Use monotonic stacks for 'next greater/smaller' problems. Also used for parentheses validation, calculator problems, and DFS.",
  "Binary Search": "Binary search works on sorted data or monotonic functions. Search on answer space (parametric search) is a powerful technique for optimization problems.",
  "Tree": "Master DFS (preorder, inorder, postorder), BFS (level order), and know how to build, serialize, and find LCA. Most tree problems are solved recursively.",
  "Graph": "Graphs require BFS (shortest path), DFS (connectivity), topological sort (DAGs), Dijkstra (weighted), and Union-Find (components). Know adjacency list representation.",
  "DP": "Dynamic Programming optimizes recursive problems with overlapping subproblems. Start with 1D DP (climbing stairs), then 2D (grids), then interval DP and bitmask DP.",
  "Backtracking": "Backtracking explores all possibilities and prunes invalid branches. Used for permutations, combinations, sudoku, and N-queens. Think of it as DFS with pruning.",
  "Heap": "Heaps (priority queues) give O(log n) insert/extract-min. Use for top-K problems, merge K sorted, running median, and scheduling problems.",
  "Greedy": "Greedy makes locally optimal choices. Works when optimal substructure exists. Common in interval scheduling, huffman coding, and activity selection.",
  "Bit Manipulation": "XOR for finding unique elements, AND/OR for masking, and shift operations for power-of-2 checks. Bitmask DP uses integers as sets.",
  "Trie": "Tries (prefix trees) are used for autocomplete, word search, and prefix matching. XOR tries for maximum XOR problems.",
};

export default function TopicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const topic = topics.find(t => t.slug === slug);
  const problems = useMemo(() => {
    if (!topic) return [];
    return getProblemsForTopic(topic.name);
  }, [topic]);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Topic Not Found</h2>
          <Link href="/topics" className="text-blue-400 hover:underline">← Back to topics</Link>
        </div>
      </div>
    );
  }

  const explanation = patternExplanations[topic.name] || `Master ${topic.name} problems by understanding the core patterns and practicing systematically.`;

  return (
    <div className="td-page">
      <div className="td-container">
        <Link href="/topics" className="td-back-link">
          <ArrowLeft className="w-4 h-4" /> Back to Topics
        </Link>

        {/* Header */}
        <div className="td-card">
          <div className="td-header-row">
            <span className="td-topic-icon">{getTopicIcon(topic.name)}</span>
            <div>
              <h1 className="td-topic-title">{topic.name}</h1>
              <p className="td-topic-subtitle">{topic.count} problems across all difficulty levels</p>
            </div>
          </div>

          <div className="td-stats-grid">
            <div className="td-stat-box td-stat-easy">
              <div className="td-stat-num">{topic.easy}</div>
              <div className="td-stat-lbl">Easy</div>
            </div>
            <div className="td-stat-box td-stat-medium">
              <div className="td-stat-num">{topic.medium}</div>
              <div className="td-stat-lbl">Medium</div>
            </div>
            <div className="td-stat-box td-stat-hard">
              <div className="td-stat-num">{topic.hard}</div>
              <div className="td-stat-lbl">Hard</div>
            </div>
          </div>

          {/* Pattern Explanation */}
          <div className="td-pattern-box">
            <div className="td-pattern-header">
              <Lightbulb className="w-5 h-5 text-cyan-400" />
              <h3>Pattern Guide</h3>
            </div>
            <p className="td-pattern-text">{explanation}</p>
          </div>
        </div>

        {/* Learning Roadmap */}
        <div className="td-roadmap-card">
          <div className="td-roadmap-title">
            <Target className="w-5 h-5 text-purple-400" />
            <h2>Learning Roadmap</h2>
          </div>
          <div className="td-roadmap-grid">
            {["Beginner", "Intermediate", "Advanced"].map((level, idx) => {
              const levelProblems = idx === 0 
                ? problems.filter(p => p.difficulty === "Easy").slice(0, 5) 
                : idx === 1 
                  ? problems.filter(p => p.difficulty === "Medium").slice(0, 5) 
                  : problems.filter(p => p.difficulty === "Hard").slice(0, 5);
              const rmClass = idx === 0 ? "td-rm-beginner" : idx === 1 ? "td-rm-intermediate" : "td-rm-advanced";
              return (
                <div key={level} className={`td-rm-level ${rmClass}`}>
                  <h4 className="td-rm-title">{level}</h4>
                  <div className="td-rm-list">
                    {levelProblems.map(p => (
                      <Link key={p.id} href={`/problems/${p.id}`} className="td-rm-link">
                        → {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Problems */}
        <div className="td-prob-wrap">
          <div className="td-prob-head">
            <Code2 className="w-4 h-4 text-blue-400" />
            All Problems ({problems.length})
          </div>
          <div className="td-prob-list">
            {problems.slice(0, 50).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(i * 0.02, 0.4) }}>
                <Link href={`/problems/${p.id}`} className="td-prob-row">
                  <span className="td-prob-id">{p.id}</span>
                  <span className="td-prob-title">{p.title}</span>
                  <span className={`td-prob-diff badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                </Link>
              </motion.div>
            ))}
            {problems.length > 50 && (
              <div className="td-prob-footer">
                Showing first 50 of {problems.length} problems
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
