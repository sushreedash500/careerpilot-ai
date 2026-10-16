import re
from typing import Dict, List, Tuple, Any
from schemas import (
    ContactInfo,
    CategoryScore,
    BulletRewrite,
    ResumeAnalysisResponse,
    SkillComparison,
    WeeklyPlan,
    JobMatchResponse,
    InterviewQuestion,
    EvaluateAnswerResponse,
    StarBreakdown,
)

# Curated Technical & Professional Skills Taxonomy
SKILL_TAXONOMY = {
    "Languages": [
        "python", "javascript", "typescript", "java", "c++", "c#", "go", "golang",
        "rust", "ruby", "php", "swift", "kotlin", "sql", "html", "html5", "css", "css3"
    ],
    "Frontend": [
        "react", "react.js", "next.js", "nextjs", "vue", "vue.js", "angular",
        "svelte", "redux", "zustand", "tailwind", "tailwind css", "bootstrap",
        "sass", "webpack", "vite", "graphql", "responsive design", "web vitals"
    ],
    "Backend & APIs": [
        "fastapi", "django", "flask", "node.js", "nodejs", "express", "express.js",
        "spring boot", "nestjs", "rest", "restful", "rest api", "graphql", "microservices",
        "grpc", "celery", "websockets", "oauth", "jwt"
    ],
    "Databases & Caching": [
        "postgresql", "postgres", "mysql", "mongodb", "redis", "sqlite",
        "cassandra", "dynamodb", "elasticsearch", "prisma", "sqlalchemy", "firebase"
    ],
    "Cloud & DevOps": [
        "docker", "kubernetes", "aws", "amazon web services", "azure", "gcp",
        "google cloud", "ci/cd", "github actions", "gitlab ci", "terraform",
        "linux", "nginx", "prometheus", "grafana", "git", "serverless"
    ],
    "AI, ML & Data": [
        "machine learning", "deep learning", "nlp", "llm", "large language models",
        "openai", "gemini", "langchain", "llamaindex", "hugging face", "pytorch",
        "tensorflow", "pandas", "numpy", "scikit-learn", "vector database", "rag",
        "pymupdf", "embeddings"
    ],
    "Testing & Tools": [
        "pytest", "jest", "cypress", "playwright", "vitest", "postman",
        "swagger", "jira", "agile", "scrum", "unit testing", "integration testing"
    ]
}

HIGH_IMPACT_VERBS = [
    "spearheaded", "engineered", "architected", "orchestrated", "optimized",
    "developed", "deployed", "implemented", "automated", "streamlined",
    "accelerated", "designed", "scaled", "overhauled", "mentored", "pioneered",
    "refactored", "integrated", "boosted", "delivered", "championed"
]

WEAK_PASSIVE_PHRASES = [
    "worked on", "assisted with", "helped to", "responsible for", "participated in",
    "was involved in", "handled", "aided in", "contributed to", "duties included"
]


def extract_contact_info(text: str) -> ContactInfo:
    """Extracts email, phone, links, and candidate name from resume text."""
    lines = [line.strip() for line in text.split("\n") if line.strip()]

    # Guess name: first clean line of text that doesn't contain common header words
    name = "Candidate"
    for line in lines[:4]:
        cleaned = re.sub(r'[^a-zA-Z\s]', '', line).strip()
        if cleaned and len(cleaned.split()) in [2, 3] and not any(kw in cleaned.lower() for kw in ["resume", "curriculum", "vitae", "summary", "contact"]):
            name = cleaned.title()
            break

    # Email
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
    email = email_match.group(0) if email_match else None

    # Phone
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}', text)
    phone = phone_match.group(0) if phone_match else None

    # LinkedIn
    linkedin_match = re.search(r'(?:https?://)?(?:www\.)?linkedin\.com/in/([a-zA-Z0-9_-]+)', text, re.IGNORECASE)
    linkedin = f"linkedin.com/in/{linkedin_match.group(1)}" if linkedin_match else None

    # GitHub
    github_match = re.search(r'(?:https?://)?(?:www\.)?github\.com/([a-zA-Z0-9_-]+)', text, re.IGNORECASE)
    github = f"github.com/{github_match.group(1)}" if github_match else None

    # Portfolio / Website
    portfolio_match = re.search(r'(?:https?://)?([a-zA-Z0-9_-]+\.(?:io|dev|me|tech|app))', text, re.IGNORECASE)
    portfolio = portfolio_match.group(1) if portfolio_match else None

    # Location heuristic
    loc_match = re.search(r'([A-Za-z\s]+,\s*(?:[A-Z]{2}|[A-Za-z]+))', text[:400])
    location = loc_match.group(1).strip() if loc_match else "Available"

    return ContactInfo(
        name=name,
        email=email,
        phone=phone,
        linkedin=linkedin,
        github=github,
        portfolio=portfolio,
        location=location
    )


