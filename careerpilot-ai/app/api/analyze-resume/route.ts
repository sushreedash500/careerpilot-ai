import { NextRequest, NextResponse } from "next/server";
import { analyzeResumeText, extractTextFromPdfBuffer } from "@/lib/api-engine";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ detail: "Please upload a valid PDF file." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text using native in-memory stream extractor
    const { text, pages } = extractTextFromPdfBuffer(buffer);

    if (!text || text.trim().length < 10) {
      return NextResponse.json(
        { detail: "Could not extract text from this PDF. Please ensure your PDF has selectable text and is not an image-only scan." },
        { status: 400 }
      );
    }

    const analysis = analyzeResumeText(text, file.name, pages);
    return NextResponse.json(analysis);
  } catch (error: any) {
    return NextResponse.json({ detail: error.message || "Failed to analyze resume" }, { status: 500 });
  }
}
