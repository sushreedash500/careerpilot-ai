"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  location?: string;
}

export interface CategoryScore {
  category: string;
  score: number;
  weight: number;
  feedback: string;
  status: "excellent" | "good" | "needs_improvement" | "poor";
}

export interface BulletRewrite {
  original: string;
  improved: string;
  critique: string;
  framework: string;
}

export interface ResumeAnalysis {
  filename: string;
  pages: number;
  extracted_text: string;
  contact_info: ContactInfo;
  ats_score: number;
  score_breakdown: CategoryScore[];
  detected_skills: Record<string, string[]>;
  detected_sections: string[];
  missing_sections: string[];
  strengths: string[];
  improvements: string[];
  bullet_improvements: BulletRewrite[];
  summary_critique?: string;
  engine_used: string;
}

interface CareerContextType {
  resumeData: ResumeAnalysis | null;
  setResumeData: (data: ResumeAnalysis | null) => void;
  isLoadingDemo: boolean;
  loadDemoProfile: () => Promise<void>;
  clearData: () => void;
  apiBaseUrl: string;
  apiFetch: (endpoint: string, options?: RequestInit) => Promise<Response>;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

// Determine initial API base
export const DEFAULT_API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:8000"
    : "/api");

export async function smartApiFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // If NEXT_PUBLIC_API_URL is explicitly configured, use it
  if (process.env.NEXT_PUBLIC_API_URL) {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${cleanEndpoint}`;
    return fetch(fullUrl, options);
  }

  // Next.js API routes are always available both locally and on Vercel
  return fetch(`/api${cleanEndpoint}`, options);
}

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeDataState] = useState<ResumeAnalysis | null>(null);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("careerpilot_resume");
      if (saved) {
        setResumeDataState(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load saved resume from session", e);
    }
  }, []);

  const setResumeData = (data: ResumeAnalysis | null) => {
    setResumeDataState(data);
    try {
      if (data) {
        sessionStorage.setItem("careerpilot_resume", JSON.stringify(data));
      } else {
        sessionStorage.removeItem("careerpilot_resume");
      }
    } catch (e) {
      console.error("Failed to cache resume", e);
    }
  };

  const loadDemoProfile = async () => {
    setIsLoadingDemo(true);
    try {
      const res = await smartApiFetch("/sample-resume");
      if (!res.ok) throw new Error("Failed to load sample resume");
      const data: ResumeAnalysis = await res.json();
      setResumeData(data);
    } catch (err) {
      console.error("Error loading demo profile:", err);
    } finally {
      setIsLoadingDemo(false);
    }
  };

  const clearData = () => {
    setResumeData(null);
  };

  return (
    <CareerContext.Provider
      value={{
        resumeData,
        setResumeData,
        isLoadingDemo,
        loadDemoProfile,
        clearData,
        apiBaseUrl: DEFAULT_API_BASE,
        apiFetch: smartApiFetch,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error("useCareer must be used within a CareerProvider");
  }
  return context;
}
