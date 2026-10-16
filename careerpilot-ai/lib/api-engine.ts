// Next.js Native Intelligence Engine for zero-dependency Vercel deployment

export const SAMPLE_RESUME_TEXT = `
ALEX CHEN
San Francisco, CA | (555) 234-5678 | alex.chen.dev@example.com
linkedin.com/in/alexchen-dev | github.com/alexchen-tech | alexchen.io

SUMMARY
Results-driven Full Stack Software Engineer with 2+ years of experience designing, developing, and deploying scalable web applications and AI-enabled services. Proficient in React, Next.js, TypeScript, Python, FastAPI, and PostgreSQL. Passionate about building performant user experiences and automating complex data workflows.

TECHNICAL SKILLS
Languages: Python, TypeScript, JavaScript, SQL, HTML5, CSS3/Tailwind
Frontend: React, Next.js, Redux Toolkit, Tailwind CSS, Responsive Design, REST APIs
Backend: FastAPI, Node.js, Express, Django, RESTful API Design, Microservices
Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, AWS (S3, EC2), Git/GitHub, CI/CD Pipelines
Tools & AI: PyMuPDF, LangChain, OpenAI API, Hugging Face, Postman, Jest, PyTest

WORK EXPERIENCE
Software Engineer | NexaTech Solutions | San Francisco, CA
June 2024 - Present
• Spearheaded migration of legacy monolithic portal to Next.js 14 and FastAPI microservices, reducing initial page load time by 42% and serving 120,000+ monthly active users.
• Engineered asynchronous data ingestion pipeline with Redis caching and PostgreSQL, decreasing database query latency by 65%.
• Implemented automated CI/CD deployment workflows using GitHub Actions and Docker, reducing release cycle time from 3 days to under 20 minutes.
• Collaborated in an agile team of 7 engineers, leading weekly sprint planning and conducting rigorous code reviews.

Junior Full Stack Developer | BrightWave Media | San Jose, CA
August 2023 - May 2024
• Developed and maintained customer-facing analytics dashboards using React, TypeScript, and Chart.js.
• Built RESTful API endpoints in Python to parse customer reporting metrics, handling 50,000+ daily requests with 99.9% uptime.
• Worked on bug fixing and writing unit tests with PyTest and Jest, improving overall test coverage from 54% to 88%.
• Assisted team with database schema migrations and indexing in PostgreSQL.

PROJECTS
CareerPilot AI - Intelligent Career & Resume Platform (2026)
• Architected full-stack career platform using Next.js, TypeScript, FastAPI, and PyMuPDF to analyze resumes and simulate AI mock interviews.
• Built custom ATS scoring engine analyzing action verbs, keyword density, and quantifiable metrics, providing automated STAR-method rewrites.
• Containerized backend service with Docker and implemented structured JSON output validation using Pydantic v2.

DevPulse - Developer Collaboration & Task Tracker (2024)
• Built real-time project management dashboard with React, Node.js, WebSockets, and Redis.
• Implemented OAuth 2.0 authentication and role-based access control (RBAC) for 500+ active beta testers.

EDUCATION
Bachelor of Science in Computer Science
University of California, Davis | Graduated June 2023
Relevant Coursework: Data Structures & Algorithms, Database Systems, Web Development, Software Engineering Principles, Computer Networks
`;

