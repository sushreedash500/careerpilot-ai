import { NextResponse } from "next/server";
import { SAMPLE_JOBS } from "@/lib/api-engine";

export async function GET() {
  return NextResponse.json(SAMPLE_JOBS);
}
