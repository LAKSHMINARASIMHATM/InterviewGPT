"use client";
import "./ai-coach.css";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Send, Code2, Lightbulb, GraduationCap,
  MessageSquare, Zap, Sparkles, Loader2, User,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  { icon: Code2,          text: "Explain the Two Sum problem step by step" },
  { icon: Lightbulb,      text: "What is the sliding window pattern?"       },
  { icon: GraduationCap,  text: "How to prepare for Amazon interviews?"     },
  { icon: MessageSquare,  text: "Difference between BFS and DFS?"           },
  { icon: Zap,            text: "Explain dynamic programming with example"  },
  { icon: Sparkles,       text: "Most common FAANG interview patterns?"     },
];

// Simple inline markdown: bold, inline code
function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={i} className="ai-inline-code">{part.slice(1, -1)}</code>;
    return part;
  });
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  const lines = msg.content.split("\n");

  return (
    <div className={`ai-msg-row ${isUser ? "ai-msg-row--user" : ""}`}>
      {!isUser && (
        <div className="ai-msg-avatar ai-msg-avatar--bot">
          <Bot size={15} />
        </div>
      )}
      <div className={`ai-bubble ${isUser ? "ai-bubble--user" : "ai-bubble--bot"}`}>
        {lines.map((line, i) => {
          if (line.startsWith("### ")) return <h4 key={i} className="ai-md-h4">{line.slice(4)}</h4>;
          if (line.startsWith("## "))  return <h3 key={i} className="ai-md-h3">{line.slice(3)}</h3>;
          if (line.startsWith("# "))   return <h2 key={i} className="ai-md-h2">{line.slice(2)}</h2>;
          if (line.startsWith("- ") || line.startsWith("• "))
            return <p key={i} className="ai-md-li">• {renderInline(line.slice(2))}</p>;
          if (line.trim() === "") return <br key={i} />;
          return <p key={i} className="ai-md-p">{renderInline(line)}</p>;
        })}
      </div>
      {isUser && (
        <div className="ai-msg-avatar ai-msg-avatar--user">
          <User size={15} />
        </div>
      )}
    </div>
  );
}

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `👋 Hi! I'm your **AI Interview Coach**, powered by **Llama**.

I can help you with:

- **Problem Explanations** — Break down any coding problem step by step
- **Mock Interviews** — Simulate real FAANG interview scenarios
- **Code Reviews** — Analyse your solutions for correctness & efficiency
- **Study Plans** — Build a personalised preparation roadmap
- **Pattern Recognition** — Identify common DSA patterns
- **Company Prep** — Tips specific to Google, Amazon, Meta & more

What would you like to work on today?`,
    },
  ]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [aiSrc, setAiSrc]       = useState("");
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const res  = await fetch("/api/ai", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setAiSrc(data.source ?? "llama");
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const showPrompts = messages.length <= 1 && !loading;

  return (
    <div className="aic-shell">
      {/* ── Sidebar ── */}
      <aside className="aic-sidebar">
        <div className="aic-sidebar-brand">
          <div className="aic-brand-icon"><Bot size={18} /></div>
          <span>Llama Coach</span>
        </div>
        <p className="aic-sidebar-hint">Your personal AI interview mentor powered by Llama 3.3</p>

        <div className="aic-sidebar-status">
          <span className="aic-status-dot" />
          <span>{aiSrc.includes("groq") ? "Groq Cloud · Llama 3.3" : aiSrc.includes("ollama") ? "Ollama · Local" : "Smart Mode"}</span>
        </div>

        <div className="aic-sidebar-divider" />

        <p className="aic-sidebar-section-label">Suggested questions</p>
        <div className="aic-quick-list">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p.text}
              className="aic-quick-item"
              onClick={() => send(p.text)}
              disabled={loading}
            >
              <p.icon size={14} className="aic-quick-icon" />
              <span>{p.text}</span>
            </button>
          ))}
        </div>

        <div className="aic-sidebar-footer">
          <Sparkles size={13} />
          <span>1,796 problems in context</span>
        </div>
      </aside>

      {/* ── Main chat area ── */}
      <div className="aic-main">
        {/* Header */}
        <div className="aic-topbar">
          <div className="aic-topbar-left">
            <div className="aic-topbar-avatar"><Bot size={16} /></div>
            <div>
              <div className="aic-topbar-name">AI Interview Coach</div>
              <div className="aic-topbar-sub">Powered by Llama · context-aware coaching</div>
            </div>
          </div>
          <div className="aic-topbar-badge">
            <span className="aic-status-dot" />Active
          </div>
        </div>

        {/* Messages */}
        <div className="aic-feed">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
              >
                <MessageBubble msg={msg} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="ai-msg-row"
            >
              <div className="ai-msg-avatar ai-msg-avatar--bot"><Bot size={15} /></div>
              <div className="ai-bubble ai-bubble--bot ai-typing">
                <span /><span /><span />
              </div>
            </motion.div>
          )}

          {/* Quick prompts (center of empty chat) */}
          <AnimatePresence>
            {showPrompts && (
              <motion.div
                className="aic-prompts-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="aic-prompts-label">Try asking…</p>
                <div className="aic-prompts-grid">
                  {QUICK_PROMPTS.slice(0, 4).map((p) => (
                    <button
                      key={p.text}
                      className="aic-prompt-card"
                      onClick={() => send(p.text)}
                    >
                      <p.icon size={16} className="aic-prompt-icon" />
                      <span>{p.text}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="aic-inputbar">
          <div className="aic-input-wrap">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
              placeholder="Ask about algorithms, interview tips, code reviews…"
              className="aic-input"
              disabled={loading}
              autoFocus
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="aic-send-btn"
              aria-label="Send"
            >
              {loading
                ? <Loader2 size={17} className="animate-spin" />
                : <Send size={17} />}
            </button>
          </div>
          <p className="aic-input-hint">
            Enter to send · Powered by Llama 3.3 (Groq) · Set <code>GROQ_API_KEY</code> for live responses
          </p>
        </div>
      </div>
    </div>
  );
}
