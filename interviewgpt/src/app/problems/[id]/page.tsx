"use client";
import "./problem-detail.css";
import "./editor.css";

import { use, useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Lightbulb, Code2, Bot, MessageSquare,
  StickyNote, Clock, Gauge, Building2,
  Tag, Sparkles, Wand2, Copy, Check, Play,
  ChevronDown, Send, Loader2, RotateCcw, Maximize2,
  PanelLeftClose, PanelLeftOpen, Terminal,
} from "lucide-react";
import { getProblemById } from "@/lib/data";
import { getDifficultyBg } from "@/lib/utils";

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

// ─── Types ───────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const TABS = [
  { id: "problem", label: "Problem", icon: Code2 },
  { id: "hints",   label: "Hints",   icon: Lightbulb },
  { id: "discuss", label: "Discuss", icon: MessageSquare },
  { id: "notes",   label: "Notes",   icon: StickyNote },
];

const LANGUAGES = [
  { id: "python",     label: "Python",     monacoLang: "python" },
  { id: "java",       label: "Java",       monacoLang: "java" },
  { id: "cpp",        label: "C++",        monacoLang: "cpp" },
  { id: "javascript", label: "JavaScript", monacoLang: "javascript" },
  { id: "typescript", label: "TypeScript", monacoLang: "typescript" },
  { id: "go",         label: "Go",         monacoLang: "go" },
];