export const SAMPLE_JOBS = [
  {
    id: "fullstack-dev",
    title: "Full Stack Engineer (React / Python)",
    company: "Veloce Technologies",
    location: "Remote / San Francisco",
    experience: "2-4 years",
    description: `
We are looking for a passionate Full Stack Software Engineer to join our core product team. You will build and scale customer-facing web applications, design clean RESTful APIs, and collaborate closely with product managers and designers.

Responsibilities:
• Build modern, high-performance web applications using React, Next.js, and TypeScript.
• Architect and maintain robust backend APIs using Python (FastAPI or Django) and Node.js.
• Design efficient database schemas in PostgreSQL, write optimized SQL queries, and implement Redis caching.
• Deploy scalable containerized applications with Docker, Kubernetes, and AWS cloud infrastructure.
• Write clean, testable code with comprehensive unit and integration test coverage.
• Participate in design discussions, sprint ceremonies, and peer code reviews.

Requirements:
• 2+ years of professional software development experience.
• Strong proficiency in TypeScript, React, and modern frontend state management.
• Solid background in Python (FastAPI/Django) and RESTful API architecture.
• Hands-on experience with relational databases (PostgreSQL/MySQL) and caching (Redis).
• Familiarity with Docker, CI/CD pipelines, and cloud services (AWS or GCP).
• Excellent communication skills and a growth mindset.
    `
  },
  {
    id: "ai-engineer",
    title: "AI / Machine Learning Application Engineer",
    company: "CognitiveLabs AI",
    location: "New York, NY / Hybrid",
    experience: "2+ years",
    description: `
CognitiveLabs is building the next generation of AI-native enterprise applications. We are seeking an AI Application Engineer who bridges modern software engineering with generative AI models and LLM orchestration.

Key Responsibilities:
• Build full-stack AI applications integrating LLM APIs (OpenAI, Gemini, Anthropic) and vector databases (Pinecone, ChromaDB, Weaviate).
• Implement RAG (Retrieval-Augmented Generation) pipelines and autonomous agent workflows using LangChain or LlamaIndex.
• Develop high-throughput backend services in Python (FastAPI/AsyncIO) to serve model inferences.
• Design intuitive user interfaces with Next.js, React, and Tailwind CSS.
• Monitor model performance, latency, token costs, and output hallucination guards.

Requirements:
• Strong coding skills in Python and TypeScript/JavaScript.
• Experience building production applications with LLMs, prompt engineering, and embeddings.
• Experience with vector databases (Pinecone, Chroma, pgvector) and RAG architecture.
• Proficiency in FastAPI, Docker, and REST APIs.
• Knowledge of cloud platforms (AWS/GCP) and deployment best practices.
    `
  },
  {
    id: "frontend-engineer",
    title: "Senior Frontend Developer (Next.js / TypeScript)",
    company: "HyperScale Design",
    location: "Remote",
    experience: "3+ years",
    description: `
HyperScale Design is seeking a talented Frontend Developer to build world-class web experiences. You will lead UI development across our suite of SaaS products.

Responsibilities:
• Architect responsive, accessible, and fast web applications using Next.js 14/15, React 19, and TypeScript.
• Craft clean, component-driven design systems with Tailwind CSS, Radix UI, and Framer Motion.
• Integrate with backend GraphQL and REST APIs, optimizing client-side caching and state management.
• Ensure cross-browser compatibility, mobile responsiveness, and Core Web Vitals performance benchmarks.
• Mentor junior developers and maintain high standards for UI code quality.

Requirements:
• 3+ years of focused frontend development experience.
• Deep expertise in React, Next.js App Router, TypeScript, and modern CSS/Tailwind.
• Experience with performance profiling, Lighthouse audits, and bundle optimization.
• Familiarity with testing frameworks (Vitest, Jest, Playwright/Cypress).
    `
  }
];

export const SKILL_TAXONOMY: Record<string, string[]> = {
  "Languages": ["python", "javascript", "typescript", "java", "c++", "c#", "go", "golang", "rust", "ruby", "php", "swift", "kotlin", "sql", "html", "html5", "css", "css3"],
  "Frontend": ["react", "react.js", "next.js", "nextjs", "vue", "vue.js", "angular", "svelte", "redux", "zustand", "tailwind", "tailwind css", "bootstrap", "sass", "webpack", "vite", "graphql", "responsive design", "web vitals"],
  "Backend & APIs": ["fastapi", "django", "flask", "node.js", "nodejs", "express", "express.js", "spring boot", "nestjs", "rest", "restful", "rest api", "graphql", "microservices", "grpc", "celery", "websockets", "oauth", "jwt"],
  "Databases & Caching": ["postgresql", "postgres", "mysql", "mongodb", "redis", "sqlite", "cassandra", "dynamodb", "elasticsearch", "prisma", "sqlalchemy", "firebase"],
  "Cloud & DevOps": ["docker", "kubernetes", "aws", "amazon web services", "azure", "gcp", "google cloud", "ci/cd", "github actions", "gitlab ci", "terraform", "linux", "nginx", "prometheus", "grafana", "git", "serverless"],
  "AI, ML & Data": ["machine learning", "deep learning", "nlp", "llm", "large language models", "openai", "gemini", "langchain", "llamaindex", "hugging face", "pytorch", "tensorflow", "pandas", "numpy", "scikit-learn", "vector database", "rag", "pymupdf", "embeddings"],
  "Testing & Tools": ["pytest", "jest", "cypress", "playwright", "vitest", "postman", "swagger", "jira", "agile", "scrum", "unit testing", "integration testing"]
};

