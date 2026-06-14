"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Bot, Send, Loader2, Clock, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, RotateCcw,
  Trophy, Target, Zap, Building2, BookOpen, ArrowLeft,
  User, Sparkles, AlertCircle, Check, Award, ThumbsUp, Star
} from "lucide-react";

// Predefined HR Topics database
const HR_TOPICS = [
  {
    id: "behavioral-star",
    title: "Behavioral & STAR Method",
    desc: "Master situational questions using the Situation, Task, Action, and Result framework.",
    icon: "🌟",
    color: "#10b981", // Emerald
    sampleQuestions: [
      "Tell me about a time you faced a major obstacle at work and how you overcame it.",
      "Describe a situation where you had to work under a tight deadline with incomplete information.",
      "Tell me about a time you failed. What did you learn and how did you apply that knowledge later?"
    ],
    tips: [
      "Outline the Situation (30%): Give context. What was the project and the main blocker?",
      "State the Task (10%): What was your specific responsibility in this situation?",
      "Detail the Action (40%): Explain step-by-step what YOU did. Focus on your actions, not just the team's.",
      "Highlight the Result (20%): Share the quantifiable outcome. Use percentages, time saved, or revenue generated."
    ],
    pitfalls: [
      "Using 'we' instead of 'I' too much (the interviewer wants to know what YOU did).",
      "Omitting the 'Result' phase — an answer without a metric or outcome feels incomplete.",
      "Getting bogged down in unnecessary technical details instead of the core narrative."
    ]
  },
  {
    id: "leadership-conflict",
    title: "Leadership & Conflict Resolution",
    desc: "Demonstrate how you resolve team disagreements, lead initiatives, and build consensus.",
    icon: "🚀",
    color: "#a78bfa", // Purple
    sampleQuestions: [
      "Tell me about a time you disagreed with a manager or coworker. How did you handle it?",
      "Describe a time you took the lead on a project or initiative without being explicitly asked to.",
      "How do you handle a team member who is underperforming or not collaborating effectively?"
    ],
    tips: [
      "Show empathy: Acknowledge the other person's perspective before explaining your actions.",
      "Focus on collaboration: Explain how you worked together to find a mutually beneficial solution.",
      "Remain professional: Avoid blame language. Focus on the business objectives and facts.",
      "Demonstrate ownership: Highlight how you took responsibility for ensuring a positive outcome."
    ],
    pitfalls: [
      "Speaking negatively about former managers, teammates, or companies.",
      "Portraying yourself as someone who always yields or, conversely, someone who is stubborn.",
      "Failing to show the resolution or the improved working relationship afterwards."
    ]
  },
  {
    id: "career-fit",
    title: "Career Goals & Role Alignment",
    desc: "Articulate your professional drive, why you want this position, and how you fit the culture.",
    icon: "🎯",
    color: "#60a5fa", // Blue
    sampleQuestions: [
      "Why do you want to work for our company, and what unique value do you bring to this role?",
      "Where do you see yourself in five years? How does this role align with your long-term career aspirations?",
      "Why are you looking to leave your current role, and what are you seeking in your next challenge?"
    ],
    tips: [
      "Research the company: Connect your personal goals directly to the company's mission and core values.",
      "Provide a value proposition: Focus on what you can do for them, not what they can do for you.",
      "Show a clear trajectory: Explain how this role is a logical next step in your professional growth.",
      "Be constructive: When explaining why you are leaving, focus on seeking new challenges, not complaining about past jobs."
    ],
    pitfalls: [
      "Giving a generic answer like 'I heard it is a great place to work'.",
      "Mentioning money, benefits, or location as the primary motivators.",
      "Saying 'I want your job' or expressing a desire to leave the technical track too quickly."
    ]
  },
  {
    id: "adaptability-problem",
    title: "Problem Solving & Ambiguity",
    desc: "Showcase your ability to navigate changing requirements, prioritize tasks, and think critically.",
    icon: "💡",
    color: "#f59e0b", // Amber
    sampleQuestions: [
      "Tell me about a time when requirements changed mid-way through a project. How did you adapt?",
      "Describe a complex problem you solved recently. Walk me through your diagnostics and decision process.",
      "How do you prioritize your workload when you have multiple competing high-priority tasks?"
    ],
    tips: [
      "Embrace ambiguity: Show that you stay calm and systematic when plans change.",
      "Walk through your logic: Break down how you analyze options, research solutions, and consult stakeholders.",
      "Quantify your results: How did your problem-solving impact the project timeline, quality, or resource usage?",
      "Share your key learnings: What did this experience teach you about risk mitigation or planning?"
    ],
    pitfalls: [
      "Stating that you just worked harder/longer hours instead of working smarter.",
      "Failing to mention how you validated the final solution to ensure it worked.",
      "Blaming product managers or clients for shifting requirements."
    ]
  },
  {
    id: "comprehensive-general",
    title: "FAANG End-to-End Panel",
    desc: "A full interview simulation covering 6 key rounds: self-introduction, career goals, OOP principles, Java/Python internals, DBMS architectures, and Software Engineering design patterns.",
    icon: "🎓",
    color: "#ec4899", // Pink
    sampleQuestions: [
      "Tell me about yourself, your background, and why you are interested in this role.",
      "Where do you see yourself in 5 years? How does this role align with your long-term career aspirations?",
      "What is the difference between Abstract Class and Interface in OOP, and how do Java and Python implement them?",
      "Compare Java and Python in execution compilation, memory management, garbage collection, and dynamic vs static typing.",
      "Explain DBMS ACID properties, database indexes, and when you would select SQL vs NoSQL.",
      "Walk me through how you design code for scalability and modularity. What design patterns or software engineering principles (e.g. SOLID) do you apply?"
    ],
    tips: [
      "Introduction: Outline your background, key strengths, and role alignment in under 90 seconds.",
      "5-Year Vision: Show commitment to growth, technical depth, and potential to take on leadership responsibilities.",
      "OOP: Be clear about inheritance constraints, interface contracts, and abstract state encapsulation.",
      "Java/Python: Explain bytecode/JVM vs PVM, GIL, memory allocation, and reference counting garbage collection.",
      "DBMS: Explain indexing (B-Trees) and ACID transaction guarantees. Highlight SQL vs NoSQL trade-offs.",
      "Software Engineering: Connect SOLID principles to modularity, and explain Factory/Singleton patterns."
    ],
    pitfalls: [
      "Failing to give concrete examples from real-world projects during technical explanations.",
      "Sounding disorganized: use step-by-step or bulleted points to present answers.",
      "Overclaiming expertise in Python or Java if you aren't ready to discuss their internals."
    ]
  }
];

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

