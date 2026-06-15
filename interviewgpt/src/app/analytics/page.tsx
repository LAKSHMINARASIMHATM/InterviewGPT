"use client";
import "./analytics.css";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BarChart3, Trophy, Target, Flame,
  Calendar, Code2, Building2, BookOpen,
  Zap, Award, Star, CheckCircle2, Clock,
  Loader2, AlertCircle
} from "lucide-react";
import { getStats } from "@/lib/data";

const stats = getStats();

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await fetch("/api/analytics");
        if (!response.ok) {
          throw new Error("Failed to load analytics data");
        }
        const json = await response.json();
        setData(json);
      } catch (err: any) {
        console.error("Error fetching analytics:", err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="an-page flex items-center justify-center min-h-[80vh]">
        <div className="text-center flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
          <p className="text-gray-400 text-sm">Loading performance metrics from MongoDB...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="an-page flex items-center justify-center min-h-[80vh]">
        <div className="text-center flex flex-col items-center gap-3 max-w-md p-6 bg-red-950/20 border border-red-500/20 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-rose-500" />
          <h2 className="text-lg font-semibold text-white">Database Error</h2>
          <p className="text-gray-400 text-sm">{error || "Failed to load real-time analytics data."}</p>
          <button 
            onClick={() => { setLoading(true); setError(null); window.location.reload(); }}
            className="mt-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg text-xs transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { userStats, readiness, topicMastery, achievements, recentActivity } = data;

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
  const totalSolvedForArc = userStats.solved || 1;
  const easyArc   = (userStats.easy   / totalSolvedForArc) * circumference;
  const mediumArc = (userStats.medium / totalSolvedForArc) * circumference;
  const hardArc   = (userStats.hard   / totalSolvedForArc) * circumference;

  // Map backend readiness to the company readiness cards style
  const readinessCards = readiness.map((r: any) => {
    let logo = "🏢";
    if (r.company === "Google") logo = "G";
    else if (r.company === "Meta") logo = "M";
    else if (r.company === "Amazon") logo = "A";
    else if (r.company === "Apple") logo = "🍎";
    else if (r.company === "Microsoft") logo = "MS";

    let color = "#4285F4";
    if (r.company === "Google") color = "#4285F4";
    else if (r.company === "Meta") color = "#0668E1";
    else if (r.company === "Amazon") color = "#FF9900";
    else if (r.company === "Apple") color = "#A2AAAD";
    else if (r.company === "Microsoft") color = "#00A4EF";

    return {
      name: r.company,
      logo,
      score: r.score,
      color
    };
  });

  return (
    <div className="an-page">
      <div className="an-container">

        {/* ── Header ── */}
        <div className="an-header">
          <h1 className="an-page-title">
            <BarChart3 width={28} height={28} aria-hidden />
            Analytics &amp; Dashboard
          </h1>
          <p className="an-page-sub">Track your progress, readiness, and interview performance from MongoDB</p>
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
              {readiness.map((r: any) => (
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
              {topicMastery.map((topic: any, i: number) => {
                return (
                  <div key={topic.name} className="an-prog-row">
                    <div className="an-prog-top">
                      <span className="an-prog-name">{topic.name}</span>
                      <span className="an-prog-val">{topic.mastery}%</span>
                    </div>
                    <div className="an-prog-track">
                      <motion.div
                        className="an-prog-fill an-prog-blue"
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.mastery}%` }}
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
            {achievements.map((badge: any, i: number) => (
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
              {(data.activity || Array(52 * 7).fill(0)).map((val: number, i: number) => {
                const cls = val >= 3 ? "an-hm-3" : val === 2 ? "an-hm-2" : val === 1 ? "an-hm-1" : "an-hm-0";
                return <div key={i} className={`an-hm-cell ${cls}`} title={`${val} problems solved`} />;
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
                {readinessCards.map((company: any, i: number) => (
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
                {recentActivity.map((item: any, i: number) => (
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
