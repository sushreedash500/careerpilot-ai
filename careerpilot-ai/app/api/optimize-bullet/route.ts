import { NextRequest, NextResponse } from "next/server";
import { optimizeBulletEngine } from "@/lib/api-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bullet } = body;

    if (!bullet || !bullet.trim()) {
      return NextResponse.json({ detail: "Please provide a bullet point to optimize." }, { status: 400 });
    }

    const result = optimizeBulletEngine(bullet);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { detail: error.message || "Failed to optimize bullet" },
      { status: 500 }
    );
  }
}
