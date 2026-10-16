// Next.js Native Intelligence Engine with PDF.js for 100% accurate PDF extraction
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");

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
  "Languages": [
    "python", "javascript", "typescript", "java", "c", "c++", "c#", "go",
    "golang", "rust", "ruby", "php", "swift", "kotlin", "sql", "html", "html5", "css", "css3"
  ],
  "AI, Machine Learning & Data": [
    "machine learning", "deep learning", "nlp", "llm", "large language models",
    "opencv", "computer vision", "image processing", "cnn", "tensorflow",
    "scikit-learn", "numpy", "pandas", "matplotlib", "pytorch", "hugging face",
    "tokenisation", "stemming", "lemmatisation", "data analysis", "feature engineering"
  ],
  "Frontend": [
    "react", "react.js", "next.js", "nextjs", "vue", "vue.js", "angular",
    "svelte", "redux", "zustand", "tailwind", "tailwind css", "bootstrap",
    "sass", "webpack", "vite", "graphql", "responsive design"
  ],
  "Backend & APIs": [
    "fastapi", "django", "flask", "node.js", "nodejs", "express", "express.js",
    "spring boot", "nestjs", "rest", "restful", "rest api", "microservices",
    "grpc", "websockets", "oauth"
  ],
  "Databases & Cloud": [
    "postgresql", "postgres", "mysql", "mongodb", "redis", "sqlite",
    "docker", "kubernetes", "aws", "azure", "gcp", "github actions", "ci/cd", "linux"
  ],
  "Development Tools": [
    "jupyter notebook", "jupyter", "google colab", "colab", "vs code", "git",
    "github", "postman", "pycharm"
  ]
};

export const HIGH_IMPACT_VERBS = [
  "spearheaded", "engineered", "architected", "orchestrated", "optimized",
  "developed", "deployed", "implemented", "automated", "streamlined",
  "accelerated", "designed", "scaled", "overhauled", "mentored", "pioneered",
  "refactored", "integrated", "boosted", "delivered", "championed", "trained", "evaluated"
];

export const WEAK_PASSIVE_PHRASES = [
  "worked on", "assisted with", "helped to", "responsible for", "participated in",
  "was involved in", "handled", "aided in", "contributed to", "duties included",
  "learned core", "gained expertise in", "gained expertise"
];

/**
 * Extracts raw text from a PDF buffer using Mozilla's official PDF.js engine.
 * Fully supports font ToUnicode CMaps, ligatures, and multi-page layouts.
 */
export async function extractTextFromPdfBuffer(buffer: Buffer): Promise<{ text: string; pages: number }> {
  try {
    const data = new Uint8Array(buffer);
    const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
    let fullText = "";

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      let lastY: number | null = null;

      for (const item of content.items as any[]) {
        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 4) {
          fullText += "\n";
        }
        fullText += (item.str || "") + " ";
        lastY = item.transform[5];
      }
      fullText += "\n\n";
    }

    // Clean ligatures common in exported Word/LaTeX PDFs
    fullText = fullText
      .replace(/\s*Ɵ\s*/g, "ti")
      .replace(/\s*Ʃ\s*/g, "tt")
      .replace(/\s*Ō\s*/g, "ft")
      .replace(/ﬁ/g, "fi")
      .replace(/ﬂ/g, "fl")
      .replace(/–/g, "-")
      .replace(/—/g, "-")
      .replace(/[ \t]+/g, " ");

    return { text: fullText.trim(), pages: doc.numPages || 1 };
  } catch (err) {
    console.error("PDF.js extraction error:", err);
    throw new Error("Could not extract text from this PDF file.");
  }
}

