"use client";
import "./problems.css";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, ExternalLink, ArrowUpDown, Code2 } from "lucide-react";
import { problems, topics } from "@/lib/data";
import type { Problem } from "@/lib/types";

const ITEMS_PER_PAGE = 30;

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const searchParams = useSearchParams();
  const initialTopic = searchParams ? (searchParams.get("topic") || "All") : "All";
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<"id" | "title" | "difficulty">("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [solvedIds, setSolvedIds] = useState<number[]>([]);

  useEffect(() => {
    async function loadSolved() {
      try {
        const res = await fetch("/api/analytics");
        if (res.ok) {
          const data = await res.json();
          if (data.solvedProblemIds) {
            setSolvedIds(data.solvedProblemIds);
          }
        }
      } catch (err) {
        console.error("Failed to load solved problems:", err);
      }
    }
    loadSolved();
  }, []);

  const codingProblems = useMemo(() =>
    problems.filter(p =>
      !p.companies.includes("General Aptitude") &&
      !p.companies.includes("Reasoning Tests") &&
      !p.topics.toLowerCase().includes("aptitude")
    ), []);

  const filtered = useMemo(() => {
    let result = [...codingProblems];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) || String(p.id).includes(q) || p.topics.toLowerCase().includes(q)
      );
    }
    if (difficulty !== "All") result = result.filter(p => p.difficulty === difficulty);
    if (selectedTopic !== "All") result = result.filter(p => p.topics.toLowerCase().includes(selectedTopic.toLowerCase()));
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "id") cmp = a.id - b.id;
      else if (sortField === "title") cmp = a.title.localeCompare(b.title);
      else { const o = { Easy: 0, Medium: 1, Hard: 2 }; cmp = (o[a.difficulty] || 0) - (o[b.difficulty] || 0); }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [codingProblems, search, difficulty, selectedTopic, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const topTopics = useMemo(() =>
    topics.filter(t => !t.name.toLowerCase().includes("aptitude") && !t.name.toLowerCase().includes("reasoning"))
      .sort((a, b) => b.count - a.count).slice(0, 25), []);

  function toggleSort(field: "id" | "title" | "difficulty") {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  }

  function diffBadgeClass(diff: string) {
    if (diff === "Easy")   return "pr-badge-easy";
    if (diff === "Medium") return "pr-badge-medium";
    return "pr-badge-hard";
  }

  const diffCounts = useMemo(() => ({
    Easy:   codingProblems.filter(p => p.difficulty === "Easy").length,
    Medium: codingProblems.filter(p => p.difficulty === "Medium").length,
    Hard:   codingProblems.filter(p => p.difficulty === "Hard").length,
  }), [codingProblems]);

  return (
    <div className="pr-page">
      <div className="pr-container">
        {/* Header */}
        <div className="pr-header">
          <h1 className="pr-title">
            <Code2 className="pr-title-icon" width={26} height={26} aria-hidden />
            Problem Set
          </h1>
          <p className="pr-subtitle">
            {filtered.length.toLocaleString()} problems · Practice company-specific coding questions
          </p>
        </div>

        {/* Filter panel */}
        <div className="pr-filter-panel">
          <div className="pr-filter-row">
            {/* Search */}
            <div className="pr-search-wrap">
              <Search className="pr-search-icon" width={16} height={16} aria-hidden />
              <input
                type="text"
                placeholder="Search by title, ID, or topic…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="pr-search"
                aria-label="Search problems"
              />
            </div>
            {/* Difficulty */}
            <div className="pr-diff-pills">
              {(["All", "Easy", "Medium", "Hard"] as const).map(d => (
                <button
                  key={d}
                  onClick={() => { setDifficulty(d); setPage(1); }}
                  className={`pr-diff-btn ${difficulty === d
                    ? d === "Easy" ? "pr-diff-easy"
                    : d === "Medium" ? "pr-diff-medium"
                    : d === "Hard" ? "pr-diff-hard"
                    : "pr-diff-all"
                    : ""}`}
                  data-testid={`diff-filter-${d.toLowerCase()}`}
                >
                  {d}
                  {d !== "All" && <span style={{ opacity: .55, fontSize: 11, marginLeft: 4 }}>{diffCounts[d]}</span>}
                </button>
              ))}
            </div>
          </div>
          {/* Topic chips */}
          <div className="pr-topics-bar">
            <button
              onClick={() => { setSelectedTopic("All"); setPage(1); }}
              className={`pr-topic-chip ${selectedTopic === "All" ? "active" : ""}`}
            >All Topics</button>
            {topTopics.map(t => (
              <button
                key={t.slug}
                onClick={() => { setSelectedTopic(t.name); setPage(1); }}
                className={`pr-topic-chip ${selectedTopic === t.name ? "active" : ""}`}
              >
                {t.name} <span style={{ opacity: .5 }}>{t.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="pr-table-wrap">
          <div className="pr-table-head">
            <button className={`pr-sort-btn ${sortField === "id" ? "active" : ""}`} onClick={() => toggleSort("id")}>
              # <ArrowUpDown width={12} height={12} />
            </button>
            <button className={`pr-sort-btn ${sortField === "title" ? "active" : ""}`} onClick={() => toggleSort("title")}>
              Title <ArrowUpDown width={12} height={12} />
            </button>
            <button className={`pr-sort-btn ${sortField === "difficulty" ? "active" : ""}`} onClick={() => toggleSort("difficulty")}>
              Difficulty <ArrowUpDown width={12} height={12} />
            </button>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--pr-n500)" }}>Topics</div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--pr-n500)" }} className="hidden lg:block">Companies</div>
            <div />
          </div>

          <div>
            {paginated.map((problem, i) => (
              <motion.div key={problem.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.015 }}>
                <Link href={`/problems/${problem.id}`} className="pr-row" data-testid={`problem-row-${problem.id}`}>
                  <span className="pr-row-id">{problem.id}</span>
                  <span className="pr-row-title" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {problem.title}
                    {solvedIds.includes(problem.id) && (
                      <span style={{ color: "var(--pr-success)", fontSize: "14px", fontWeight: "bold" }} title="Solved">✓</span>
                    )}
                  </span>
                  <span className={diffBadgeClass(problem.difficulty)}>{problem.difficulty}</span>
                  <div className="pr-tags">
                    {problem.topics.split(", ").slice(0, 3).map(t => (
                      <span key={t} className="pr-tag-topic">{t}</span>
                    ))}
                  </div>
                  <div className="pr-tags" style={{ display: "none" }} data-desktop>
                    {problem.companies.slice(0, 3).map(c => (
                      <span key={c} className="pr-tag-co">{c}</span>
                    ))}
                    {problem.companies.length > 3 && <span className="pr-tag-more">+{problem.companies.length - 3}</span>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <ExternalLink className="pr-action" width={15} height={15} aria-hidden />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {paginated.length === 0 && (
            <div className="pr-empty">
              <Code2 className="pr-empty-icon" width={48} height={48} aria-hidden />
              <h3>No problems found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pr-pagination">
            <p className="pr-pag-info">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </p>
            <div className="pr-pag-controls">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="pr-pag-btn" aria-label="Previous page">
                <ChevronLeft width={16} height={16} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const n = page <= 3 ? i + 1 : page + i - 2;
                if (n < 1 || n > totalPages) return null;
                return (
                  <button key={n} onClick={() => setPage(n)} className={`pr-pag-btn ${page === n ? "active" : ""}`}>{n}</button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="pr-pag-btn" aria-label="Next page">
                <ChevronRight width={16} height={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
