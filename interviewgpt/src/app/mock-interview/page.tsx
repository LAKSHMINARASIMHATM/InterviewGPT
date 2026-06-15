"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Bot, Send, Loader2, Clock, ChevronRight,
  CheckCircle2, XCircle, Lightbulb, RotateCcw,
  Trophy, Target, Zap, Building2, BookOpen, ArrowLeft,
  User, Sparkles, AlertCircle, Check, Award, ThumbsUp, Star
} from "lucide-react";

import "./mock-interview.css";


// Predefined HR Topics database
const HR_TOPICS = [
  {
    id: "behavioral-star",
    title: "Behavioral & STAR Method",
    desc: "Master situational questions using the Situation, Task, Action, and Result framework.",
    icon: "🌟",
    color: "#10b981", // Emerald
    sampleQuestions: [
      // Basic
      { level: "Basic", q: "Can you walk me through your typical workday and your primary responsibilities in your last role?" },
      { level: "Basic", q: "Tell me about a time you successfully completed a task under a tight deadline. What steps did you take?" },
      { level: "Basic", q: "Describe a situation where you had to learn a new tool or technology quickly. How did you approach it?" },
      // Intermediate
      { level: "Intermediate", q: "Tell me about a time you faced a major obstacle at work and how you overcame it." },
      { level: "Intermediate", q: "Describe a situation where you had to work under a tight deadline with incomplete information. What did you do?" },
      { level: "Intermediate", q: "Tell me about a time you received critical feedback. How did you respond and what changed?" },
      { level: "Intermediate", q: "Give an example of a time you had to manage competing priorities. How did you decide what to work on first?" },
      // Advanced
      { level: "Advanced", q: "Tell me about a time you failed on a significant project. What was the root cause, what did you learn, and how did you apply that learning to prevent future failures?" },
      { level: "Advanced", q: "Describe the most complex problem you have ever resolved. Walk me through every diagnostic step, the trade-offs you considered, and the measurable outcome." },
      { level: "Advanced", q: "Tell me about a time you identified a systemic process inefficiency and drove an organization-wide change. What resistance did you face and how did you measure success?" }
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
      // Basic
      { level: "Basic", q: "Tell me about a time you worked as part of a team on a project. What was your specific role and contribution?" },
      { level: "Basic", q: "Describe a situation where you helped a colleague who was struggling. What did you do?" },
      { level: "Basic", q: "Can you give an example of a time you received direction from multiple stakeholders? How did you manage it?" },
      // Intermediate
      { level: "Intermediate", q: "Tell me about a time you disagreed with a manager or coworker on a project decision. How did you handle it?" },
      { level: "Intermediate", q: "Describe a time you took the lead on a project or initiative without being explicitly asked to." },
      { level: "Intermediate", q: "How do you handle a team member who is underperforming or not collaborating effectively?" },
      { level: "Intermediate", q: "Tell me about a time you had to build consensus among people with conflicting opinions. What was your approach?" },
      // Advanced
      { level: "Advanced", q: "Describe a time you had to lead a cross-functional team through a crisis with high stakes and limited time. How did you make decisions and keep everyone aligned?" },
      { level: "Advanced", q: "Tell me about the most difficult interpersonal conflict you managed as a leader. What were the root causes and how did you fully resolve it while preserving team trust?" },
      { level: "Advanced", q: "Imagine you are the tech lead on a mission-critical release and a senior engineer strongly refuses your architecture decision, risking the timeline. How do you handle this situation end-to-end?" }
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
      // Basic
      { level: "Basic", q: "Tell me about yourself — your background, current role, and what brought you here today." },
      { level: "Basic", q: "What are your greatest professional strengths and how do they make you a strong fit for this role?" },
      { level: "Basic", q: "Why are you interested in this industry and what excites you about this company's mission?" },
      // Intermediate
      { level: "Intermediate", q: "Why do you want to work for our company specifically, and what unique value do you bring to this role?" },
      { level: "Intermediate", q: "Where do you see yourself in five years? How does this role align with your long-term career aspirations?" },
      { level: "Intermediate", q: "Why are you looking to leave your current role, and what are you seeking in your next challenge?" },
      { level: "Intermediate", q: "What is your biggest professional weakness, and what concrete steps have you taken to improve it?" },
      // Advanced
      { level: "Advanced", q: "If we were to hire you and you found after 6 months that the role wasn't the right fit, what would you do? How do you evaluate role-fit proactively?" },
      { level: "Advanced", q: "Why should we choose you over other candidates who have more direct years of experience in this exact domain? Pitch your unique value proposition." },
      { level: "Advanced", q: "Describe how your career trajectory so far has been intentional. What inflection points shaped your path and how does this role represent your next strategic move?" }
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
      // Basic
      { level: "Basic", q: "Describe a straightforward technical or logical problem you solved recently. What was your step-by-step approach?" },
      { level: "Basic", q: "Tell me about a time you had to follow a process that didn't make sense to you. How did you handle it?" },
      { level: "Basic", q: "How do you approach learning about an unfamiliar codebase or system you've just been assigned to?" },
      // Intermediate
      { level: "Intermediate", q: "Tell me about a time when requirements changed mid-way through a project. How did you adapt and manage stakeholder expectations?" },
      { level: "Intermediate", q: "Describe a complex problem you solved recently. Walk me through your diagnostics and decision process." },
      { level: "Intermediate", q: "How do you prioritize your workload when you have multiple competing high-priority tasks with the same deadline?" },
      { level: "Intermediate", q: "Tell me about a time you had to make a decision with insufficient data. What was your process and what was the outcome?" },
      // Advanced
      { level: "Advanced", q: "Imagine you take over a critical legacy service with zero documentation, frequent memory leaks, and a production release in one week. How do you methodically stabilize it and deliver?" },
      { level: "Advanced", q: "Describe the most ambiguous project you have worked on — where the success criteria were unclear. How did you define scope, align stakeholders, and measure success?" },
      { level: "Advanced", q: "You are tasked with reducing cloud infrastructure costs by 40% without degrading SLAs. You have 3 months. Walk me through your entire analysis, prioritization, and execution strategy." }
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
    desc: "A full interview simulation covering 8 structured rounds: self-intro, career vision, OOP, Java/Python internals, DBMS, system design, behavioral leadership, and coding philosophy.",
    icon: "🎓",
    color: "#ec4899", // Pink
    sampleQuestions: [
      // Basic
      { level: "Basic", q: "Tell me about yourself, your background, and why you are interested in this role." },
      { level: "Basic", q: "What are the four pillars of OOP and can you give a real-world example of each?" },
      { level: "Basic", q: "What is the difference between a stack and a heap in memory? When would a variable live on each?" },
      // Intermediate
      { level: "Intermediate", q: "Where do you see yourself in 5 years? How does this role align with your long-term career aspirations?" },
      { level: "Intermediate", q: "What is the difference between an Abstract Class and Interface in OOP, and how do Java and Python implement them differently?" },
      { level: "Intermediate", q: "Compare Java and Python in execution compilation, memory management (JVM vs PVM), garbage collection strategies, and static vs dynamic typing." },
      { level: "Intermediate", q: "Explain DBMS ACID properties, how database B-Tree indexes work under the hood, and when you would choose SQL vs NoSQL." },
      // Advanced
      { level: "Advanced", q: "Walk me through how you would design a URL shortener service at scale (1 billion URLs). Cover API design, hashing, storage, caching, and failover strategy." },
      { level: "Advanced", q: "How do you design code for scalability and modularity? Walk through the SOLID principles and a design pattern (Factory, Observer, or Singleton) you applied in production." },
      { level: "Advanced", q: "You are building a distributed payment processing system that must guarantee exactly-once delivery, idempotency, and zero data loss under network partitions. How do you architect this?" }
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
  const [companionTab, setCompanionTab] = useState<"tips" | "live" | "model" | "questions">("questions");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // AI Question Bank States
  const [aiQuestions, setAiQuestions] = useState<{ level: string; q: string }[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(false);
  const [questionsSource, setQuestionsSource] = useState<string>("");

  // AI Optimization States
  const [optimizing, setOptimizing] = useState<boolean>(false);
  const [optimizedResult, setOptimizedResult] = useState<{
    evaluation: string;
    optimized: string;
  } | null>(null);

  const fetchAIQuestions = async () => {
    setQuestionsLoading(true);
    setAiQuestions([]);
    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [],
          topic: activeTopicId,
          customTopic: customTopicText,
          resumeText: resumeText,
          phase: "generate_questions"
        })
      });
      const data = await res.json();
      setAiQuestions(data.questions || []);
      setQuestionsSource(data.source || "");
    } catch {
      setAiQuestions(activeTopic.sampleQuestions || []);
      setQuestionsSource("fallback");
    } finally {
      setQuestionsLoading(false);
    }
  };

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
    sampleQuestions: [] as { level: string; q: string }[],
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
    setCompanionTab("questions");
    // Fetch AI questions in parallel
    fetchAIQuestions();

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
    <div className="mi-page">
      {/* Ambient background glows */}
      <div className="mi-glow-1" />
      <div className="mi-glow-2" />

      {/* TOP HEADER / LOGO */}
      <div className="mi-top-header">
        <div className="mi-header-container">
          <div className="mi-logo-section">
            <div className="mi-logo-icon">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="mi-logo-text">
              <h1>AI Interview Coach</h1>
              <span className="mi-logo-tag">Behavioral & HR Simulator</span>
            </div>
          </div>
          {interviewStarted && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-mono font-bold text-white">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={() => {
                  setInterviewStarted(false);
                  setChat([]);
                }}
                className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer bg-white/5 border border-white/5 hover:border-white/15 px-4.5 py-2.5 rounded-xl"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mi-container">
        <AnimatePresence mode="wait">
          {!interviewStarted ? (
            /* SETUP / TOPICS SELECTION SCREEN */
            <motion.div
              key="setup-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="mi-setup-screen space-y-12"
            >
              <div className="mi-setup-hero">
                <div className="mi-hero-tag">
                  <Sparkles className="w-4 h-4" /> Empower Your Interview Performance
                </div>
                <h2 className="mi-hero-title">
                  AI-Powered Behavioral <br />& HR Mock Interview
                </h2>
                <p className="mi-hero-desc">
                  Prepare for real hiring managers and HR rounds. Choose a core category below or define your own custom topic to practice instantly.
                </p>
              </div>

              {/* Predefined Topics Grid */}
              <div className="mi-topics-grid">
                {HR_TOPICS.map((topic) => {
                  const isSelected = activeTopicId === topic.id;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => {
                        setActiveTopicId(topic.id);
                        setCustomTopicText("");
                      }}
                      className={`mi-topic-card ${
                        isSelected ? "mi-topic-card-active" : ""
                      }`}
                      style={{
                        borderColor: isSelected ? topic.color : "rgba(255, 255, 255, 0.05)"
                      }}
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div
                          className="mi-topic-card-active-indicator animate-pulse"
                          style={{ backgroundColor: topic.color }}
                        />
                      )}
                      
                      <div className="space-y-6">
                        <div className="mi-topic-card-header">
                          <span className="mi-topic-icon">{topic.icon}</span>
                          {isSelected && (
                            <span className="mi-active-badge" style={{ color: topic.color }}>
                              Active
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="mi-topic-title">
                            {topic.title}
                          </h3>
                          <p className="mi-topic-desc">
                            {topic.desc}
                          </p>
                        </div>
                      </div>

                      <div className="mi-topic-footer">
                        <div className="mi-topic-footer-badges">
                          <span className="mi-level-badge mi-level-basic">{topic.sampleQuestions.filter((q: any) => q.level === "Basic").length} Basic</span>
                          <span className="mi-level-badge mi-level-inter">{topic.sampleQuestions.filter((q: any) => q.level === "Intermediate").length} Mid</span>
                          <span className="mi-level-badge mi-level-adv">{topic.sampleQuestions.filter((q: any) => q.level === "Advanced").length} Advanced</span>
                        </div>
                        <span style={{ color: topic.color }}>Select Topic →</span>
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
                className={`mi-input-block ${
                  activeTopicId === "custom" ? "mi-input-block-active" : ""
                }`}
              >
                <div className="mi-block-header">
                  <div className="mi-block-icon">
                    ⚙️
                  </div>
                  <div>
                    <h3 className="mi-block-title">Custom HR Interview Topic</h3>
                    <p className="mi-block-subtitle">Practice questions tailored specifically to your custom topic/role.</p>
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
                  className="mi-text-input"
                />
              </div>

              {/* Resume Highlights Input */}
              <div className="mi-input-block">
                <div className="mi-block-header">
                  <div className="mi-block-icon">
                    📝
                  </div>
                  <div>
                    <h3 className="mi-block-title">Paste Resume / Project Highlights (Optional)</h3>
                    <p className="mi-block-subtitle">Provide your experience or tech stack so the AI interviewer can ask questions based on your resume and projects.</p>
                  </div>
                </div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="E.g., Full Stack Engineer. Skills: Java, Python, SQL, React. Led cloud migration of 15 services to AWS, reducing downtime by 30%..."
                  rows={4}
                  className="mi-textarea-input"
                />
              </div>

              {/* Start CTA */}
              <div className="mi-cta-row">
                <button
                  onClick={startInterview}
                  disabled={activeTopicId === "custom" && !customTopicText.trim()}
                  className="mi-cta-btn"
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
              className="mi-workspace"
            >
              {/* LEFT COLUMN: INTERACTIVE CHAT */}
              <div className="mi-chat-column">
                <div className="mi-chat-card">
                  
                  {/* Chat top header */}
                  <div className="mi-chat-header">
                    <div className="mi-chat-status">
                      <div className="mi-status-dot" />
                      <span className="mi-status-text">
                        Live Interview Feed
                      </span>
                    </div>
                    <span className="mi-chat-topic-badge">
                      Topic: {activeTopic.title}
                    </span>
                  </div>

                  {/* Chat messages feed */}
                  <div className="mi-chat-feed">
                    {chat.map((msg, i) => {
                      const isAI = msg.role === "assistant";
                      return (
                        <div key={i} className={`mi-chat-bubble-row ${isAI ? "" : "mi-chat-bubble-row-user"}`}>
                          <div className={`mi-avatar ${isAI ? "mi-avatar-ai" : "mi-avatar-user"}`}>
                            {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                          </div>
                          <div className={`mi-bubble ${isAI ? "mi-bubble-ai" : "mi-bubble-user"}`}>
                            <Markdown text={msg.content} />
                          </div>
                        </div>
                      );
                    })}

                    {loading && (
                      <div className="mi-chat-bubble-row">
                        <div className="mi-avatar mi-avatar-ai">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="mi-loading-bubble-wrapper">
                          <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                          <span className="mi-loading-text">Interviewer is formulating response...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input area (hidden in feedback phase) */}
                  {phase !== "feedback" ? (
                    <div className="mi-input-footer">
                      <div className="mi-textarea-wrapper">
                        <textarea
                          rows={4}
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          placeholder="Type your response using the STAR method..."
                          className="mi-chat-textarea"
                          disabled={loading}
                        />
                        <button
                          onClick={handleSend}
                          disabled={!inputVal.trim() || loading}
                          className="mi-send-btn"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mi-footer-meta">
                        <span className="mi-word-count">
                          Word Count: {userWordCount} words
                        </span>
                        <button
                          onClick={finishInterview}
                          disabled={chat.length < 2 || loading}
                          className="mi-finish-btn"
                        >
                          Finish & Get Performance Scorecard
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-white/5 pt-6 flex justify-between items-center">
                      <span className="mi-assessment-status">
                        <CheckCircle2 className="w-4 h-4" /> Assessment Complete
                      </span>
                      <button
                        onClick={() => {
                          setInterviewStarted(false);
                          setChat([]);
                          setPhase("intro");
                        }}
                        className="mi-reset-btn"
                      >
                        Try Another Topic
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: AI COACHING COMPANION OR SENIOR RECRUITER REPORT */}
              <div className="mi-companion-column">
                <div className="mi-companion-card">
                  {phase === "feedback" ? (
                    <div className="flex flex-col h-full space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-5">
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-purple-400" />
                          <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
                            Senior Recruiter Report
                          </h3>
                        </div>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Assessment Completed
                        </span>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto max-h-[580px] pr-2 space-y-6 mi-feedback-markdown">
                        {!loading && chat.length > 0 && chat[chat.length - 1]?.role === "assistant" ? (
                          <Markdown text={chat[chat.length - 1].content} />
                        ) : (
                          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                              Analyzing answers & compiling scorecard...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Tabs top bar */}
                      <div className="mi-companion-tabs">
                        <button
                          onClick={() => setCompanionTab("questions")}
                          className={`mi-companion-tab-btn ${
                            companionTab === "questions" ? "mi-companion-tab-btn-active" : ""
                          }`}
                        >
                          🎯 Questions
                        </button>
                        <button
                          onClick={() => setCompanionTab("tips")}
                          className={`mi-companion-tab-btn ${
                            companionTab === "tips" ? "mi-companion-tab-btn-active" : ""
                          }`}
                        >
                          📋 Tips
                        </button>
                        <button
                          onClick={() => setCompanionTab("live")}
                          className={`mi-companion-tab-btn ${
                            companionTab === "live" ? "mi-companion-tab-btn-active" : ""
                          }`}
                        >
                          💡 Live Help
                        </button>
                        <button
                          onClick={() => setCompanionTab("model")}
                          className={`mi-companion-tab-btn ${
                            companionTab === "model" ? "mi-companion-tab-btn-active" : ""
                          }`}
                        >
                          🚀 Pitch
                        </button>
                      </div>

                      {/* Tab Content Panels */}
                      <div className="mi-companion-content">
                        <AnimatePresence mode="wait">
                          {companionTab === "questions" && (
                            <motion.div
                              key="questions-tab"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-6"
                            >
                              <div className="mi-qbank-header">
                                <div className="flex items-center justify-between">
                                  <h4 className="mi-section-title">
                                    <Sparkles className="w-4 h-4 text-purple-400" /> AI Question Bank
                                  </h4>
                                  <button
                                    onClick={fetchAIQuestions}
                                    disabled={questionsLoading}
                                    className="mi-qbank-refresh-btn"
                                    title="Regenerate questions with AI"
                                  >
                                    {questionsLoading ? (
                                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    ) : (
                                      <RotateCcw className="w-3.5 h-3.5" />
                                    )}
                                    {questionsLoading ? "Generating..." : "Regenerate"}
                                  </button>
                                </div>
                                <p className="mi-qbank-desc">
                                  {questionsSource === "ai"
                                    ? "✨ AI-generated and tailored to your topic" + (resumeText ? " & resume" : ".")
                                    : questionsSource === "fallback"
                                    ? "Using curated questions. Click Regenerate to get AI-tailored ones."
                                    : "Questions generated progressively from basic to advanced."}
                                </p>
                              </div>

                              {questionsLoading ? (
                                <div className="mi-qbank-skeleton-list">
                                  {[...Array(6)].map((_, i) => (
                                    <div key={i} className="mi-qbank-skeleton" style={{ animationDelay: `${i * 0.08}s` }} />
                                  ))}
                                </div>
                              ) : (
                                <div className="mi-qbank-list">
                                  {(["Basic", "Intermediate", "Advanced"] as const).map((lvl) => {
                                    const lvlQuestions = aiQuestions.filter((q) => q.level === lvl);
                                    if (lvlQuestions.length === 0) return null;
                                    return (
                                      <div key={lvl} className="mi-qbank-group">
                                        <span className={`mi-qbank-level-badge mi-qbank-level-${lvl.toLowerCase()}`}>
                                          {lvl === "Basic" ? "🟢" : lvl === "Intermediate" ? "🟡" : "🔴"} {lvl}
                                        </span>
                                        <div className="mi-qbank-questions">
                                          {lvlQuestions.map((item, idx) => (
                                            <div key={idx} className="mi-qbank-question-item">
                                              <span className="mi-qbank-q-num">{idx + 1}</span>
                                              <p className="mi-qbank-q-text">{item.q}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    );
                                  })}
                                  {aiQuestions.length === 0 && (
                                    <div className="mi-qbank-empty">
                                      <Sparkles className="w-6 h-6 text-purple-400 opacity-50" />
                                      <p>Click Regenerate to get AI-tailored questions.</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </motion.div>
                          )}
                          {companionTab === "tips" && (
                            <motion.div
                              key="tips-tab"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-8"
                            >
                              <div className="space-y-4">
                                <h4 className="mi-section-title">
                                  <Star className="w-4 h-4 text-purple-400" /> Structure Framework
                                </h4>
                                <div className="mi-tips-list">
                                  {activeTopic.tips.map((tip, idx) => (
                                    <div key={idx} className="mi-tip-item">
                                      <div className="mi-tip-num">
                                        {idx + 1}
                                      </div>
                                      <p className="mi-tip-text">{tip}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {activeTopic.pitfalls && (
                                <div className="space-y-4">
                                  <h4 className="mi-section-title">
                                    <AlertCircle className="w-4 h-4 text-rose-400" /> Pitfalls to Avoid
                                  </h4>
                                  <div className="mi-pitfalls-list">
                                    {activeTopic.pitfalls.map((pitfall, idx) => (
                                      <div key={idx} className="mi-pitfall-item">
                                        <XCircle className="mi-pitfall-icon w-4 h-4" />
                                        <p className="mi-pitfall-text">{pitfall}</p>
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
                              className="space-y-8"
                            >
                              <div className="mi-indicators-panel">
                                <h4 className="mi-section-title">
                                  <Sparkles className="w-4 h-4 text-emerald-400" /> Real-time Answer Guide
                                </h4>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                  Start typing in the text box. The companion will analyze your response live and guide you.
                                </p>

                                <div className="space-y-4 pt-3 border-t border-white/5">
                                  {/* Length indicator */}
                                  <div className="mi-indicator-row">
                                    <span className="mi-indicator-label">Response Length:</span>
                                    <span className={`mi-indicator-value ${userWordCount > 100 ? "mi-indicator-ok" : "mi-indicator-warn"}`}>
                                      {userWordCount} words {userWordCount > 100 ? "(Perfect)" : "(Try for 100+ words)"}
                                    </span>
                                  </div>

                                  {/* Ownership indicator */}
                                  <div className="mi-indicator-row">
                                    <span className="mi-indicator-label">Ownership ('I' vs 'We'):</span>
                                    <span className={`mi-indicator-value ${containsI ? "mi-indicator-ok" : "mi-indicator-warn"}`}>
                                      {containsI ? "Good ('I' detected)" : "Add details on what YOU did"}
                                    </span>
                                  </div>

                                  {/* Results indicator */}
                                  <div className="mi-indicator-row">
                                    <span className="mi-indicator-label">Results & Metrics:</span>
                                    <span className={`mi-indicator-value ${containsResult ? "mi-indicator-ok" : "mi-indicator-warn"}`}>
                                      {containsResult ? "Impact terms detected" : "Add percentages or outcomes"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mi-verbs-panel">
                                <h4 className="mi-section-title">
                                  <ThumbsUp className="w-4 h-4" /> Strong Impact Verbs
                                </h4>
                                <p className="mi-verbs-desc">
                                  Use these action verbs instead of 'made', 'worked', or 'had':
                                </p>
                                <div className="mi-verbs-grid">
                                  {["Orchestrated", "Spearheaded", "Streamlined", "Resolved", "Mitigated", "Formulated", "Pioneered"].map((verb) => (
                                    <span key={verb} className="mi-verb-chip">
                                      {verb}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* AI Draft Optimizer Section */}
                              <div className="mi-optimizer-panel">
                                <h4 className="mi-section-title">
                                  <Sparkles className="w-4.5 h-4.5 text-purple-400 animate-pulse" /> AI Draft Optimizer
                                </h4>
                                <p className="mi-optimizer-desc">
                                  Have you drafted an answer in the text box? Click below to have the AI evaluate your exact answer and suggest a 10/10 optimized pitch.
                                </p>

                                <button
                                  onClick={optimizeMyDraft}
                                  disabled={!inputVal.trim() || optimizing}
                                  className="mi-optimizer-btn"
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
                                  <div className="mi-optimizer-result">
                                    <div>
                                      <span className="mi-critique-label">
                                        AI Feedback / Critique:
                                      </span>
                                      <p className="mi-critique-text">
                                        {optimizedResult.evaluation}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="mi-optimized-label">
                                        Optimized Answer (STAR format):
                                      </span>
                                      <div className="mi-optimized-text">
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
                              className="space-y-8"
                            >
                              <div className="mi-pitch-panel">
                                <h4 className="mi-section-title">
                                  <Star className="w-4 h-4 text-emerald-400" /> Ideal Pitch Template
                                </h4>
                                <p className="mi-pitch-desc">
                                  Here is what a structured response for this topic looks like.
                                </p>

                                <div className="mi-pitch-stages">
                                  <div>
                                    <span className="mi-pitch-stage-label">
                                      Situation (S)
                                    </span>
                                    <div className="mi-pitch-stage-text">
                                      "At my previous company, our payment processing gateway began dropping transactions during our biggest seasonal sale, leading to a backlog of support tickets."
                                    </div>
                                  </div>
                                  <div>
                                    <span className="mi-pitch-stage-label">
                                      Task (T)
                                    </span>
                                    <div className="mi-pitch-stage-text">
                                      "My task was to diagnose the root cause, restore service immediately, and formulate a long-term plan to ensure it wouldn't happen during subsequent sales."
                                    </div>
                                  </div>
                                  <div>
                                    <span className="mi-pitch-stage-label">
                                      Action (A)
                                    </span>
                                    <div className="mi-pitch-stage-text">
                                      "I spearheaded a diagnostic taskforce, identified a memory leak in our database connection pool under spike loads, and orchestrated a hotfix to dynamically recycle connections while moving reporting services to a read replica."
                                    </div>
                                  </div>
                                  <div>
                                    <span className="mi-pitch-stage-label">
                                      Result (R)
                                    </span>
                                    <div className="mi-pitch-stage-text">
                                      "As a result, connection failures immediately dropped to zero, we recovered 100% of failed transactions, and database query latencies were permanently reduced by 30%."
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
