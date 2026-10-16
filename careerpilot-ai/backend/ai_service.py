import os
import json
import logging
import httpx
from dotenv import load_dotenv
from typing import Dict, List, Any, Optional

import nlp_utils
from schemas import (
    ResumeAnalysisResponse,
    JobMatchResponse,
    InterviewQuestion,
    EvaluateAnswerResponse,
    BulletRewrite,
    CategoryScore,
    SkillComparison,
    WeeklyPlan,
    StarBreakdown,
)

load_dotenv()
logger = logging.getLogger("careerpilot.ai")
logging.basicConfig(level=logging.INFO)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


async def analyze_resume_with_ai(
    text: str, filename: str, pages: int
) -> ResumeAnalysisResponse:
    """Analyzes resume using Gemini LLM if API key is configured, else falls back to NLP heuristics."""
    if not GEMINI_API_KEY and not OPENAI_API_KEY:
        logger.info("No LLM API key detected. Running high-precision local NLP heuristic engine.")
        return nlp_utils.evaluate_resume_heuristics(text, filename, pages)

    # Use Gemini if available
    if GEMINI_API_KEY:
        try:
            prompt = f"""
            You are an elite Senior Tech Recruiter and ATS algorithm specialist.
            Analyze this candidate's resume text thoroughly.
            Return a strictly formatted JSON response with:
            - overall_ats_score: integer 0-100
            - score_breakdown: array of 4 objects (category, score [0-100], feedback, status ["excellent"|"good"|"needs_improvement"]) for:
                1. "Measurable Impact & Metrics"
                2. "Action Verbs & Leadership"
                3. "Technical Keyword Depth"
                4. "ATS Formatting & Completeness"
            - strengths: array of 3-4 specific strings
            - improvements: array of 3-4 specific actionable strings
            - bullet_improvements: array of 2-3 objects (original, improved, critique) rewriting weak bullets from the resume into high-impact STAR method bullets with metrics.
            - summary_critique: string with brief executive advice

            Resume Text:
            {text[:4500]}
            """

            async with httpx.AsyncClient(timeout=30.0) as client:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
                payload = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {"response_mime_type": "application/json"}
                }
                resp = await client.post(url, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    json_text = data["candidates"][0]["content"]["parts"][0]["text"]
                    parsed = json.loads(json_text)

                    # Extract base info with heuristics
                    base = nlp_utils.evaluate_resume_heuristics(text, filename, pages)

                    # Merge LLM high-value insights
                    score_breakdown = [
                        CategoryScore(
                            category=item.get("category", "General"),
                            score=item.get("score", 75),
                            weight=0.25,
                            feedback=item.get("feedback", ""),
                            status=item.get("status", "good")
                        )
                        for item in parsed.get("score_breakdown", [])
                    ] or base.score_breakdown

                    bullet_rewrites = [
                        BulletRewrite(
                            original=item.get("original", ""),
                            improved=item.get("improved", ""),
                            critique=item.get("critique", ""),
                            framework="STAR Method"
                        )
                        for item in parsed.get("bullet_improvements", [])
                    ] or base.bullet_improvements

                    return ResumeAnalysisResponse(
                        filename=filename,
                        pages=pages,
                        extracted_text=text,
                        contact_info=base.contact_info,
                        ats_score=parsed.get("overall_ats_score", base.ats_score),
                        score_breakdown=score_breakdown,
                        detected_skills=base.detected_skills,
                        detected_sections=base.detected_sections,
                        missing_sections=base.missing_sections,
                        strengths=parsed.get("strengths", base.strengths),
                        improvements=parsed.get("improvements", base.improvements),
                        bullet_improvements=bullet_rewrites,
                        summary_critique=parsed.get("summary_critique", base.summary_critique),
                        engine_used="Google Gemini 1.5 Flash + PyMuPDF"
                    )
        except Exception as e:
            logger.warning(f"LLM call failed ({e}). Falling back safely to local NLP heuristics.")

    return nlp_utils.evaluate_resume_heuristics(text, filename, pages)


async def match_job_with_ai(
    resume_text: str, job_title: str, job_description: str
) -> JobMatchResponse:
    """Matches resume to JD using LLM or NLP heuristics."""
    if not GEMINI_API_KEY:
        return nlp_utils.match_resume_to_job(resume_text, job_title, job_description)

    try:
        prompt = f"""
        Compare this resume against the job description.
        Job Title: {job_title}
        Job Description:
        {job_description[:3000]}

        Candidate Resume:
        {resume_text[:3000]}

        Return JSON matching this schema:
        - match_score: integer 0-100
        - status: "Strong Match" | "Moderate Match" | "Reach Opportunity"
        - matched_skills: array of string
        - missing_critical_skills: array of string
        - missing_nice_to_have: array of string
        - ats_keyword_tips: array of 3 actionable tips
        - experience_gap_summary: string
        - learning_roadmap: array of 4 weekly objects (week: 1-4, title, description, action_items: array of strings, recommended_project)
        """

        async with httpx.AsyncClient(timeout=30.0) as client:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"response_mime_type": "application/json"}
            }
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                parsed = json.loads(data["candidates"][0]["content"]["parts"][0]["text"])

                roadmap = [
                    WeeklyPlan(
                        week=w.get("week", idx + 1),
                        title=w.get("title", ""),
                        description=w.get("description", ""),
                        action_items=w.get("action_items", []),
                        recommended_project=w.get("recommended_project", "")
                    )
                    for idx, w in enumerate(parsed.get("learning_roadmap", []))
                ]

                return JobMatchResponse(
                    job_title=job_title,
                    match_score=parsed.get("match_score", 70),
                    status=parsed.get("status", "Moderate Match"),
                    skills_analysis=SkillComparison(
                        matched_skills=parsed.get("matched_skills", []),
                        missing_critical_skills=parsed.get("missing_critical_skills", []),
                        missing_nice_to_have=parsed.get("missing_nice_to_have", [])
                    ),
                    ats_keyword_tips=parsed.get("ats_keyword_tips", []),
                    experience_gap_summary=parsed.get("experience_gap_summary", ""),
                    learning_roadmap=roadmap,
                    engine_used="Google Gemini 1.5 Flash"
                )
    except Exception as e:
        logger.warning(f"LLM Job Match failed ({e}). Falling back to local NLP engine.")

    return nlp_utils.match_resume_to_job(resume_text, job_title, job_description)


