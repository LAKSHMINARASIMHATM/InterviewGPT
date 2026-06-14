"use client";
import "./home.css";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, Code2, Building2, Brain, BarChart3, Trophy, Bot,
  ArrowRight, Sparkles, BookOpen, Target, Shield,
  Layers, GitBranch, Star, TrendingUp,
} from "lucide-react";
import { getStats, featuredCompanies } from "@/lib/data";

const stats = getStats();

const features = [
  {
    icon: Building2,
    title: "Company-Wise Problems",
    desc: "Practice exact questions from 470+ companies — FAANG, quant firms, and top startups — with real hiring frequency data.",
    grad: "linear-gradient(135deg,#1d4ed8,#0ea5e9)",
    count: `${stats.companies}+`,
  },
  {
    icon: Code2,
    title: "1800+ Curated Problems",
    desc: "Every problem ships with approach analysis, time/space complexity, and solutions in 4+ languages.",
    grad: "linear-gradient(135deg,#7c3aed,#db2777)",
    count: `${stats.total}+`,
  },
  {
    icon: Bot,
    title: "AI Interview Coach",
    desc: "GPT-4o mentor that explains problems, reviews your code, and runs mock interviews in real time.",
    grad: "linear-gradient(135deg,#059669,#0d9488)",
    count: "GPT-4o",
  },
  {
    icon: Brain,
    title: "Smart Hint System",
    desc: "Three-level progressive hints guide you to the insight without spoiling the solution.",
    grad: "linear-gradient(135deg,#d97706,#ea580c)",
    count: "3 Hints",
  },
  {
    icon: BarChart3,
    title: "Analytics & Readiness",
    desc: "Live dashboards track solved patterns, weak spots, and interview readiness per target company.",
    grad: "linear-gradient(135deg,#dc2626,#e11d48)",
    count: "Live",
  },
  {
    icon: Target,
    title: "Personalized Roadmaps",
    desc: "AI-generated 7/30/90-day plans built from your history and your target companies.",
    grad: "linear-gradient(135deg,#4338ca,#7c3aed)",
    count: "Custom",
  },
];

const dsaTopics = [
  "Arrays", "Strings", "Hash Maps", "Sliding Window", "Two Pointers",
  "Linked Lists", "Stack", "Queue", "Heap", "Binary Search",
  "Trees", "Graphs", "Dynamic Programming", "Backtracking",
  "Greedy", "Bit Manipulation", "Tries", "Segment Trees",
];