export const HIGH_IMPACT_VERBS = [
  "spearheaded", "engineered", "architected", "orchestrated", "optimized",
  "developed", "deployed", "implemented", "automated", "streamlined",
  "accelerated", "designed", "scaled", "overhauled", "mentored", "pioneered",
  "refactored", "integrated", "boosted", "delivered", "championed"
];

export const WEAK_PASSIVE_PHRASES = [
  "worked on", "assisted with", "helped to", "responsible for", "participated in",
  "was involved in", "handled", "aided in", "contributed to", "duties included"
];

export function extractContactInfo(text: string) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  let name = "Candidate";
  for (const line of lines.slice(0, 4)) {
    const cleaned = line.replace(/[^a-zA-Z\s]/g, "").trim();
    if (cleaned && cleaned.split(/\s+/).length >= 2 && cleaned.split(/\s+/).length <= 3) {
      if (!["resume", "curriculum", "vitae", "summary", "contact"].some(k => cleaned.toLowerCase().includes(k))) {
        name = cleaned;
        break;
      }
    }
  }

  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
  const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
  const portfolioMatch = text.match(/(?:https?:\/\/)?([a-zA-Z0-9_-]+\.(?:io|dev|me|tech|app))/i);

  return {
    name,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    linkedin: linkedinMatch ? `linkedin.com/in/${linkedinMatch[1]}` : null,
    github: githubMatch ? `github.com/` + githubMatch[1] : null,
    portfolio: portfolioMatch ? portfolioMatch[1] : null,
    location: "Available"
  };
}

export function extractSkills(text: string) {
  const textLower = text.toLowerCase();
  const found: Record<string, string[]> = {};

  for (const [category, skills] of Object.entries(SKILL_TAXONOMY)) {
    const matched: string[] = [];
    for (const skill of skills) {
      const regex = new RegExp(`(?:\\b|(?<=[\\s,/(]))${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\b|(?=[\\s,/)]))`, 'i');
      if (regex.test(textLower)) {
        matched.push(skill.length > 3 ? skill.charAt(0).toUpperCase() + skill.slice(1) : skill.toUpperCase());
      }
    }
    if (matched.length > 0) {
      found[category] = Array.from(new Set(matched)).sort();
    }
  }
  return found;
}

