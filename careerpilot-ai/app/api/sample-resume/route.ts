import { NextResponse } from "next/server";
import { analyzeResumeText, SAMPLE_RESUME_TEXT } from "@/lib/api-engine";

export async function GET() {
  const result = analyzeResumeText(SAMPLE_RESUME_TEXT.trim(), "Alex_Chen_FullStack_Resume.pdf", 1);
  return NextResponse.json(result);
}