def detect_sections(text: str) -> Tuple[List[str], List[str]]:
    """Identifies present and missing standard resume sections."""
    text_lower = text.lower()
    expected_sections = {
        "Summary / Objective": ["summary", "objective", "profile", "about me"],
        "Experience / Work History": ["experience", "employment", "work history", "professional experience"],
        "Skills": ["skills", "technical skills", "technologies", "competencies"],
        "Projects": ["projects", "personal projects", "portfolio projects"],
        "Education": ["education", "academic", "university", "degree"],
        "Certifications": ["certifications", "certificates", "licenses"]
    }

    detected = []
    missing = []

    for section_name, keywords in expected_sections.items():
        if any(re.search(rf'\b{kw}\b', text_lower) for kw in keywords):
            detected.append(section_name)
        else:
            missing.append(section_name)

    return detected, missing


def extract_skills_from_text(text: str) -> Dict[str, List[str]]:
    """Extracts categorized technical skills from raw resume or JD text."""
    text_lower = text.lower()
    found_skills: Dict[str, List[str]] = {}

    for category, skill_list in SKILL_TAXONOMY.items():
        matched = []
        for skill in skill_list:
            # Word boundary matching with safety for special characters (c++, next.js)
            escaped = re.escape(skill)
            pattern = rf'(?:\b|(?<=[\s,/(]))' + escaped + rf'(?:\b|(?=[\s,/)]))'
            if re.search(pattern, text_lower):
                matched.append(skill.title() if len(skill) > 3 else skill.upper())
        if matched:
            found_skills[category] = sorted(list(set(matched)))

    return found_skills


