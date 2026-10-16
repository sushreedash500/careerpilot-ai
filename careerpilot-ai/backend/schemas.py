from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class ContactInfo(BaseModel):
    name: Optional[str] = "Candidate"
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None
    location: Optional[str] = None


class CategoryScore(BaseModel):
    category: str
    score: int = Field(ge=0, le=100)
    weight: float
    feedback: str
    status: str  # "excellent" | "good" | "needs_improvement" | "poor"


class BulletRewrite(BaseModel):
    original: str
    improved: str
    critique: str
    framework: str = "STAR Method"


class ResumeAnalysisResponse(BaseModel):
    filename: str
    pages: int
    extracted_text: str
    contact_info: ContactInfo
    ats_score: int = Field(ge=0, le=100)
    score_breakdown: List[CategoryScore]
    detected_skills: Dict[str, List[str]]
    detected_sections: List[str]
    missing_sections: List[str]
    strengths: List[str]
    improvements: List[str]
    bullet_improvements: List[BulletRewrite]
    summary_critique: Optional[str] = None
    engine_used: str = "Hybrid AI & Heuristic Engine"


class JobMatchRequest(BaseModel):
    resume_text: str
    job_title: Optional[str] = "Target Role"
    job_description: str


class SkillComparison(BaseModel):
    matched_skills: List[str]
    missing_critical_skills: List[str]
    missing_nice_to_have: List[str]


class WeeklyPlan(BaseModel):
    week: int
    title: str
    description: str
    action_items: List[str]
    recommended_project: str


class JobMatchResponse(BaseModel):
    job_title: str
    match_score: int = Field(ge=0, le=100)
    status: str  # "Strong Match", "Moderate Match", "Reach Opportunity"
    skills_analysis: SkillComparison
    ats_keyword_tips: List[str]
    experience_gap_summary: str
    learning_roadmap: List[WeeklyPlan]
    engine_used: str = "Hybrid AI & Heuristic Engine"


class InterviewQuestionsRequest(BaseModel):
    resume_text: str
    target_role: Optional[str] = "Software Engineer"
    experience_level: Optional[str] = "Mid-Level"
    question_count: Optional[int] = 4


class InterviewQuestion(BaseModel):
    id: int
    type: str  # "Technical", "Behavioral", "System Design", "Situational"
    question: str
    context_hint: str
    target_competency: str


class InterviewQuestionsResponse(BaseModel):
    target_role: str
    questions: List[InterviewQuestion]


class EvaluateAnswerRequest(BaseModel):
    question: str
    question_type: Optional[str] = "Behavioral"
    user_answer: str
    target_role: Optional[str] = "Software Engineer"
    resume_context: Optional[str] = ""


class StarBreakdown(BaseModel):
    situation_task: str
    action: str
    result: str


class EvaluateAnswerResponse(BaseModel):
    score: int = Field(ge=1, le=10)
    grade: str  # "Outstanding", "Strong", "Acceptable", "Needs Work"
    star_analysis: StarBreakdown
    strengths: List[str]
    missing_points: List[str]
    actionable_suggestions: List[str]
    ideal_sample_answer: str
