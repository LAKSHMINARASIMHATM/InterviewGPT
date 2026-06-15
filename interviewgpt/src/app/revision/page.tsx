"use client";
import "./revision.css";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Layers, RefreshCw, Star, Clock, BrainCircuit, ArrowRight, Download } from "lucide-react";
import { topics } from "@/lib/data";

export default function RevisionPage() {
  const [activeTab, setActiveTab] = useState<"flashcards" | "cheat-sheets" | "weak-areas">("flashcards");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [flashcards, setFlashcards] = useState<any[]>([
    { front: "What is the sliding window technique?", back: "A method for finding a subset of elements that satisfy a certain condition in an array or string. It involves maintaining a 'window' that expands or shrinks based on constraints." },
    { front: "Time complexity of finding a cycle in a linked list using Floyd's?", back: "O(N) Time, O(1) Space." },
    { front: "When should you use a Monotonic Stack?", back: "When you need to find the 'next greater' or 'next smaller' element in an array efficiently (O(N) time)." },
    { front: "How to quickly check if a number is a power of 2?", back: "Using bit manipulation: (n & (n - 1)) == 0, assuming n > 0." },
  ]);

  const [cheatSheets, setCheatSheets] = useState<any[]>([
    { title: "Time Complexity Guide", desc: "Big-O cheatsheet for common data structures", iconType: "Clock" },
    { title: "Array Patterns",        desc: "Two pointers, sliding window, prefix sum",  iconType: "Layers" },
    { title: "Graph Algorithms",      desc: "BFS, DFS, Dijkstra, Union Find",            iconType: "Brain" },
  ]);

  const [weakAreas, setWeakAreas] = useState<any[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);

  const getIcon = (type: string) => {
    if (type === "Clock") return Clock;
    if (type === "Layers") return Layers;
    return BrainCircuit;
  };
  const getIconBg = (type: string) => {
    if (type === "Clock") return "#dbeafe";
    if (type === "Layers") return "#d1fae5";
    return "#ede9fe";
  };
  const getIconColor = (type: string) => {
    if (type === "Clock") return "#2563eb";
    if (type === "Layers") return "#059669";
    return "#7c3aed";
  };

  const loadAIMaterials = async (currentWeakAreas: any[]) => {
    setLoadingAI(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate_revision_materials",
          weakAreas: currentWeakAreas
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.flashcards) setFlashcards(data.flashcards);
        if (data.cheatSheets) setCheatSheets(data.cheatSheets);
      }
    } catch (err) {
      console.error("Failed to generate AI revision materials:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    async function loadWeakAreas() {
      try {
        const res = await fetch("/api/analytics");
        if (res.ok) {
          const data = await res.json();
          if (data.topicMastery) {
            const sorted = [...data.topicMastery]
              .filter(tm => !tm.name.toLowerCase().includes("aptitude") && !tm.name.toLowerCase().includes("reasoning"))
              .sort((a, b) => a.mastery - b.mastery);

            const mapped = sorted.slice(0, 4).map(tm => {
              const matchedTopic = topics.find(t => t.name === tm.name);
              return {
                name: tm.name,
                count: matchedTopic ? matchedTopic.count : 15,
                mastery: tm.mastery
              };
            });
            setWeakAreas(mapped);
            loadAIMaterials(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load weak areas:", err);
      }
    }
    loadWeakAreas();
  }, []);

  function nextCard() {
    setIsFlipped(false);
    setTimeout(() => setCurrentCardIndex(i => (i + 1) % flashcards.length), 150);
  }

  const tabs = [
    { id: "flashcards",   label: "Flashcards",   icon: Layers },
    { id: "cheat-sheets", label: "Cheat Sheets",  icon: Download },
    { id: "weak-areas",   label: "Weak Areas",    icon: RefreshCw },
  ] as const;

  return (
    <div className="rv-page">
      <div className="rv-container">
        {/* Header */}
        <div className="rv-header">
          <h1 className="rv-title" style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <Sparkles width={26} height={26} style={{ color: "#d97706" }} aria-hidden />
            Revision Hub
            {loadingAI && (
              <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: "normal", background: "rgba(245, 158, 11, 0.08)", padding: "4px 8px", borderRadius: "999px", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                Generating materials with AI...
              </span>
            )}
          </h1>
          <p className="rv-subtitle">Flashcards, cheat sheets, and spaced repetition</p>
        </div>

        {/* Tabs */}
        <div className="rv-tabs" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rv-tab ${activeTab === tab.id ? "active" : ""}`}
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon width={15} height={15} aria-hidden />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Flashcards ── */}
        {activeTab === "flashcards" && (
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div className="rv-card-meta">
              <span>Card {currentCardIndex + 1} of {flashcards.length}</span>
              <button className="rv-save-btn">
                <Star width={14} height={14} aria-hidden /> Save
              </button>
            </div>

            <div className="rv-flashcard-viewport">
              <motion.div
                className="rv-flashcard"
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 22 }}
                onClick={() => setIsFlipped(f => !f)}
                aria-label="Flashcard, click to flip"
              >
                {/* Front */}
                <div className="rv-fc-face">
                  <div className="rv-fc-tag rv-fc-tag-q">Question</div>
                  <h3 className="rv-fc-q">{flashcards[currentCardIndex].front}</h3>
                  <div className="rv-fc-hint">Click to reveal answer</div>
                </div>
                {/* Back */}
                <div className="rv-fc-face rv-fc-back">
                  <div className="rv-fc-tag rv-fc-tag-a">Answer</div>
                  <p className="rv-fc-a">{flashcards[currentCardIndex].back}</p>
                </div>
              </motion.div>
              <style>{`.rv-flashcard { transform-style: preserve-3d; } .rv-fc-face { backface-visibility: hidden; } .rv-fc-back { transform: rotateX(180deg); }`}</style>
            </div>

            <div className="rv-fc-controls">
              <button onClick={() => setIsFlipped(f => !f)} className="rv-btn rv-btn-secondary">
                {isFlipped ? "Show Question" : "Show Answer"}
              </button>
              <button onClick={nextCard} className="rv-btn rv-btn-primary">
                Next Card <ArrowRight width={15} height={15} aria-hidden />
              </button>
            </div>
          </div>
        )}

        {/* ── Cheat Sheets ── */}
        {activeTab === "cheat-sheets" && (
          <div className="rv-cheat-grid">
            {cheatSheets.map((sheet, i) => {
              const IconComp = getIcon(sheet.iconType || "Brain");
              const bg = getIconBg(sheet.iconType || "Brain");
              const color = getIconColor(sheet.iconType || "Brain");
              return (
                <motion.div
                  key={sheet.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="rv-cheat-card"
                >
                  <div className="rv-cheat-ico" style={{ background: bg }}>
                    <IconComp width={22} height={22} style={{ color: color }} aria-hidden />
                  </div>
                  <div className="rv-cheat-title">{sheet.title}</div>
                  <div className="rv-cheat-desc">{sheet.desc}</div>
                  <div className="rv-cheat-link">
                    Download PDF <Download width={13} height={13} aria-hidden />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Weak Areas ── */}
        {activeTab === "weak-areas" && (
          <div>
            <div className="rv-alert">
              <div className="rv-alert-title">
                <BrainCircuit width={16} height={16} aria-hidden /> AI Analysis
              </div>
              <p className="rv-alert-text">
                Based on your recent submissions, our AI identified patterns where you struggle.
                Focusing on these areas will yield the highest return on your study time.
              </p>
            </div>

            <div className="rv-weak-grid">
              {weakAreas.map((topic, i) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="rv-weak-card"
                >
                  <div>
                    <div className="rv-weak-name">{topic.name}</div>
                    <div className="rv-weak-count">
                      {topic.count} practice problems available · <span style={{ color: "#f59e0b" }}>{topic.mastery}% mastered</span>
                    </div>
                  </div>
                  <Link href={`/problems?topic=${encodeURIComponent(topic.name)}`}>
                    <button className="rv-btn rv-btn-warning">Practice Now</button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
