import os
import pymupdf
from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List

from schemas import (
    ResumeAnalysisResponse,
    JobMatchRequest,
    JobMatchResponse,
    InterviewQuestionsRequest,
    InterviewQuestionsResponse,
    EvaluateAnswerRequest,
    EvaluateAnswerResponse,
)
import ai_service
from sample_data import SAMPLE_RESUME_TEXT, SAMPLE_JOBS

app = FastAPI(
    title="CareerPilot AI Backend",
    description="Intelligent API powering Resume Analysis, ATS Scoring, Job Matching & AI Interview Coaching",
    version="1.0.0"
)

# Enable CORS for Next.js frontend (local & production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
@app.get("/api")
def home():
    return {
        "project": "CareerPilot AI",
        "status": "online",
        "endpoints": [
            "/analyze-resume (POST)",
            "/match-job (POST)",
            "/generate-interview-questions (POST)",
            "/evaluate-answer (POST)",
            "/sample-resume (GET)",
            "/sample-jobs (GET)"
        ]
    }


@app.get("/health")
@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "CareerPilot AI API"}


@app.post("/analyze-resume", response_model=ResumeAnalysisResponse)
@app.post("/api/analyze-resume", response_model=ResumeAnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    """Uploads a PDF resume, extracts text with PyMuPDF, and runs ATS scoring & bullet critique."""
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF file."
        )

    pdf_bytes = await file.read()

    if not pdf_bytes.startswith(b"%PDF-"):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid PDF."
        )

    try:
        with pymupdf.open(stream=pdf_bytes, filetype="pdf") as pdf:
            page_count = len(pdf)
            extracted_text = "\n".join(page.get_text() for page in pdf)
            extracted_text = (
                extracted_text
                .replace("\u019f", "ti")
                .replace("Ɵ", "ti")
                .replace("\u01b2", "tt")
                .replace("Ʃ", "tt")
                .replace("\u014c", "ft")
                .replace("Ō", "ft")
                .replace("ﬁ", "fi")
                .replace("ﬂ", "fl")
                .replace("–", "-")
                .replace("—", "-")
            )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Could not read PDF document: {str(e)}"
        )

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="The uploaded PDF contains no extractable text. Please ensure it is not a scanned image PDF."
        )

    # Perform ATS evaluation
    analysis = await ai_service.analyze_resume_with_ai(
        text=extracted_text,
        filename=file.filename,
        pages=page_count
    )

    return analysis


@app.get("/sample-resume", response_model=ResumeAnalysisResponse)
@app.get("/api/sample-resume", response_model=ResumeAnalysisResponse)
async def get_sample_resume():
    """Provides an instant pre-parsed sample resume for 1-click recruiter demos without file upload."""
    analysis = await ai_service.analyze_resume_with_ai(
        text=SAMPLE_RESUME_TEXT.strip(),
        filename="Alex_Chen_FullStack_Resume.pdf",
        pages=1
    )
    return analysis


@app.get("/sample-jobs")
@app.get("/api/sample-jobs")
def get_sample_jobs():
    """Returns curated target job roles and descriptions."""
    return SAMPLE_JOBS


@app.post("/match-job", response_model=JobMatchResponse)
@app.post("/api/match-job", response_model=JobMatchResponse)
async def match_job(request: JobMatchRequest):
    """Compares candidate resume text against a target job description and generates a gap analysis."""
    if not request.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")
    if not request.job_description.strip():
        raise HTTPException(status_code=400, detail="Job description cannot be empty.")

    match_result = await ai_service.match_job_with_ai(
        resume_text=request.resume_text,
        job_title=request.job_title or "Target Role",
        job_description=request.job_description
    )
    return match_result


@app.post("/generate-interview-questions", response_model=InterviewQuestionsResponse)
@app.post("/api/generate-interview-questions", response_model=InterviewQuestionsResponse)
async def generate_interview_questions(request: InterviewQuestionsRequest):
    """Generates tailored technical and behavioral interview questions grounded in candidate's resume."""
    if not request.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text is required to generate tailored questions.")

    questions = await ai_service.generate_interview_questions_ai(
        resume_text=request.resume_text,
        target_role=request.target_role or "Software Engineer",
        experience_level=request.experience_level or "Mid-Level"
    )

    return InterviewQuestionsResponse(
        target_role=request.target_role or "Software Engineer",
        questions=questions
    )


@app.post("/evaluate-answer", response_model=EvaluateAnswerResponse)
@app.post("/api/evaluate-answer", response_model=EvaluateAnswerResponse)
async def evaluate_answer(request: EvaluateAnswerRequest):
    """Evaluates candidate response using the STAR method with scores, strengths, and model answer."""
    if not request.user_answer.strip():
        raise HTTPException(status_code=400, detail="Answer cannot be empty.")

    evaluation = await ai_service.evaluate_answer_ai(
        question=request.question,
        user_answer=request.user_answer,
        target_role=request.target_role or "Software Engineer",
        resume_context=request.resume_context or ""
    )

    return evaluation