def evaluate_resume_heuristics(text: str, filename: str, pages: int) -> ResumeAnalysisResponse:
    """Calculates granular ATS readiness scores, critiques bullets, and suggests STAR rewrites."""
    text_lower = text.lower()
    contact = extract_contact_info(text)
    detected_sections, missing_sections = detect_sections(text)
    skills_by_category = extract_skills_from_text(text)

    # 1. IMPACT & METRICS SCORE (0-100)
    # Detects numbers, percentages, multipliers, dollar amounts
    metrics_patterns = [
        r'\d+%', r'\$\d+', r'\b\d{2,}\b', r'\d+x\b', r'\b\d+\+\b'
    ]
    metric_hits = sum(len(re.findall(p, text)) for p in metrics_patterns)
    # 5+ metric occurrences = high impact
    impact_score = min(100, int((metric_hits / 6) * 100))

    # 2. ACTION VERBS SCORE (0-100)
    strong_verb_count = sum(1 for verb in HIGH_IMPACT_VERBS if re.search(rf'\b{verb}\b', text_lower))
    weak_phrase_count = sum(1 for phrase in WEAK_PASSIVE_PHRASES if phrase in text_lower)
    action_verb_score = min(100, max(20, (strong_verb_count * 15) - (weak_phrase_count * 10)))

    # 3. KEYWORD & SKILLS DENSITY (0-100)
    total_skills_found = sum(len(s) for s in skills_by_category.values())
    keyword_score = min(100, int((total_skills_found / 14) * 100))

    # 4. STRUCTURE & ATS FORMATTING (0-100)
    structure_points = 0
    if contact.email: structure_points += 20
    if contact.phone: structure_points += 15
    if contact.linkedin or contact.github: structure_points += 15
    if "Experience / Work History" in detected_sections: structure_points += 25
    if "Skills" in detected_sections: structure_points += 15
    if "Education" in detected_sections: structure_points += 10
    structure_score = min(100, structure_points)

    # OVERALL ATS SCORE (Weighted Average)
    overall_ats = int(
        (impact_score * 0.30) +
        (action_verb_score * 0.25) +
        (keyword_score * 0.25) +
        (structure_score * 0.20)
    )

    # Categorized Score Breakdowns
    score_breakdown = [
        CategoryScore(
            category="Measurable Impact & Metrics",
            score=impact_score,
            weight=0.30,
            status="excellent" if impact_score >= 80 else "good" if impact_score >= 60 else "needs_improvement",
            feedback=(
                f"Found {metric_hits} quantifiable metrics. Recruiters and ATS bots heavily prioritize numbers, percentages, and outcomes."
                if impact_score >= 70 else
                f"Only {metric_hits} metrics detected. Add quantified results (e.g., 'reduced latency by 35%', 'managed 10k users') to prove your impact."
            )
        ),
        CategoryScore(
            category="Action Verbs & Leadership",
            score=action_verb_score,
            weight=0.25,
            status="excellent" if action_verb_score >= 80 else "good" if action_verb_score >= 60 else "needs_improvement",
            feedback=(
                f"Strong active voice with {strong_verb_count} high-impact power verbs."
                if action_verb_score >= 70 else
                f"Detected passive phrases ({weak_phrase_count} instances like 'worked on' or 'responsible for'). Replace them with assertive verbs like 'Engineered', 'Architected', or 'Automated'."
            )
        ),
        CategoryScore(
            category="Technical Keyword Depth",
            score=keyword_score,
            weight=0.25,
            status="excellent" if keyword_score >= 80 else "good" if keyword_score >= 60 else "needs_improvement",
            feedback=f"Extracted {total_skills_found} industry-standard technical competencies across modern stacks."
        ),
        CategoryScore(
            category="ATS Formatting & Completeness",
            score=structure_score,
            weight=0.20,
            status="excellent" if structure_score >= 80 else "good" if structure_score >= 60 else "needs_improvement",
            feedback=(
                "All critical resume sections and verified contact identifiers detected cleanly."
                if not missing_sections else
                f"Missing recommended sections: {', '.join(missing_sections)}. Add these for complete ATS readability."
            )
        )
    ]

    # Strengths and Improvements
    strengths = []
    if impact_score >= 70:
        strengths.append(f"Strong quantification: resume includes {metric_hits} measurable data points showing direct business or technical value.")
    if action_verb_score >= 70:
        strengths.append(f"Assertive phrasing: utilizes dynamic action verbs ({strong_verb_count} power verbs) highlighting ownership.")
    if contact.github and contact.linkedin:
        strengths.append("Complete online professional presence (both LinkedIn and GitHub profiles identified).")
    if total_skills_found >= 12:
        strengths.append(f"Broad technical repertoire covering {len(skills_by_category)} core engineering domains.")
    if not strengths:
        strengths.append("Clear foundational structure and clean technical keyword inclusion.")

    improvements = []
    if impact_score < 70:
        improvements.append("Quantify outcomes: Every bullet point should answer 'By how much?' or 'What was the result?'. Add percentages, volume, or time saved.")
    if weak_phrase_count > 0:
        improvements.append(f"Eliminate passive language: Replace passive phrases like 'worked on' with active verbs like 'Architected', 'Spearheaded', or 'Refactored'.")
    if not contact.github:
        improvements.append("Add a GitHub profile link to showcase code repositories and commit history directly to engineering managers.")
    if "Certifications" in missing_sections:
        improvements.append("Consider adding relevant cloud or framework certifications (e.g., AWS Certified Developer, Meta Frontend) to boost credibility.")

    # Bullet Point Improvements (STAR Method)
    bullet_improvements = []
    raw_lines = [l.strip() for l in text.split("\n") if l.strip()]
    bullet_candidates = [
        l for l in raw_lines
        if (l.startswith("•") or l.startswith("-") or l.startswith("*") or (len(l) > 35 and l[0].isupper()))
        and not any(sec in l.lower() for sec in ["experience", "education", "skills", "summary"])
    ]

    # Identify weaker bullets (lacking numbers or containing weak verbs)
    for b in bullet_candidates:
        b_clean = re.sub(r'^[•\-\*\s]+', '', b)
        b_lower = b_clean.lower()
        has_number = bool(re.search(r'\d+', b_clean))
        has_weak = any(wp in b_lower for wp in WEAK_PASSIVE_PHRASES)

        if (not has_number or has_weak) and len(b_clean) > 25:
            # Generate STAR upgraded version
            improved = b_clean
            if has_weak:
                for wp in WEAK_PASSIVE_PHRASES:
                    improved = re.sub(re.escape(wp), "Engineered and delivered", improved, flags=re.IGNORECASE)
            else:
                first_word = improved.split()[0]
                improved = f"Spearheaded implementation of {improved[len(first_word):].strip()}"

            if not has_number:
                improved += ", improving performance by 35% and reducing processing turnaround time."

            bullet_improvements.append(
                BulletRewrite(
                    original=b_clean,
                    improved=improved,
                    critique="Original bullet lacks measurable impact and outcome metrics. Upgraded version uses assertive ownership verb and quantifiable result (STAR framework).",
                    framework="STAR (Situation, Task, Action, Result)"
                )
            )
            if len(bullet_improvements) >= 3:
                break

    # If no weak bullets found in text, provide a standard exemplary rewrite
    if not bullet_improvements:
        bullet_improvements.append(
            BulletRewrite(
                original="Worked on customer dashboards and fixed backend bugs.",
                improved="Architected responsive analytics dashboard using React & Next.js, resolving 45+ critical Jira issues and accelerating data load times by 40%.",
                critique="Replaces passive verb 'worked on' with 'Architected' and provides concrete bug volume and percentage acceleration.",
                framework="STAR Framework"
            )
        )

    return ResumeAnalysisResponse(
        filename=filename,
        pages=pages,
        extracted_text=text,
        contact_info=contact,
        ats_score=overall_ats,
        score_breakdown=score_breakdown,
        detected_skills=skills_by_category,
        detected_sections=detected_sections,
        missing_sections=missing_sections,
        strengths=strengths,
        improvements=improvements,
        bullet_improvements=bullet_improvements,
        summary_critique="Strong technical profile with clear potential. Prioritize quantifying project outcomes to maximize interview conversion rates.",
        engine_used="Local Heuristic NLP Engine (Safe Fallback)"
    )


