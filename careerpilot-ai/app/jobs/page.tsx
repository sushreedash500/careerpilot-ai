"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCareer } from "@/components/CareerContext";
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Calendar,
  Layers,
  ChevronRight,
  Award,
  Bot,
  Lightbulb,
} from "lucide-react";

interface SampleJob {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  description: string;
}

export default function JobsPage() {
  const { resumeData, loadDemoProfile, isLoadingDemo, apiFetch } = useCareer();
  const [sampleJobs, setSampleJobs] = useState<SampleJob[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("fullstack-dev");
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [activeTab, setActiveTab] = useState<"curated" | "custom">("curated");
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch sample jobs from backend
  useEffect(() => {
    apiFetch("/sample-jobs")
      .then((res) => res.json())
      .then((data) => {
        setSampleJobs(data);
      })
      .catch((err) => console.error("Failed to load sample jobs", err));
  }, [apiFetch]);

  const activeJob = sampleJobs.find((j) => j.id === selectedJobId) || sampleJobs[0];

  const handleMatch = async () => {
    setErrorMessage("");
    if (!resumeData) {
      setErrorMessage("Please upload a resume or load the demo profile first.");
      return;
    }

    const title = activeTab === "curated" ? activeJob?.title || "Target Role" : customTitle || "Target Role";
    const description = activeTab === "curated" ? activeJob?.description || "" : customDescription;

    if (!description.trim()) {
      setErrorMessage("Job description cannot be empty.");
      return;
    }

    setIsMatching(true);
    try {
      const res = await apiFetch("/match-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeData.extracted_text,
          job_title: title,
          job_description: description,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to calculate job match.");
      }

      const data = await res.json();
      setMatchResult(data);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while matching job.");
    } finally {
      setIsMatching(false);
    }
  };

  const handleLoadDemo = async () => {
    setMatchResult(null);
    await loadDemoProfile();
  };

  // Automatically trigger match when demo resume or sample job changes if resume is present
  useEffect(() => {
    if (resumeData && sampleJobs.length > 0 && !matchResult) {
      handleMatch();
    }
  }, [resumeData, sampleJobs]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Semantic Alignment & Skill Gap Engine</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
              AI Job Matcher & Gap Analysis
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Benchmark your resume against target roles, identify missing critical competencies, and generate a 30-day learning roadmap.
            </p>
          </div>

          {!resumeData && (
            <button
              onClick={handleLoadDemo}
              disabled={isLoadingDemo}
              className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-950/40 px-4 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/60 disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              {isLoadingDemo ? "Loading Demo..." : "⚡ Load Demo Profile to Match"}
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
                  Upload your own resume or click "Load Demo Profile" to see how CareerPilot AI matches real candidate profiles.
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleLoadDemo}
                  className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400"
                >
                  Load Demo
                </button>
                <Link
                  href="/resume"
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white hover:bg-slate-800"
                >
                  Upload PDF
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Job Selector */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              {/* Tab Selector */}
              <div className="flex rounded-xl bg-slate-950 p-1 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("curated")}
                  className={`flex-1 rounded-lg py-2 transition-all ${
                    activeTab === "curated"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Curated Roles
                </button>
                <button
                  onClick={() => setActiveTab("custom")}
                  className={`flex-1 rounded-lg py-2 transition-all ${
                    activeTab === "custom"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Paste Custom JD
                </button>
              </div>

              {activeTab === "curated" ? (
                <div className="mt-5 space-y-3">
                  <p className="text-xs font-medium text-slate-400">
                    Select a target job description:
                  </p>
                  {sampleJobs.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => setSelectedJobId(job.id)}
                      className={`w-full rounded-xl border p-4 text-left transition-all ${
                        selectedJobId === job.id
                          ? "border-indigo-500 bg-indigo-950/30 shadow-md shadow-indigo-500/10"
                          : "border-slate-800 bg-slate-950 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{job.title}</h4>
                        <span className="text-[10px] text-indigo-400">{job.experience}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {job.company} · {job.location}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300">Target Role Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Backend Engineer (Python / AWS)"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300">Job Description Text</label>
                    <textarea
                      rows={6}
                      placeholder="Paste the requirements, responsibilities, and qualifications from the job posting..."
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {errorMessage && (
                <p className="mt-3 text-xs text-red-400">{errorMessage}</p>
              )}

              <button
                onClick={handleMatch}
                disabled={isMatching || (!resumeData && activeTab === "curated")}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3.5 text-xs font-bold text-slate-950 shadow-md shadow-indigo-500/20 transition-all hover:brightness-110 disabled:opacity-40"
              >
                {isMatching ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    <span>Analyzing Alignment...</span>
                  </>
                ) : (
                  <>
                    <span>Run Match & Gap Analysis</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Match Analysis & Roadmap */}
          <div className="space-y-6 lg:col-span-7">
            {matchResult ? (
              <div className="space-y-6">
                {/* Score & Verdict Card */}
                <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-6 backdrop-blur-md sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                        Match Assessment
                      </span>
                      <h3 className="text-xl font-black text-white">{matchResult.job_title}</h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {matchResult.experience_gap_summary}
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-500/40 bg-indigo-950/40 px-6 py-4 shadow-inner">
                      <span className="text-3xl font-black text-indigo-300">
                        {matchResult.match_score}%
                      </span>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                        Role Fit
                      </span>
                      <span className="mt-1 text-[11px] font-semibold text-emerald-400">
                        {matchResult.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills Comparison Matrix */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <h4 className="text-sm font-bold text-white">Skills Matrix Comparison</h4>

                  <div className="mt-4 space-y-4">
                    {/* Matched */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Matched Qualifications ({matchResult.skills_analysis.matched_skills.length})</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {matchResult.skills_analysis.matched_skills.map((s: string) => (
                          <span
                            key={s}
                            className="rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 text-xs font-medium text-emerald-300"
                          >
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Critical */}
                    {matchResult.skills_analysis.missing_critical_skills.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-red-400">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Critical Gaps to Bridge ({matchResult.skills_analysis.missing_critical_skills.length})</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {matchResult.skills_analysis.missing_critical_skills.map((s: string) => (
                            <span
                              key={s}
                              className="rounded-lg border border-red-500/30 bg-red-950/40 px-2.5 py-1 text-xs font-medium text-red-300"
                            >
                              ✕ {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Nice to have */}
                    {matchResult.skills_analysis.missing_nice_to_have.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                          <Lightbulb className="h-4 w-4" />
                          <span>Secondary / Preferred Skills</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {matchResult.skills_analysis.missing_nice_to_have.map((s: string) => (
                            <span
                              key={s}
                              className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ATS Keyword Placement Tips */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Sparkles className="h-4 w-4" />
                    <h4 className="text-sm font-bold text-white">Target ATS Keyword Strategy</h4>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-slate-300">
                    {matchResult.ats_keyword_tips.map((tip: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 30-Day Personalized Learning Roadmap */}
                <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                        Gap Bridging Strategy
                      </span>
                      <h4 className="mt-1 text-lg font-bold">
                        30-Day Personalized Learning Roadmap
                      </h4>
                      <p className="text-xs text-slate-400">
                        Step-by-step weekly milestone plan to turn missing qualifications into proof-of-work portfolio projects.
                      </p>
                    </div>
                    <Calendar className="h-6 w-6 text-indigo-400" />
                  </div>

                  <div className="mt-6 space-y-4">
                    {matchResult.learning_roadmap.map((plan: any) => (
                      <div
                        key={plan.week}
                        className="rounded-xl border border-slate-800 bg-slate-950/80 p-5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-indigo-950 px-2.5 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-800/50">
                            WEEK {plan.week}
                          </span>
                          <span className="text-[11px] font-medium text-slate-400">
                            Capstone Milestone
                          </span>
                        </div>

                        <h5 className="mt-2 text-sm font-bold text-white">{plan.title}</h5>
                        <p className="mt-1 text-xs text-slate-400">{plan.description}</p>

                        <div className="mt-3 rounded-lg bg-slate-900 p-3 text-xs">
                          <span className="font-semibold text-cyan-400">Recommended Project: </span>
                          <span className="text-slate-300">{plan.recommended_project}</span>
                        </div>

                        <ul className="mt-3 space-y-1 text-xs text-slate-400">
                          {plan.action_items.map((act: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-indigo-400">→</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practice Interview CTA */}
                <div className="flex items-center justify-between rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 p-6">
                  <div>
                    <h4 className="font-bold">Ready to interview for this role?</h4>
                    <p className="text-xs text-slate-400">
                      Generate tailored technical and behavioral interview questions for {matchResult.job_title}.
                    </p>
                  </div>
                  <Link
                    href="/interview"
                    className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-indigo-400"
                  >
                    <Bot className="h-4 w-4" />
                    <span>Practice Mock Interview →</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center">
                <Briefcase className="h-12 w-12 text-slate-600" />
                <h3 className="mt-4 text-base font-bold text-slate-300">
                  Select a job and run match analysis
                </h3>
                <p className="mt-1 max-w-sm text-xs text-slate-500">
                  CareerPilot AI will compare your resume skills against the job requirements and synthesize a 30-day roadmap.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
