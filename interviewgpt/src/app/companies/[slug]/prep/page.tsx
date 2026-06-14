"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, BookOpen, Clock, Shield, Briefcase, Award, CheckCircle2, 
  ChevronRight, HelpCircle, Terminal, ChevronDown, Sparkles, Code2, 
  Cpu, Check, ListTodo, Edit3, Send, MessageSquare 
} from "lucide-react";
import { getCompanyBySlug } from "@/lib/data";
import { getCompanyRounds } from "@/lib/data/company_rounds";

export default function CompanyPrepPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const company = getCompanyBySlug(slug);

  const rounds = useMemo(() => {
    return getCompanyRounds(slug);
  }, [slug]);

  const [selectedRoundIdx, setSelectedRoundIdx] = useState<number>(0);
  const [completedRounds, setCompletedRounds] = useState<Record<number, boolean>>({});
  const [completedExpectations, setCompletedExpectations] = useState<Record<string, boolean>>({});

  const [activeTab, setActiveTab] = useState<"strategy" | "practice" | "sandbox">("strategy");

  const [sandboxDrafts, setSandboxDrafts] = useState<Record<string, string>>({});
  const [submittingSandbox, setSubmittingSandbox] = useState(false);
  const [sandboxFeedback, setSandboxFeedback] = useState<Record<string, string>>({});

  const [generatedQuestions, setGeneratedQuestions] = useState<Record<number, { title: string; desc: string }>>({});
  const [generatingQuestion, setGeneratingQuestion] = useState(false);
  const [revealSolutionIdx, setRevealSolutionIdx] = useState<Record<number, boolean>>({});
  const [aiQuestionDrafts, setAiQuestionDrafts] = useState<Record<number, string>>({});
  const [aiSolutions, setAiSolutions] = useState<Record<number, string>>({});
  const [fetchingSolution, setFetchingSolution] = useState(false);

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

  const currentRound = rounds[selectedRoundIdx] || rounds[0];

  const handleSandboxSubmit = async (roundIdx: number) => {
    const draftText = sandboxDrafts[roundIdx] || "";
    if (!draftText.trim()) return;

    setSubmittingSandbox(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Please act as a FAANG interviewer. Evaluate my drafted answer for this interview round. Provide constructive feedback, readiness rating, strengths, and areas of improvement.

**Round Name:** ${currentRound.name}
**Round Type:** ${currentRound.type}
**Topics:** ${currentRound.topics?.join(", ") || ""}
**My Drafted Answer:**
${draftText}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error("AI evaluation request failed.");
      }

      const data = await response.json();
      setSandboxFeedback(prev => ({ ...prev, [roundIdx]: data.response }));
    } catch (error) {
      console.error("AI sandbox error:", error);
      setSandboxFeedback(prev => ({
        ...prev,
        [roundIdx]: "⚠️ Network error connecting to AI Coach. Please check if the backend is running, or verify your API keys."
      }));
    } finally {
      setSubmittingSandbox(false);
    }
  };

  const handleGenerateAiQuestion = async (roundIdx: number) => {
    setGeneratingQuestion(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Please generate a unique, realistic FAANG interview practice question specifically for this round.
              
**Round Name:** ${currentRound.name}
**Round Type:** ${currentRound.type}
**Topics:** ${currentRound.topics?.join(", ") || ""}

Guidelines:
1. For OA & Aptitude: Generate an aptitude challenge (e.g. math/probability/relative velocity) or basic coding exercise.
2. For DSA Level 1: Generate an algorithmic coding question on Stacks, Queues, Linked Lists, sliding windows, or two pointers.
3. For DSA Level 2: Generate an advanced algorithms question on Trees, Graphs, Backtracking, DFS/BFS, or Dynamic Programming.
4. For High-Level Design: Generate a distributed system design scenario.
5. For Behavioral: Generate a soft-skills/leadership behavioral scenario.

Output your response in the following exact JSON format:
{
  "questionTitle": "Brief question title",
  "questionDescription": "Detailed description/context of the question"
}
Make sure it is valid JSON and contains nothing else.`
            }
          ]
        })
      });

      if (!response.ok) throw new Error("Question generation failed.");
      const data = await response.json();

      let parsed;
      try {
        parsed = JSON.parse(data.response);
      } catch {
        parsed = {
          questionTitle: "AI Recommended Scenario",
          questionDescription: data.response
        };
      }

      setGeneratedQuestions(prev => ({
        ...prev,
        [roundIdx]: {
          title: parsed.questionTitle || "AI Scenario",
          desc: parsed.questionDescription || "Custom question details"
        }
      }));
    } catch (error) {
      console.error("AI question generation error:", error);
    } finally {
      setGeneratingQuestion(false);
    }
  };

  const handleFetchSolution = async (roundIdx: number) => {
    const question = generatedQuestions[roundIdx];
    if (!question) return;

    setFetchingSolution(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `For the following FAANG interview practice question, please provide the optimal solution blueprint:

**Round Name:** ${currentRound.name}
**Round Type:** ${currentRound.type}
**Question Title:** ${question.title}
**Question Description:** ${question.desc}

Format requirements:
- If Coding/DSA: Provide an optimal code skeleton/solution, time complexity, space complexity.
- If System Design: Provide API contract, database schema suggestion, scaling blueprint.
- If Behavioral: Provide a response blueprint structured using the STAR method.

Please write the optimal solution in clean, well-formatted markdown.`
            }
          ]
        })
      });

      if (!response.ok) throw new Error("Solution retrieval failed.");
      const data = await response.json();
      setAiSolutions(prev => ({ ...prev, [roundIdx]: data.response }));
      setRevealSolutionIdx(prev => ({ ...prev, [roundIdx]: true }));
    } catch (error) {
      console.error("AI solution retrieval error:", error);
    } finally {
      setFetchingSolution(false);
    }
  };

  // Calculate overall preparation percentage
  const totalRoundsCount = rounds.length;
  const completedRoundsCount = Object.values(completedRounds).filter(Boolean).length;
  const prepPercentage = Math.round((completedRoundsCount / totalRoundsCount) * 100);

  const toggleRoundCompletion = (idx: number) => {
    setCompletedRounds(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleExpectation = (key: string) => {
    setCompletedExpectations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-dots pb-32">
      <div className="w-full px-6 md:px-12 lg:px-16 pt-10 pb-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href={`/companies/${slug}`} 
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {company.name} Details
          </Link>

          <span className="text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 font-semibold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-purple-400" /> Prep Progress: {prepPercentage}%
          </span>
        </div>

        {/* Header Block */}
        <div className="glass-card p-10 mb-12 relative overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${company.color} 0%, transparent 70%)` }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg border border-white/10" style={{ background: `linear-gradient(135deg, ${company.color}20, ${company.color}05)` }}>
                {company.emoji}
              </div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: company.color }}>
                  {company.name} Preparation Dashboard
                </h1>
                <p className="text-gray-400 text-base mt-2 max-w-2xl">
                  A structured, step-by-step preparation plan mapping out requirements, strategies, and expectations for every round.
                </p>
              </div>
            </div>

            {/* Preparation Progress Bar */}
            <div className="w-full md:w-80 p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
                <span>Overall Readiness</span>
                <span style={{ color: company.color }}>{prepPercentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 rounded-full" 
                  style={{ width: `${prepPercentage}%`, backgroundColor: company.color }}
                />
              </div>
              <div className="text-[10px] text-gray-500 leading-normal">
                {completedRoundsCount} of {totalRoundsCount} rounds marked as prepared.
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Body Grid */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Column: Syllabus Roadmap Timeline (Avatar Bar) */}
          <div className="flex flex-row md:flex-col gap-3.5 items-center flex-shrink-0 w-full md:w-auto bg-white/[0.01] border border-white/5 p-3.5 rounded-2xl md:py-6 md:px-3 relative z-20">
            {rounds.map((r, idx) => {
              const isSelected = selectedRoundIdx === idx;
              const isCompleted = !!completedRounds[idx];
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedRoundIdx(idx)}
                  title={r.name}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl transition-all duration-300 cursor-pointer relative group ${
                    isSelected
                      ? "bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/10 scale-105"
                      : "bg-white/[0.01] border-white/10 hover:bg-white/[0.04] hover:border-white/20 hover:scale-105"
                  }`}
                >
                  {/* Active highlight background slide */}
                  {isSelected && (
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-5 bg-purple-500 rounded-full hidden md:block" />
                  )}

                  <span>{r.icon}</span>

                  {/* Completed overlay status badge */}
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-purple-500 rounded flex items-center justify-center border-2 border-[#07080c] shadow-md shadow-purple-500/20">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}

                  {/* Premium floating tooltip */}
                  <div className="absolute left-full ml-3 hidden md:block opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 bg-[#07080c] border border-white/10 text-[10px] font-extrabold text-gray-200 px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xl z-50">
                    <span className="text-purple-400 font-mono mr-1">Round {idx + 1}:</span>
                    {r.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Round Details Panel */}
          <div className="flex-1 min-w-0 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoundIdx}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-10 flex flex-col gap-8 shadow-2xl relative min-h-[650px]"
              >
                {/* Active Round Title Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                  <div>
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-1">
                      Round {selectedRoundIdx + 1} details
                    </span>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
                      <span>{currentRound.icon}</span> {currentRound.name}
                    </h2>
                  </div>
                  <div className="flex gap-2.5 flex-wrap">
                    <span className="text-xs font-semibold bg-white/5 text-gray-300 px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" /> {currentRound.duration}
                    </span>
                    <span className="text-xs font-semibold bg-purple-500/10 text-purple-300 px-3.5 py-1.5 rounded-full border border-purple-500/20 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-purple-400" /> {currentRound.type}
                    </span>
                  </div>
                </div>

                {/* Main Overview Description */}
                <div>
                  <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest mb-3">
                    Overview
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {currentRound.desc}
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch mt-6 flex-grow">
                  {/* Left Column: Vertical Navigation Tabs (Avatars) */}
                  <div className="flex lg:flex-col justify-start items-center gap-6 lg:border-r lg:border-white/5 lg:pr-8 flex-shrink-0 w-full lg:w-auto">
                    {/* Strategy Avatar */}
                    <button
                      onClick={() => setActiveTab("strategy")}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          activeTab === "strategy" 
                            ? "shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-110" 
                            : "border-white/10 bg-white/5 opacity-50 group-hover:opacity-80 group-hover:scale-105"
                        }`}
                        style={{ 
                          borderColor: activeTab === "strategy" ? company.color : "transparent",
                          backgroundColor: activeTab === "strategy" ? `${company.color}20` : "",
                          color: activeTab === "strategy" ? company.color : "#9ca3af"
                        }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span 
                        className={`text-[10px] font-bold tracking-tight text-center max-w-[80px] transition-all duration-300 ${
                          activeTab === "strategy" ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        Strategy &amp; Focus
                      </span>
                    </button>

                    {/* Practice Avatar */}
                    <button
                      onClick={() => setActiveTab("practice")}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          activeTab === "practice" 
                            ? "shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-110" 
                            : "border-white/10 bg-white/5 opacity-50 group-hover:opacity-80 group-hover:scale-105"
                        }`}
                        style={{ 
                          borderColor: activeTab === "practice" ? company.color : "transparent",
                          backgroundColor: activeTab === "practice" ? `${company.color}20` : "",
                          color: activeTab === "practice" ? company.color : "#9ca3af"
                        }}
                      >
                        <Code2 className="w-5 h-5" />
                      </div>
                      <span 
                        className={`text-[10px] font-bold tracking-tight text-center max-w-[80px] transition-all duration-300 ${
                          activeTab === "practice" ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        Practice Scenarios
                      </span>
                    </button>

                    {/* Sandbox Avatar */}
                    <button
                      onClick={() => setActiveTab("sandbox")}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          activeTab === "sandbox" 
                            ? "shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-110" 
                            : "border-white/10 bg-white/5 opacity-50 group-hover:opacity-80 group-hover:scale-105"
                        }`}
                        style={{ 
                          borderColor: activeTab === "sandbox" ? company.color : "transparent",
                          backgroundColor: activeTab === "sandbox" ? `${company.color}20` : "",
                          color: activeTab === "sandbox" ? company.color : "#9ca3af"
                        }}
                      >
                        <Edit3 className="w-5 h-5" />
                      </div>
                      <span 
                        className={`text-[10px] font-bold tracking-tight text-center max-w-[80px] transition-all duration-300 ${
                          activeTab === "sandbox" ? "text-white" : "text-gray-500 group-hover:text-gray-300"
                        }`}
                      >
                        Answer Sandbox
                      </span>
                    </button>
                  </div>

                  {/* Right Column: Active Section Content Area */}
                  <div className="flex-1 min-w-0 w-full relative">
                    <AnimatePresence mode="wait">
                      {activeTab === "strategy" && (
                        <motion.div
                          key="strategy-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="space-y-6">
                            {currentRound.guidance && (
                              <div className="border rounded-2xl p-6 shadow-inner" style={{ backgroundColor: `${company.color}05`, borderColor: `${company.color}15` }}>
                                <h4 className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 mb-3" style={{ color: company.color }}>
                                  <Terminal className="w-4 h-4" /> AI Coaching Advice
                                </h4>
                                <p className="text-sm text-gray-300 leading-relaxed">{currentRound.guidance}</p>
                              </div>
                            )}
                            
                            {currentRound.concepts && currentRound.concepts.length > 0 && (
                              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <Terminal className="w-4 h-4" style={{ color: company.color }} /> Core Concepts
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {currentRound.concepts.map((c, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-amber-500/5 border border-amber-500/10 text-amber-300 rounded-xl text-xs font-bold">{c}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {currentRound.expectations && currentRound.expectations.length > 0 && (
                              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <ListTodo className="w-4 h-4" style={{ color: company.color }} /> Evaluation Criteria
                                </h4>
                                <div className="space-y-3">
                                  {currentRound.expectations.map((exp, idx) => {
                                    const expKey = `${slug}-${selectedRoundIdx}-${idx}`;
                                    const isTicked = !!completedExpectations[expKey];
                                    return (
                                      <button key={idx} onClick={() => toggleExpectation(expKey)} className="w-full flex items-start gap-3 text-left text-xs text-gray-400 hover:text-white transition-colors cursor-pointer group">
                                        <div className="mt-0.5 flex-shrink-0">
                                          {isTicked ? (
                                            <div className="w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: `${company.color}10`, border: `1px solid ${company.color}` }}>
                                              <Check className="w-2.5 h-2.5 stroke-[3px]" style={{ color: company.color }} />
                                            </div>
                                          ) : (
                                            <div className="w-4 h-4 rounded border border-white/20 group-hover:border-white/40 transition-colors" />
                                          )}
                                        </div>
                                        <span className={isTicked ? "line-through text-gray-600" : ""}>{exp}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {currentRound.topics && currentRound.topics.length > 0 && (
                              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4" style={{ color: company.color }} /> Core Topics
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {currentRound.topics.map((t, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-xl text-xs font-semibold" style={{ backgroundColor: `${company.color}10`, borderColor: `${company.color}20`, border: "1px solid transparent", color: company.color }}>{t}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "practice" && (
                        <motion.div
                          key="practice-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="border rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden" style={{ backgroundColor: `${company.color}05`, borderColor: `${company.color}15` }}>
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: `${company.color}05` }} />
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                              <div>
                                <h4 className="text-sm font-extrabold flex items-center gap-2" style={{ color: company.color }}>
                                  <Sparkles className="w-4 h-4" /> AI Practice Scenario Generator
                                </h4>
                                <p className="text-xs text-gray-400 mt-1">Generate a dynamic practice question custom-tailored for {company.name} {currentRound.name}, solve it manually, then get the AI reference solution.</p>
                              </div>
                              <button
                                onClick={() => { handleGenerateAiQuestion(selectedRoundIdx); setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); }}
                                disabled={generatingQuestion}
                                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                                style={{ backgroundColor: company.color }}
                              >
                                {generatingQuestion ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Generating...</> : <><Sparkles className="w-3.5 h-3.5" /> Generate Question</>}
                              </button>
                            </div>
                            {generatedQuestions[selectedRoundIdx] && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 pt-4 border-t border-white/5 space-y-4">
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 space-y-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md" style={{ backgroundColor: `${company.color}15`, border: `1px solid ${company.color}30`, color: company.color }}>Live AI Question</span>
                                    <button onClick={() => { setGeneratedQuestions(prev => { const n = { ...prev }; delete n[selectedRoundIdx]; return n; }); setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); setAiQuestionDrafts(prev => ({ ...prev, [selectedRoundIdx]: "" })); }} className="text-[10px] text-gray-500 hover:text-white transition-colors">Reset</button>
                                  </div>
                                  <h5 className="text-base font-extrabold text-white flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 inline" style={{ color: company.color }} /> {generatedQuestions[selectedRoundIdx].title}
                                  </h5>
                                  <div className="text-sm text-gray-300 leading-relaxed bg-white/[0.01] border border-white/10 p-4 rounded-xl whitespace-pre-wrap">{generatedQuestions[selectedRoundIdx].desc}</div>
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 flex items-center gap-1.5"><Edit3 className="w-3.5 h-3.5 text-emerald-400" /> Your answer:</label>
                                    <textarea value={aiQuestionDrafts[selectedRoundIdx] || ""} onChange={(e) => setAiQuestionDrafts(prev => ({ ...prev, [selectedRoundIdx]: e.target.value }))} placeholder="Type your approach here..." rows={6} className="w-full bg-[#07080c] border border-white/10 rounded-xl p-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all placeholder:text-gray-600 resize-none leading-relaxed" />
                                  </div>
                                  <div className="flex justify-between items-center gap-3">
                                    <span className="text-[10px] text-gray-500 font-mono">{(aiQuestionDrafts[selectedRoundIdx] || "").length} chars</span>
                                    <button onClick={() => { if (revealSolutionIdx[selectedRoundIdx]) { setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); } else { aiSolutions[selectedRoundIdx] ? setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: true })) : handleFetchSolution(selectedRoundIdx); } }} disabled={fetchingSolution || !(aiQuestionDrafts[selectedRoundIdx] || "").trim()} className="px-4 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer" style={{ backgroundColor: company.color }}>
                                      {fetchingSolution ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Fetching...</> : <><Sparkles className="w-3.5 h-3.5" /> {revealSolutionIdx[selectedRoundIdx] ? "Hide Solution" : "Get AI Solution"}</>}
                                    </button>
                                  </div>
                                  <AnimatePresence>
                                    {revealSolutionIdx[selectedRoundIdx] && aiSolutions[selectedRoundIdx] && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="bg-[#07080c] rounded-xl p-5 border border-white/5 space-y-2">
                                          <strong className="uppercase text-[10px] tracking-wider flex items-center gap-1.5" style={{ color: company.color }}><Sparkles className="w-3 h-3" /> AI Optimal Solution</strong>
                                          <p className="text-sm font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">{aiSolutions[selectedRoundIdx]}</p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {currentRound.questions && currentRound.questions.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Curated Practice Scenarios</h4>
                              <div className="grid grid-cols-1 gap-3">
                                {currentRound.questions.map((q, idx) => (
                                  <div 
                                    key={idx} 
                                    className="p-4 bg-white/[0.01] border border-white/5 rounded-xl text-xs md:text-sm text-gray-200 font-semibold hover:border-white/15 hover:bg-white/[0.02] transition-all flex justify-between items-center group"
                                  >
                                    <span className="truncate pr-4 leading-relaxed">{q}</span>
                                    <span className="text-[10px] px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" style={{ backgroundColor: `${company.color}15`, border: `1px solid ${company.color}30`, color: company.color }}>
                                      Curated
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {activeTab === "sandbox" && (
                        <motion.div
                          key="sandbox-tab"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          <p className="text-xs text-gray-500">Draft your response outline, system structures, or STAR behavior points. Submit to get real-time feedback from the AI Coach.</p>
                          <textarea
                            value={sandboxDrafts[selectedRoundIdx] || ""}
                            onChange={(e) => setSandboxDrafts(prev => ({ ...prev, [selectedRoundIdx]: e.target.value }))}
                            placeholder={`Draft your answer for ${currentRound.name}...\nCoding: Algorithmic approach + complexity.\nSystem Design: Schema, scaling, APIs.\nBehavioral: Situation → Task → Action → Result`}
                            rows={8}
                            className="w-full bg-[#07080c] border border-white/10 rounded-xl p-5 text-xs font-mono text-gray-300 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all placeholder:text-gray-600 resize-none leading-relaxed"
                          />
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-[10px] text-gray-500 font-mono">{(sandboxDrafts[selectedRoundIdx] || "").length} characters</span>
                            <button
                              onClick={() => handleSandboxSubmit(selectedRoundIdx)}
                              disabled={submittingSandbox || !(sandboxDrafts[selectedRoundIdx] || "").trim()}
                              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
                              style={{ backgroundColor: company.color }}
                            >
                              {submittingSandbox ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Evaluating...</> : <><Send className="w-3.5 h-3.5" /> Submit for Evaluation</>}
                            </button>
                          </div>
                          <AnimatePresence>
                            {sandboxFeedback[selectedRoundIdx] && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-start gap-4 text-xs text-gray-300">
                                <Cpu className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: company.color }} />
                                <div>
                                  <strong className="uppercase text-[10px] tracking-wider block mb-1" style={{ color: company.color }}>AI Feedback</strong>
                                  <p className="leading-relaxed font-medium">{sandboxFeedback[selectedRoundIdx]}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Dashboard Action Footer */}
                <div className="border-t border-white/5 pt-8 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={() => toggleRoundCompletion(selectedRoundIdx)}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      completedRounds[selectedRoundIdx]
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {completedRounds[selectedRoundIdx] ? "Round Prepared" : "Mark Round as Prepared"}
                  </button>

                  <div className="flex w-full sm:w-auto gap-3">
                    <button
                      onClick={() => setSelectedRoundIdx(prev => Math.max(prev - 1, 0))}
                      disabled={selectedRoundIdx === 0}
                      className="flex-1 sm:flex-initial px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setSelectedRoundIdx(prev => Math.min(prev + 1, rounds.length - 1))}
                      disabled={selectedRoundIdx === rounds.length - 1}
                      className="flex-1 sm:flex-initial px-5 py-3 bg-purple-600 border border-purple-500 rounded-xl text-sm font-bold text-white hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      Next Round
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