def match_resume_to_job(resume_text: str, job_title: str, job_description: str) -> JobMatchResponse:
    """Compares candidate skills with target job description and generates gap analysis & roadmap."""
    resume_skills_dict = extract_skills_from_text(resume_text)
    resume_skills_set = set(s.lower() for sublist in resume_skills_dict.values() for s in sublist)

    jd_skills_dict = extract_skills_from_text(job_description)
    jd_skills_flat = [s for sublist in jd_skills_dict.values() for s in sublist]
    jd_skills_set = set(s.lower() for s in jd_skills_flat)

    if not jd_skills_set:
        # Default fallback target skills if JD is very brief
        jd_skills_set = {"react", "typescript", "python", "fastapi", "docker", "postgresql", "aws"}

    matched = sorted([s.title() for s in jd_skills_set if s in resume_skills_set])
    missing = sorted([s.title() for s in jd_skills_set if s not in resume_skills_set])

    match_percentage = int((len(matched) / max(1, len(jd_skills_set))) * 100)
    match_percentage = min(98, max(25, match_percentage))

    if match_percentage >= 75:
        status = "Strong Match"
    elif match_percentage >= 50:
        status = "Moderate Match"
    else:
        status = "Growth Opportunity"

    # Split missing into critical vs nice-to-have
    critical = missing[:3] if len(missing) >= 3 else missing
    nice_to_have = missing[3:] if len(missing) > 3 else []

    # ATS Keyword tips
    keyword_tips = [
        f"Incorporate '{skill}' into your Projects or Work Experience sections with concrete examples."
        for skill in missing[:4]
    ]
    if not keyword_tips:
        keyword_tips = ["Your resume aligns tightly with the core keywords in this job description! Ensure all project bullets highlight your quantitative impact."]

    # 30-Day Personalized Learning Roadmap
    learning_roadmap = [
        WeeklyPlan(
            week=1,
            title=f"Core Foundations & Gap Bridging: {critical[0] if critical else 'Advanced System Architecture'}",
            description="Deep dive into the primary missing skill required by the target job description.",
            action_items=[
                f"Complete hands-on tutorials or official documentation for {critical[0] if critical else 'Modern Microservices'}.",
                "Set up a dedicated sandbox repo and write clean, modular test scripts."
            ],
            recommended_project=f"Build a mini service utilizing {critical[0] if critical else 'FastAPI & Redis'}."
        ),
        WeeklyPlan(
            week=2,
            title=f"Integration & Secondary Competencies: {critical[1] if len(critical) > 1 else 'Cloud & Containerization'}",
            description="Connect your new skills to full-stack workflows with automated CI/CD and databases.",
            action_items=[
                "Implement database schema migrations, caching, or asynchronous job queues.",
                "Containerize your project using Docker and write unit tests."
            ],
            recommended_project="Deploy a full-stack demo app on AWS or Vercel with GitHub Actions."
        ),
        WeeklyPlan(
            week=3,
            title="Portfolio Project Polish & STAR Documentation",
            description="Document your architecture clearly to showcase directly to hiring managers.",
            action_items=[
                "Write an executive-ready README with architecture diagrams, API specs, and setup instructions.",
                "Record a 2-minute Loom video demo or publish a live link."
            ],
            recommended_project="Publish your capstone repository to GitHub with complete commit history."
        ),
        WeeklyPlan(
            week=4,
            title="Interview Simulation & Targeted Application",
            description="Align your resume bullet points and practice role-specific technical and behavioral questions.",
            action_items=[
                "Update your resume summary and bullet points to feature your newly built projects.",
                "Complete 3 AI Mock Interview sessions on CareerPilot AI focusing on this exact role."
            ],
            recommended_project="Submit tailored applications with personalized cover notes directly to recruiters."
        )
    ]

    return JobMatchResponse(
        job_title=job_title,
        match_score=match_percentage,
        status=status,
        skills_analysis=SkillComparison(
            matched_skills=matched,
            missing_critical_skills=critical,
            missing_nice_to_have=nice_to_have
        ),
        ats_keyword_tips=keyword_tips,
        experience_gap_summary=f"You match {len(matched)} of {len(jd_skills_set)} core skills listed in the job description. Bridging {len(critical)} critical competencies will elevate your profile to top-percentile candidates.",
        learning_roadmap=learning_roadmap,
        engine_used="Local Heuristic NLP Engine (Safe Fallback)"
    )


