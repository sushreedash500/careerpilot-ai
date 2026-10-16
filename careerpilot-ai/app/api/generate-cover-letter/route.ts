import { NextRequest, NextResponse } from "next/server";
import { generateCoverLetterEngine } from "@/lib/api-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      candidate_name,
      candidate_email,
      candidate_phone,
      candidate_location,
      job_title,
      company,
      job_description,
      matched_skills,
      resume_text,
    } = body;

    const result = generateCoverLetterEngine(
      candidate_name,
      candidate_email,
      candidate_phone,
      candidate_location,
      job_title,
      company,
      job_description,
      matched_skills || [],
      resume_text || ""
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