const STARTER_CODE: Record<string, string> = {
  python: `# Write your solution here
class Solution:
    def solve(self, nums: list[int]) -> list[int]:
        # Your code here
        pass

# Test your solution
if __name__ == "__main__":
    sol = Solution()
    print(sol.solve([2, 7, 11, 15]))
`,
  java: `class Solution {
    public int[] solve(int[] nums) {
        // Your code here
        return new int[]{};
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        // Test here
    }
}
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> solve(vector<int>& nums) {
        // Your code here
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {2, 7, 11, 15};
    auto result = sol.solve(nums);
    return 0;
}
`,
  javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
const solve = (nums) => {
    // Your code here
};

// Test
console.log(solve([2, 7, 11, 15]));
`,
  typescript: `function solve(nums: number[]): number[] {
    // Your code here
    return [];
}

// Test
console.log(solve([2, 7, 11, 15]));
`,
  go: `package main

import "fmt"

func solve(nums []int) []int {
    // Your code here
    return []int{}
}

func main() {
    result := solve([]int{2, 7, 11, 15})
    fmt.Println(result)
}
`,
};

function generateHints(problem: { title: string; topics: string; approach: string }) {
  const topics = problem.topics.split(", ");
  return [
    { level: 1, icon: "🔍", text: `Start by understanding what data structure best fits this problem. The topics tag "${topics[0]}" is a big clue.` },
    { level: 2, icon: "💡", text: `The approach "${problem.approach}" is key here. Think about how you can avoid re-scanning elements you've already seen.` },
    { level: 3, icon: "🚀", text: `Use ${topics[0]}${topics.length > 1 ? ` combined with ${topics[1]}` : ""} to reduce time complexity. Can you achieve O(n) in a single pass?` },
  ];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProblemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const problem = getProblemById(parseInt(id));

  // Editor state
  const [selectedLang, setSelectedLang] = useState("python");
  const [code, setCode] = useState(STARTER_CODE["python"]);
  const [activeTab, setActiveTab] = useState("problem");
  const [editorOpen, setEditorOpen] = useState(true);
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState("");
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  // AI-generated problem statement state
  const [problemDetails, setProblemDetails] = useState<{
    description: string;
    examples: Array<{ input: string; output: string; explanation?: string }>;
    constraints: string[];
  } | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  // AI Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch and cache problem details on mount/problem change
  useEffect(() => {
    if (!problem) return;
    const cacheKey = `problem-details-${problem.id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        setProblemDetails(JSON.parse(cached));
        return;
      } catch (e) {
        // ignore and refetch
      }
    }

    const fetchDetails = async () => {
      setIsDetailsLoading(true);
      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "generate_problem_details",
            problemContext: {
              title: problem.title,
              difficulty: problem.difficulty,
              topics: problem.topics,
              approach: problem.approach,
              time: problem.time,
              space: problem.space,
            }
          })
        });
        if (res.ok) {
          const data = await res.json();
          setProblemDetails(data);
          localStorage.setItem(cacheKey, JSON.stringify(data));
        }
      } catch (error) {
        console.error("Failed to fetch problem details", error);
      } finally {
        setIsDetailsLoading(false);
      }
    };

    fetchDetails();
  }, [problem]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleLangChange = (langId: string) => {
    setSelectedLang(langId);
    setCode(STARTER_CODE[langId] || "");
    setRunOutput(null);
  };

  const handleRun = async () => {
    if (!problem) return;
    setIsRunning(true);
    setRunOutput(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "compile_and_run",
          code,
          language: selectedLang,
          problemContext: {
            id: problem.id,
            problemId: problem.id,
            title: problem.title,
            difficulty: problem.difficulty,
            topics: problem.topics,
            approach: problem.approach,
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        const langLabel = LANGUAGES.find((l) => l.id === selectedLang)?.label || "Python";
        
        let outputStr = `[${langLabel} Runner]\n\n> Running your code...\n`;
        if (data.compileError) {
          outputStr += `❌ Compilation Error:\n${data.compileError}`;
        } else if (data.runtimeError) {
          outputStr += `❌ Runtime Error:\n${data.runtimeError}`;
        } else {
          outputStr += `✓ Compiled successfully\n\n`;
          if (data.stdout) {
            outputStr += `# Standard Output:\n${data.stdout}\n`;
          }
          
          outputStr += `# Test Cases:\n`;
          data.testCases.forEach((tc: any) => {
            const statusSymbol = tc.status === "Pass" ? "✓" : "❌";
            outputStr += `  Test ${tc.id}: Input: ${tc.input}\n`;
            outputStr += `          Expected: ${tc.expected}\n`;
            outputStr += `          Actual:   ${tc.actual}   ${statusSymbol} ${tc.status}\n\n`;
          });
          
          if (data.success) {
            outputStr += `🎉 All test cases passed successfully!\n`;
          } else {
            outputStr += `⚠️ Some test cases failed. Review your logic.\n`;
          }
          outputStr += `\nExecution Time: ${data.executionTime}  |  Memory: ${data.memoryUsage}`;
          outputStr += `\nComplexity: Time: ${data.timeComplexity} | Space: ${data.spaceComplexity}`;
        }
        setRunOutput(outputStr);
      } else {
        setRunOutput("Error: Failed to connect to code execution service.");
      }
    } catch (error) {
      setRunOutput("Error: Code execution timed out or failed to parse.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSendAiMessage = useCallback(async () => {
    if (!chatInput.trim() || isAiLoading || !problem) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: chatInput.trim(),
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsAiLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          problemContext: {
            title: problem.title,
            difficulty: problem.difficulty,
            topics: problem.topics,
            approach: problem.approach,
            time: problem.time,
            space: problem.space,
          },
        }),
      });

      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response, timestamp: new Date() },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  }, [chatInput, chatMessages, isAiLoading, problem]);

  // Start AI chat with a greeting
  const handleOpenAiPanel = useCallback(async () => {
    setAiPanelOpen(true);
    if (chatMessages.length === 0 && problem) {
      setIsAiLoading(true);
      try {
        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: `Hello, I'm starting to work on "${problem.title}". Please introduce yourself and guide me.` }],
            problemContext: {
              title: problem.title,
              difficulty: problem.difficulty,
              topics: problem.topics,
              approach: problem.approach,
              time: problem.time,
              space: problem.space,
            },
          }),
        });
        const data = await res.json();
        setChatMessages([
          { role: "assistant", content: data.response, timestamp: new Date() },
        ]);
      } catch {
        setChatMessages([
          {
            role: "assistant",
            content: `👋 I'm your Llama-powered AI coach! Let's tackle **${problem?.title}** together.\n\nWhat's your initial thought on the approach?`,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsAiLoading(false);
      }
    }
  }, [chatMessages.length, problem]);

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Problem Not Found</h2>
          <Link href="/problems" className="text-blue-400 hover:underline">← Back to problems</Link>
        </div>
      </div>
    );
  }

  const hints = generateHints(problem);
  const currentLang = LANGUAGES.find((l) => l.id === selectedLang)!;

  return (
    <div className="problem-detail-layout">
      {/* ── Left Panel: Problem Info ── */}
      <AnimatePresence initial={false}>
        {editorOpen && (
          <motion.aside
            className="left-panel"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "var(--left-panel-w)", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Back + header */}
            <div className="left-panel-header">
              <Link href="/problems" className="back-link">
                <ArrowLeft className="w-4 h-4" /> Problems
              </Link>
              <button
                onClick={() => setEditorOpen(false)}
                className="collapse-btn"
                title="Collapse panel"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* Problem meta */}
            <div className="problem-meta-card">
              <div className="problem-meta-row">
                <span className="problem-id-badge">#{problem.id}</span>
                <span className={`diff-badge ${getDifficultyBg(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
                <div className="complexity-chips">
                  <span className="chip chip-time"><Clock className="w-3 h-3" />{problem.time}</span>
                  <span className="chip chip-space"><Gauge className="w-3 h-3" />{problem.space}</span>
                </div>
              </div>
              <h1 className="problem-title-h1">{problem.title}</h1>

              {/* Topics */}
              <div className="tags-row">
                {problem.topics.split(", ").map((t) => (
                  <Link key={t} href={`/topics/${t.toLowerCase().replace(/ /g, "-")}`} className="tag-chip">
                    <Tag className="w-2.5 h-2.5" /> {t}
                  </Link>
                ))}
              </div>

              {/* Companies */}
              <div className="companies-row">
                <Building2 className="w-3 h-3 text-gray-500 flex-shrink-0" />
                {problem.companies.slice(0, 8).map((c) => (
                  <span key={c} className="company-chip">{c}</span>
                ))}
                {problem.companies.length > 8 && (
                  <span className="company-more">+{problem.companies.length - 8}</span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="left-tab-bar">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`left-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="left-tab-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Problem tab */}
                  {activeTab === "problem" && (
                    <div className="tab-prose">
                      {isDetailsLoading ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                          <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                          <p className="text-xs text-gray-400 animate-pulse">Generating detailed problem statement & constraints with Llama...</p>
                        </div>
                      ) : problemDetails ? (
                        <>
                          <h3 className="tab-prose-heading">Description</h3>
                          <div className="markdown-lite">
                            <ReactMarkdownLite content={problemDetails.description} />
                          </div>

                          {problemDetails.examples && problemDetails.examples.length > 0 && (
                            <div className="mt-6 space-y-4">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Examples</h4>
                              {problemDetails.examples.map((eg, idx) => (
                                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-2 font-mono text-xs">
                                  <div className="text-emerald-400 font-semibold">Example {idx + 1}:</div>
                                  <div><span className="text-gray-400">Input:</span> <span className="text-white">{eg.input}</span></div>
                                  <div><span className="text-gray-400">Output:</span> <span className="text-white">{eg.output}</span></div>
                                  {eg.explanation && (
                                    <div><span className="text-gray-400">Explanation:</span> <span className="text-gray-300">{eg.explanation}</span></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {problemDetails.constraints && problemDetails.constraints.length > 0 && (
                            <div className="mt-6 space-y-2">
                              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Constraints</h4>
                              <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-300">
                                {problemDetails.constraints.map((c, idx) => (
                                  <li key={idx} className="font-mono bg-white/[0.01] px-2.5 py-1 rounded border border-white/[0.02]">{c}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="approach-block mt-8">
                            <div className="approach-label">
                              <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                              Optimal Approach
                            </div>
                            <p className="approach-text">{problem.approach}</p>
                          </div>
                          <div className="complexity-grid">
                            <div className="complexity-box">
                              <span className="complexity-label">⏱ Time</span>
                              <span className="complexity-val time">{problem.time}</span>
                            </div>
                            <div className="complexity-box">
                              <span className="complexity-label">📦 Space</span>
                              <span className="complexity-val space">{problem.space}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="tab-prose-heading">Description</h3>
                          <p className="tab-prose-p">
                            Implement the algorithm for <strong>{problem.title}</strong>.
                            This problem is a classic <em>{problem.approach}</em> pattern.
                          </p>
                          <p className="tab-prose-p muted">
                            Frequently asked at: <strong className="text-white">{problem.companies.slice(0, 5).join(", ")}</strong>
                            {problem.companies.length > 5 && ` and ${problem.companies.length - 5} more`}.
                          </p>
                          <div className="approach-block">
                            <div className="approach-label">
                              <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                              Optimal Approach
                            </div>
                            <p className="approach-text">{problem.approach}</p>
                          </div>
                          <div className="complexity-grid">
                            <div className="complexity-box">
                              <span className="complexity-label">⏱ Time</span>
                              <span className="complexity-val time">{problem.time}</span>
                            </div>
                            <div className="complexity-box">
                              <span className="complexity-label">📦 Space</span>
                              <span className="complexity-val space">{problem.space}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Hints tab */}
                  {activeTab === "hints" && (
                    <div className="hints-list">
                      <p className="hints-intro">Reveal hints one at a time. The fewer you use, the better!</p>
                      {hints.map((hint, i) => (
                        <button
                          key={i}
                          onClick={() => !revealedHints.includes(i) && setRevealedHints([...revealedHints, i])}
                          className={`hint-card ${revealedHints.includes(i) ? "revealed" : ""}`}
                        >
                          <div className="hint-header">
                            <span className="hint-num">{hint.icon} Hint {hint.level}</span>
                            {!revealedHints.includes(i) && <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
                          </div>
                          {revealedHints.includes(i)
                            ? <p className="hint-text">{hint.text}</p>
                            : <p className="hint-locked">Click to reveal</p>
                          }
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Notes tab */}
                  {activeTab === "notes" && (
                    <div className="notes-section">
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write your approach, key insights, or things to remember..."
                        className="notes-editor"
                      />
                      <button className="save-btn">Save Notes</button>
                    </div>
                  )}

                  {/* Discuss tab */}
                  {activeTab === "discuss" && (
                    <div className="discuss-section">
                      <div className="discuss-comment">
                        <div className="comment-avatar">MK</div>
                        <div>
                          <div className="comment-author">Mike K. <span className="comment-date">2 days ago</span></div>
                          <p className="comment-body">Setting up a hash map to store frequencies first makes the second pass O(1) lookup. Trades space for time perfectly!</p>
                        </div>
                      </div>
                      <div className="discuss-comment">
                        <div className="comment-avatar" style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}>SR</div>
                        <div>
                          <div className="comment-author">Sarah R. <span className="comment-date">5 days ago</span></div>
                          <p className="comment-body">Don't forget the edge case where the array has duplicates! Make sure your hash map update happens after the lookup.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Expand button when panel is closed ── */}
      {!editorOpen && (
        <button
          onClick={() => setEditorOpen(true)}
          className="expand-panel-btn"
          title="Show problem"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>
      )}

      {/* ── Right Panel: Code Editor ── */}
      <div className="right-panel">
        {/* Editor toolbar */}
        <div className="editor-toolbar">
          <div className="lang-tabs">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLangChange(lang.id)}
                className={`lang-tab ${selectedLang === lang.id ? "active" : ""}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <div className="editor-actions">
            <button
              onClick={() => setCode(STARTER_CODE[selectedLang] || "")}
              className="editor-action-btn"
              title="Reset code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="editor-action-btn"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleOpenAiPanel}
              className={`ai-btn ${aiPanelOpen ? "active" : ""}`}
            >
              <Bot className="w-3.5 h-3.5" />
              AI Coach
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="run-btn"
            >
              {isRunning
                ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Running…</>
                : <><Play className="w-3.5 h-3.5" /> Run</>
              }
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div className="monaco-wrapper">
          <MonacoEditor
            height="100%"
            language={currentLang.monacoLang}
            value={code}
            onChange={(val) => setCode(val || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              renderLineHighlight: "gutter",
              automaticLayout: true,
              tabSize: 4,
              wordWrap: "on",
              padding: { top: 16, bottom: 16 },
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              bracketPairColorization: { enabled: true },
            }}
          />
        </div>

        {/* Output panel */}
        <AnimatePresence>
          {runOutput !== null && (
            <motion.div
              className="output-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="output-header">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Output</span>
                <button onClick={() => setRunOutput(null)} className="output-close">✕</button>
              </div>
              <pre className="output-content">{runOutput}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Floating AI Button (always visible) ── */}
      {!aiPanelOpen && (
        <motion.button
          onClick={handleOpenAiPanel}
          className="floating-ai-btn"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bot className="w-4 h-4" />
          Ask Llama AI
        </motion.button>
      )}

      {/* ── AI Chat Panel (fixed overlay, doesn't compress editor) ── */}
      <AnimatePresence>
        {aiPanelOpen && (
          <motion.div
            className="ai-panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            {/* AI Panel header */}
            <div className="ai-panel-header">
              <div className="ai-panel-title">
                <div className="ai-avatar">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="ai-name">Llama Coach</div>
                  <div className="ai-status">
                    <span className="ai-status-dot" />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setAiPanelOpen(false)} className="ai-close-btn">✕</button>
            </div>

            {/* Messages */}
            <div className="ai-messages">
              {chatMessages.length === 0 && !isAiLoading && (
                <div className="ai-empty">
                  <Bot className="w-10 h-10 text-emerald-400/40 mx-auto mb-3" />
                  <p>Starting your coaching session…</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chat-msg ${msg.role}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.role === "assistant" && (
                    <div className="chat-msg-avatar">
                      <Bot className="w-3 h-3" />
                    </div>
                  )}
                  <div className="chat-msg-bubble">
                    <ReactMarkdownLite content={msg.content} />
                  </div>
                </motion.div>
              ))}
              {isAiLoading && (
                <div className="chat-msg assistant">
                  <div className="chat-msg-avatar"><Bot className="w-3 h-3" /></div>
                  <div className="chat-msg-bubble typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick prompts */}
            {chatMessages.length <= 1 && !isAiLoading && (
              <div className="quick-prompts">
                {["Give me a hint", "Explain the approach", "Review my code", "What's the optimal solution?"].map((p) => (
                  <button
                    key={p}
                    onClick={async () => {
                      setChatInput("");
                      setIsAiLoading(true);
                      const userMsg = { role: "user" as const, content: p, timestamp: new Date() };
                      setChatMessages((prev) => [...prev, userMsg]);
                      try {
                        const res = await fetch("/api/ai", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            messages: [...chatMessages, userMsg].map((m) => ({ role: m.role, content: m.content })),
                            problemContext: problem ? { title: problem.title, difficulty: problem.difficulty, topics: problem.topics, approach: problem.approach, time: problem.time, space: problem.space } : undefined,
                          }),
                        });
                        const data = await res.json();
                        setChatMessages((prev) => [...prev, { role: "assistant", content: data.response, timestamp: new Date() }]);
                      } catch { /* ignore */ } finally { setIsAiLoading(false); }
                    }}
                    className="quick-prompt-btn"
                    disabled={isAiLoading}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="ai-input-row">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendAiMessage()}
                placeholder="Ask your Llama coach…"
                className="ai-input"
                disabled={isAiLoading}
              />
              <button
                onClick={handleSendAiMessage}
                disabled={!chatInput.trim() || isAiLoading}
                className="ai-send-btn"
              >
                {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Lightweight markdown renderer (bold, code, line breaks)
function ReactMarkdownLite({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="markdown-lite">
      {lines.map((line, i) => {
        if (line.startsWith("```")) return null;
        if (line.startsWith("# ")) return <h3 key={i} className="md-h3">{line.slice(2)}</h3>;
        if (line.startsWith("## ")) return <h4 key={i} className="md-h4">{line.slice(3)}</h4>;
        if (line.startsWith("**") && line.endsWith("**")) return <strong key={i} className="md-bold">{line.slice(2, -2)}</strong>;
        if (line.startsWith("- ")) return <li key={i} className="md-li">{renderInline(line.slice(2))}</li>;
        if (line.startsWith("|")) return <div key={i} className="md-table-row">{line}</div>;
        if (line.trim() === "") return <br key={i} />;
        return <p key={i} className="md-p">{renderInline(line)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={i} className="md-code">{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    return part;
  });
}
