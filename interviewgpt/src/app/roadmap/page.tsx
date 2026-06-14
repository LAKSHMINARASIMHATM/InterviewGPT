"use client";
import "./roadmap.css";

import { useState } from "react";
import { motion } from "framer-motion";
import { Map, Sparkles, CheckCircle2, Circle } from "lucide-react";
import { featuredCompanies } from "@/lib/data";

export default function RoadmapPage() {
  const [duration, setDuration] = useState<7 | 30 | 90>(30);
  const [targetCompany, setTargetCompany] = useState("Amazon");

  const roadmapItems = [
    { week: "Week 1", focus: "Fundamentals",       topics: ["Array", "String", "Hash Map", "Two Pointers"], problems: 12, status: "in-progress" },
    { week: "Week 2", focus: "Search & Sort",       topics: ["Binary Search", "Sorting", "Sliding Window"],  problems: 10, status: "upcoming" },
    { week: "Week 3", focus: "Data Structures",     topics: ["Stack", "Queue", "Heap", "Linked List"],       problems: 12, status: "upcoming" },
    { week: "Week 4", focus: "Trees & Graphs",      topics: ["Tree", "BST", "Graph", "BFS", "DFS"],          problems: 15, status: "upcoming" },
  ];

  const dailyPlan = [
    { day: "Day 1", topic: "Array Basics",         problems: ["Two Sum", "Best Time to Buy Stock"],                    done: true },
    { day: "Day 2", topic: "Hash Map Patterns",    problems: ["Group Anagrams", "Valid Anagram"],                       done: true },
    { day: "Day 3", topic: "Two Pointers",         problems: ["Container With Most Water", "3Sum"],                     done: false },
    { day: "Day 4", topic: "Sliding Window",       problems: ["Longest Substring Without Repeating", "Min Window Sub"], done: false },
    { day: "Day 5", topic: "Binary Search",        problems: ["Search in Rotated Array", "Find Peak Element"],          done: false },
    { day: "Day 6", topic: "Stack",                problems: ["Valid Parentheses", "Min Stack"],                        done: false },
    { day: "Day 7", topic: "Review & Mock",        problems: ["Review weak topics", "Time 2 problems"],                 done: false },
  ];

  return (
    <div className="rm-page">
      <div className="rm-container">
        {/* Header */}
        <div className="rm-header">
          <h1 className="rm-title">
            <Map width={26} height={26} style={{ color: "#6366f1" }} aria-hidden />
            Learning Roadmap
          </h1>
          <p className="rm-subtitle">AI-generated personalized preparation plan</p>
        </div>

        {/* Config card */}
        <div className="rm-config-card">
          <div className="rm-config-grid">
            <div>
              <label className="rm-config-label">Target Company</label>
              <div className="rm-co-chips">
                {featuredCompanies.slice(0, 8).map(c => (
                  <button
                    key={c.slug}
                    onClick={() => setTargetCompany(c.name)}
                    className={`rm-co-chip ${targetCompany === c.name ? "active" : ""}`}
                    data-testid={`company-chip-${c.slug}`}
                  >
                    <span>{c.emoji}</span> {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="rm-config-label">Duration</label>
              <div className="rm-dur-btns">
                {([7, 30, 90] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`rm-dur-btn ${duration === d ? "active" : ""}`}
                    data-testid={`duration-${d}`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button className="rm-gen-btn" data-testid="generate-roadmap-btn">
            <Sparkles width={15} height={15} aria-hidden />
            Generate Roadmap with AI
          </button>
        </div>

        {/* Layout */}
        <div className="rm-layout">
          {/* Weekly overview */}
          <div>
            <div className="rm-sec-title">📅 Weekly Plan for {targetCompany}</div>
            <div className="rm-weeks">
              {roadmapItems.map((item, i) => (
                <motion.div
                  key={item.week}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rm-week-card ${item.status === "in-progress" ? "active" : ""}`}
                >
                  <div className="rm-week-top">
                    <div className="rm-week-left">
                      <div className={`rm-week-num ${item.status === "in-progress" ? "rm-week-num-active" : "rm-week-num-todo"}`}>
                        {item.week.split(" ")[1]}
                      </div>
                      <div>
                        <div className="rm-week-focus">{item.focus}</div>
                        <div className="rm-week-cnt">{item.problems} problems</div>
                      </div>
                    </div>
                    {item.status === "in-progress" && <span className="rm-week-badge">In Progress</span>}
                  </div>
                  <div className="rm-week-chips">
                    {item.topics.map(t => <span key={t} className="rm-week-chip">{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Daily plan */}
          <div>
            <div className="rm-sec-title">📋 This Week</div>
            <div className="rm-daily-card">
              <div className="rm-tl">
                {dailyPlan.map((day, i) => (
                  <div key={day.day} className="rm-tl-item">
                    <div className="rm-tl-rail">
                      <div className={`rm-tl-dot ${day.done ? "rm-tl-dot-done" : "rm-tl-dot-todo"}`}>
                        {day.done
                          ? <CheckCircle2 width={14} height={14} color="#fff" aria-hidden />
                          : <Circle width={12} height={12} color="#d1d5db" aria-hidden />}
                      </div>
                      {i < dailyPlan.length - 1 && (
                        <div className={`rm-tl-line ${day.done ? "rm-tl-line-done" : "rm-tl-line-todo"}`} />
                      )}
                    </div>
                    <div className="rm-tl-body">
                      <div className="rm-tl-day">{day.day}</div>
                      <div className="rm-tl-topic">{day.topic}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {day.problems.map(p => (
                          <div key={p} className={`rm-tl-p ${day.done ? "rm-tl-p-done" : ""}`}>• {p}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
