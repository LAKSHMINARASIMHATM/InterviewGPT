"use client";

import "./search.css";
import {
  Search as SearchIcon,
  Sparkles,
  BookOpen,
  Lightbulb,
  Key,
  Clock,
  Layers,
  ArrowRight,
  AlertCircle,
  Code2,
  FileText,
  Brain
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import Link from "next/link";
import { getDifficultyBg, getTopicIcon } from "@/lib/utils";

interface SearchResult {
  id: number;
  title: string;
  type: "coding" | "concept" | "pattern";
  difficulty: "Easy" | "Medium" | "Hard";
  relevanceReason: string;
  snippet: string;
  keyInsight: string;
  companies: string[];
  topics: string;
  approach: string;
  time: string;
  space: string;
  relatedPatterns: string[];
  url: string;
}

interface SearchResponse {
  summary: string;
  results: SearchResult[];
  conceptExplanation?: string;
  studyTip?: string;
}

function highlightText(text: string, query: string) {
  if (!text) return "";
  if (!query || !query.trim()) return text;
  
  const terms = query
    .split(/\s+/)
    .map(t => t.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(t => t.length > 1);
  
  if (terms.length === 0) return text;
  
  try {
    const escapedTerms = terms.map(t => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const pattern = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
    const parts = text.split(pattern);
    
    return (
      <>
        {parts.map((part, i) => 
          pattern.test(part) ? (
            <mark key={i} className="sr-highlight">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  } catch (e) {
    return text;
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [searchedQuery, setSearchedQuery] = useState("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);
    setSearchedQuery(query);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch search results. Please try again.");
      }

      const searchData = await res.json();
      setData(searchData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sr-page pb-32 relative overflow-hidden">
      <div className="noise" />
      {/* Ambient Background Glows */}
      <div className="sr-glow-1" />
      <div className="sr-glow-2" />

      <div className="sr-container max-w-[1600px] mx-auto px-6 md:px-12 pt-10">

        {/* Header */}
        <div className="sr-header text-center mb-10">
          <h1 className="sr-title text-4xl font-extrabold tracking-tight mb-4">
            AI Knowledge Search
          </h1>
          <Brain className="w-12 h-12 sr-header-icon animate-pulse" />
          <p className="text-gray-400 text-sm text-center mt-10px">
            Deep-search problems, coding patterns, and companies. InterviewGPT synthesizes retrieved problem context using RAG reasoning.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="sr-search-box">
          <SearchIcon className="sr-search-icon" />
          <input
            type="text"
            className="sr-input"
            placeholder="Search 'sliding window Amazon', 'Google DP hard', 'Merge k Sorted Lists'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="sr-search-btn"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Search</span>
              </>
            )}
          </button>
        </form>

        {/* Status Messages / Shimmer */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6 border-l-4 border-l-purple-500 flex items-center gap-3">
                <Brain className="w-5 h-5 text-purple-400 animate-spin" />
                <span className="text-sm text-gray-300 font-medium">
                  InterviewGPT is retrieving DSA context and generating technical breakdown...
                </span>
              </div>

              {/* Shimmer Cards */}
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="glass-card p-6 space-y-4 relative overflow-hidden">
                    <div className="shimmer absolute inset-0" />
                    <div className="h-6 bg-white/5 rounded-lg w-1/3" />
                    <div className="h-4 bg-white/5 rounded-lg w-3/4" />
                    <div className="h-16 bg-white/5 rounded-lg w-full" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6 border-l-4 border-l-rose-500 flex items-start gap-3.5"
            >
              <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Search Error</h4>
                <p className="text-sm text-gray-400">{error}</p>
              </div>
            </motion.div>
          )}

          {data && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: AI Synthesis & Search Results (8 cols) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Summary / AI Response */}
                <div className="sr-synthesis-card">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none bg-gradient-to-r from-purple-500 to-indigo-500" />
                  <div className="flex items-center gap-2.5 mb-4 relative z-10">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="text-xs font-extrabold text-purple-400 uppercase tracking-widest">
                      AI Search Synthesis
                    </span>
                  </div>
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed font-medium relative z-10">
                    {data.summary}
                  </p>
                </div>

                {/* Problem Results */}
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-gray-300 px-1">
                    Retrieved Coding Context ({data.results.length} matches)
                  </h3>

                  <div className="space-y-4">
                    {data.results.map((result, idx) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                      >
                        <div className="sr-card group">

                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400">
                                {result.type === "coding" ? <Code2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  <Link
                                    href={`/problems/${result.id}`}
                                    className="text-lg font-bold text-gray-100 hover:text-purple-400 hover:underline transition-all tracking-tight"
                                  >
                                    {highlightText(result.title, searchedQuery)}
                                  </Link>
                                  <span className="text-xs text-gray-500 font-mono">
                                    #{result.id}
                                  </span>
                                </div>
                                <p className="text-xs text-purple-400/80 font-medium italic mt-1 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5" /> {highlightText(result.relevanceReason, searchedQuery)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5 self-end sm:self-auto flex-wrap">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                                {result.type}
                              </span>
                              <span className={`px-3 py-1 rounded-lg text-xs font-extrabold border ${getDifficultyBg(result.difficulty)}`}>
                                {result.difficulty}
                              </span>
                            </div>
                          </div>

                          {/* Snippet / Approach */}
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {highlightText(result.snippet, searchedQuery)}
                          </p>

                          {/* Key Insight Block */}
                          {result.keyInsight && (
                            <div className="sr-insight-box">
                              <Key className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                              <div className="text-xs text-gray-300 leading-relaxed">
                                <strong className="text-purple-300 font-semibold block mb-0.5">Key Insight</strong>
                                {highlightText(result.keyInsight, searchedQuery)}
                              </div>
                            </div>
                          )}

                          {/* Stats Matrix */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                            <div className="sr-stat-box">
                              <span className="text-[10px] text-gray-500 font-semibold uppercase block mb-1">Time Complexity</span>
                              <span className="text-xs text-gray-200 font-mono">{result.time}</span>
                            </div>
                            <div className="sr-stat-box">
                              <span className="text-[10px] text-gray-500 font-semibold uppercase block mb-1">Space Complexity</span>
                              <span className="text-xs text-gray-200 font-mono">{result.space}</span>
                            </div>
                            <div className="sr-stat-box col-span-2">
                              <span className="text-[10px] text-gray-500 font-semibold uppercase block mb-1">Topics & Approach</span>
                              <span className="text-xs text-gray-300 truncate block">
                                {highlightText(result.topics, searchedQuery)}
                              </span>
                            </div>
                          </div>

                          {/* Metadata Pills */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/5 pt-4">
                            {/* Companies */}
                            {result.companies && result.companies.length > 0 && (
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mr-1">
                                  Top Companies:
                                </span>
                                {result.companies.map((c) => (
                                  <span
                                    key={c}
                                    className="sr-company-badge"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Related Patterns */}
                            {result.relatedPatterns && result.relatedPatterns.length > 0 && (
                              <div className="flex items-center gap-2 flex-wrap md:justify-end">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mr-1">
                                  Related Patterns:
                                </span>
                                {result.relatedPatterns.map((p) => (
                                  <span
                                    key={p}
                                    className="sr-pattern-badge"
                                  >
                                    {p}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Action link */}
                          <div className="flex justify-end mt-1">
                            <Link
                              href={`/problems/${result.id}`}
                              className="inline-flex items-center gap-1.5 text-xs text-purple-400 font-bold group-hover:text-purple-300 transition-colors"
                            >
                              Solve Problem <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>

                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Concept Spotlight, Strategy, and stats (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Concept Spotlight */}
                {data.conceptExplanation && (
                  <div className="sr-concept-card">
                    <div className="flex items-center gap-2 text-purple-400">
                      <BookOpen className="w-4 h-4" />
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-300">
                        Concept Spotlight
                      </h4>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {data.conceptExplanation}
                    </p>
                  </div>
                )}

                {/* Recommended Strategy */}
                {data.studyTip && (
                  <div className="sr-tip-card">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Lightbulb className="w-4 h-4 animate-pulse" />
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                        Recommended Strategy
                      </h4>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {data.studyTip}
                    </p>
                  </div>
                )}

                {/* RAG Engine Bento Box */}
                <div className="sr-stats-bento-card">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
                    <Brain className="w-4 h-4 animate-pulse" />
                    <span>RAG Engine Insights</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                      <span className="text-gray-400">Database Status</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" style={{ animationDuration: '3s' }} /> Active
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                      <span className="text-gray-400">Query Latency</span>
                      <span className="font-mono text-gray-200">~120ms</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5">
                      <span className="text-gray-400">Vector Dimension</span>
                      <span className="font-mono text-gray-200">1024 (BGE-Large)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Retrieval Depth</span>
                      <span className="font-mono text-gray-200">K = {data.results.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
