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
import "@/app/prep/prep.css";

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
    <div className="prep-page">
      {/* Dynamic ambient glows matching company color */}
      <div className="prep-glow-1" style={{ background: `radial-gradient(circle, ${company.color}60 0%, transparent 70%)` }} />
      <div className="prep-glow-2" style={{ background: `radial-gradient(circle, ${company.color}30 0%, transparent 70%)` }} />
      
      <div className="prep-container relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="prep-top-bar">
          <Link 
            href={`/companies/${slug}`} 
            className="prep-back-link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {company.name} Details
          </Link>

          <span className="prep-readiness-badge">
            <Award className="w-4 h-4" style={{ color: company.color }} /> 
            Prep Progress: <span className="prep-readiness-value" style={{ color: company.color }}>{prepPercentage}%</span>
          </span>
        </div>

        {/* Header Block */}
        <div className="prep-hero" style={{ borderColor: `${company.color}25` }}>
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${company.color} 0%, transparent 70%)` }}
          />

          <div className="prep-hero-content relative z-10">
            <div className="prep-hero-info">
              <div className="prep-hero-icon-container" style={{ background: `linear-gradient(135deg, ${company.color}20 0%, ${company.color}05 100%)`, borderColor: `${company.color}40`, color: company.color }}>
                {company.emoji}
              </div>
              <div className="prep-hero-text">
                <h1 style={{ color: company.color }}>
                  {company.name} Preparation
                </h1>
                <p>
                  A structured, step-by-step preparation plan mapping out requirements, strategies, and expectations for every round.
                </p>
              </div>
            </div>

            {/* Preparation Progress Bar */}
            <div className="prep-progress-panel">
              <div className="prep-progress-header">
                <span>Overall Readiness</span>
                <span className="prep-progress-label-active" style={{ color: company.color }}>{prepPercentage}%</span>
              </div>
              <div className="prep-progress-bar-container">
                <div 
                  className="prep-progress-bar-fill" 
                  style={{ width: `${prepPercentage}%`, background: `linear-gradient(90deg, ${company.color} 0%, ${company.color}cc 100%)`, boxShadow: `0 0 12px ${company.color}66` }}
                />
              </div>
              <div className="prep-progress-footer">
                <span>Rounds prepared</span>
                <span className="prep-progress-footer-badge" style={{ color: company.color }}>
                  {completedRoundsCount} / {totalRoundsCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Body Grid */}
        <div className="prep-workspace">
          
          {/* Left Column: Syllabus Roadmap Timeline (Avatar Bar) */}
          <div className="prep-sidebar">
            {rounds.map((r, idx) => {
              const isSelected = selectedRoundIdx === idx;
              const isCompleted = !!completedRounds[idx];
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedRoundIdx(idx)}
                  title={r.name}
                  className={`prep-step-btn ${isSelected ? "active" : ""}`}
                  style={isSelected ? { borderColor: company.color, backgroundColor: `${company.color}15`, boxShadow: `0 8px 24px ${company.color}33, inset 0 1px 0 rgba(255,255,255,0.1)` } : {}}
                >
                  {/* Active highlight background slide */}
                  <div className="prep-step-btn-indicator" style={{ backgroundColor: company.color }} />

                  <span>{r.icon}</span>

                  {/* Completed overlay status badge */}
                  {isCompleted && (
                    <div className="prep-step-completed-badge" style={{ backgroundColor: company.color, boxShadow: `0 2px 8px ${company.color}66` }}>
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}

                  {/* Premium floating tooltip */}
                  <div className="prep-step-tooltip">
                    <span className="font-mono mr-1" style={{ color: company.color }}>Round {idx + 1}:</span>
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
                className="prep-content-card"
              >
                {/* Active Round Title Info */}
                <div className="prep-card-header">
                  <div>
                    <span className="prep-step-meta" style={{ color: company.color }}>
                      Round {selectedRoundIdx + 1} details
                    </span>
                    <h2 className="prep-step-title flex items-center gap-3">
                      <span>{currentRound.icon}</span> {currentRound.name}
                    </h2>
                  </div>
                  <div className="prep-badges-row">
                    <span className="prep-badge prep-badge-gray">
                      <Clock className="w-4 h-4 text-gray-400" /> {currentRound.duration}
                    </span>
                    <span className="prep-badge" style={{ color: company.color, backgroundColor: `${company.color}15`, borderColor: `${company.color}30` }}>
                      <Shield className="w-4 h-4" style={{ color: company.color }} /> {currentRound.type}
                    </span>
                  </div>
                </div>

                {/* Main Overview Description */}
                <div>
                  <h3 className="prep-section-title">
                    Overview
                  </h3>
                  <p className="prep-section-desc">
                    {currentRound.desc}
                  </p>
                </div>

                <div className="prep-split-layout">
                  {/* Left Column: Vertical Navigation Tabs (Avatars) */}
                  <div className="prep-tabs-nav">
                    {/* Strategy Avatar */}
                    <button
                      onClick={() => setActiveTab("strategy")}
                      className={`prep-tab-btn ${activeTab === "strategy" ? "active" : ""}`}
                    >
                      <div 
                        className="prep-tab-avatar"
                        style={activeTab === "strategy" ? { borderColor: company.color, backgroundColor: `${company.color}20`, color: company.color, boxShadow: `0 0 16px ${company.color}40` } : {}}
                      >
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="prep-tab-label">
                        Strategy &amp; Focus
                      </span>
                    </button>

                    {/* Practice Avatar */}
                    <button
                      onClick={() => setActiveTab("practice")}
                      className={`prep-tab-btn ${activeTab === "practice" ? "active" : ""}`}
                    >
                      <div 
                        className="prep-tab-avatar"
                        style={activeTab === "practice" ? { borderColor: company.color, backgroundColor: `${company.color}20`, color: company.color, boxShadow: `0 0 16px ${company.color}40` } : {}}
                      >
                        <Code2 className="w-5 h-5" />
                      </div>
                      <span className="prep-tab-label">
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
                          <div className="prep-tab-content space-y-8">
                            {currentRound.guidance && (
                              <div className="prep-coach-panel" style={{ backgroundColor: `${company.color}05`, borderColor: `${company.color}15` }}>
                                <h4 className="prep-coach-header" style={{ color: company.color }}>
                                  <Terminal className="w-4 h-4" /> AI Coaching Advice
                                </h4>
                                <p className="prep-coach-text">{currentRound.guidance}</p>
                              </div>
                            )}
                            
                            {currentRound.concepts && currentRound.concepts.length > 0 && (
                              <div className="prep-info-block">
                                <h4 className="prep-info-block-header">
                                  <Terminal className="w-4 h-4" style={{ color: company.color }} /> Core Concepts
                                </h4>
                                <div className="prep-concepts-row">
                                  {currentRound.concepts.map((c, i) => (
                                    <span key={i} className="prep-concept-pill">{c}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {currentRound.expectations && currentRound.expectations.length > 0 && (
                              <div className="prep-info-block">
                                <h4 className="prep-info-block-header">
                                  <ListTodo className="w-4 h-4" style={{ color: company.color }} /> Evaluation Criteria
                                </h4>
                                <div className="prep-checklist">
                                  {currentRound.expectations.map((exp, idx) => {
                                    const expKey = `${slug}-${selectedRoundIdx}-${idx}`;
                                    const isTicked = !!completedExpectations[expKey];
                                    return (
                                      <button key={idx} onClick={() => toggleExpectation(expKey)} className="prep-checklist-item group">
                                        <div className={`prep-checkbox-box ${isTicked ? 'checked' : ''}`} style={isTicked ? { backgroundColor: `${company.color}15`, borderColor: company.color } : {}}>
                                          {isTicked && <Check className="w-3 h-3 stroke-[3px]" style={{ color: company.color }} />}
                                        </div>
                                        <span className={`prep-checklist-label ${isTicked ? "line-through" : ""}`}>{exp}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {currentRound.topics && currentRound.topics.length > 0 && (
                              <div className="prep-info-block">
                                <h4 className="prep-info-block-header">
                                  <Sparkles className="w-4 h-4" style={{ color: company.color }} /> Core Topics
                                </h4>
                                <div className="prep-topics-row">
                                  {currentRound.topics.map((t, i) => (
                                    <span key={i} className="prep-topic-pill" style={{ backgroundColor: `${company.color}10`, borderColor: `${company.color}20`, color: company.color }}>{t}</span>
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
                          <div className="prep-ai-generator-panel" style={{ backgroundColor: `${company.color}05`, borderColor: `${company.color}15` }}>
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: `${company.color}10` }} />
                            <div className="prep-ai-generator-header">
                              <div>
                                <h4 className="prep-ai-generator-title" style={{ color: company.color }}>
                                  <Sparkles className="w-4 h-4" /> AI Practice Scenario Generator
                                </h4>
                                <p className="prep-ai-generator-desc">Generate a dynamic practice question custom-tailored for {company.name} {currentRound.name}, solve it manually, then get the AI reference solution.</p>
                              </div>
                              <button
                                onClick={() => { handleGenerateAiQuestion(selectedRoundIdx); setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); }}
                                disabled={generatingQuestion}
                                className="prep-ai-btn flex-shrink-0"
                                style={{ backgroundColor: company.color, borderColor: company.color }}
                              >
                                {generatingQuestion ? <><Cpu className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate Question</>}
                              </button>
                            </div>
                            {generatedQuestions[selectedRoundIdx] && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-6 border-t border-white/5 space-y-4 relative z-10">
                                <div className="prep-live-question-card">
                                  <div className="prep-live-question-header">
                                    <span className="prep-live-question-badge" style={{ backgroundColor: `${company.color}15`, border: `1px solid ${company.color}30`, color: company.color }}>Live AI Question</span>
                                    <button onClick={() => { setGeneratedQuestions(prev => { const n = { ...prev }; delete n[selectedRoundIdx]; return n; }); setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); setAiQuestionDrafts(prev => ({ ...prev, [selectedRoundIdx]: "" })); }} className="prep-live-question-reset">Reset</button>
                                  </div>
                                  <h5 className="prep-live-question-title">
                                    <HelpCircle className="w-5 h-5 inline" style={{ color: company.color }} /> {generatedQuestions[selectedRoundIdx].title}
                                  </h5>
                                  <div className="prep-live-question-desc">{generatedQuestions[selectedRoundIdx].desc}</div>
                                  <div className="prep-live-answer-section">
                                    <label className="prep-live-answer-label"><Edit3 className="w-3.5 h-3.5 text-emerald-400" /> Your answer:</label>
                                    <textarea value={aiQuestionDrafts[selectedRoundIdx] || ""} onChange={(e) => setAiQuestionDrafts(prev => ({ ...prev, [selectedRoundIdx]: e.target.value }))} placeholder="Type your approach here..." rows={6} className="prep-textarea" />
                                  </div>
                                  <div className="prep-textarea-footer">
                                    <span className="prep-char-counter">{(aiQuestionDrafts[selectedRoundIdx] || "").length} chars</span>
                                    <button onClick={() => { if (revealSolutionIdx[selectedRoundIdx]) { setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: false })); } else { aiSolutions[selectedRoundIdx] ? setRevealSolutionIdx(prev => ({ ...prev, [selectedRoundIdx]: true })) : handleFetchSolution(selectedRoundIdx); } }} disabled={fetchingSolution || !(aiQuestionDrafts[selectedRoundIdx] || "").trim()} className="prep-ai-btn" style={{ backgroundColor: company.color, borderColor: company.color }}>
                                      {fetchingSolution ? <><Cpu className="w-4 h-4 animate-spin" /> Fetching...</> : <><Sparkles className="w-4 h-4" /> {revealSolutionIdx[selectedRoundIdx] ? "Hide Solution" : "Get AI Solution"}</>}
                                    </button>
                                  </div>
                                  <AnimatePresence>
                                    {revealSolutionIdx[selectedRoundIdx] && aiSolutions[selectedRoundIdx] && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="prep-ai-solution-panel">
                                          <strong className="prep-ai-solution-header" style={{ color: company.color }}><Sparkles className="w-3 h-3" /> AI Optimal Solution</strong>
                                          <p className="prep-ai-solution-text">{aiSolutions[selectedRoundIdx]}</p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {currentRound.questions && currentRound.questions.length > 0 && (
                            <div className="space-y-6">
                              <h4 className="prep-section-title pl-1">Curated Practice Scenarios</h4>
                              <div className="prep-scenarios-grid">
                                {currentRound.questions.map((q, idx) => (
                                  <div 
                                    key={idx} 
                                    className="prep-scenario-card group"
                                  >
                                    <span className="prep-scenario-title">{q}</span>
                                    <span className="prep-scenario-badge" style={{ backgroundColor: `${company.color}15`, border: `1px solid ${company.color}30`, color: company.color }}>
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
                          <p className="text-xs text-gray-500 leading-relaxed">Draft your response outline, system structures, or STAR behavior points. Submit to get real-time feedback from the AI Coach.</p>
                          <textarea
                            value={sandboxDrafts[selectedRoundIdx] || ""}
                            onChange={(e) => setSandboxDrafts(prev => ({ ...prev, [selectedRoundIdx]: e.target.value }))}
                            placeholder={`Draft your answer for ${currentRound.name}...\nCoding: Algorithmic approach + complexity.\nSystem Design: Schema, scaling, APIs.\nBehavioral: Situation → Task → Action → Result`}
                            rows={9}
                            className="prep-textarea"
                          />
                          <div className="prep-textarea-footer">
                            <span className="prep-char-counter">{(sandboxDrafts[selectedRoundIdx] || "").length} characters</span>
                            <button
                              onClick={() => handleSandboxSubmit(selectedRoundIdx)}
                              disabled={submittingSandbox || !(sandboxDrafts[selectedRoundIdx] || "").trim()}
                              className="prep-ai-btn"
                              style={{ backgroundColor: company.color, borderColor: company.color }}
                            >
                              {submittingSandbox ? <><Cpu className="w-3.5 h-3.5 animate-spin" /> Evaluating...</> : <><Send className="w-3.5 h-3.5" /> Submit for Evaluation</>}
                            </button>
                          </div>
                          <AnimatePresence>
                            {sandboxFeedback[selectedRoundIdx] && (
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="prep-feedback-card">
                                <Cpu className="prep-feedback-icon" style={{ color: company.color }} />
                                <div>
                                  <strong className="prep-feedback-title" style={{ color: company.color }}>AI Feedback</strong>
                                  <p className="prep-feedback-desc">{sandboxFeedback[selectedRoundIdx]}</p>
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
                <div className="prep-card-footer">
                  <button
                    onClick={() => toggleRoundCompletion(selectedRoundIdx)}
                    className={`prep-footer-main-btn ${completedRounds[selectedRoundIdx] ? "completed" : "todo"}`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {completedRounds[selectedRoundIdx] ? "Round Prepared" : "Mark Round as Prepared"}
                  </button>

                  <div className="prep-footer-nav-group">
                    <button
                      onClick={() => setSelectedRoundIdx(prev => Math.max(prev - 1, 0))}
                      disabled={selectedRoundIdx === 0}
                      className="prep-footer-nav-btn"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setSelectedRoundIdx(prev => Math.min(prev + 1, rounds.length - 1))}
                      disabled={selectedRoundIdx === rounds.length - 1}
                      className="prep-footer-nav-btn prep-footer-nav-btn-primary"
                      style={{ backgroundColor: company.color, borderColor: company.color }}
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