// Custom Markdown component
function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const renderedElements: React.ReactNode[] = [];
  let currentTableRows: string[][] = [];
  let inTable = false;

  const flushTable = (key: number) => {
    if (currentTableRows.length === 0) return null;
    const header = currentTableRows[0];
    const rows = currentTableRows.slice(2); // Skip separator row
    
    return (
      <div key={`table-${key}`} className="my-4 overflow-x-auto border border-white/5 rounded-xl bg-white/[0.01]">
        <table className="min-w-full divide-y divide-white/5 text-xs text-gray-300">
          <thead className="bg-white/[0.02] text-white font-bold">
            <tr>
              {header.map((col, idx) => (
                <th key={idx} className="px-4 py-3 text-left font-semibold uppercase tracking-wider">
                  {col.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-white/[0.01] transition-colors">
                {row.map((col, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 whitespace-pre-wrap">
                    {renderInline(col.trim())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim().startsWith("|")) {
      const cells = line.split("|").slice(1, -1);
      currentTableRows.push(cells);
      inTable = true;
      continue;
    } else if (inTable) {
      renderedElements.push(flushTable(i));
      currentTableRows = [];
      inTable = false;
    }

    if (line.startsWith("### ")) {
      renderedElements.push(
        <h4 key={i} className="text-sm font-extrabold text-white mt-5 flex items-center gap-2">
          {renderInline(line.slice(4))}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      renderedElements.push(
        <h3 key={i} className="text-base font-extrabold text-white mt-6 border-b border-white/5 pb-2">
          {renderInline(line.slice(3))}
        </h3>
      );
    } else if (line.startsWith("# ")) {
      renderedElements.push(
        <h2 key={i} className="text-lg font-extrabold text-white mt-8">
          {renderInline(line.slice(2))}
        </h2>
      );
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      renderedElements.push(
        <p key={i} className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-emerald-400 text-xs">
          {renderInline(line.slice(2))}
        </p>
      );
    } else if (line.trim() === "") {
      renderedElements.push(<div key={i} className="h-2" />);
    } else {
      renderedElements.push(
        <p key={i} className="text-xs md:text-sm text-gray-300">
          {renderInline(line)}
        </p>
      );
    }
  }

  if (inTable) {
    renderedElements.push(flushTable(lines.length));
  }

  return <div className="space-y-2.5">{renderedElements}</div>;
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} className="text-white font-bold">{p.slice(2, -2)}</strong>;
    }
    if (p.startsWith("`") && p.endsWith("`")) {
      return <code key={i} className="font-mono text-xs bg-white/10 px-1.5 py-0.5 rounded text-emerald-300">{p.slice(1, -1)}</code>;
    }
    return p;
  });
}

export default function MockInterviewPage() {
  const [activeTopicId, setActiveTopicId] = useState<string>("behavioral-star");
  const [customTopicText, setCustomTopicText] = useState<string>("");
  const [resumeText, setResumeText] = useState<string>("");
  const [interviewStarted, setInterviewStarted] = useState<boolean>(false);

  // Interview States
  const [phase, setPhase] = useState<"intro" | "interviewing" | "feedback">("intro");
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(1200); // 20 mins
  const [companionTab, setCompanionTab] = useState<"tips" | "live" | "model">("tips");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // AI Optimization States
  const [optimizing, setOptimizing] = useState<boolean>(false);
  const [optimizedResult, setOptimizedResult] = useState<{
    evaluation: string;
    optimized: string;
  } | null>(null);

  const optimizeMyDraft = async () => {
    if (!inputVal.trim()) return;
    setOptimizing(true);
    setOptimizedResult(null);

    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...chat,
            { role: "user", content: inputVal }
          ],
          topic: activeTopicId,
          customTopic: customTopicText,
          resumeText: resumeText,
          phase: "optimize_draft"
        })
      });
      const data = await res.json();
      setOptimizedResult({
        evaluation: data.evaluation || "Your answer has a clear Situation, but can emphasize the Action phase more.",
        optimized: data.optimized || `Optimized Pitch:\n"In my previous role..."`
      });
    } catch (err) {
      setOptimizedResult({
        evaluation: "Your draft has good structure, but could emphasize individual actions and outcome metrics more.",
        optimized: `*Polished STAR Pitch:*\n"In my previous project, we faced a tight 3-day deadline due to API latency issues. I took the lead to identify bottlenecks, added indices to optimize queries, and successfully met the release deadline with a 50% performance improvement."`
      });
    } finally {
      setOptimizing(false);
    }
  };

  const activeTopic = HR_TOPICS.find((t) => t.id === activeTopicId) || {
    id: "custom",
    title: customTopicText || "Custom HR Topic",
    desc: "A personalized interview simulation focused on your custom topic.",
    icon: "⚙️",
    color: "#a78bfa",
    tips: [
      "STAR Framework: Lay out the Situation, Task, Action, and Result.",
      "Quantify metrics: Show the business value of your solutions.",
      "Maintain a collaborative tone: Emphasize how you work with cross-functional partners."
    ],
    pitfalls: [
      "Failing to detail your personal contribution.",
      "Not connecting your work directly to business impact."
    ]
  };

  // Timer effect
  useEffect(() => {
    if (!interviewStarted || phase === "feedback") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [interviewStarted, phase]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const startInterview = async () => {
    setInterviewStarted(true);
    setPhase("intro");
    setChat([]);
    setLoading(true);

    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [],
          topic: activeTopicId,
          customTopic: customTopicText,
          resumeText: resumeText,
          phase: "intro"
        })
      });
      const data = await res.json();
      setChat([{ role: "assistant", content: data.response }]);
    } catch (err) {
      setChat([{ role: "assistant", content: "Hello! Welcome to your HR Interview. Let's start with a classic behavioral question: **Could you describe a challenging project or team situation you faced recently, what actions you took, and what the ultimate result was?**" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputVal.trim() || loading) return;
    const userMsg = inputVal.trim();
    setInputVal("");

    const newChat = [...chat, { role: "user" as const, content: userMsg }];
    setChat(newChat);
    setLoading(true);
    setPhase("interviewing");

    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newChat,
          topic: activeTopicId,
          customTopic: customTopicText,
          resumeText: resumeText,
          phase: "interviewing"
        })
      });
      const data = await res.json();
      setChat((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      setChat((prev) => [...prev, { role: "assistant", content: "Thank you for sharing that. Can you tell me more about the measurable results you achieved in that situation? Specifically, did you save time, money, or improve user retention?" }]);
    } finally {
      setLoading(false);
    }
  };

  const finishInterview = async () => {
    setLoading(true);
    setPhase("feedback");

    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chat,
          topic: activeTopicId,
          customTopic: customTopicText,
          resumeText: resumeText,
          phase: "feedback"
        })
      });
      const data = await res.json();
      setChat((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (err) {
      setChat((prev) => [...prev, { role: "assistant", content: "## 📊 HR Interview Scorecard\n\n### Metrics\n| Category | Score |\n|---|---|\n| STAR method | 8/10 |\n| Communication | 9/10 |\n| Leadership potential | 8/10 |\n\n### Recommendations\n- Quantify results with metrics.\n- Highlight personal decisions." }]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainingSecs).padStart(2, "0")}`;
  };

  // Helper values for live tips
  const userWordCount = inputVal.split(/\s+/).filter(Boolean).length;
  const containsI = /\b(I|me|my|myself)\b/i.test(inputVal);
  const containsResult = /\b(percent|%|increased|decreased|saved|metrics|result|outcome|scale)\b/i.test(inputVal);

  return (
    <div className="min-h-screen bg-[#040608] text-gray-200 font-sans pb-16 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 pointer-events-none bg-purple-500/20" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-5 pointer-events-none bg-emerald-500/20" />

      {/* TOP HEADER / LOGO */}
      <div className="border-b border-white/5 bg-white/[0.01] backdrop-blur-md sticky top-0 z-30">
        <div className="w-full px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/10 border border-purple-400/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-white leading-none tracking-tight">AI Interview Coach</h1>
              <span className="text-[10px] text-purple-400 font-semibold tracking-widest uppercase">Behavioral & HR Simulator</span>
            </div>
          </div>
          {interviewStarted && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4.5 py-2 rounded-2xl">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-mono font-bold text-white">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={() => {
                  setInterviewStarted(false);
                  setChat([]);
                }}
                className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer bg-white/5 border border-white/5 hover:border-white/15 px-3 py-2 rounded-xl"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 pt-10 relative z-10">
        <AnimatePresence mode="wait">
          {!interviewStarted ? (
            /* SETUP / TOPICS SELECTION SCREEN */
            <motion.div
              key="setup-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-6xl mx-auto space-y-10"
            >
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" /> Empower Your Interview Performance
                </div>
                <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
                  AI-Powered Behavioral <br />& HR Mock Interview
                </h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  Prepare for real hiring managers and HR rounds. Choose a core category below or define your own custom topic to practice instantly.
                </p>
              </div>

              {/* Predefined Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HR_TOPICS.map((topic) => {
                  const isSelected = activeTopicId === topic.id;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => {
                        setActiveTopicId(topic.id);
                        setCustomTopicText("");
                      }}
                      className={`glass-card p-6 flex flex-col justify-between cursor-pointer border transition-all duration-300 relative overflow-hidden group ${
                        isSelected
                          ? "shadow-lg shadow-purple-500/5 scale-[1.01]"
                          : "hover:border-white/10 hover:scale-[1.005]"
                      }`}
                      style={{
                        borderColor: isSelected ? topic.color : "rgba(255, 255, 255, 0.05)"
                      }}
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1"
                          style={{ backgroundColor: topic.color }}
                        />
                      )}
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{topic.icon}</span>
                          {isSelected && (
                            <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-md bg-white/5 border border-white/10" style={{ color: topic.color }}>
                              Active
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                            {topic.title}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                            {topic.desc}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-4 mt-5 flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        <span>{topic.sampleQuestions.length} Practice Questions</span>
                        <span style={{ color: topic.color }}>Select Topic</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Topic Input */}
              <div
                onClick={() => {
                  setActiveTopicId("custom");
                }}
                className={`glass-card p-6 border transition-all duration-300 cursor-pointer ${
                  activeTopicId === "custom"
                    ? "border-purple-500 shadow-lg shadow-purple-500/5"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-lg">
                    ⚙️
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Custom HR Interview Topic</h3>
                    <p className="text-xs text-gray-400">Practice questions tailored specifically to your custom topic/role.</p>
                  </div>
                </div>
                <input
                  type="text"
                  value={customTopicText}
                  onChange={(e) => {
                    setActiveTopicId("custom");
                    setCustomTopicText(e.target.value);
                  }}
                  placeholder="E.g., Engineering Manager conflict resolution, Customer Success, Startup culture questions..."
                  className="w-full bg-[#080d11] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Resume Highlights Input */}
              <div className="glass-card p-6 border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-lg">
                    📝
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Paste Resume / Project Highlights (Optional)</h3>
                    <p className="text-xs text-gray-400">Provide your experience or tech stack so the AI interviewer can ask questions based on your resume and projects.</p>
                  </div>
                </div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="E.g., Full Stack Engineer. Skills: Java, Python, SQL, React. Led cloud migration of 15 services to AWS, reducing downtime by 30%..."
                  rows={4}
                  className="w-full bg-[#080d11] border border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Start CTA */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={startInterview}
                  disabled={activeTopicId === "custom" && !customTopicText.trim()}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-purple-500/35 border border-purple-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Start Live AI Interview <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* ACTIVE WORKSPACE */
            <motion.div
              key="workspace-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-[1600px] mx-auto"
            >
              {/* LEFT COLUMN: INTERACTIVE CHAT (Col span 7) */}
              <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                <div className="glass-card p-6 flex flex-col justify-between min-h-[600px] relative">
                  
                  {/* Chat top header */}
                  <div className="border-b border-white/5 pb-4 mb-4 flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400">
                        Live Interview Feed
                      </span>
                    </div>
                    <span className="text-xs text-purple-400 font-bold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                      Topic: {activeTopic.title}
                    </span>
                  </div>

                  {/* Chat messages feed */}
                  <div className="flex-1 space-y-6 overflow-y-auto max-h-[400px] pr-2 mb-6">
                    {chat.map((msg, i) => {
                      const isAI = msg.role === "assistant";
                      return (
                        <div key={i} className={`flex gap-4 items-start ${isAI ? "" : "flex-row-reverse"}`}>
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 text-xs ${
                            isAI 
                              ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                              : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          }`}>
                            {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                          </div>
                          <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                            isAI
                              ? "bg-white/[0.02] border border-white/5 text-gray-200"
                              : "bg-emerald-500/[0.03] border border-emerald-500/15 text-gray-200"
                          }`}>
                            <Markdown text={msg.content} />
                          </div>
                        </div>
                      );
                    })}

                    {loading && (
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center flex-shrink-0 text-xs">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex gap-1.5 items-center">
                          <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                          <span className="text-xs text-gray-400">Interviewer is formulating response...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input area (hidden in feedback phase) */}
                  {phase !== "feedback" ? (
                    <div className="space-y-4 border-t border-white/5 pt-4">
                      <div className="relative">
                        <textarea
                          rows={4}
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          placeholder="Type your response using the STAR method..."
                          className="w-full bg-[#080d11] border border-white/10 focus:border-purple-500 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none pr-12"
                          disabled={loading}
                        />
                        <button
                          onClick={handleSend}
                          disabled={!inputVal.trim() || loading}
                          className="absolute right-3 bottom-4 bg-purple-500 hover:bg-purple-600 text-white p-2.5 rounded-xl transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">
                          Word Count: {userWordCount} words
                        </span>
                        <button
                          onClick={finishInterview}
                          disabled={chat.length < 2 || loading}
                          className="text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/30 px-4 py-2.5 rounded-xl font-bold cursor-pointer transition-all duration-200"
                        >
                          Finish & Get Performance Scorecard
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-white/5 pt-4 flex justify-between items-center">
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Assessment Complete
                      </span>
                      <button
                        onClick={() => {
                          setInterviewStarted(false);
                          setChat([]);
                          setPhase("intro");
                        }}
                        className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
                      >
                        Try Another Topic
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: AI COACHING COMPANION (Col span 5) */}
              <div className="lg:col-span-5 w-full space-y-6">
                <div className="glass-card p-6 flex flex-col min-h-[600px]">
                  
                  {/* Tabs top bar */}
                  <div className="flex border-b border-white/5 mb-6">
                    <button
                      onClick={() => setCompanionTab("tips")}
                      className={`flex-1 pb-3 text-xs font-extrabold uppercase tracking-widest text-center cursor-pointer border-b-2 transition-colors duration-200 ${
                        companionTab === "tips"
                          ? "border-purple-500 text-purple-300"
                          : "border-transparent text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      📋 Tips
                    </button>
                    <button
                      onClick={() => setCompanionTab("live")}
                      className={`flex-1 pb-3 text-xs font-extrabold uppercase tracking-widest text-center cursor-pointer border-b-2 transition-colors duration-200 ${
                        companionTab === "live"
                          ? "border-purple-500 text-purple-300"
                          : "border-transparent text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      💡 Live Help
                    </button>
                    <button
                      onClick={() => setCompanionTab("model")}
                      className={`flex-1 pb-3 text-xs font-extrabold uppercase tracking-widest text-center cursor-pointer border-b-2 transition-colors duration-200 ${
                        companionTab === "model"
                          ? "border-purple-500 text-purple-300"
                          : "border-transparent text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      🚀 Model Pitch
                    </button>
                  </div>

                  {/* Tab Content Panels */}
                  <div className="flex-1 space-y-6 overflow-y-auto max-h-[480px]">
                    <AnimatePresence mode="wait">
                      {companionTab === "tips" && (
                        <motion.div
                          key="tips-tab"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                              <Star className="w-4 h-4 text-purple-400" /> Structure Framework
                            </h4>
                            <div className="space-y-3">
                              {activeTopic.tips.map((tip, idx) => (
                                <div key={idx} className="flex gap-3 items-start bg-white/[0.01] border border-white/5 p-3.5 rounded-xl">
                                  <div className="w-5 h-5 rounded-md bg-purple-500/10 flex items-center justify-center text-xs font-bold text-purple-300 flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <p className="text-xs text-gray-300 leading-relaxed">{tip}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {activeTopic.pitfalls && (
                            <div className="space-y-4">
                              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                                <AlertCircle className="w-4 h-4 text-rose-400" /> Pitfalls to Avoid
                              </h4>
                              <div className="space-y-3">
                                {activeTopic.pitfalls.map((pitfall, idx) => (
                                  <div key={idx} className="flex gap-3 items-start bg-rose-500/[0.01] border border-rose-500/10 p-3.5 rounded-xl">
                                    <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-gray-300 leading-relaxed">{pitfall}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {companionTab === "live" && (
                        <motion.div
                          key="live-tab"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-6"
                        >
                          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 space-y-4">
                            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-emerald-400" /> Real-time Answer Guide
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              Start typing in the text box. The companion will analyze your response live and guide you.
                            </p>

                            <div className="space-y-4.5 pt-2">
                              {/* Length indicator */}
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">Response Length:</span>
                                <span className={userWordCount > 100 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                                  {userWordCount} words {userWordCount > 100 ? "(Perfect)" : "(Try for 100+ words)"}
                                </span>
                              </div>

                              {/* Ownership indicator */}
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">Ownership ('I' vs 'We'):</span>
                                <span className={containsI ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                                  {containsI ? "Good ('I' detected)" : "Add details on what YOU did"}
                                </span>
                              </div>

                              {/* Results indicator */}
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-400">Results & Metrics:</span>
                                <span className={containsResult ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                                  {containsResult ? "Impact terms detected" : "Add percentages or outcomes"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-purple-500/5 border border-purple-500/10 p-5 rounded-2xl space-y-3">
                            <h4 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                              <ThumbsUp className="w-4 h-4" /> Strong Impact Verbs
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              Use these action verbs instead of 'made', 'worked', or 'had':
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {["Orchestrated", "Spearheaded", "Streamlined", "Resolved", "Mitigated", "Formulated", "Pioneered"].map((verb) => (
                                <span key={verb} className="text-[10px] font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-gray-300">
                                  {verb}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* AI Draft Optimizer Section */}
                          <div className="bg-gradient-to-br from-purple-900/10 to-indigo-900/10 border border-purple-500/20 p-5 rounded-2xl space-y-4">
                            <h4 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-4.5 h-4.5 text-purple-400 animate-pulse" /> AI Draft Optimizer
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              Have you drafted an answer in the text box? Click below to have the AI evaluate your exact answer and suggest a 10/10 optimized pitch.
                            </p>

                            <button
                              onClick={optimizeMyDraft}
                              disabled={!inputVal.trim() || optimizing}
                              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-600/15"
                            >
                              {optimizing ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Optimizing Draft...
                                </>
                              ) : (
                                <>
                                  <Zap className="w-3.5 h-3.5 text-yellow-300" /> Optimize My Answer
                                </>
                              )}
                            </button>

                            {optimizedResult && (
                              <div className="space-y-4 pt-3 border-t border-white/5">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-extrabold uppercase text-gray-400 block">
                                    AI Feedback / Critique:
                                  </span>
                                  <p className="text-xs text-gray-300 leading-relaxed bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                                    {optimizedResult.evaluation}
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[10px] font-extrabold uppercase text-emerald-400 block">
                                    Optimized Answer (STAR format):
                                  </span>
                                  <div className="text-xs text-emerald-300 font-serif italic leading-relaxed bg-emerald-500/[0.03] border border-emerald-500/15 p-3.5 rounded-lg whitespace-pre-wrap">
                                    {optimizedResult.optimized}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {companionTab === "model" && (
                        <motion.div
                          key="model-tab"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-6"
                        >
                          <div className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl space-y-4">
                            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                              <Star className="w-4 h-4 text-emerald-400" /> Ideal Pitch Template
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                              Here is what a structured response for this topic looks like.
                            </p>

                            <div className="space-y-4 pt-2 font-serif text-sm italic text-gray-300 leading-relaxed">
                              <div>
                                <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-purple-400 block mb-1">
                                  Situation (S)
                                </span>
                                "At my previous company, our payment processing gateway began dropping transactions during our biggest seasonal sale, leading to a backlog of support tickets."
                              </div>
                              <div>
                                <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-purple-400 block mb-1">
                                  Task (T)
                                </span>
                                "My task was to diagnose the root cause, restore service immediately, and formulate a long-term plan to ensure it wouldn't happen during subsequent sales."
                              </div>
                              <div>
                                <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-purple-400 block mb-1">
                                  Action (A)
                                </span>
                                "I spearheaded a diagnostic taskforce, identified a memory leak in our database connection pool under spike loads, and orchestrated a hotfix to dynamically recycle connections while moving reporting services to a read replica."
                              </div>
                              <div>
                                <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider text-purple-400 block mb-1">
                                  Result (R)
                                </span>
                                "As a result, connection failures immediately dropped to zero, we recovered 100% of failed transactions, and database query latencies were permanently reduced by 30%."
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
