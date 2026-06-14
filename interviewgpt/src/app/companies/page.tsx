"use client";
import "./companies.css";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Building2, ChevronRight, TrendingUp, ArrowDownAZ } from "lucide-react";
import { companiesWithCounts } from "@/lib/data";

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "count">("count");

  const filtered = useMemo(() => {
    let result = companiesWithCounts.filter(c =>
      c.name !== "General Aptitude" && c.name !== "Reasoning Tests"
    );
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q));
    }
    result.sort((a, b) =>
      sortBy === "count" ? (b.problemCount || 0) - (a.problemCount || 0) : a.name.localeCompare(b.name)
    );
    return result;
  }, [search, sortBy]);

  const topCompanies = filtered.slice(0, 6);

  return (
    <div className="co-page">
      <div className="co-container">
        {/* Header */}
        <div className="co-header">
          <h1 className="co-title">
            <Building2 width={26} height={26} aria-hidden />
            Companies
          </h1>
          <p className="co-subtitle">{filtered.length} companies with dedicated problem sets</p>
        </div>

        {/* Featured top 6 */}
        <div className="co-featured-grid">
          {topCompanies.map((company, i) => (
            <motion.div
              key={company.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/companies/${company.slug}`} className="co-feat-card" data-testid={`co-feat-${company.slug}`}>
                <div className="co-feat-inner">
                  <div
                    className="co-feat-logo"
                    style={{ background: `${company.color}18`, fontSize: 26 }}
                    aria-hidden
                  >
                    {company.emoji}
                  </div>
                  <div className="co-feat-info">
                    <div className="co-feat-name">{company.name}</div>
                    <div className="co-feat-desc">{company.desc}</div>
                  </div>
                  <div className="co-feat-count">
                    <div className="co-feat-num" style={{ color: company.color }}>{company.problemCount}</div>
                    <div className="co-feat-lbl">problems</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="co-controls">
          <div className="co-search-wrap">
            <Search className="co-search-icon" width={16} height={16} aria-hidden />
            <input
              type="text"
              placeholder="Search companies…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="co-search"
              aria-label="Search companies"
            />
          </div>
          <div className="co-sort-btns">
            <button
              onClick={() => setSortBy("count")}
              className={`co-sort-btn ${sortBy === "count" ? "active" : ""}`}
              data-testid="sort-by-count"
            >
              <TrendingUp width={13} height={13} aria-hidden /> By Problems
            </button>
            <button
              onClick={() => setSortBy("name")}
              className={`co-sort-btn ${sortBy === "name" ? "active" : ""}`}
              data-testid="sort-by-name"
            >
              <ArrowDownAZ width={13} height={13} aria-hidden /> A–Z
            </button>
          </div>
        </div>

        {/* All companies */}
        <div className="co-section-label">All Companies ({filtered.length})</div>
        <div className="co-all-grid">
          {filtered.map((company, i) => (
            <motion.div
              key={company.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Math.min(i * 0.008, 0.25) }}
            >
              <Link href={`/companies/${company.slug}`} className="co-item" data-testid={`co-item-${company.slug}`}>
                <span className="co-item-emoji">{company.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="co-item-name">{company.name}</div>
                </div>
                <span className="co-item-cnt">{company.problemCount}</span>
                <ChevronRight className="co-item-arrow" width={14} height={14} aria-hidden />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
