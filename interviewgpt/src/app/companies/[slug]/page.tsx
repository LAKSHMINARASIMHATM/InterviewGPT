"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BarChart3, Search, Clock, Shield, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { getCompanyBySlug, getProblemsForCompany } from "@/lib/data";
import { getCompanyRounds } from "@/lib/data/company_rounds";
import { getDifficultyBg } from "@/lib/utils";

const PROBLEMS_PER_PAGE = 25;

export default function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const company = getCompanyBySlug(slug);

  const [activeTab, setActiveTab] = useState<"problems" | "rounds">("problems");
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [topicFilter, setTopic] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const problems = useMemo(() => {
    if (!company) return [];
    return getProblemsForCompany(company.name);
  }, [company]);

  const rounds = useMemo(() => {
    return getCompanyRounds(slug);
  }, [slug]);

  const allTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    problems.forEach(p => p.topics.split(", ").forEach(t => topicsSet.add(t)));
    return ["All", ...Array.from(topicsSet)].sort();
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || String(p.id).includes(search);
      const matchesDiff = difficultyFilter === "All" || p.difficulty === difficultyFilter;
      const matchesTopic = topicFilter === "All" || p.topics.includes(topicFilter);
      return matchesSearch && matchesDiff && matchesTopic;
    });
  }, [problems, search, difficultyFilter, topicFilter]);

  const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE) || 1;

  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * PROBLEMS_PER_PAGE;
    return filteredProblems.slice(startIndex, startIndex + PROBLEMS_PER_PAGE);
  }, [filteredProblems, currentPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (diff: string) => {
    setDifficultyFilter(diff);
    setCurrentPage(1);
  };

  const handleTopicChange = (topic: string) => {
    setTopic(topic);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxButtons = 5;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Company Not Found</h2>
          <Link href="/companies" className="text-blue-400 hover:underline">← Back to companies</Link>
        </div>
      </div>
    );
  }

  const easy = problems.filter(p => p.difficulty === "Easy").length;
  const medium = problems.filter(p => p.difficulty === "Medium").length;
  const hard = problems.filter(p => p.difficulty === "Hard").length;
  const total = problems.length;

  const startIndex = (currentPage - 1) * PROBLEMS_PER_PAGE;

  return (
    <div className="min-h-screen bg-dots pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 pb-12">
        <Link href="/companies" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>

        {/* Company Header */}
        <div className="glass-card p-10 mb-12 relative overflow-hidden">
          {/* Subtle gradient light flare */}
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${company.color} 0%, transparent 70%)` }}
          />

          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg border border-white/10" style={{ background: `linear-gradient(135deg, ${company.color}20, ${company.color}05)` }}>
              {company.emoji}
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight animate-count-up" style={{ color: company.color }}>{company.name}</h1>
              <p className="text-gray-400 text-base md:text-lg mt-2">{company.desc}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
            {[
              { label: "Total", value: total, color: "text-white", border: "border-white/5" },
              { label: "Easy", value: easy, color: "text-emerald-400", border: "border-emerald-500/10" },
              { label: "Medium", value: medium, color: "text-amber-400", border: "border-amber-500/10" },
              { label: "Hard", value: hard, color: "text-rose-400", border: "border-rose-500/10" },
            ].map(s => (
              <div key={s.label} className={`p-5 bg-white/[0.02] rounded-xl border ${s.border} text-center shadow-inner`}>
                <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-2 font-semibold uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Difficulty Bar */}
          {total > 0 && (
            <div className="mt-8 relative z-10">
              <div className="h-2.5 rounded-full overflow-hidden flex bg-white/5">
                <div className="bg-emerald-500 transition-all" style={{ width: `${(easy / total) * 100}%` }} />
                <div className="bg-amber-500 transition-all" style={{ width: `${(medium / total) * 100}%` }} />
                <div className="bg-rose-500 transition-all" style={{ width: `${(hard / total) * 100}%` }} />
              </div>
              <div className="flex justify-between mt-3 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Easy {Math.round((easy / total) * 100)}%</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Medium {Math.round((medium / total) * 100)}%</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Hard {Math.round((hard / total) * 100)}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Tab Controls (Segmented Control design) */}
        <div className="flex justify-center md:justify-start mb-12">
          <div className="bg-white/[0.03] p-1.5 rounded-2xl flex gap-1.5 border border-white/5 shadow-lg backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("problems")}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "problems"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              📂 Coding Problems
            </button>
            <button
              onClick={() => setActiveTab("rounds")}
              className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "rounds"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              🔄 Interview Process & Rounds
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "problems" ? (
            <motion.div
              key="problems-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {/* Search & Filters */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Search */}
                <div className="relative md:col-span-5">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search problems by name or ID..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all placeholder:text-gray-500"
                  />
                </div>

                {/* Difficulty Filters */}
                <div className="md:col-span-4 h-12 flex bg-white/[0.02] p-1 border border-white/10 rounded-xl gap-1.5">
                  {["All", "Easy", "Medium", "Hard"].map((d) => {
                    const isActive = difficultyFilter === d;
                    let activeStyle = "bg-purple-600 text-white border-purple-500";
                    if (isActive) {
                      if (d === "Easy") activeStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/10";
                      else if (d === "Medium") activeStyle = "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-sm shadow-amber-500/10";
                      else if (d === "Hard") activeStyle = "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-sm shadow-rose-500/10";
                    }
                    return (
                      <button
                        key={d}
                        onClick={() => handleDifficultyChange(d)}
                        className={`flex-1 h-full flex items-center justify-center rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isActive
                            ? `${activeStyle}`
                            : "bg-transparent border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>

                {/* Topic Selector */}
                <div className="md:col-span-3">
                  <select
                    value={topicFilter}
                    onChange={(e) => handleTopicChange(e.target.value)}
                    className="w-full h-12 bg-[#0a0e1a]/80 border border-white/10 rounded-xl px-4 text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 transition-all cursor-pointer"
                  >
                    <option value="All">All Topics</option>
                    {allTopics.filter(t => t !== "All").map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Problem List Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-xl flex items-center gap-2.5 text-white tracking-tight">
                    <BarChart3 className="w-6 h-6 text-purple-400" />
                    Problem Bank
                  </h2>
                  <span className="text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 font-semibold">
                    Showing <strong className="text-purple-400">{filteredProblems.length}</strong> of {total}
                  </span>
                </div>

                <div className="space-y-4">
                  {paginatedProblems.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.01, 0.2) }}>
                      <Link href={`/problems/${p.id}`} className="flex items-center justify-between gap-6 px-10 py-6 bg-white/[0.02] border border-white/5 hover:border-purple-500/20 rounded-2xl hover:bg-white/[0.04] hover:shadow-xl transition-all group">
                        {/* Left Side: ID & Title */}
                        <div className="flex items-center gap-6 flex-1 min-w-0">
                          <span className="text-sm md:text-base text-gray-500 font-mono w-14 flex-shrink-0 group-hover:text-purple-400 transition-colors">
                            #{p.id}
                          </span>
                          <span className="text-base md:text-lg font-bold text-gray-200 group-hover:text-white transition-colors truncate tracking-tight">
                            {p.title}
                          </span>
                        </div>

                        {/* Right Side: Topics & Difficulty & Action Chevron */}
                        <div className="flex items-center gap-6 flex-shrink-0">
                          <div className="hidden md:flex flex-wrap gap-2 max-w-[280px] justify-end">
                            {p.topics.split(", ").slice(0, 2).map(t => (
                              <span key={t} className="px-3 py-1 bg-purple-500/5 border border-purple-500/10 rounded-lg text-xs text-purple-300 font-semibold">
                                {t}
                              </span>
                            ))}
                          </div>
                          <span className={`px-4 py-1.5 rounded-xl text-xs font-extrabold border shadow-sm ${getDifficultyBg(p.difficulty)}`}>
                            {p.difficulty}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  {filteredProblems.length === 0 && (
                    <div className="py-24 text-center text-gray-500 text-base glass-card border border-white/5 rounded-2xl">
                      No problems match your search or filters.
                    </div>
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-6 bg-white/[0.02] border border-white/5 rounded-2xl shadow-xl mt-8">
                    <div className="text-xs text-gray-500">
                      Showing <span className="text-gray-300 font-semibold">{startIndex + 1}</span> to{" "}
                      <span className="text-gray-300 font-semibold">
                        {Math.min(startIndex + PROBLEMS_PER_PAGE, filteredProblems.length)}
                      </span>{" "}
                      of <span className="text-gray-300 font-semibold">{filteredProblems.length}</span> problems
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {getPageNumbers().map((p, idx) => {
                        if (typeof p === "string") {
                          return (
                            <span key={idx} className="px-3 text-xs text-gray-600">
                              {p}
                            </span>
                          );
                        }
                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(p)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              currentPage === p
                                ? "bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-500/25"
                                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        aria-label="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="rounds-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Informative Intro Banner */}
              <div className="glass-card p-6 flex items-start gap-4 text-sm text-gray-400 border-l-4 border-l-purple-500">
                <span className="text-2xl mt-0.5">💡</span>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1">Interview Prep Roadmap</h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    This is the typical software engineering interview structure for <strong>{company.name}</strong>. 
                    Click on any recommended topic tag below to immediately filter the question bank and start practicing.
                  </p>
                </div>
              </div>

              {/* Timeline Container */}
              <div className="relative flex flex-col gap-8 pl-4 md:pl-12 mt-6">
                {/* Timeline Vertical Line */}
                <div className="absolute left-10 md:left-20 top-8 bottom-8 w-0.5 bg-gradient-to-b from-purple-500 to-white/5 z-0" />

                {rounds.map((r, index) => (
                  <div key={index} className="flex gap-8 relative z-10">
                    {/* Timeline Node */}
                    <div 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#0f1526] border flex items-center justify-center text-xl md:text-2xl shadow-xl flex-shrink-0 transition-transform hover:scale-105 duration-200"
                      style={{ borderColor: `${company.color}25` }}
                    >
                      {r.icon}
                    </div>

                    {/* Content Card */}
                    <div className="glass-card p-8 flex-1 flex flex-col gap-5 shadow-xl hover:border-white/20 transition-all duration-200">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-1">
                            Round {index + 1}
                          </span>
                          <h3 className="text-xl font-bold text-white tracking-tight">
                            {r.name}
                          </h3>
                        </div>
                        <div className="flex gap-2.5 flex-wrap">
                          <span className="text-[11px] font-semibold bg-white/5 text-gray-300 px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" /> {r.duration}
                          </span>
                          <span className="text-[11px] font-semibold bg-purple-500/10 text-purple-300 px-3.5 py-1.5 rounded-full border border-purple-500/20 flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-purple-400" /> {r.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                        {r.desc}
                      </p>

                      {r.topics && r.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2.5 items-center border-t border-white/5 pt-5 mt-2">
                          <span className="text-[11px] font-semibold text-gray-500 mr-2 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" /> Recommended Topics:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {r.topics.map((topic, tIdx) => (
                              <button
                                key={tIdx}
                                onClick={() => {
                                  setTopic(topic);
                                  setCurrentPage(1);
                                  setActiveTab("problems");
                                }}
                                className="px-3 py-1.5 bg-white/5 hover:bg-purple-600/10 text-gray-400 hover:text-purple-300 border border-white/10 hover:border-purple-500/30 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <Search className="w-3 h-3 text-gray-500" /> {topic}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