const aiCards = [
  {
    icon: Bot,
    title: "AI Interview Coach",
    desc: "ChatGPT-like mentor that explains problems, reviews code, conducts mock interviews, and guides your entire learning journey.",
    grad: "linear-gradient(135deg,rgba(29,78,216,0.12),rgba(109,40,217,0.12))",
    border: "rgba(29,78,216,0.3)",
    iconBg: "rgba(29,78,216,0.2)",
    iconColor: "#60a5fa",
  },
  {
    icon: Shield,
    title: "AI Code Review",
    desc: "Paste your solution and receive instant feedback on correctness, edge cases, complexity, and an interview score out of 100.",
    grad: "linear-gradient(135deg,rgba(5,150,105,0.12),rgba(13,148,136,0.12))",
    border: "rgba(5,150,105,0.3)",
    iconBg: "rgba(5,150,105,0.2)",
    iconColor: "#34d399",
  },
  {
    icon: GitBranch,
    title: "RAG Knowledge System",
    desc: "Vector search across our full problem database delivers contextual, source-backed explanations for every query.",
    grad: "linear-gradient(135deg,rgba(217,119,6,0.12),rgba(234,88,12,0.12))",
    border: "rgba(217,119,6,0.3)",
    iconBg: "rgba(217,119,6,0.2)",
    iconColor: "#fbbf24",
  },
  {
    icon: TrendingUp,
    title: "Pattern Detector",
    desc: "AI reads your solved-problem history to surface mastered patterns, knowledge gaps, and the exact next questions to close them.",
    grad: "linear-gradient(135deg,rgba(220,38,38,0.12),rgba(225,29,72,0.12))",
    border: "rgba(220,38,38,0.3)",
    iconBg: "rgba(220,38,38,0.2)",
    iconColor: "#f87171",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const statItems = [
  { label: "Problems",  value: stats.total,     icon: Code2,     color: "#60a5fa" },
  { label: "Companies", value: stats.companies,  icon: Building2, color: "#a78bfa" },
  { label: "Topics",    value: stats.topics,     icon: BookOpen,  color: "#22d3ee" },
  { label: "Languages", value: 6,                icon: Layers,    color: "#34d399" },
];

const diffRows = [
  { label: "Easy",   count: stats.easy,   fill: "hp-fill-easy",   color: "#22C55E" },
  { label: "Medium", count: stats.medium, fill: "hp-fill-medium", color: "#F59E0B" },
  { label: "Hard",   count: stats.hard,   fill: "hp-fill-hard",   color: "#EF4444" },
];

export default function HomePage() {
  return (
    <div className="home-page">
      {/* ── Background layers ── */}
      <div className="hp-bg-grad" aria-hidden />
      <div className="hp-bg-grid" aria-hidden />

      {/* ════════ HERO ════════ */}
      <section className="hp-hero" aria-label="Hero">
        <div className="hp-hero-img-bg" aria-hidden />
        <div className="hp-hero-img-overlay" aria-hidden />

        <div className="hp-hero-body">
          {/* Pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hp-pill"
          >
            <span className="hp-pill-dot" aria-hidden />
            AI-Powered Interview Preparation
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="hp-h1"
          >
            Master Coding<br />
            <span className="hp-h1-hi">Interviews</span>{" "}with AI
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="hp-sub"
          >
            Practice {stats.total.toLocaleString()}+ problems from {stats.companies}+ companies.
            AI-generated hints, optimal solutions, code reviews, and personalized
            roadmaps — all in one platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hp-cta-row"
          >
            <Link href="/problems" className="hp-btn-white" data-testid="hero-start-btn">
              Start Practicing
              <ArrowRight className="hp-btn-arrow" width={16} height={16} />
            </Link>
            <Link href="/companies" className="hp-btn-accent" data-testid="hero-companies-btn">
              <Building2 width={16} height={16} />
              Explore Companies
            </Link>
            <Link href="/topics" className="hp-btn-ghost" data-testid="hero-topics-btn">
              <BookOpen width={16} height={16} />
              Browse Topics
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.65 }}
          >
            <div className="hp-stats" role="list" aria-label="Platform statistics">
              {statItems.map((s) => (
                <div key={s.label} className="hp-stat" role="listitem">
                  <div className="hp-stat-icon">
                    <s.icon width={20} height={20} style={{ color: s.color }} aria-hidden />
                  </div>
                  <div className="hp-stat-num">{s.value.toLocaleString()}+</div>
                  <div className="hp-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="hp-rule" aria-hidden />

      {/* ════════ FEATURES ════════ */}
      <section className="hp-sec" aria-label="Features">
        <div className="hp-wrap">
          <div className="hp-sec-head">
            <span className="hp-overline">Platform Features</span>
            <h2 className="hp-h2">
              Everything You Need to{" "}
              <span className="gradient-text">Ace Your Interview</span>
            </h2>
            <p className="hp-h2-sub">
              A complete ecosystem combining the best of LeetCode, NeetCode,
              ChatGPT, and AlgoExpert — built for serious candidates.
            </p>
          </div>

          <div className="hp-feat-grid">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="hp-feat"
              >
                <div
                  className="hp-feat-ico"
                  style={{ background: f.grad }}
                  aria-hidden
                >
                  <f.icon width={20} height={20} color="#fff" />
                </div>
                <div className="hp-feat-top">
                  <h3 className="hp-feat-name">{f.title}</h3>
                  <span className="hp-feat-tag mono">{f.count}</span>
                </div>
                <p className="hp-feat-desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hp-rule" aria-hidden />

      {/* ════════ COMPANY MARQUEE ════════ */}
      <section className="hp-marq-sec" aria-label="Companies">
        <div className="hp-marq-head">
          <span className="hp-overline">Problem Sources</span>
          <h2 className="hp-h2">
            Questions from{" "}
            <span className="gradient-text">{stats.companies}+ Companies</span>
          </h2>
          <p className="hp-h2-sub">
            Practice the exact questions asked at top tech companies worldwide
          </p>
        </div>

        <div className="hp-marq-wrap" aria-hidden>
          <div className="hp-marq-fl" />
          <div className="hp-marq-track">
            {[...featuredCompanies, ...featuredCompanies].map((co, i) => (
              <Link
                key={`${co.slug}-${i}`}
                href={`/companies/${co.slug}`}
                className="hp-co-chip"
                tabIndex={-1}
              >
                <span className="hp-co-emoji">{co.emoji}</span>
                <div>
                  <div className="hp-co-name">{co.name}</div>
                  <div className="hp-co-cnt">{co.problemCount} problems</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="hp-marq-fr" />
        </div>
      </section>

      <div className="hp-rule" aria-hidden />

      {/* ════════ DSA TOPICS ════════ */}
      <section className="hp-sec" aria-label="DSA Topics">
        <div className="hp-wrap">
          <div className="hp-sec-head">
            <span className="hp-overline">Learning Paths</span>
            <h2 className="hp-h2">
              Master Every{" "}
              <span className="gradient-text">DSA Pattern</span>
            </h2>
            <p className="hp-h2-sub">
              Structured paths across all major data structures and algorithms —
              from arrays to segment trees
            </p>
          </div>

          <div className="hp-topics" role="list">
            {dsaTopics.map((topic, i) => (
              <motion.div
                key={topic}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                role="listitem"
              >
                <Link
                  href={`/topics/${topic.toLowerCase().replace(/ /g, "-")}`}
                  className="hp-topic"
                  data-testid={`topic-chip-${topic.toLowerCase().replace(/ /g, "-")}`}
                >
                  {topic}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hp-rule" aria-hidden />

      {/* ════════ AI FEATURES ════════ */}
      <section className="hp-ai-sec" aria-label="AI Features">
        <div className="hp-wrap">
          <div className="hp-sec-head">
            <span className="hp-overline">Powered by GPT-4o</span>
            <h2 className="hp-h2">
              <span className="gradient-text">AI Intelligence</span>{" "}
              at Every Step
            </h2>
            <p className="hp-h2-sub">
              Four AI systems working together to make preparation smarter,
              faster, and more personalized
            </p>
          </div>

          <div className="hp-ai-grid">
            {aiCards.map((c, i) => (
              <motion.div
                key={c.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="hp-ai-card"
                style={{
                  background: c.grad,
                  borderColor: c.border,
                }}
              >
                <div
                  className="hp-ai-ico"
                  style={{ background: c.iconBg }}
                  aria-hidden
                >
                  <c.icon width={20} height={20} style={{ color: c.iconColor }} />
                </div>
                <h3 className="hp-ai-name">{c.title}</h3>
                <p className="hp-ai-desc">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hp-rule" aria-hidden />

      {/* ════════ DISTRIBUTION ════════ */}
      <section className="hp-sec" aria-label="Problem Distribution">
        <div className="hp-wrap-sm">
          <div className="hp-sec-head">
            <span className="hp-overline">Difficulty Spread</span>
            <h2 className="hp-h2">Problem Distribution</h2>
            <p className="hp-h2-sub">
              A balanced library across all difficulty levels to build
              confidence from ground up to FAANG-hard
            </p>
          </div>

          <div className="hp-dist">
            <div className="hp-dist-title">
              {stats.total.toLocaleString()}+ Total Problems
            </div>
            <div className="hp-dist-rows">
              {diffRows.map((d) => (
                <div key={d.label}>
                  <div className="hp-dist-row-top">
                    <span className="hp-dist-lbl" style={{ color: d.color }}>
                      {d.label}
                    </span>
                    <span className="hp-dist-cnt">
                      {d.count.toLocaleString()} &nbsp;·&nbsp; {Math.round((d.count / stats.total) * 100)}%
                    </span>
                  </div>
                  <div className="hp-dist-track">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(d.count / stats.total) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`hp-dist-fill ${d.fill}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="hp-rule" aria-hidden />

      {/* ════════ CTA ════════ */}
      <section className="hp-cta-sec" aria-label="Call to action">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hp-cta-box"
        >
          <Trophy className="hp-cta-trophy" aria-hidden />
          <h2 className="hp-cta-title">Ready to Start Your Journey?</h2>
          <p className="hp-cta-sub">
            Join thousands of developers preparing for their dream job
            at top tech companies — FAANG, unicorns, and beyond.
          </p>
          <div className="hp-cta-row" style={{ marginBottom: 0 }}>
            <Link
              href="/problems"
              className="hp-btn-white"
              data-testid="cta-start-btn"
            >
              Start Solving Now
              <ArrowRight className="hp-btn-arrow" width={16} height={16} />
            </Link>
            <Link
              href="/companies"
              className="hp-btn-ghost"
              data-testid="cta-companies-btn"
            >
              <Building2 width={16} height={16} />
              Browse Companies
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="hp-footer">
        <div className="hp-footer-in">
          <div className="hp-footer-brand">
            <div className="hp-footer-logo" aria-hidden>
              <Zap width={14} height={14} color="#fff" />
            </div>
            <span className="hp-footer-name">InterviewGPT</span>
          </div>
          <p className="hp-footer-meta">
            AI-Powered Coding Interview Preparation &nbsp;·&nbsp; {stats.total.toLocaleString()}+ Problems &nbsp;·&nbsp; {stats.companies}+ Companies
          </p>
          <div className="hp-footer-by">
            Built with{" "}
            <Star className="hp-footer-star" width={13} height={13} aria-hidden />{" "}
            by Lakshmi Narasimha
          </div>
        </div>
      </footer>
    </div>
  );
}
