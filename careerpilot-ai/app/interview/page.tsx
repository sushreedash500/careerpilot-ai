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
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Timer,
  Play,
  Pause,
  Clock,
  Activity,
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

  // Voice Speech-to-Text State
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  // Timer State (60s / 120s response timer)
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [timerInitial, setTimerInitial] = useState(60);

  // Text-to-Speech State
  const [isSpeakingModel, setIsSpeakingModel] = useState(false);

  // Fluency & Filler Analysis
  const words = userAnswer.trim() ? userAnswer.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const fillerRegex = /\b(um|uh|like|basically|literally|actually|you know|sort of|kind of)\b/gi;
  const fillerMatches = userAnswer.match(fillerRegex) || [];
  const fillerCount = fillerMatches.length;

  // Initialize Speech Recognition in browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = "en-US";

        recog.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript) {
            setUserAnswer((prev) => (prev ? `${prev} ${currentTranscript.trim()}` : currentTranscript.trim()));
          }
        };

        recog.onerror = () => setIsListening(false);
        recog.onend = () => setIsListening(false);

        setRecognitionInstance(recog);
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionInstance) return;
    if (isListening) {
      recognitionInstance.stop();
      setIsListening(false);
    } else {
      try {
        recognitionInstance.start();
        setIsListening(true);
        if (!timerActive && timerSeconds > 0) {
          setTimerActive(true);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Timer Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
      if (isListening && recognitionInstance) {
        recognitionInstance.stop();
        setIsListening(false);
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds, isListening, recognitionInstance]);

  const toggleTimer = () => setTimerActive(!timerActive);
  const resetTimer = (secs: number = 60) => {
    setTimerActive(false);
    setTimerInitial(secs);
    setTimerSeconds(secs);
  };

  // Text to Speech for Exemplary Model Answer
  const toggleSpeakModelAnswer = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeakingModel) {
      window.speechSynthesis.cancel();
      setIsSpeakingModel(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeakingModel(false);
    utterance.onerror = () => setIsSpeakingModel(false);
    setIsSpeakingModel(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleLoadDemo = async () => {
    setQuestions([]);
    setEvaluationResult(null);
    await loadDemoProfile();
  };

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
      setErrorMessage("Please type or speak an answer before submitting.");
      return;
    }

    if (isListening && recognitionInstance) {
      recognitionInstance.stop();
      setIsListening(false);
    }
    setTimerActive(false);

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

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Voice-Enabled STAR Simulation Engine</span>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
              AI Mock Interview Coach
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Practice role-specific interview questions grounded in your resume projects with voice dictation, response timers, and STAR rubric grading.
            </p>
          </div>

          {!resumeData && (
            <button
              onClick={handleLoadDemo}
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
              <div className="flex gap-2">
                <button
                  onClick={handleLoadDemo}
                  className="rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400"
                >
                  Use Demo Resume
                </button>
                <Link
                  href="/resume?upload=true"
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs text-white hover:bg-slate-800"
                >
                  Upload Your Resume
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Role & Level Configuration Bar */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Target Engineering Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Machine Learning Engineer, Full Stack Dev"
                  className="mt-1 block w-64 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-medium text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none sm:w-80"
                />
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

                  {/* Interactive Practice Toolbar: Voice Speech-to-Text & Response Timer */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                    <div className="flex items-center gap-2">
                      {/* Voice Dictation Button */}
                      {speechSupported ? (
                        <button
                          onClick={toggleListening}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                            isListening
                              ? "bg-red-500 text-white animate-pulse shadow-md shadow-red-500/30"
                              : "bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/60"
                          }`}
                        >
                          {isListening ? (
                            <>
                              <MicOff className="h-3.5 w-3.5" />
                              <span>Listening... (Click to Stop)</span>
                            </>
                          ) : (
                            <>
                              <Mic className="h-3.5 w-3.5" />
                              <span>🎙️ Speak Answer (Dictate)</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500">Voice dictation available in Chrome/Edge</span>
                      )}

                      {/* Response Timer */}
                      <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-mono">
                        <Timer className="h-3.5 w-3.5 text-cyan-400" />
                        <span
                          className={`font-bold ${
                            timerSeconds <= 15 ? "text-red-400 animate-pulse" : timerSeconds <= 30 ? "text-amber-400" : "text-cyan-300"
                          }`}
                        >
                          {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, "0")}
                        </span>
                        <button
                          onClick={toggleTimer}
                          title={timerActive ? "Pause Timer" : "Start Timer"}
                          className="text-slate-400 hover:text-white"
                        >
                          {timerActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </button>
                        <button
                          onClick={() => resetTimer(timerInitial)}
                          title="Reset Timer"
                          className="text-slate-400 hover:text-white"
                        >
                          <RotateCcw className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => resetTimer(timerInitial === 60 ? 120 : 60)}
                          className="text-[10px] text-slate-500 hover:text-slate-300"
                        >
                          {timerInitial}s
                        </button>
                      </div>
                    </div>

                    {/* Word & Filler Counter */}
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3 text-cyan-400" />
                        <span>{wordCount} words</span>
                      </span>
                      {fillerCount > 0 && (
                        <span className="rounded-full bg-amber-950/80 border border-amber-800/40 px-2 py-0.5 text-[10px] text-amber-300">
                          ⚠️ {fillerCount} filler word{fillerCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Candidate Answer Box */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <label className="font-semibold text-slate-300">Your Response (STAR Method)</label>
                      <button
                        onClick={() => setUserAnswer(sampleAnswerText)}
                        className="text-cyan-400 hover:underline"
                      >
                        ⚡ Insert 1-Click Sample Answer
                      </button>
                    </div>

                    <textarea
                      rows={6}
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Speak your answer with the mic or type here. Structure your response using Situation, Task, Action, and measurable Result (STAR)..."
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
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">
                          Action Taken
                        </span>
                        <p className="mt-1 text-xs text-slate-300">
                          {evaluationResult.star_analysis.action}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                        <span className="text-[10px] font-bold text-amber-400 uppercase">
                          Quantified Result
                        </span>
                        <p className="mt-1 text-xs text-slate-300">
                          {evaluationResult.star_analysis.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Missing Elements */}
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

                  {/* Exemplary Model Answer with Text-to-Speech Playback */}
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                        <BookOpen className="h-4 w-4" />
                        <span>Exemplary Recruiter-Approved Model Answer</span>
                      </div>
                      <button
                        onClick={() => toggleSpeakModelAnswer(evaluationResult.ideal_sample_answer)}
                        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                          isSpeakingModel
                            ? "bg-red-500/20 text-red-300 border border-red-500/40"
                            : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
                        }`}
                      >
                        {isSpeakingModel ? (
                          <>
                            <VolumeX className="h-3.5 w-3.5" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-3.5 w-3.5" />
                            <span>🔊 Listen to Model Answer</span>
                          </>
                        )}
                      </button>
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
