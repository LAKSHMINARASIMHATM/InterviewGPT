"use client";
import "./analytics.css";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart3, Trophy, Target, Flame,
  Calendar, Code2, Building2, BookOpen,
  Zap, Award, Star, CheckCircle2, Clock,
} from "lucide-react";
import { getStats, topics } from "@/lib/data";

const stats = getStats();
const topTopics = topics
  .filter((t) => !t.name.includes("Aptitude"))
  .sort((a, b) => b.count - a.count)
  .slice(0, 8);

// ── Dashboard data ────────────────────────────────────────────────────────────
const readinessCards = [
  { name: "Google",    logo: "G",  score: 85, color: "#4285F4" },
  { name: "Meta",      logo: "M",  score: 62, color: "#0668E1" },
  { name: "Amazon",    logo: "A",  score: 40, color: "#FF9900" },
  { name: "Apple",     logo: "🍎", score: 90, color: "#A2AAAD" },
];

const recentActivity = [
  { id: 1, type: "solve", title: "Solved 'Two Sum' optimally in Python",    time: "2 hours ago" },
  { id: 2, type: "badge", title: "Unlocked 'Array Master' badge",            time: "5 hours ago" },
  { id: 3, type: "solve", title: "Completed 'Valid Palindrome' in C++",      time: "1 day ago"   },
  { id: 4, type: "solve", title: "Attempted 'LRU Cache' (Medium)",           time: "2 days ago"  },
];

