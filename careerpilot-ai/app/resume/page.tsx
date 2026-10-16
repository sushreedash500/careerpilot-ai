"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

function ResumePageContent() {
  const searchParams = useSearchParams();
  const { resumeData, setResumeData, loadDemoProfile, isLoadingDemo, apiFetch } = useCareer();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "report">("upload");

  // If user navigates via "Analyze Your Resume" (?upload=true) or if no report loaded, default to upload card
  useEffect(() => {
    const isUploadRequested = searchParams.get("upload") === "true";
    if (isUploadRequested || !resumeData) {
      setActiveTab("upload");
    } else {
      setActiveTab("report");
    }
  }, [searchParams, resumeData]);

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
    setActiveTab("upload");
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
    setUploadStep("Extracting text with PDF engine...");

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
      setActiveTab("report");
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred during analysis.");
    } finally {
      setIsUploading(false);
      setUploadStep("");
    }
  };

  const handleDemoClick = async () => {
    await loadDemoProfile();
    setActiveTab("report");
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
              onClick={handleDemoClick}
              disabled={isLoadingDemo || isUploading}
              className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-slate-900 px-4 py-2 text-xs font-semibold text-cyan-300 transition-all hover:bg-slate-800 disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              {isLoadingDemo ? "Loading Demo..." : "⚡ Try with Sample Resume"}
            </button>

            {resumeData && (
              <button
                onClick={() => {
                  setActiveTab("upload");
                  setSelectedFile(null);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:border-cyan-400 hover:text-white"
              >
                <UploadCloud className="h-3.5 w-3.5" />
                Upload Your Resume
              </button>
            )}
          </div>
        </div>

        {/* View Switcher Tabs (shown if resumeData is loaded) */}
        {resumeData && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("upload")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  activeTab === "upload"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <UploadCloud className="h-4 w-4" />
                <span>Upload & Analyze Your Resume</span>
              </button>

              <button
                onClick={() => setActiveTab("report")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  activeTab === "report"
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Analysis Report: {resumeData.contact_info?.name || "Active"}</span>
                <span
                  className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    activeTab === "report"
                      ? "bg-slate-950/30 text-slate-950"
                      : "bg-cyan-950 text-cyan-400 border border-cyan-800/40"
                  }`}
                >
                  ATS {resumeData.ats_score}
                </span>
              </button>
            </div>

            <div className="text-xs text-slate-400 pr-2">
              Current File: <span className="font-semibold text-white">{resumeData.filename}</span>
            </div>
          </div>
        )}

        {/* Upload Card (shown when activeTab === "upload" or when no resume analyzed yet) */}
        {(!resumeData || activeTab === "upload") && (
          <div className="mx-auto max-w-2xl">
            {resumeData && (
              <div className="mb-4 flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-950/30 px-4 py-3 text-xs text-cyan-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>
                    Currently viewing analysis for: <strong>{resumeData.contact_info?.name || resumeData.filename}</strong> (ATS {resumeData.ats_score}). Select your PDF below to analyze your own resume!
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab("report")}
                  className="rounded-lg bg-cyan-500/20 px-2.5 py-1 text-xs font-bold text-cyan-300 hover:bg-cyan-500/30 shrink-0 ml-2"
                >
                  View Report →
                </button>
              </div>
            )}

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
                Supports PyMuPDF & PDF.js text extraction · Maximum file size 10 MB
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
                  onClick={handleDemoClick}
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

        {/* Results Dashboard (shown when resumeData is loaded and activeTab is report) */}
        {resumeData && activeTab === "report" && (
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
                    {resumeData.contact_info?.location && (
                      <div className="flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{resumeData.contact_info.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ATS Overall Score Ring / Badge */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Overall ATS Readiness
                    </div>
                    <div className="text-xs text-slate-500">
                      Weighted recruiter score
                    </div>
                  </div>
                  <div
                    className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-2 font-black shadow-lg ${getScoreColor(
                      resumeData.ats_score
                    )}`}
                  >
                    <span className="text-3xl leading-none">{resumeData.ats_score}</span>
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Breakdown (4 Vectors) */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {resumeData.score_breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition hover:border-slate-700"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        {item.category}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          item.status === "excellent"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                            : item.status === "good"
                            ? "bg-cyan-950 text-cyan-400 border border-cyan-800/40"
                            : "bg-amber-950 text-amber-400 border border-amber-800/40"
                        }`}
                      >
                        {item.score}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full transition-all duration-500 ${
                          item.score >= 80
                            ? "bg-emerald-400"
                            : item.score >= 60
                            ? "bg-cyan-400"
                            : "bg-amber-400"
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-slate-300">
                      {item.feedback}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* STAR Method Bullet Rewrites */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-widest">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>STAR Method Transformations</span>
                  </div>
                  <h3 className="mt-1 text-xl font-bold">
                    Automated Bullet Point Upgrades
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Transform weak or passive bullets into high-impact, quantified engineering achievements.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {resumeData.bullet_improvements.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-slate-700"
                  >
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Bullet #{idx + 1}
                      </span>
                      <button
                        onClick={() => copyToClipboard(bullet.improved, idx)}
                        className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Upgraded</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-[11px] font-semibold text-red-400/80 uppercase tracking-wide">
                          Before (Original Phrasing)
                        </div>
                        <p className="mt-1 text-xs text-slate-400 line-through decoration-red-500/40">
                          {bullet.original}
                        </p>
                      </div>

                      <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-3">
                        <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">
                          After (STAR Formatted with Metrics)
                        </div>
                        <p className="mt-1 text-xs font-medium text-emerald-200">
                          {bullet.improved}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-300">Recruiter Rationale: </span>
                        {bullet.critique}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detected Skills Taxonomy */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-lg font-bold">Extracted Skill Competencies</h3>
              <p className="mt-1 text-xs text-slate-400">
                Skills identified and mapped to technical taxonomies for ATS parsing.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(resumeData.detected_skills).map(([category, skills]) => (
                  <div key={category} className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      {category}
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-slate-700 bg-slate-800/80 px-2 py-1 text-[11px] font-medium text-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Strengths */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <h4 className="font-bold text-white">Demonstrated Strengths</h4>
                </div>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
                  {resumeData.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-6 backdrop-blur-sm sm:p-8">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <h4 className="font-bold text-white">High-Priority Enhancements</h4>
                </div>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
                  {resumeData.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 p-6 sm:p-8">
              <div>
                <h4 className="font-bold text-white">Ready for the Next Step?</h4>
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

export default function ResumePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 p-8 text-slate-400">Loading Resume Analyzer...</div>}>
      <ResumePageContent />
    </Suspense>
  );
}
