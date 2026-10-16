import { NextRequest, NextResponse } from "next/server";
import { matchJobEngine } from "@/lib/api-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resume_text, job_title = "Target Role", job_description } = body;

    if (!resume_text || !job_description) {
      return NextResponse.json(
        { detail: "Resume text and job description are required." },
        { status: 400 }
      );
    }

    const result = matchJobEngine(resume_text, job_title, job_description);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ detail: error.message || "Failed to match job" }, { status: 500 });
  }
}