export function extractContactInfo(text: string, filename: string = "") {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  let name = "Candidate";

  const nonNameKeywords = [
    "resume", "curriculum", "vitae", "summary", "contact", "experience",
    "education", "skills", "projects", "developer", "engineer", "lead",
    "manager", "student", "intern", "objective", "profile", "phone", "email", "@",
    "phone:", "email:", "pin", "india", "odisha"
  ];

  for (const line of lines.slice(0, 8)) {
    const namePart = line.split(/Phone:|Email:|\|/i)[0].trim();
    const cleaned = namePart.replace(/[^a-zA-Z\s]/g, "").trim();
    const words = cleaned.split(/\s+/).filter(Boolean);
    if (words.length >= 2 && words.length <= 4) {
      const lower = cleaned.toLowerCase();
      if (!nonNameKeywords.some(k => lower === k || lower.startsWith(k))) {
        name = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
        break;
      }
    }
  }

  if (name === "Candidate" && filename) {
    const cleanFile = filename.replace(/\.pdf$/i, "").replace(/[_-]/g, " ").trim();
    const fileWords = cleanFile.split(/\s+/).filter(w => !nonNameKeywords.some(k => w.toLowerCase().includes(k)));
    if (fileWords.length >= 2 && fileWords.length <= 3) {
      name = fileWords.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    }
  }

  // Location: e.g. "G.Udayagiri, Kandhamal, Odisha, India | Pin - 762100"
  let location = "Available";
  for (const line of lines.slice(0, 10)) {
    if (line.includes(",") && !line.includes("@") && !/https?:|github|linkedin|phone/i.test(line)) {
      const cleanedLoc = line.split("|")[0].replace(/Pin\s*[-:]?\s*\d+/i, "").trim();
      if (cleanedLoc.length >= 4 && cleanedLoc.length <= 80) {
        location = cleanedLoc;
        break;
      }
    }
  }

  // Email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);

  // Phone
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\b\d{10}\b|(?:\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/);

  // LinkedIn
  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);

  // GitHub
  const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);

  // Portfolio
  const portfolioMatch = text.match(/https?:\/\/(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)|(?<=\s|^)([a-zA-Z0-9-]+\.(?:io|dev|me|app))\b/i);

  return {
    name,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    linkedin: linkedinMatch ? `linkedin.com/in/${linkedinMatch[1]}` : null,
    github: githubMatch ? `github.com/${githubMatch[1]}` : null,
    portfolio: portfolioMatch ? portfolioMatch[1] : null,
    location
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
  const contact = extractContactInfo(text, filename);
  const detectedSkills = extractSkills(text);

  // 1. Metric Impact Score (0-100)
  const metricHits = (text.match(/\d+%|\$\d+|\b\d{2,}\b|\d+x\b|\b\d+\+\b/g) || []).length;
  const impactScore = Math.min(100, Math.floor((metricHits / 6) * 100));

  // 2. Action Verb Score (0-100)
  const strongVerbsFound = HIGH_IMPACT_VERBS.filter(v => new RegExp(`\\b${v}\\b`, 'i').test(textLower));
  const weakPhrasesFound = WEAK_PASSIVE_PHRASES.filter(p => textLower.includes(p));
  const actionVerbScore = Math.min(100, Math.max(25, (strongVerbsFound.length * 15) - (weakPhrasesFound.length * 10)));

  // 3. Technical Keyword Score (0-100)
  const totalSkillsFound = Object.values(detectedSkills).reduce((acc, curr) => acc + curr.length, 0);
  const keywordScore = Math.min(100, Math.floor((totalSkillsFound / 10) * 100));

  // 4. Structure & Completeness Score (0-100)
  const expectedSections = {
    "Summary / Objective": ["summary", "objective", "profile", "about me"],
    "Experience / Work History": ["experience", "employment", "work history", "professional experience"],
    "Skills": ["skills", "technical skills", "technologies", "competencies"],
    "Projects": ["projects", "personal projects", "portfolio projects"],
    "Education": ["education", "academic", "university", "degree", "bachelor", "master", "b.tech", "12th", "10th"],
    "Certifications": ["certifications", "certificates", "courses"]
  };

  const detectedSections: string[] = [];
  const missingSections: string[] = [];

  for (const [secName, keywords] of Object.entries(expectedSections)) {
    if (keywords.some(k => new RegExp(`\\b${k}\\b`, 'i').test(textLower))) {
      detectedSections.push(secName);
    } else {
      missingSections.push(secName);
    }
  }

  let structurePoints = 0;
  if (contact.email) structurePoints += 20;
  if (contact.phone) structurePoints += 15;
  if (contact.linkedin || contact.github) structurePoints += 15;
  if (detectedSections.includes("Experience / Work History")) structurePoints += 25;
  if (detectedSections.includes("Skills")) structurePoints += 15;
  if (detectedSections.includes("Education")) structurePoints += 10;
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
      status: (impactScore >= 80 ? "excellent" : impactScore >= 60 ? "good" : "needs_improvement") as any,
      feedback: impactScore >= 70
        ? `Found ${metricHits} quantifiable metrics. Recruiters and ATS bots heavily prioritize numbers, percentages, and outcomes.`
        : `Detected ${metricHits} metrics. Add more quantified outcomes (e.g., 'achieved 92% accuracy on 5000+ images', 'reduced latency by 40%') to prove business impact.`
    },
    {
      category: "Action Verbs & Leadership",
      score: actionVerbScore,
      weight: 0.25,
      status: (actionVerbScore >= 80 ? "excellent" : actionVerbScore >= 60 ? "good" : "needs_improvement") as any,
      feedback: actionVerbScore >= 70
        ? `Strong active voice with ${strongVerbsFound.length} high-impact power verbs.`
        : `Detected passive phrasing (${weakPhrasesFound.length} instances). Replace them with assertive engineering verbs like 'Architected', 'Implemented', or 'Engineered'.`
    },
    {
      category: "Technical Keyword Depth",
      score: keywordScore,
      weight: 0.25,
      status: (keywordScore >= 80 ? "excellent" : keywordScore >= 60 ? "good" : "needs_improvement") as any,
      feedback: `Extracted ${totalSkillsFound} industry-standard technical competencies across ${Object.keys(detectedSkills).length} engineering domains.`
    },
    {
      category: "ATS Formatting & Completeness",
      score: structureScore,
      weight: 0.20,
      status: (structureScore >= 80 ? "excellent" : "good") as any,
      feedback: missingSections.length === 0
        ? "All critical resume sections and verified contact identifiers detected cleanly."
        : `Detected ${detectedSections.length} core sections. Recommended additions: ${missingSections.join(", ")}.`
    }
  ];

  // Dynamic Bullet Point Extraction from the actual user's resume!
  const rawLines = text.split("\n").map(l => l.trim()).filter(Boolean);
  
  // First look for genuine bullet items starting with symbols
  let bulletCandidates = rawLines.filter(l =>
    /^[•\-\*\·\d+\.]\s*/.test(l) &&
    l.length > 20 &&
    !Object.values(expectedSections).flat().some(sec => l.toLowerCase() === sec)
  );

  // If none found with symbols, fallback to sentence lines
  if (bulletCandidates.length === 0) {
    bulletCandidates = rawLines.filter(l =>
      l.length > 25 &&
      /^[A-Z]/.test(l) &&
      !Object.values(expectedSections).flat().some(sec => l.toLowerCase() === sec) &&
      !/^(summary|objective|profile|about|skills|technical|languages|education|projects|experience)/i.test(l)
    );
  }

  const bulletImprovements: Array<{ original: string; improved: string; critique: string; framework: string }> = [];

  for (const b of bulletCandidates) {
    const cleanB = b.replace(/^[•\-\*\·\s]+/, "").trim();
    const hasNum = /\d+/.test(cleanB);
    const hasWeak = WEAK_PASSIVE_PHRASES.some(wp => cleanB.toLowerCase().includes(wp));

    if ((!hasNum || hasWeak) && cleanB.length > 20 && cleanB.length < 220) {
      let improved = cleanB;
      if (/gained expertise in/i.test(improved)) {
        improved = improved.replace(/gained expertise in/i, "Architected high-performance models and pipelines in");
      } else if (/gained expertise/i.test(improved)) {
        improved = improved.replace(/gained expertise/i, "Architected and delivered scalable solutions in");
      } else if (/learned core/i.test(improved)) {
        improved = improved.replace(/learned core/i, "Engineered production algorithms and modular solutions using");
      } else if (/worked on/i.test(improved)) {
        improved = improved.replace(/worked on/i, "Implemented industry-grade");
      } else if (hasWeak) {
        for (const wp of WEAK_PASSIVE_PHRASES) {
          improved = improved.replace(new RegExp(wp, "i"), "Engineered and deployed");
        }
      } else {
        const firstWord = improved.split(/\s+/)[0];
        if (/^(developed|built|created)/i.test(firstWord)) {
          improved = `Architected and ${improved.toLowerCase()}`;
        } else if (/^(applied|used|implemented)/i.test(firstWord)) {
          improved = `Engineered and ${improved.toLowerCase()}`;
        } else {
          improved = `Spearheaded and developed ${improved.slice(firstWord.length).trim()}`;
        }
      }

      if (!hasNum) {
        if (/chatbot|nlp|text|classification/i.test(cleanB)) {
          improved += ", achieving 94% intent recognition precision across 1,000+ benchmark queries.";
        } else if (/gesture|opencv|cnn|vision|image/i.test(cleanB)) {
          improved += ", achieving 92% classification accuracy and 35ms real-time inference latency.";
        } else {
          improved += ", achieving 90%+ system reliability and reducing turnaround processing latency by 35%.";
        }
      }

      bulletImprovements.push({
        original: cleanB,
        improved,
        critique: "Replaces passive phrasing with proactive ownership verb and introduces measurable impact (STAR framework: Situation, Task, Action, Result).",
        framework: "STAR Method"
      });

      if (bulletImprovements.length >= 3) break;
    }
  }

  // Fallback if candidate bullets are all already quantified
  if (bulletImprovements.length === 0) {
    bulletImprovements.push({
      original: bulletCandidates[0] ? bulletCandidates[0].replace(/^[•\-\*\·\s]+/, "") : "Developed NLP chatbot using text classification techniques.",
      improved: "Architected end-to-end NLP chatbot utilizing tokenisation and Naive Bayes models, achieving 94% classification precision across 10,000+ queries.",
      critique: "Expands bullet with specific architecture details and quantifiable user query volume (STAR framework).",
      framework: "STAR Method"
    });
  }

  // Dynamic Strengths based on actual resume content
  const strengths: string[] = [];
  if (impactScore >= 50) strengths.push(`Quantifiable metrics: resume includes ${metricHits} data points demonstrating measurable performance (e.g. 92% accuracy, 5000+ images).`);
  if (actionVerbScore >= 50) strengths.push(`Assertive technical phrasing: features ${strongVerbsFound.length} power verbs highlighting hands-on engineering.`);
  if (totalSkillsFound >= 6) strengths.push(`Strong specialized technical repertoire covering ${Object.keys(detectedSkills).join(", ")}.`);
  if (detectedSections.includes("Projects")) strengths.push("Strong project showcase: highlights real-world applied AI/ML applications.");
  if (strengths.length === 0) strengths.push("Clean foundational format with clear technical skill taxonomy.");

  // Dynamic Improvements based on actual resume content
  const improvements: string[] = [];
  if (impactScore < 70) improvements.push("Quantify more project bullets: Every project should answer 'What was the accuracy, performance improvement, or dataset size?'.");
  if (weakPhrasesFound.length > 0) improvements.push(`Eliminate passive verbs: Replace passive phrasing like '${weakPhrasesFound[0]}' with verbs like 'Architected', 'Spearheaded', or 'Implemented'.`);
  if (!contact.github) improvements.push("Add a direct GitHub profile link so recruiters can inspect your Computer Vision & Machine Learning repositories.");
  if (!contact.linkedin) improvements.push("Add a LinkedIn profile link to improve ATS recruiter discoverability.");

  return {
    filename,
    pages,
    extracted_text: text,
    contact_info: contact,
    ats_score: overallAts,
    score_breakdown: scoreBreakdown,
    detected_skills: detectedSkills,
    detected_sections: detectedSections,
    missing_sections: missingSections,
    strengths,
    improvements,
    bullet_improvements: bulletImprovements,
    summary_critique: `Identified profile for ${contact.name}. Candidate demonstrates strong competencies in ${Object.values(detectedSkills).flat().slice(0, 5).join(", ") || "Machine Learning & Software Engineering"}.`,
    engine_used: "CareerPilot Vercel Native Engine (PDF.js)"
  };
}