def generate_interview_questions_heuristics(resume_text: str, target_role: str) -> List[InterviewQuestion]:
    """Generates targeted technical, behavioral, and architectural interview questions."""
    skills_dict = extract_skills_from_text(resume_text)
    all_skills = [s for sublist in skills_dict.values() for s in sublist]
    top_skill = all_skills[0] if all_skills else "Python & TypeScript"
    second_skill = all_skills[1] if len(all_skills) > 1 else "REST APIs"

    return [
        InterviewQuestion(
            id=1,
            type="Technical Deep Dive",
            question=f"Can you walk me through the architecture of a major project where you implemented {top_skill}? What were the main technical trade-offs you faced?",
            context_hint=f"Focus on your architectural decisions, data flow, error handling, and why you selected {top_skill} over alternatives.",
            target_competency="Technical Architecture & Trade-off Analysis"
        ),
        InterviewQuestion(
            id=2,
            type="Behavioral & Leadership",
            question="Tell me about a time when a critical bug or performance bottleneck occurred in production. How did you diagnose, resolve, and prevent it from recurring?",
            context_hint="Structure your response using the STAR method: Situation, Task, Action taken, and measurable Result.",
            target_competency="Incident Management & Problem Solving under Pressure"
        ),
        InterviewQuestion(
            id=3,
            type="System Design & Scalability",
            question=f"How would you design a scalable service connecting a modern frontend to {second_skill} that can handle 10,000 concurrent requests with sub-200ms latency?",
            context_hint="Mention caching layers (Redis), connection pooling, asynchronous processing, and horizontal scaling strategies.",
            target_competency="High-Throughput Distributed Systems"
        ),
        InterviewQuestion(
            id=4,
            type="Situational & Team Collaboration",
            question="Describe a situation where you had a strong disagreement with a teammate or product manager regarding technical implementation. How did you reach consensus?",
            context_hint="Showcase empathy, data-driven reasoning, active listening, and putting the user or product outcome first.",
            target_competency="Cross-Functional Collaboration & Conflict Resolution"
        )
    ]


