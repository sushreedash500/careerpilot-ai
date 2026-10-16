"use client";

import { useState } from "react";
import Link from "next/link";
import { useCareer } from "@/components/CareerContext";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Bot,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function ResumePage() {
  const { resumeData, setResumeData, loadDemoProfile, isLoadingDemo, apiFetch } = useCareer();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    setErrorMessage("");
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setErrorMessage("Please select a valid PDF file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Resume must be under 10 MB.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const analyzeFile = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMessage("");
    setUploadStep("Extracting text with PyMuPDF...");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setTimeout(() => setUploadStep("Running ATS scoring algorithms..."), 700);
      setTimeout(() => setUploadStep("Synthesizing STAR bullet rewrites..."), 1400);

      const res = await apiFetch("/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.detail || "Failed to analyze resume.");
      }

      const data = await res.json();
      setResumeData(data);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred during analysis.");
    } finally {
      setIsUploading(false);
      setUploadStep("");
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/40 bg-emerald-950/20";
    if (score >= 65) return "text-cyan-400 border-cyan-500/40 bg-cyan-950/20";
    if (score >= 50) return "text-amber-400 border-amber-500/40 bg-amber-950/20";
    return "text-red-400 border-red-500/40 bg-red-950/20";
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              <span>ATS Scoring & Optimization Engine</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
              AI Resume Analyzer
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Extract PDF text, audit recruiter ATS metrics, and upgrade bullets with the STAR method.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDemoProfile}
              disabled={isLoadingDemo || isUploading}
              className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-900 px-4 py-2 text-xs font-semibold text-cyan-300 transition-all hover:bg-slate-800 disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              {isLoadingDemo ? "Loading Demo..." : "⚡ Try with Sample Resume"}
            </button>

            {resumeData && (
              <button
                onClick={() => {
                  setResumeData(null);
                  setSelectedFile(null);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Upload New
              </button>
            )}
          </div>
        </div>

        {/* Upload Card (shown if no resume analyzed yet) */}
        {!resumeData && (
          <div className="mx-auto max-w-2xl">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative rounded-3xl border-2 border-dashed p-8 text-center transition-all sm:p-12 ${
                isDragging
                  ? "border-cyan-400 bg-cyan-950/20"
                  : "border-slate-700 bg-slate-900/60 hover:border-slate-500"
              }`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                <UploadCloud className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                {selectedFile ? selectedFile.name : "Upload your resume in PDF format"}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Supports PyMuPDF text extraction · Maximum file size 10 MB
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <label className="cursor-pointer rounded-xl bg-cyan-500 px-6 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-400 active:scale-95">
                  Browse Computer
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    className="sr-only"
                  />
                </label>

                <button
                  type="button"
                  onClick={loadDemoProfile}
                  disabled={isLoadingDemo}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-semibold text-slate-200 transition hover:bg-slate-700"
                >
                  ⚡ Use Sample Resume
                </button>
              </div>

              {selectedFile && (
                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Ready to analyze: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                </div>
              )}

              {errorMessage && (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-red-950/50 p-3 text-xs text-red-300 border border-red-800/40">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Upload Button */}
              <button
                type="button"
                disabled={!selectedFile || isUploading}
                onClick={analyzeFile}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    <span>{uploadStep || "Analyzing Resume..."}</span>
                  </>
                ) : (
                  <>
                    <span>Run Deep ATS Analysis</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Dashboard (shown when resumeData is loaded) */}
        {resumeData && (
          <div className="space-y-8">
            {/* Candidate Identity & Summary Banner */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white">
                      {resumeData.contact_info?.name || "Candidate Profile"}
                    </span>
                    <span className="rounded-full bg-cyan-950 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-400 border border-cyan-800/50">
                      {resumeData.pages} Page{resumeData.pages > 1 ? "s" : ""}
                    </span>
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                      {resumeData.engine_used}
                    </span>
                  </div>

                  {/* Contact Badges */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    {resumeData.contact_info?.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{resumeData.contact_info.email}</span>
                      </div>
                    )}
                    {resumeData.contact_info?.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{resumeData.contact_info.phone}</span>
                      </div>
                    )}
                    {resumeData.contact_info?.linkedin && (
                      <div className="flex items-center gap-1.5 text-cyan-300 hover:underline">
                        <svg className="h-3.5 w-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span>{resumeData.contact_info.linkedin}</span>
                      </div>
                    )}
                    {resumeData.contact_info?.github && (
                      <div className="flex items-center gap-1.5 text-cyan-300 hover:underline">
                        <svg className="h-3.5 w-3.5 fill-current text-cyan-400" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>{resumeData.contact_info.github}</span>
                      </div>
                    )}
                    {resumeData.contact_info?.portfolio && (
                      <div className="flex items-center gap-1.5 text-cyan-300 hover:underline">
                        <Globe className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{resumeData.contact_info.portfolio}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Score Radial Badge */}
                <div className={`flex flex-col items-center justify-center rounded-2xl border px-6 py-4 shadow-inner ${getScoreColor(resumeData.ats_score)}`}>
                  <span className="text-3xl font-black">{resumeData.ats_score}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Overall ATS Score
                  </span>
                  <span className="mt-1 text-[11px] font-medium opacity-90">
                    {resumeData.ats_score >= 80
                      ? "🏆 Top 10% ATS Ready"
                      : resumeData.ats_score >= 65
                      ? "👍 Competitive Profile"
                      : "⚠️ Needs Optimization"}
                  </span>
                </div>
              </div>

              {resumeData.summary_critique && (
                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-300">
                  <span className="font-bold text-cyan-400">Recruiter Verdict: </span>
                  {resumeData.summary_critique}
                </div>
              )}
            </div>

            {/* 4 Category Score Breakdown Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {resumeData.score_breakdown.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">{cat.category}</span>
                      <span className="text-sm font-black text-cyan-400">{cat.score}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          cat.score >= 80
                            ? "bg-emerald-400"
                            : cat.score >= 60
                            ? "bg-cyan-400"
                            : "bg-amber-400"
                        }`}
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
                    {cat.feedback}
                  </p>
                </div>
              ))}
            </div>

            {/* STAR-Method Bullet Point Rewriter */}
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>STAR Method Optimizer</span>
                  </div>
                  <h3 className="mt-1 text-xl font-bold">
                    Actionable Bullet Point Upgrades
                  </h3>
                  <p className="text-xs text-slate-400">
                    Replace passive, generic descriptions with quantifiable, result-driven STAR bullets.
                  </p>
                </div>
                <span className="hidden rounded-full bg-cyan-950 px-3 py-1 text-xs font-medium text-cyan-300 sm:inline-block">
                  Situation · Task · Action · Result
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {resumeData.bullet_improvements.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-950/80 p-5 text-sm"
                  >
                    {/* Before */}
                    <div className="flex items-start gap-3">
                      <span className="rounded bg-red-950/80 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-800/40">
                        ORIGINAL (WEAK)
                      </span>
                      <p className="text-xs text-slate-400 line-through decoration-red-400/50">
                        {bullet.original}
                      </p>
                    </div>

                    {/* After */}
                    <div className="mt-3 flex items-start justify-between gap-3 rounded-lg bg-emerald-950/20 p-3.5 border border-emerald-500/20">
                      <div className="space-y-1">
                        <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-800/50">
                          AI UPGRADE (STAR METHOD)
                        </span>
                        <p className="text-xs font-medium text-emerald-200">
                          {bullet.improved}
                        </p>
                        <p className="pt-1 text-[11px] text-slate-400 italic">
                          💡 {bullet.critique}
                        </p>
                      </div>

                      <button
                        onClick={() => copyToClipboard(bullet.improved, idx)}
                        className="shrink-0 flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-400 hover:text-white"
                        title="Copy improved bullet point"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Red Flags Split */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Strengths */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <h4 className="font-bold text-white">Demonstrated Strengths</h4>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {resumeData.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-emerald-400">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Critical Improvements */}
              <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-6">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="h-5 w-5" />
                  <h4 className="font-bold text-white">Recommended Improvements</h4>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {resumeData.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-amber-400">!</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detected Skills Taxonomy */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <h3 className="text-lg font-bold">Detected Technical Skills Matrix</h3>
              <p className="text-xs text-slate-400">
                Extracted and indexed across engineering domains for recruiter keyword searches.
              </p>

              <div className="mt-6 space-y-4">
                {Object.entries(resumeData.detected_skills).map(([category, skills]) => (
                  <div key={category} className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="w-40 shrink-0 text-xs font-semibold text-slate-400">
                      {category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-medium text-cyan-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps Floating CTA Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 p-6">
              <div>
                <h4 className="text-lg font-bold">What would you like to do next?</h4>
                <p className="text-xs text-slate-300">
                  Your resume is saved in your session. Match it against real tech jobs or simulate a mock interview.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/jobs"
                  className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Match Target Jobs →</span>
                </Link>

                <Link
                  href="/interview"
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-700"
                >
                  <Bot className="h-4 w-4 text-cyan-400" />
                  <span>Practice AI Interview →</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