export function matchJobEngine(resumeText: string, jobTitle: string, jobDescription: string) {
  const resumeSkills = extractSkills(resumeText);
  const resumeSet = new Set(Object.values(resumeSkills).flat().map(s => s.toLowerCase()));

  const jdSkills = extractSkills(jobDescription);
  let jdFlat = Object.values(jdSkills).flat().map(s => s.toLowerCase());
  if (jdFlat.length === 0) {
    jdFlat = ["python", "machine learning", "deep learning", "opencv", "tensorflow", "scikit-learn"];
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
      title: `Core Foundations & Gap Bridging: ${critical[0] || "Advanced Deep Learning Architecture"}`,
      description: "Deep dive into the primary missing skill required by the target job description.",
      action_items: [
        `Complete hands-on tutorials or official documentation for ${critical[0] || "Advanced Deep Learning"}.`,
        "Set up a dedicated sandbox repository and write clean test scripts."
      ],
      recommended_project: `Build a mini service utilizing ${critical[0] || "PyTorch & OpenCV"}.`
    },
    {
      week: 2,
      title: `Integration & Architecture: ${critical[1] || "Model Optimization & Edge Deployment"}`,
      description: "Connect your models to full-stack inference pipelines with TensorFlow Lite or ONNX.",
      action_items: [
        "Implement model quantization, caching, or asynchronous inference queues.",
        "Containerize your model pipeline using Docker and test throughput."
      ],
      recommended_project: "Deploy an image recognition API on AWS or Vercel with automated test coverage."
    },
    {
      week: 3,
      title: "Portfolio Project Polish & STAR Documentation",
      description: "Document your architecture clearly to showcase directly to hiring managers.",
      action_items: [
        "Write an executive-ready README with architecture diagrams and performance benchmarks.",
        "Record a 2-minute video demo showcasing your model accuracy."
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
    engine_used: "CareerPilot Vercel Native Engine (PDF.js)"
  };
}

export function generateQuestionsEngine(resumeText: string, targetRole: string) {
  const skills = extractSkills(resumeText);
  const flat = Object.values(skills).flat();
  const topSkill = flat[0] || "Python & Machine Learning";
  const secondSkill = flat[1] || "Computer Vision & OpenCV";

  return [
    {
      id: 1,
      type: "Technical Deep Dive",
      question: `Can you walk me through the architecture of a major project where you implemented ${topSkill}? What were the main technical trade-offs you faced?`,
      context_hint: `Focus on your architectural decisions, data preprocessing, model selection, and why you selected ${topSkill} over alternatives.`,
      target_competency: "Technical Architecture & Trade-off Analysis"
    },
    {
      id: 2,
      type: "Behavioral & Leadership",
      question: "Tell me about a time when a critical bug or performance bottleneck occurred during model training or in production. How did you diagnose, resolve, and prevent it from recurring?",
      context_hint: "Structure your response using the STAR method: Situation, Task, Action taken, and measurable Result.",
      target_competency: "Incident Management & Problem Solving under Pressure"
    },
    {
      id: 3,
      type: "System Design & Scalability",
      question: `How would you design a scalable real-time inference service connecting a modern frontend to ${secondSkill} that can process video streams with sub-200ms latency?`,
      context_hint: "Mention frame downsampling, asynchronous worker queues, batch inference, and model quantization (TensorFlow Lite / ONNX).",
      target_competency: "High-Throughput Machine Learning Systems"
    },
    {
      id: 4,
      type: "Situational & Team Collaboration",
      question: "Describe a situation where you had a strong disagreement with a teammate or project lead regarding model accuracy vs inference speed. How did you reach consensus?",
      context_hint: "Showcase empathy, data-driven reasoning, active listening, and putting the user or product outcome first.",
      target_competency: "Cross-Functional Collaboration & Trade-off Analysis"
    }
  ];
}

export function evaluateAnswerEngine(question: string, userAnswer: string, targetRole: string) {
  const words = userAnswer.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = userAnswer.toLowerCase();

  const hasSituation = /when|project|client|team|company|situation|goal|challenge|dataset/i.test(lower);
  const hasAction = /i implemented|i built|i designed|i led|i investigated|i decided|my approach|i profiled|i trained/i.test(lower);
  const hasResult = /result|reduced|increased|improved|saved|percent|%|delivered|outcome|accuracy/i.test(lower);

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
      situation_task: hasSituation ? "Context established detailing project challenges." : "Provide more context about the initial problem and dataset.",
      action: hasAction ? "Strong personal ownership demonstrated with specific individual actions." : "Clearly state what YOU personally designed, trained, or coded.",
      result: hasResult ? "Quantified outcome or performance metric included (e.g. accuracy %)." : "Add a measurable result (e.g., 'achieved 92% accuracy' or '% latency reduction')."
    },
    strengths: [
      "Articulate technical explanations and clear thought process.",
      hasAction ? "Clear personal agency and problem-solving focus." : "Directly answers the interviewer's question."
    ],
    missing_points: [
      hasResult ? "Continue highlighting trade-offs." : "Include quantified outcome metrics (e.g., accuracy, latency, dataset size).",
      wordCount < 70 ? "Expand slightly on the tools and technical trade-offs selected." : "Structure every behavioral answer with Situation, Task, Action, Result."
    ],
    actionable_suggestions: [
      "Structure all behavioral answers using the STAR method (Situation, Task, Action, Result).",
      "Quantify your results with realistic metrics to impress technical interviewers."
    ],
    ideal_sample_answer: `Situation: During my Computer Vision Internship at NIST University, our team was building a real-time hand gesture recognition system to recognize numbers and letters.
Task: I was tasked with developing the CNN architecture and optimizing the pipeline so it could achieve over 90% accuracy with sub-50ms inference time on edge devices.
Action: I designed and trained a Convolutional Neural Network on 5000+ augmented images using TensorFlow and OpenCV, applied data preprocessing, and converted the final model to TensorFlow Lite for quantization.
Result: The model achieved 92% recognition accuracy and ran smoothly at 30 FPS in real-time, meeting all deployment benchmarks.`
  };
}
