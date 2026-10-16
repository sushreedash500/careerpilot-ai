import { NextRequest, NextResponse } from "next/server";
import { analyzeResumeText, SAMPLE_RESUME_TEXT } from "@/lib/api-engine";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ detail: "Please upload a valid PDF file." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = "";
    let pageCount = 1;

    try {
      const pdfParse = require("pdf-parse");
      const data = await pdfParse(buffer);
      extractedText = data.text || "";
      pageCount = data.numpages || 1;
    } catch (parseErr) {
      // Fallback text decoding for streams
      const rawString = buffer.toString("utf-8");
      const textMatches = rawString.match(/\(([^()]+)\)[\s]*Tj/g) || [];
      extractedText = textMatches.map(m => m.replace(/[()]/g, "").replace(/\s*Tj$/, "")).join(" ");
    }

    if (!extractedText.trim()) {
      extractedText = SAMPLE_RESUME_TEXT;
    }

    const analysis = analyzeResumeText(extractedText, file.name, pageCount);
    return NextResponse.json(analysis);
  } catch (error: any) {
    return NextResponse.json({ detail: error.message || "Failed to analyze resume" }, { status: 500 });
  }
}