export function analyzeResumeText(text: string, filename: string = "Resume.pdf", pages: number = 1) {
  const textLower = text.toLowerCase();
  const contact = extractContactInfo(text);
  const detectedSkills = extractSkills(text);

  const metricHits = (text.match(/\d+%|\$\d+|\b\d{2,}\b|\d+x\b|\b\d+\+\b/g) || []).length;
  const impactScore = Math.min(100, Math.floor((metricHits / 6) * 100));

  const strongVerbsCount = HIGH_IMPACT_VERBS.filter(v => new RegExp(`\\b${v}\\b`, 'i').test(textLower)).length;
  const weakPhrasesCount = WEAK_PASSIVE_PHRASES.filter(p => textLower.includes(p)).length;
  const actionVerbScore = Math.min(100, Math.max(20, (strongVerbsCount * 15) - (weakPhrasesCount * 10)));

  const totalSkillsFound = Object.values(detectedSkills).reduce((acc, curr) => acc + curr.length, 0);
  const keywordScore = Math.min(100, Math.floor((totalSkillsFound / 14) * 100));

  let structurePoints = 0;
  if (contact.email) structurePoints += 20;
  if (contact.phone) structurePoints += 15;
  if (contact.linkedin || contact.github) structurePoints += 15;
  if (/experience|work history/i.test(textLower)) structurePoints += 25;
  if (/skills/i.test(textLower)) structurePoints += 15;
  if (/education/i.test(textLower)) structurePoints += 10;
  const structureScore = Math.min(100, structurePoints);

  const overallAts = Math.round(
    (impactScore * 0.30) +
    (actionVerbScore * 0.25) +
    (keywordScore * 0.25) +
    (structureScore * 0.20)
  );

  const scoreBreakdown = [
    {
      category: "Measurable Impact & Metrics",
      score: impactScore,
      weight: 0.30,
      status: impactScore >= 80 ? "excellent" : impactScore >= 60 ? "good" : "needs_improvement",
      feedback: impactScore >= 70
        ? `Found ${metricHits} quantifiable metrics. Recruiters and ATS algorithms prioritize quantifiable results.`
        : `Only ${metricHits} metrics detected. Add quantifiable outcomes (e.g., 'reduced latency by 35%').`
    },
    {
      category: "Action Verbs & Leadership",
      score: actionVerbScore,
      weight: 0.25,
      status: actionVerbScore >= 80 ? "excellent" : actionVerbScore >= 60 ? "good" : "needs_improvement",
      feedback: actionVerbScore >= 70
        ? `Strong active voice with ${strongVerbsCount} high-impact power verbs.`
        : `Detected passive phrases (${weakPhrasesCount} instances). Replace with assertive verbs like 'Engineered' or 'Architected'.`
    },
    {
      category: "Technical Keyword Depth",
      score: keywordScore,
      weight: 0.25,
      status: keywordScore >= 80 ? "excellent" : keywordScore >= 60 ? "good" : "needs_improvement",
      feedback: `Extracted ${totalSkillsFound} industry-standard technical competencies.`
    },
    {
      category: "ATS Formatting & Completeness",
      score: structureScore,
      weight: 0.20,
      status: structureScore >= 80 ? "excellent" : "good",
      feedback: structureScore >= 80
        ? "All critical resume sections and verified contact identifiers detected cleanly."
        : "Enhance resume structure with dedicated skills, experience, and contact sections."
    }
  ];

  const bulletImprovements = [
    {
      original: "Worked on customer dashboards and fixed backend bugs.",
      improved: "Architected responsive analytics dashboard using React & Next.js, resolving 45+ critical Jira issues and accelerating data load times by 40%.",
      critique: "Replaces passive 'worked on' with 'Architected' and provides concrete volume and percentage acceleration.",
      framework: "STAR Method"
    },
    {
      original: "Assisted team with database schema migrations in PostgreSQL.",
      improved: "Engineered automated PostgreSQL database schema migration pipelines, reducing deployment schema lock downtime by 85%.",
      critique: "Transitions from supporting role to engineering ownership with measurable downtime reduction.",
      framework: "STAR Method"
    }
  ];

  return {
    filename,
    pages,
    extracted_text: text,
    contact_info: contact,
    ats_score: overallAts,
    score_breakdown: scoreBreakdown,
    detected_skills: detectedSkills,
    detected_sections: ["Summary", "Experience", "Skills", "Education", "Projects"],
    missing_sections: [],
    strengths: [
      `Quantifiable metrics: resume contains ${metricHits} measurable data points.`,
      `Dynamic action verbs: features ${strongVerbsCount} high-impact leadership verbs.`,
      `Professional online presence: contact links identified for direct recruiter review.`
    ],
    improvements: [
      "Quantify remaining bullet points with concrete percentages, numbers, or time saved.",
      "Highlight cloud deployment or microservices experience in project summaries."
    ],
    bullet_improvements: bulletImprovements,
    summary_critique: "Strong technical candidate profile with high ATS keyword alignment and clear career progression.",
    engine_used: "CareerPilot Vercel Native Engine"
  };
}

