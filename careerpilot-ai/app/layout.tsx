import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CareerProvider } from "@/components/CareerContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerPilot AI — AI-Powered Resume Analyzer, Job Matcher & Mock Interview Coach",
  description: "Transform your resume, master ATS algorithms, match dream tech jobs, and ace mock interviews with personalized AI career intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
        <CareerProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
        </CareerProvider>
      </body>
    </html>
  );
}