export default function AnalyticsPage() {
  const userStats = {
    solved: 47, streak: 12, xp: 2340, level: 7,
    easy: 22, medium: 18, hard: 7,
    weeklyGoal: 15, weeklyDone: 9,
  };

  const readiness = [
    { company: "Amazon",    score: 34, color: "an-prog-orange", problems: 156 },
    { company: "Google",    score: 28, color: "an-prog-blue",   problems: 142 },
    { company: "Microsoft", score: 42, color: "an-prog-blue",   problems: 128 },
    { company: "Meta",      score: 22, color: "an-prog-blue",   problems: 98  },
    { company: "Apple",     score: 18, color: "an-prog-green",  problems: 76  },
  ];

  const achievements = [
    { name: "First Blood",    desc: "Solve your first problem",    icon: "⚔️", unlocked: true  },
    { name: "Streak Master",  desc: "7-day streak",               icon: "🔥", unlocked: true  },
    { name: "Array Warrior",  desc: "Solve 10 array problems",    icon: "📊", unlocked: true  },
    { name: "DP Apprentice",  desc: "Solve 5 DP problems",        icon: "💎", unlocked: false },
    { name: "Graph Explorer", desc: "Solve 5 graph problems",     icon: "🕸️", unlocked: false },
    { name: "Speed Demon",    desc: "Solve 3 problems in one day",icon: "⚡", unlocked: false },
  ];

  const topStatCards = [
    { icon: Code2, label: "Problems Solved", value: userStats.solved,                iconClass: "an-ico-blue"   },
    { icon: Flame, label: "Day Streak",      value: userStats.streak,                iconClass: "an-ico-orange" },
    { icon: Zap,   label: "Total XP",        value: userStats.xp.toLocaleString(),   iconClass: "an-ico-purple" },
    { icon: Award, label: "Level",           value: userStats.level,                 iconClass: "an-ico-amber"  },
  ];

  const diffRows = [
    { label: "Easy",   value: userStats.easy,   total: stats.easy,   cls: "an-prog-green"  },
    { label: "Medium", value: userStats.medium, total: stats.medium, cls: "an-prog-orange" },
    { label: "Hard",   value: userStats.hard,   total: stats.hard,   cls: "an-prog-red"    },
  ];

  const circumference = 2 * Math.PI * 15;
  const easyArc   = (userStats.easy   / userStats.solved) * circumference;
  const mediumArc = (userStats.medium / userStats.solved) * circumference;
  const hardArc   = (userStats.hard   / userStats.solved) * circumference;

  return (
    <div className="an-page">
      <div className="an-container">

        {/* ── Header ── */}
        <div className="an-header">
          <h1 className="an-page-title">
            <BarChart3 width={28} height={28} aria-hidden />
            Analytics &amp; Dashboard
          </h1>
          <p className="an-page-sub">Track your progress, readiness, and interview performance</p>
        </div>

        {/* ── Stats row ── */}
        <div className="an-stats-row">
          {topStatCards.map((s, i) => (
            <motion.div
              key={s.label}
              className="an-stat-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <div className={`an-stat-icon ${s.iconClass}`}>
                <s.icon width={20} height={20} aria-hidden />
              </div>
              <div>
                <div className="an-stat-lbl">{s.label}</div>
                <div className="an-stat-num">{s.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Charts grid ── */}
        <div className="an-charts-grid">

          {/* Difficulty Distribution */}
          <div className="an-card">
            <div className="an-sec-title">
              <Target className="an-sec-icon" width={16} height={16} aria-hidden />
              Difficulty Distribution
            </div>
            <div className="an-donut-wrap">
              <div className="an-donut">
                <svg viewBox="0 0 36 36" width="148" height="148" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#10b981" strokeWidth="3"
                    strokeDasharray={`${easyArc} ${circumference}`} strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#f97316" strokeWidth="3"
                    strokeDasharray={`${mediumArc} ${circumference}`}
                    strokeDashoffset={-easyArc} strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#ef4444" strokeWidth="3"
                    strokeDasharray={`${hardArc} ${circumference}`}
                    strokeDashoffset={-(easyArc + mediumArc)} strokeLinecap="round" />
                </svg>
                <div className="an-donut-center">
                  <div className="an-donut-num">{userStats.solved}</div>
                  <div className="an-donut-lbl">solved</div>
                </div>
              </div>
            </div>
            <div className="an-prog-list">
              {diffRows.map((d) => (
                <div key={d.label} className="an-prog-row">
                  <div className="an-prog-top">
                    <span className="an-prog-name">{d.label}</span>
                    <span className="an-prog-val">{d.value}/{d.total}</span>
                  </div>
                  <div className="an-prog-track">
                    <motion.div
                      className={`an-prog-fill ${d.cls}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.value / d.total) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Readiness */}
          <div className="an-card">
            <div className="an-sec-title">
              <Building2 className="an-sec-icon" width={16} height={16} aria-hidden />
              Company Readiness
            </div>
            <div className="an-prog-list">
              {readiness.map((r) => (
                <div key={r.company} className="an-prog-row">
                  <div className="an-prog-top">
                    <span className="an-prog-name">{r.company}</span>
                    <span className="an-prog-val">{r.score}%</span>
                  </div>
                  <div className="an-prog-track">
                    <motion.div
                      className={`an-prog-fill ${r.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${r.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="an-prog-sub">{r.problems} problems available</div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Mastery */}
          <div className="an-card">
            <div className="an-sec-title">
              <BookOpen className="an-sec-icon" width={16} height={16} aria-hidden />
              Topic Mastery
            </div>
            <div className="an-prog-list">
              {topTopics.map((topic, i) => {
                const mastery = Math.max(5, (i % 3 === 0 ? 55 : i % 3 === 1 ? 38 : 22) - i * 2);
                return (
                  <div key={topic.name} className="an-prog-row">
                    <div className="an-prog-top">
                      <span className="an-prog-name">{topic.name}</span>
                      <span className="an-prog-val">{mastery}%</span>
                    </div>
                    <div className="an-prog-track">
                      <motion.div
                        className="an-prog-fill an-prog-blue"
                        initial={{ width: 0 }}
                        animate={{ width: `${mastery}%` }}
                        transition={{ duration: 0.9, delay: i * 0.05 }}
                        style={{ background: `hsl(${200 + i * 12}, 70%, 50%)` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Achievements ── */}
        <div className="an-ach-section">
          <div className="an-sec-title">
            <Trophy width={16} height={16} aria-hidden />
            Achievements
          </div>
          <div className="an-ach-grid">
            {achievements.map((badge, i) => (
              <motion.div
                key={badge.name}
                className={`an-badge ${badge.unlocked ? "an-badge-unlocked" : "an-badge-locked"}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="an-badge-icon">{badge.icon}</div>
                <div className="an-badge-name">{badge.name}</div>
                <div className="an-badge-desc">{badge.desc}</div>
                {badge.unlocked && (
                  <div className="an-badge-star">
                    <Star width={12} height={12} fill="currentColor" aria-hidden />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Weekly Activity Heatmap ── */}
        <div className="an-heatmap-section">
          <div className="an-card">
            <div className="an-sec-title">
              <Calendar width={16} height={16} aria-hidden />
              Weekly Activity
            </div>
            <div className="an-heatmap" aria-label="Activity heatmap">
              {Array.from({ length: 52 * 7 }, (_, i) => {
                const r = Math.random();
                const cls = r > 0.7 ? "an-hm-3" : r > 0.4 ? "an-hm-2" : r > 0.15 ? "an-hm-1" : "an-hm-0";
                return <div key={i} className={`an-hm-cell ${cls}`} />;
              })}
            </div>
            <div className="an-heatmap-legend">
              <span>Less</span>
              <div className="an-hm-legend-cells">
                <div className="an-hm-cell an-hm-0" />
                <div className="an-hm-cell an-hm-1" />
                <div className="an-hm-cell an-hm-2" />
                <div className="an-hm-cell an-hm-3" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            FROM DASHBOARD: Company readiness cards + Activity + Progress + Goal
            ══════════════════════════════════════════════════════════════════ */}
        <div className="an-dash-divider">
          <span>Personal Dashboard</span>
        </div>

        <div className="an-dash-grid">

          {/* Left col: Company Readiness Cards + Recent Activity */}
          <div className="an-dash-col">

            {/* Company Readiness Cards */}
            <div className="an-card">
              <div className="an-sec-title">
                <Target width={16} height={16} style={{ color: "#60a5fa" }} aria-hidden />
                Company Readiness Overview
              </div>
              <div className="an-readiness-grid">
                {readinessCards.map((company, i) => (
                  <motion.div
                    key={company.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link href={`/companies/${company.name.toLowerCase()}`} className="an-company-card">
                      <div className="an-company-logo" style={{ color: company.color }}>
                        {company.logo}
                      </div>
                      <div className="an-company-name">{company.name}</div>
                      <div className="an-readiness-track">
                        <motion.div
                          className="an-readiness-fill"
                          style={{ backgroundColor: company.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${company.score}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                        />
                      </div>
                      <div className="an-readiness-pct">{company.score}% Ready</div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="an-card">
              <div className="an-sec-title">
                <Clock width={16} height={16} style={{ color: "#a78bfa" }} aria-hidden />
                Recent Activity
              </div>
              <div className="an-activity-list">
                {recentActivity.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className="an-activity-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className={`an-activity-icon ${item.type === "solve" ? "an-act-solve" : "an-act-badge"}`}>
                      {item.type === "solve"
                        ? <CheckCircle2 width={15} height={15} aria-hidden />
                        : <Award width={15} height={15} aria-hidden />}
                    </div>
                    <div className="an-activity-body">
                      <div className="an-activity-title">{item.title}</div>
                      <div className="an-activity-time">{item.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col: Progress Ring + Daily Goal */}
          <div className="an-dash-col">

            {/* Progress Ring */}
            <div className="an-card">
              <div className="an-sec-title">
                <Flame width={16} height={16} style={{ color: "#f59e0b" }} aria-hidden />
                Your Progress
              </div>
              <div className="an-progress-row">
                {/* Streak ring */}
                <div className="an-streak-box">
                  <div className="an-streak-ring">
                    <svg viewBox="0 0 100 100" className="an-streak-svg">
                      <circle cx="50" cy="50" r="45" className="an-streak-bg" />
                      <circle cx="50" cy="50" r="45" className="an-streak-fg"
                        strokeDasharray={`${(userStats.streak / 30) * 283} 283`} />
                    </svg>
                    <div className="an-streak-center">
                      <span className="an-streak-num">{userStats.streak}</span>
                      <span className="an-streak-lbl">days</span>
                    </div>
                  </div>
                  <div className="an-stat-lbl" style={{ textAlign: "center", marginTop: 8 }}>Day Streak 🔥</div>
                </div>

                {/* XP + Level */}
                <div className="an-xp-box">
                  <div className="an-xp-level">Level {userStats.level}</div>
                  <div className="an-xp-value">{userStats.xp.toLocaleString()}</div>
                  <div className="an-stat-lbl" style={{ marginBottom: 8 }}>Total XP</div>
                  <div className="an-xp-track">
                    <motion.div
                      className="an-xp-fill"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                  <div className="an-xp-caption">750 XP to Level {userStats.level + 1}</div>
                </div>
              </div>
            </div>

            {/* Daily Goal */}
            <div className="an-card">
              <div className="an-sec-title">
                <Star width={16} height={16} style={{ color: "#10b981" }} aria-hidden />
                Daily Goal
              </div>
              <div className="an-goal-card">
                <div className="an-goal-icon">
                  <CheckCircle2 width={22} height={22} aria-hidden />
                </div>
                <div>
                  <div className="an-goal-title">Solve 2 Mediums</div>
                  <div className="an-goal-sub">1 of 2 completed</div>
                </div>
              </div>
              <div className="an-prog-track" style={{ marginTop: 12 }}>
                <motion.div
                  className="an-prog-fill an-prog-green"
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              {/* Weekly goal */}
              <div style={{ marginTop: 20 }}>
                <div className="an-sec-title" style={{ marginBottom: 10, fontSize: 13 }}>
                  Weekly Goal
                </div>
                <div className="an-prog-top">
                  <span className="an-prog-name">Problems solved</span>
                  <span className="an-prog-val">{userStats.weeklyDone}/{userStats.weeklyGoal}</span>
                </div>
                <div className="an-prog-track" style={{ marginTop: 6 }}>
                  <motion.div
                    className="an-prog-fill an-prog-blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${(userStats.weeklyDone / userStats.weeklyGoal) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
