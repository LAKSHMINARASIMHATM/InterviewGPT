"use client";
import "./roadmap.css";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Map, Sparkles, CheckCircle2, Circle } from "lucide-react";
import { featuredCompanies, problems } from "@/lib/data";
import Link from "next/link";

interface ProblemItem {
  title: string;
  brief: string;
  completed: boolean;
}

interface DailyPlanItem {
  week: string;
  day: string;
  topic: string;
  problems: ProblemItem[];
  done: boolean;
}

export default function RoadmapPage() {
  const [duration, setDuration] = useState<7 | 30 | 90>(30);
  const [targetCompany, setTargetCompany] = useState("Amazon");
  const [loading, setLoading] = useState(false);
  const [activeWeek, setActiveWeek] = useState("Week 1");
  const [expandedProblem, setExpandedProblem] = useState<string | null>(null);

  const getProblemLink = (title: string): string | null => {
    const normalized = title.trim().toLowerCase();
    const match = problems.find(p => 
      p.title.toLowerCase() === normalized || 
      normalized.includes(p.title.toLowerCase()) || 
      p.title.toLowerCase().includes(normalized)
    );
    return match ? `/problems/${match.id}` : null;
  };

  const [items, setItems] = useState([
    { week: "Week 1", focus: "Fundamentals",       topics: ["Array", "String", "Hash Map", "Two Pointers"], problems: 12, status: "in-progress" },
    { week: "Week 2", focus: "Search & Sort",       topics: ["Binary Search", "Sorting", "Sliding Window"],  problems: 10, status: "upcoming" },
    { week: "Week 3", focus: "Data Structures",     topics: ["Stack", "Queue", "Heap", "Linked List"],       problems: 12, status: "upcoming" },
    { week: "Week 4", focus: "Trees & Graphs",      topics: ["Tree", "BST", "Graph", "BFS", "DFS"],          problems: 15, status: "upcoming" },
  ]);

  const [daily, setDaily] = useState<DailyPlanItem[]>([
    {
      week: "Week 1",
      day: "Day 1",
      topic: "Array Basics",
      problems: [
        { title: "Two Sum", brief: "Find two numbers in an array that add up to a specific target.", completed: true },
        { title: "Best Time to Buy Stock", brief: "Find max profit buying and selling a stock once.", completed: true }
      ],
      done: true
    },
    {
      week: "Week 1",
      day: "Day 2",
      topic: "Hash Map Patterns",
      problems: [
        { title: "Group Anagrams", brief: "Group strings that are anagrams of each other.", completed: true },
        { title: "Valid Anagram", brief: "Check if two strings contain the same characters.", completed: true }
      ],
      done: true
    },
    {
      week: "Week 1",
      day: "Day 3",
      topic: "Two Pointers",
      problems: [
        { title: "Container With Most Water", brief: "Find two lines forming a container with most water.", completed: false },
        { title: "3Sum", brief: "Find unique triplets that sum to zero.", completed: false }
      ],
      done: false
    },
    {
      week: "Week 1",
      day: "Day 4",
      topic: "Sliding Window",
      problems: [
        { title: "Longest Substring Without Repeating", brief: "Find longest substring without duplicate chars.", completed: false },
        { title: "Min Window Sub", brief: "Find minimum window containing all characters of target.", completed: false }
      ],
      done: false
    },
    {
      week: "Week 1",
      day: "Day 5",
      topic: "Binary Search",
      problems: [
        { title: "Search in Rotated Array", brief: "Search target in rotated sorted array.", completed: false },
        { title: "Find Peak Element", brief: "Find an element greater than its neighbors.", completed: false }
      ],
      done: false
    },
    {
      week: "Week 1",
      day: "Day 6",
      topic: "Stack",
      problems: [
        { title: "Valid Parentheses", brief: "Validate matching brackets order.", completed: false },
        { title: "Min Stack", brief: "Design a stack supporting minimum value in O(1).", completed: false }
      ],
      done: false
    },
    {
      week: "Week 1",
      day: "Day 7",
      topic: "Review & Mock",
      problems: [
        { title: "Review weak topics", brief: "Recap mistakes made during the week.", completed: false },
        { title: "Time 2 problems", brief: "Do 2 medium problems under 40 minutes.", completed: false }
      ],
      done: false
    },
  ]);

  const syncRoadmapWithDb = async (dailyPlanItems: DailyPlanItem[]) => {
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        const solvedIds = data.solvedProblemIds || [];
        return dailyPlanItems.map(day => {
          const updatedProblems = day.problems.map(prob => {
            const normalized = prob.title.trim().toLowerCase();
            const match = problems.find(p => 
              p.title.toLowerCase() === normalized || 
              normalized.includes(p.title.toLowerCase()) || 
              p.title.toLowerCase().includes(normalized)
            );
            const isSolved = match ? solvedIds.includes(match.id) : false;
            return { ...prob, completed: isSolved };
          });
          const allCompleted = updatedProblems.every(p => p.completed);
          return {
            ...day,
            problems: updatedProblems,
            done: allCompleted
          };
        });
      }
    } catch (err) {
      console.error("Failed to sync progress with DB:", err);
    }
    return dailyPlanItems;
  };

  useEffect(() => {
    syncRoadmapWithDb(daily).then(synced => setDaily(synced));
  }, []);

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    setActiveWeek("Week 1");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Please generate a personalized roadmap for target company [${targetCompany}] and duration [${duration} days].`
          }]
        })
      });
      const data = await res.json();
      if (data.response) {
        const parsed = JSON.parse(data.response);
        if (parsed.roadmapItems) setItems(parsed.roadmapItems);
        if (parsed.dailyPlan) {
          const synced = await syncRoadmapWithDb(parsed.dailyPlan);
          setDaily(synced);
        }
      }
    } catch (err) {
      console.error("Failed to generate roadmap:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleProblemCompletion = (dayName: string, problemTitle: string) => {
    const normalized = problemTitle.trim().toLowerCase();
    const match = problems.find(p => 
      p.title.toLowerCase() === normalized || 
      normalized.includes(p.title.toLowerCase()) || 
      p.title.toLowerCase().includes(normalized)
    );

    if (match) {
      const targetDay = daily.find(d => dayName === d.day || (!d.week && activeWeek === "Week 1"));
      const targetProb = targetDay?.problems.find(p => p.title === problemTitle);
      const newCompletedState = !targetProb?.completed;

      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: match.id,
          completed: newCompletedState
        })
      }).catch(err => console.error("Failed to update database progress:", err));
    }

    setDaily(prevDaily => {
      const updated = prevDaily.map(day => {
        if (day.day !== dayName) return day;

        const updatedProblems = day.problems.map(prob => {
          if (prob.title !== problemTitle) return prob;
          return { ...prob, completed: !prob.completed };
        });

        const allCompleted = updatedProblems.every(p => p.completed);

        return {
          ...day,
          problems: updatedProblems,
          done: allCompleted
        };
      });

      const modifiedDayIndex = updated.findIndex(day => day.day === dayName);
      if (modifiedDayIndex !== -1) {
        const modifiedDay = updated[modifiedDayIndex];
        const previouslyDone = prevDaily[modifiedDayIndex].done;

        if (modifiedDay.done && !previouslyDone) {
          const nextTodoDay = updated.find((day, idx) => idx > modifiedDayIndex && !day.done);
          if (nextTodoDay) {
            if (nextTodoDay.week && nextTodoDay.week !== activeWeek) {
              setActiveWeek(nextTodoDay.week);
            }
          }
        }
      }

      return updated;
    });
  };

  const toggleProblemBrief = (uniqueId: string) => {
    setExpandedProblem(prev => (prev === uniqueId ? null : uniqueId));
  };

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
          <button
            onClick={handleGenerateRoadmap}
            disabled={loading}
            className="rm-gen-btn disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="generate-roadmap-btn"
          >
            <Sparkles className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden />
            {loading ? "Generating Roadmap..." : "Generate Roadmap with AI"}
          </button>
        </div>

        {/* Layout */}
        <div className="rm-layout">
          {/* Weekly overview */}
          <div>
            <div className="rm-sec-title">📅 Weekly Plan for {targetCompany}</div>
            <div className="rm-weeks">
              {items.map((item, i) => (
                <motion.div
                  key={item.week}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setActiveWeek(item.week)}
                  className={`rm-week-card cursor-pointer transition-all duration-200 hover:border-indigo-500/30 ${item.week === activeWeek ? "active" : ""}`}
                >
                  <div className="rm-week-top">
                    <div className="rm-week-left">
                      <div className={`rm-week-num ${item.week === activeWeek ? "rm-week-num-active" : "rm-week-num-todo"}`}>
                        {item.week.split(" ")[1]}
                      </div>
                      <div>
                        <div className="rm-week-focus">{item.focus}</div>
                        <div className="rm-week-cnt">{item.problems} problems</div>
                      </div>
                    </div>
                    {item.week === activeWeek && <span className="rm-week-badge">Selected</span>}
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
            <div className="rm-sec-title">📋 Schedule for {activeWeek}</div>
            <div className="rm-daily-card">
              <div className="rm-tl">
                {daily.filter(d => d.week === activeWeek || (!d.week && activeWeek === "Week 1")).map((day, i, arr) => (
                  <div key={day.day} className="rm-tl-item">
                    <div className="rm-tl-rail">
                      <div className={`rm-tl-dot ${day.done ? "rm-tl-dot-done" : "rm-tl-dot-todo"}`}>
                        {day.done
                          ? <CheckCircle2 width={14} height={14} color="#fff" aria-hidden />
                          : <Circle width={12} height={12} color="#d1d5db" aria-hidden />}
                      </div>
                      {i < arr.length - 1 && (
                        <div className={`rm-tl-line ${day.done ? "rm-tl-line-done" : "rm-tl-line-todo"}`} />
                      )}
                    </div>
                    <div className="rm-tl-body">
                      <div className="rm-tl-day">{day.day}</div>
                      <div className="rm-tl-topic">{day.topic}</div>
                      <div className="rm-problems-list">
                        {day.problems.map(p => {
                          const uniqueId = `${day.day}-${p.title}`;
                          const isExpanded = expandedProblem === uniqueId;
                          return (
                            <div key={p.title} className="rm-prob-item">
                              <div className="rm-prob-row">
                                <label className="rm-prob-label">
                                  <input
                                    type="checkbox"
                                    checked={p.completed}
                                    onChange={() => toggleProblemCompletion(day.day, p.title)}
                                    className="rm-prob-checkbox"
                                  />
                                  {(() => {
                                    const linkUrl = getProblemLink(p.title);
                                    return linkUrl ? (
                                      <Link
                                        href={linkUrl}
                                        className={p.completed ? "rm-prob-title-completed hover:text-indigo-400 hover:underline" : "rm-prob-title hover:text-indigo-400 hover:underline"}
                                        style={{ textDecoration: p.completed ? "line-through" : "none" }}
                                      >
                                        {p.title} <span style={{ fontSize: "10px", opacity: 0.8 }}>↗</span>
                                      </Link>
                                    ) : (
                                      <span className={p.completed ? "rm-prob-title-completed" : "rm-prob-title"}>
                                        {p.title}
                                      </span>
                                    );
                                  })()}
                                </label>
                                <button
                                  onClick={() => toggleProblemBrief(uniqueId)}
                                  className="rm-prob-toggle-btn"
                                >
                                  {isExpanded ? "Hide Details" : "Details"}
                                </button>
                              </div>
                              {isExpanded && (
                                <div className="rm-prob-brief">
                                  {p.brief}
                                </div>
                              )}
                            </div>
                          );
                        })}
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
