"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCareer } from "./CareerContext";
import {
  FileText,
  Briefcase,
  Bot,
  Sparkles,
  UserCheck,
  RotateCcw,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resumeData, loadDemoProfile, isLoadingDemo, clearData } = useCareer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavDemo = async () => {
    await loadDemoProfile();
    if (pathname !== "/resume" && pathname !== "/jobs" && pathname !== "/interview") {
      router.push("/resume");
    }
  };

  const navItems = [
    { label: "Resume Analyzer", href: "/resume", icon: FileText },
    { label: "Job Matcher", href: "/jobs", icon: Briefcase },
    { label: "AI Interview Coach", href: "/interview", icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-indigo-500 text-slate-950 shadow-md shadow-cyan-500/20 transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white">
              CareerPilot <span className="text-cyan-400">AI</span>
            </span>
            <span className="block text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              Recruiter OS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800/90 text-cyan-400 shadow-sm"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Demo Action & Status */}
        <div className="hidden items-center gap-3 md:flex">
          {resumeData ? (
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs text-emerald-300">
              <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-medium">
                {resumeData.contact_info?.name || "Active Resume"}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                ATS {resumeData.ats_score}
              </span>
              <button
                onClick={clearData}
                title="Reset Resume"
                className="ml-1 text-slate-400 hover:text-red-400"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleNavDemo}
              disabled={isLoadingDemo}
              className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/60 to-slate-900 px-3.5 py-2 text-xs font-semibold text-cyan-300 shadow-sm transition-all hover:border-cyan-400 hover:bg-cyan-900/40 disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              {isLoadingDemo ? "Loading Demo..." : "⚡ 1-Click Recruiter Demo"}
            </button>
          )}

          <Link
            href="/resume?upload=true"
            className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-md shadow-cyan-500/25 transition-all hover:bg-cyan-400 active:scale-95"
          >
            Upload Resume
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white md:hidden"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-slate-800 text-cyan-400"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 text-cyan-400" />
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-3 border-t border-slate-800 pt-3">
              {resumeData ? (
                <div className="flex items-center justify-between rounded-lg bg-emerald-950/40 p-3 text-xs text-emerald-300">
                  <span className="font-semibold">
                    👤 {resumeData.contact_info?.name || "Active Resume"} (ATS: {resumeData.ats_score})
                  </span>
                  <button onClick={clearData} className="text-red-400 hover:underline">
                    Clear
                  </button>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    await handleNavDemo();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-xl border border-cyan-500/40 bg-slate-900 py-2.5 text-xs font-semibold text-cyan-300"
                >
                  ⚡ Load 1-Click Recruiter Demo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