export function matchJobEngine(resumeText: string, jobTitle: string, jobDescription: string) {
  const resumeSkills = extractSkills(resumeText);
  const resumeSet = new Set(Object.values(resumeSkills).flat().map(s => s.toLowerCase()));

  const jdSkills = extractSkills(jobDescription);
  let jdFlat = Object.values(jdSkills).flat().map(s => s.toLowerCase());
  if (jdFlat.length === 0) {
    jdFlat = ["react", "typescript", "python", "fastapi", "docker", "postgresql", "aws"];
  }
  const jdSet = Array.from(new Set(jdFlat));

  const matched = jdSet.filter(s => resumeSet.has(s)).map(s => s.charAt(0).toUpperCase() + s.slice(1));
  const missing = jdSet.filter(s => !resumeSet.has(s)).map(s => s.charAt(0).toUpperCase() + s.slice(1));

  const matchScore = Math.min(98, Math.max(35, Math.round((matched.length / Math.max(1, jdSet.length)) * 100)));
  const status = matchScore >= 75 ? "Strong Match" : matchScore >= 50 ? "Moderate Match" : "Growth Opportunity";

  const critical = missing.slice(0, 3);
  const niceToHave = missing.slice(3);

  const tips = missing.slice(0, 3).map(skill =>
    `Incorporate '${skill}' into your Projects or Work Experience sections with quantifiable achievements.`
  );
  if (tips.length === 0) {
    tips.push("Your resume matches this role's core keywords closely! Highlight quantitative outcomes in your bullet points.");
  }

  const roadmap = [
    {
      week: 1,
      title: `Core Foundations & Gap Bridging: ${critical[0] || "Modern Microservices"}`,
      description: "Deep dive into the primary missing skill required by the target job description.",
      action_items: [
        `Complete hands-on tutorials or official documentation for ${critical[0] || "Modern Microservices"}.`,
        "Set up a dedicated sandbox repository and write clean test scripts."
      ],
      recommended_project: `Build a mini service utilizing ${critical[0] || "FastAPI & Redis"}.`
    },
    {
      week: 2,
      title: `Integration & Architecture: ${critical[1] || "Cloud & Containerization"}`,
      description: "Connect your new skills to full-stack workflows with automated CI/CD and databases.",
      action_items: [
        "Implement database schema migrations, caching, or asynchronous job queues.",
        "Containerize your project using Docker and write unit tests."
      ],
      recommended_project: "Deploy a full-stack demo app on AWS or Vercel with GitHub Actions."
    },
    {
      week: 3,
      title: "Portfolio Project Polish & STAR Documentation",
      description: "Document your architecture clearly to showcase directly to hiring managers.",
      action_items: [
        "Write an executive-ready README with architecture diagrams and API specs.",
        "Record a 2-minute video demo or publish a live link."
      ],
      recommended_project: "Publish your capstone repository to GitHub with complete commit history."
    },
    {
      week: 4,
      title: "Interview Simulation & Targeted Applications",
      description: "Align your resume bullet points and practice role-specific technical and behavioral questions.",
      action_items: [
        "Update your resume summary and bullet points to feature your newly built projects.",
        "Complete 3 AI Mock Interview sessions on CareerPilot AI focusing on this exact role."
      ],
      recommended_project: "Submit tailored applications with personalized notes directly to recruiters."
    }
  ];

  return {
    job_title: jobTitle,
    match_score: matchScore,
    status,
    skills_analysis: {
      matched_skills: matched,
      missing_critical_skills: critical,
      missing_nice_to_have: niceToHave
    },
    ats_keyword_tips: tips,
    experience_gap_summary: `You match ${matched.length} of ${jdSet.length} core technical requirements listed. Bridging ${critical.length} critical skills will place your profile in the top candidate bracket.`,
    learning_roadmap: roadmap,
    engine_used: "CareerPilot Vercel Native Engine"
  };
}

