import { NextRequest, NextResponse } from "next/server";
import { generateQuestionsEngine } from "@/lib/api-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resume_text, target_role = "Software Engineer" } = body;

    if (!resume_text) {
      return NextResponse.json({ detail: "Resume text is required." }, { status: 400 });
    }

    const questions = generateQuestionsEngine(resume_text, target_role);
    return NextResponse.json({
      target_role,
      questions
    });
  } catch (error: any) {
    return NextResponse.json({ detail: error.message || "Failed to generate questions" }, { status: 500 });
  }
}
