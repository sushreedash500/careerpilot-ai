"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCareer } from "@/components/CareerContext";
import {
  FileText,
  Briefcase,
  Bot,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Layers,
  Cpu,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { loadDemoProfile, isLoadingDemo } = useCareer();

  const handleDemoClick = async () => {
    await loadDemoProfile();
    router.push("/resume");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24 lg:px-8">
        {/* Ambient Gradient Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-600/20 via-indigo-600/20 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 right-0 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-inner backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Next-Gen Full-Stack Career Intelligence & ATS Platform</span>
          </div>

          {/* Headline */}
          <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Engineer your dream career with{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              AI-driven precision
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Supercharge your tech resume with automated ATS scoring, bridge critical skill gaps with custom 30-day roadmaps, and conquer technical interviews with real-time STAR coaching.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/resume"
              className="group flex items-center gap-2 rounded-xl bg-cyan-500 px-7 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-400 hover:shadow-cyan-500/40 active:scale-95"
            >
              Analyze Your Resume
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              onClick={handleDemoClick}
              disabled={isLoadingDemo}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 px-6 py-3.5 font-semibold text-slate-200 transition-all hover:border-cyan-500/50 hover:bg-slate-800 disabled:opacity-50"
            >
              <Zap className="h-4 w-4 text-cyan-400" />
              {isLoadingDemo ? "Loading Demo..." : "1-Click Recruiter Demo Profile"}
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 sm:gap-10">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>PyMuPDF Text Engine</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>STAR Method Rewrites</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>FastAPI Async Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Zero-Crash Dual Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            Platform Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Everything you need to turn applications into offers
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Three tightly integrated modules that turn static resumes into hiring manager magnets.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
              <FileText className="h-6 w-6" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              AI Resume Analyzer
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Parses PDF resumes with PyMuPDF and scores ATS readiness across 4 key vectors: measurable impact, action verbs, keyword density, and structural integrity.
            </p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>0–100 Visual ATS Readiness Score</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>STAR-method "Before vs After" bullet rewrites</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>Critical red flags & missing sections audit</span>
              </li>
            </ul>

            <Link
              href="/resume"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Test Analyzer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-indigo-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/40">
              <Briefcase className="h-6 w-6" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              AI Job Matcher & Gap Analysis
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Compares your resume against any real-world Job Description. Instantly surfaces matched skills, missing critical competencies, and custom upskilling roadmaps.
            </p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span>Semantic & keyword alignment percentage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span>Targeted ATS keyword placement suggestions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span>Actionable 4-week project learning roadmap</span>
              </li>
            </ul>

            <Link
              href="/jobs"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Match a Role <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-emerald-500/5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
              <Bot className="h-6 w-6" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              AI Mock Interview Coach
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Simulates realistic technical and behavioral interviews grounded directly in your resume projects. Grades your responses with the STAR framework and sample model answers.
            </p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Technical, architecture, & situational questions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>STAR rubric evaluation (Score /10 + critique)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Exemplary recruiter-approved model answers</span>
              </li>
            </ul>

            <Link
              href="/interview"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Start Mock Interview <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Engineering Architecture & Technical Showcase */}
      <section className="border-t border-slate-800/80 bg-slate-900/30 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              Under The Hood
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Engineered for Production Performance
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Demonstrates clean modular architecture, Pydantic type safety, and fault-tolerant AI orchestration.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
              <Cpu className="h-6 w-6 text-cyan-400" />
              <h4 className="mt-3 font-bold text-white">FastAPI Async API</h4>
              <p className="mt-1 text-xs text-slate-400">
                High-throughput async Python service with CORS, Pydantic v2 schemas, and health endpoints.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
              <Layers className="h-6 w-6 text-indigo-400" />
              <h4 className="mt-3 font-bold text-white">PyMuPDF Document Parser</h4>
              <p className="mt-1 text-xs text-slate-400">
                Direct in-memory byte stream extraction for low-latency PDF parsing and section categorization.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              <h4 className="mt-3 font-bold text-white">Dual Engine Resilience</h4>
              <p className="mt-1 text-xs text-slate-400">
                Seamless fallback to comprehensive local NLP heuristics ensures 100% uptime with or without API keys.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
              <TrendingUp className="h-6 w-6 text-amber-400" />
              <h4 className="mt-3 font-bold text-white">Next.js 16 App Router</h4>
              <p className="mt-1 text-xs text-slate-400">
                React 19, TypeScript, Tailwind CSS, and global session context sharing across all 3 modules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter 1-Click Banner */}
      <section className="px-6 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 p-8 text-center sm:p-12 shadow-2xl">
          <Award className="mx-auto h-12 w-12 text-cyan-400" />
          <h2 className="mt-4 text-2xl font-black sm:text-3xl">
            Are you a recruiter or hiring manager reviewing this project?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            Skip the hassle of downloading and uploading sample PDFs. Click below to load an exemplary Full-Stack Engineer profile and experience the entire platform in seconds.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleDemoClick}
              disabled={isLoadingDemo}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition-all hover:bg-cyan-400 active:scale-95"
            >
              <Sparkles className="h-5 w-5" />
              {isLoadingDemo ? "Loading Demo..." : "Load Demo Profile Now →"}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>CareerPilot AI · Built with Next.js, TypeScript, FastAPI, PyMuPDF, and AI.</p>
        <p className="mt-1">Designed for engineering job seekers and high-impact placement readiness.</p>
      </footer>
    </main>
  );
}
