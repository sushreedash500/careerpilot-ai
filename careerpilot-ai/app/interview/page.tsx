"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCareer } from "@/components/CareerContext";
import {
  Bot,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Award,
  Zap,
  HelpCircle,
  Lightbulb,
  BookOpen,
  MessageSquare,
} from "lucide-react";

interface InterviewQuestion {
  id: number;
  type: string;
  question: string;
  context_hint: string;
  target_competency: string;
}

export default function InterviewPage() {
  const { resumeData, loadDemoProfile, isLoadingDemo, apiFetch } = useCareer();
  const [targetRole, setTargetRole] = useState("Full Stack Software Engineer");
  const [experienceLevel, setExperienceLevel] = useState("Mid-Level");
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const sampleAnswerText =
    "In my previous role at NexaTech, our main API was suffering from high latency during peak morning loads. I was tasked with diagnosing the bottleneck and bringing response times under 500ms before our customer launch. I profiled the FastAPI endpoints using APM tools, identified redundant N+1 PostgreSQL queries, implemented Redis caching with a 10-minute TTL, and added B-tree indexes on foreign keys. As a result, peak query latency dropped by 65% (from 1.8s down to 250ms), allowing the application to serve 120,000+ monthly users with 99.9% uptime.";

  const fetchQuestions = async () => {
    setErrorMessage("");
    if (!resumeData) {
      setErrorMessage("Please upload a resume or load the demo profile first.");
      return;
    }

    setIsGeneratingQuestions(true);
    setEvaluationResult(null);

    try {
      const res = await apiFetch("/generate-interview-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeData.extracted_text,
          target_role: targetRole,
          experience_level: experienceLevel,
          question_count: 4,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate questions.");

      const data = await res.json();
      setQuestions(data.questions || []);
      setSelectedQuestionIndex(0);
      setUserAnswer("");
    } catch (err: any) {
      setErrorMessage(err.message || "Could not generate interview questions.");
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  useEffect(() => {
    if (resumeData && questions.length === 0) {
      fetchQuestions();
    }
  }, [resumeData]);

  const activeQuestion = questions[selectedQuestionIndex];

  const handleEvaluate = async () => {
    if (!activeQuestion || !userAnswer.trim()) {
      setErrorMessage("Please type or paste an answer before submitting.");
      return;
    }

    setIsEvaluating(true);
    setErrorMessage("");

    try {
      const res = await apiFetch("/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: activeQuestion.question,
          question_type: activeQuestion.type,
          user_answer: userAnswer,
          target_role: targetRole,
          resume_context: resumeData?.extracted_text || "",
        }),
      });

      if (!res.ok) throw new Error("Failed to evaluate answer.");

      const data = await res.json();
      setEvaluationResult(data);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to evaluate answer.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const wordCount = userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              <span>STAR Rubric Simulation Engine</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
              AI Mock Interview Coach
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Practice role-specific interview questions grounded in your resume projects, with instant AI feedback and model answers.
            </p>
          </div>

          {!resumeData && (
            <button
              onClick={loadDemoProfile}
              disabled={isLoadingDemo}
              className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              {isLoadingDemo ? "Loading Demo..." : "⚡ Load Demo Profile to Interview"}
            </button>
          )}
        </div>

        {/* Warning if no resume loaded */}
        {!resumeData && (
          <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 text-amber-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold">No active resume detected. </span>
                  Questions are most impactful when customized to your real project stack.
                </div>
              </div>
              <button
                onClick={loadDemoProfile}
                className="rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400"
              >
                Use Demo Resume
              </button>
            </div>
          </div>
        )}

        {/* Role & Level Configuration Bar */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Target Role
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="mt-1 block rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-medium text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Full Stack Software Engineer">Full Stack Software Engineer</option>
                  <option value="Backend Engineer (Python / FastAPI)">Backend Engineer (Python / FastAPI)</option>
                  <option value="Frontend Developer (React / Next.js)">Frontend Developer (React / Next.js)</option>
                  <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
                  <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="mt-1 block rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-medium text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Entry-Level / Junior">Entry-Level / Junior (0-2 years)</option>
                  <option value="Mid-Level">Mid-Level (2-5 years)</option>
                  <option value="Senior / Tech Lead">Senior / Tech Lead (5+ years)</option>
                </select>
              </div>
            </div>

            <button
              onClick={fetchQuestions}
              disabled={isGeneratingQuestions || !resumeData}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400 disabled:opacity-40"
            >
              {isGeneratingQuestions ? (
                <>
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                  <span>Synthesizing Questions...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Regenerate Questions</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Question Selector Tabs */}
        {questions.length > 0 && (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left: Questions list */}
            <div className="space-y-3 lg:col-span-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Interview Questions ({questions.length})
              </h3>
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestionIndex(idx);
                    setEvaluationResult(null);
                  }}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    selectedQuestionIndex === idx
                      ? "border-emerald-500 bg-emerald-950/30 shadow-md shadow-emerald-500/10"
                      : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      {q.type}
                    </span>
                    <span className="text-[10px] text-slate-500">Q{idx + 1}</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-slate-200 line-clamp-2">
                    {q.question}
                  </p>
                </button>
              ))}
            </div>

            {/* Right: Question Details & Interactive Answer Box */}
            <div className="space-y-6 lg:col-span-8">
              {activeQuestion && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
                  {/* Active Question Banner */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-800/40">
                      {activeQuestion.type}
                    </span>
                    <span className="text-xs text-slate-400">
                      Testing: <strong className="text-white">{activeQuestion.target_competency}</strong>
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white sm:text-xl">
                    "{activeQuestion.question}"
                  </h3>

                  <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-950 p-3 text-xs text-slate-400 border border-slate-800">
                    <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-300">Coach Guidance: </strong>
                      {activeQuestion.context_hint}
                    </span>
                  </div>

                  {/* Candidate Answer Box */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <label className="font-semibold text-slate-300">Your Response</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setUserAnswer(sampleAnswerText)}
                          className="text-cyan-400 hover:underline"
                        >
                          ⚡ Insert 1-Click Sample Answer
                        </button>
                        <span>{wordCount} words</span>
                      </div>
                    </div>

                    <textarea
                      rows={6}
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Structure your answer using Situation, Task, Action, and measurable Result (STAR)..."
                      className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {errorMessage && (
                    <p className="mt-2 text-xs text-red-400">{errorMessage}</p>
                  )}

                  {/* Submit Button */}
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={handleEvaluate}
                      disabled={isEvaluating || !userAnswer.trim()}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-md shadow-emerald-500/20 hover:brightness-110 disabled:opacity-40"
                    >
                      {isEvaluating ? (
                        <>
                          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                          <span>Evaluating STAR Rubric...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit for AI Evaluation</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Evaluation Results Card */}
              {evaluationResult && (
                <div className="space-y-6 rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md">
                  {/* Score Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
                    <div>
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                        Performance Assessment
                      </span>
                      <h4 className="text-xl font-bold">
                        STAR Method Evaluation
                      </h4>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-5 py-2.5">
                        <span className="text-2xl font-black text-emerald-300">
                          {evaluationResult.score}/10
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">
                          {evaluationResult.grade}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* STAR Breakdown */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      STAR Rubric Analysis
                    </h5>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase">
                          Situation & Task
                        </span>
                        <p className="mt-1 text-xs text-slate-300">
                          {evaluationResult.star_analysis.situation_task}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase">
                          Personal Action
                        </span>
                        <p className="mt-1 text-xs text-slate-300">
                          {evaluationResult.star_analysis.action}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">
                          Measurable Result
                        </span>
                        <p className="mt-1 text-xs text-slate-300">
                          {evaluationResult.star_analysis.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Missing Points */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Demonstrated Strengths</span>
                      </div>
                      <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                        {evaluationResult.strengths.map((str: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Areas to Elevate</span>
                      </div>
                      <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                        {evaluationResult.missing_points.map((mp: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400">•</span>
                            <span>{mp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Exemplary Model Answer */}
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                      <BookOpen className="h-4 w-4" />
                      <span>Exemplary Recruiter-Approved Model Answer</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-200 whitespace-pre-line">
                      {evaluationResult.ideal_sample_answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