async def generate_interview_questions_ai(
    resume_text: str, target_role: str, experience_level: str
) -> List[InterviewQuestion]:
    """Generates role and resume-grounded interview questions."""
    if not GEMINI_API_KEY:
        return nlp_utils.generate_interview_questions_heuristics(resume_text, target_role)

    try:
        prompt = f"""
        Generate 4 realistic, challenging interview questions tailored to this candidate's resume and target role.
        Target Role: {target_role} ({experience_level})
        Resume:
        {resume_text[:3000]}

        Return JSON array of 4 objects:
        [
          {{
            "id": 1,
            "type": "Technical Deep Dive" | "Behavioral & Leadership" | "System Design & Scalability" | "Situational",
            "question": "string",
            "context_hint": "hint on how to structure answer",
            "target_competency": "what this question tests"
          }}
        ]
        """
        async with httpx.AsyncClient(timeout=30.0) as client:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"response_mime_type": "application/json"}
            }
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                questions_json = json.loads(data["candidates"][0]["content"]["parts"][0]["text"])
                return [
                    InterviewQuestion(
                        id=q.get("id", i + 1),
                        type=q.get("type", "Technical"),
                        question=q.get("question", ""),
                        context_hint=q.get("context_hint", ""),
                        target_competency=q.get("target_competency", "Core Engineering")
                    )
                    for i, q in enumerate(questions_json)
                ]
    except Exception as e:
        logger.warning(f"LLM Question Generation failed ({e}). Falling back to local engine.")

    return nlp_utils.generate_interview_questions_heuristics(resume_text, target_role)


async def evaluate_answer_ai(
    question: str, user_answer: str, target_role: str, resume_context: str
) -> EvaluateAnswerResponse:
    """Evaluates candidate interview response using STAR rubric."""
    if not GEMINI_API_KEY:
        return nlp_utils.evaluate_candidate_answer_heuristics(question, user_answer, target_role)

    try:
        prompt = f"""
        You are an engineering interviewer conducting a mock interview for: {target_role}.
        Question: "{question}"
        Candidate Answer:
        "{user_answer}"

        Evaluate this response using the STAR (Situation, Task, Action, Result) methodology.
        Return JSON matching:
        - score: integer 1-10
        - grade: "Outstanding" | "Strong" | "Acceptable" | "Needs Improvement"
        - star_analysis: {{
            "situation_task": "critique of how well situation was defined",
            "action": "critique of personal actions and ownership",
            "result": "critique of measurable results"
          }}
        - strengths: array of 2-3 strings
        - missing_points: array of 2-3 strings
        - actionable_suggestions: array of 2 strings
        - ideal_sample_answer: an exemplary STAR response to this question
        """
        async with httpx.AsyncClient(timeout=30.0) as client:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"response_mime_type": "application/json"}
            }
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                data = resp.json()
                res = json.loads(data["candidates"][0]["content"]["parts"][0]["text"])
                star = res.get("star_analysis", {})
                return EvaluateAnswerResponse(
                    score=res.get("score", 7),
                    grade=res.get("grade", "Strong"),
                    star_analysis=StarBreakdown(
                        situation_task=star.get("situation_task", "Adequately defined context."),
                        action=star.get("action", "Clear individual actions described."),
                        result=star.get("result", "Result mentioned with outcomes.")
                    ),
                    strengths=res.get("strengths", []),
                    missing_points=res.get("missing_points", []),
                    actionable_suggestions=res.get("actionable_suggestions", []),
                    ideal_sample_answer=res.get("ideal_sample_answer", "")
                )
    except Exception as e:
        logger.warning(f"LLM Answer Evaluation failed ({e}). Falling back to local engine.")

    return nlp_utils.evaluate_candidate_answer_heuristics(question, user_answer, target_role)
