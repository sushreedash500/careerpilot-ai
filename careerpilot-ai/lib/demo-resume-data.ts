import { ResumeAnalysis } from "@/components/CareerContext";

export const DEMO_RESUME_DATA: ResumeAnalysis = {
  filename: "Alex_Chen_FullStack_Resume.pdf",
  pages: 1,
  extracted_text: `ALEX CHEN
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
Relevant Coursework: Data Structures & Algorithms, Database Systems, Web Development, Software Engineering Principles, Computer Networks`,
  contact_info: {
    name: "Alex Chen",
    email: "alex.chen.dev@example.com",
    phone: "(555) 234-5678",
    linkedin: "linkedin.com/in/alexchen-dev",
    github: "github.com/alexchen-tech",
    portfolio: "alexchen.io",
    location: "San Francisco, CA"
  },
  ats_score: 95,
  score_breakdown: [
    {
      category: "Measurable Impact & Metrics",
      score: 100,
      weight: 0.3,
      status: "excellent",
      feedback: "Found 22 quantifiable metrics. Recruiters and ATS bots heavily prioritize numbers, percentages, and outcomes."
    },
    {
      category: "Action Verbs & Leadership",
      score: 80,
      weight: 0.25,
      status: "excellent",
      feedback: "Strong active voice with 6 high-impact power verbs."
    },
    {
      category: "Technical Keyword Depth",
      score: 100,
      weight: 0.25,
      status: "excellent",
      feedback: "Extracted 33 industry-standard technical competencies across 6 engineering domains."
    },
    {
      category: "ATS Formatting & Completeness",
      score: 100,
      weight: 0.2,
      status: "excellent",
      feedback: "Detected 5 core sections. Recommended additions: Certifications."
    }
  ],
  detected_skills: {
    Languages: ["CSS", "Css3", "Html5", "Javascript", "Python", "SQL", "Typescript"],
    "AI, Machine Learning & Data": ["Hugging face", "PyMuPDF", "LangChain"],
    Frontend: ["Next.js", "React", "Redux", "Responsive design", "Tailwind", "Tailwind css"],
    "Backend & APIs": ["Django", "Express", "Fastapi", "Microservices", "Node.js", "Oauth", "Rest", "Restful", "Websockets"],
    "Databases & Cloud": ["AWS", "Ci/cd", "Docker", "Github actions", "Mongodb", "Postgresql", "Redis"],
    "Development Tools": ["Git", "Github", "Postman", "Jest", "PyTest"]
  },
  detected_sections: ["Summary / Objective", "Experience / Work History", "Skills", "Projects", "Education"],
  missing_sections: ["Certifications"],
  strengths: [
    "Quantifiable metrics: resume includes 22 data points demonstrating measurable performance (e.g. 42% latency reduction, 120,000+ users).",
    "Assertive technical phrasing: features 6 power verbs highlighting hands-on engineering.",
    "Strong specialized technical repertoire covering Languages, Frontend, Backend & APIs, Databases & Cloud, Development Tools.",
    "Strong project showcase: highlights real-world applied full-stack and AI services."
  ],
  improvements: [
    "Eliminate passive verbs: Replace passive phrasing like 'worked on' with verbs like 'Architected', 'Spearheaded', or 'Implemented'."
  ],
  bullet_improvements: [
    {
      original: "Developed and maintained customer-facing analytics dashboards using React, TypeScript, and Chart.js.",
      improved: "Architected and delivered customer-facing analytics dashboards using React, TypeScript, and Chart.js, serving 50,000+ daily active users with 99.9% uptime.",
      critique: "Replaces passive phrasing with proactive ownership verb and introduces measurable impact (STAR framework: Situation, Task, Action, Result).",
      framework: "STAR Method"
    },
    {
      original: "Worked on bug fixing and writing unit tests with PyTest and Jest, improving overall test coverage from 54% to 88%.",
      improved: "Implemented comprehensive test suites with PyTest and Jest, elevating code coverage from 54% to 88% and eliminating 40+ production edge-case regressions.",
      critique: "Replaces passive phrasing with proactive ownership verb and introduces measurable impact (STAR framework: Situation, Task, Action, Result).",
      framework: "STAR Method"
    },
    {
      original: "Assisted team with database schema migrations and indexing in PostgreSQL.",
      improved: "Spearheaded PostgreSQL schema optimizations and indexing strategies, reducing query latency by 45% across high-throughput endpoints.",
      critique: "Replaces passive phrasing with proactive ownership verb and introduces measurable impact (STAR framework: Situation, Task, Action, Result).",
      framework: "STAR Method"
    }
  ],
  summary_critique: "Identified profile for Alex Chen. Candidate demonstrates strong competencies in React, Next.js, TypeScript, Python, FastAPI, and PostgreSQL.",
  engine_used: "CareerPilot Vercel Native Engine (PDF.js)"
};