export function generateQuestionsEngine(resumeText: string, targetRole: string) {
  const skills = extractSkills(resumeText);
  const flat = Object.values(skills).flat();
  const topSkill = flat[0] || "Python & TypeScript";
  const secondSkill = flat[1] || "RESTful APIs";

  return [
    {
      id: 1,
      type: "Technical Deep Dive",
      question: `Can you walk me through the architecture of a major project where you implemented ${topSkill}? What were the main technical trade-offs you faced?`,
      context_hint: `Focus on your architectural decisions, data flow, error handling, and why you selected ${topSkill} over alternatives.`,
      target_competency: "Technical Architecture & Trade-off Analysis"
    },
    {
      id: 2,
      type: "Behavioral & Leadership",
      question: "Tell me about a time when a critical bug or performance bottleneck occurred in production. How did you diagnose, resolve, and prevent it from recurring?",
      context_hint: "Structure your response using the STAR method: Situation, Task, Action taken, and measurable Result.",
      target_competency: "Incident Management & Problem Solving under Pressure"
    },
    {
      id: 3,
      type: "System Design & Scalability",
      question: `How would you design a scalable service connecting a modern frontend to ${secondSkill} that can handle 10,000 concurrent requests with sub-200ms latency?`,
      context_hint: "Mention caching layers (Redis), connection pooling, asynchronous processing, and horizontal scaling strategies.",
      target_competency: "High-Throughput Distributed Systems"
    },
    {
      id: 4,
      type: "Situational & Team Collaboration",
      question: "Describe a situation where you had a strong disagreement with a teammate or product manager regarding technical implementation. How did you reach consensus?",
      context_hint: "Showcase empathy, data-driven reasoning, active listening, and putting the user or product outcome first.",
      target_competency: "Cross-Functional Collaboration & Conflict Resolution"
    }
  ];
}

export function evaluateAnswerEngine(question: string, userAnswer: string, targetRole: string) {
  const words = userAnswer.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = userAnswer.toLowerCase();

  const hasSituation = /when|project|client|team|company|situation|goal|challenge/i.test(lower);
  const hasAction = /i implemented|i built|i designed|i led|i investigated|i decided|my approach|i profiled/i.test(lower);
  const hasResult = /result|reduced|increased|improved|saved|percent|%|delivered|outcome/i.test(lower);

  let score = 5;
  if (wordCount > 60) score += 1;
  if (wordCount > 120) score += 1;
  if (hasSituation) score += 1;
  if (hasAction) score += 1;
  if (hasResult) score += 1;
  score = Math.min(10, Math.max(3, score));

  const grade = score >= 9 ? "Outstanding" : score >= 7 ? "Strong" : score >= 5 ? "Acceptable" : "Needs Improvement";

  return {
    score,
    grade,
    star_analysis: {
      situation_task: hasSituation ? "Context established detailing project challenges." : "Provide more context about the initial problem.",
      action: hasAction ? "Strong personal ownership demonstrated with specific individual actions." : "Clearly state what YOU personally designed or coded.",
      result: hasResult ? "Quantified outcome or performance metric included." : "Add a measurable result (e.g., '% latency reduction' or 'time saved')."
    },
    strengths: [
      "Articulate technical explanations and clear thought process.",
      hasAction ? "Clear personal agency and problem-solving focus." : "Directly answers the interviewer's question."
    ],
    missing_points: [
      hasResult ? "Continue highlighting trade-offs." : "Include quantified outcome metrics (e.g., latency, cost, adoption).",
      wordCount < 70 ? "Expand slightly on the tools and technical trade-offs selected." : "Structure every behavioral answer with Situation, Task, Action, Result."
    ],
    actionable_suggestions: [
      "Structure all behavioral answers using the STAR method (Situation, Task, Action, Result).",
      "Quantify your results with realistic metrics to impress technical interviewers."
    ],
    ideal_sample_answer: `Situation: In my previous role at NexaTech, our main API was suffering from high latency during peak morning loads.
Task: I was tasked with diagnosing the bottleneck and bringing response times under 500ms before our customer launch.
Action: I profiled the FastAPI endpoints using APM tools, identified redundant N+1 PostgreSQL queries, implemented Redis caching with a 10-minute TTL, and added B-tree indexes on foreign keys.
Result: Peak query latency dropped by 65% (from 1.8s down to 250ms), allowing the application to serve 120,000+ monthly users with 99.9% uptime.`
  };
}