def evaluate_candidate_answer_heuristics(
    question: str,
    user_answer: str,
    target_role: str
) -> EvaluateAnswerResponse:
    """Evaluates candidate response using the STAR method and provides constructive feedback."""
    words = user_answer.strip().split()
    word_count = len(words)
    answer_lower = user_answer.lower()

    # STAR component checks
    has_situation = any(k in answer_lower for k in ["when", "project", "client", "team", "company", "situation", "goal", "challenge"])
    has_action = any(k in answer_lower for k in ["i implemented", "i built", "i designed", "i led", "i investigated", "i decided", "my approach"])
    has_result = any(k in answer_lower for k in ["result", "reduced", "increased", "improved", "saved", "percent", "%", "delivered", "outcome"])

    # Score calculation (1 to 10)
    score = 5
    if word_count > 60: score += 1
    if word_count > 120: score += 1
    if has_situation: score += 1
    if has_action: score += 1
    if has_result: score += 1

    score = min(10, max(2, score))

    if score >= 9:
        grade = "Outstanding"
    elif score >= 7:
        grade = "Strong"
    elif score >= 5:
        grade = "Acceptable"
    else:
        grade = "Needs Improvement"

    situation_feedback = (
        "Clear context established detailing the challenge or project background."
        if has_situation else
        "Missing context: Specify the company, product, or specific constraint you were dealing with before describing the technical actions."
    )

    action_feedback = (
        "Strong personal ownership demonstrated with specific individual contributions."
        if has_action else
        "Emphasize individual contribution: Clearly state what YOU personally did (use 'I engineered' instead of ambiguous 'we did')."
    )

    result_feedback = (
        "Quantified outcome or business impact included effectively."
        if has_result else
        "Missing measurable result: Conclude your answer with a concrete metric (e.g., '% performance improvement', 'user adoption', or 'time saved')."
    )

    strengths = []
    if word_count > 80:
        strengths.append("Comprehensive response depth and articulate technical explanations.")
    if has_action:
        strengths.append("Clear proactive ownership and problem-solving methodology.")
    if has_result:
        strengths.append("Included tangible business or technical results.")
    if not strengths:
        strengths.append("Addressed the core premise of the interviewer's question directly.")

    missing_points = []
    if not has_result:
        missing_points.append("Quantifiable metrics or business impact (e.g., latency reduction, cost savings, user metrics).")
    if not has_action:
        missing_points.append("Specific personal actions vs general team activities.")
    if word_count < 70:
        missing_points.append("Provide more technical detail regarding the tools, trade-offs, and architecture chosen.")

    suggestions = [
        "Structure all behavioral answers using the STAR method (Situation, Task, Action, Result).",
        "Quantify your results with realistic metrics to leave a lasting impression on technical interviewers."
    ]

    ideal_sample = (
        "Situation: At my previous company, our main data pipeline was experiencing 4-second API latency during peak morning traffic.\n"
        "Task: I was tasked with identifying the bottleneck and bringing response times under 500ms before our upcoming customer launch.\n"
        "Action: I profiled the FastAPI endpoints, identified redundant N+1 PostgreSQL queries, implemented Redis caching with a 10-minute TTL, and indexed key foreign keys.\n"
        "Result: This reduced peak response times by 72% (from 4.1s to 1.1s) and allowed the system to handle 3x traffic without additional server costs."
    )

    return EvaluateAnswerResponse(
        score=score,
        grade=grade,
        star_analysis=StarBreakdown(
            situation_task=situation_feedback,
            action=action_feedback,
            result=result_feedback
        ),
        strengths=strengths,
        missing_points=missing_points,
        actionable_suggestions=suggestions,
        ideal_sample_answer=ideal_sample
    )
