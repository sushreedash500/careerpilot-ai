import { NextRequest, NextResponse } from "next/server";
import { evaluateAnswerEngine } from "@/lib/api-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, user_answer, target_role = "Software Engineer" } = body;

    if (!user_answer) {
      return NextResponse.json({ detail: "User answer cannot be empty." }, { status: 400 });
    }

    const evaluation = evaluateAnswerEngine(question || "Interview Question", user_answer, target_role);
    return NextResponse.json(evaluation);
  } catch (error: any) {
    return NextResponse.json({ detail: error.message || "Failed to evaluate answer" }, { status: 500 });
  }
}
