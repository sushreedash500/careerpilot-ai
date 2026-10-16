# Sample resumes and job descriptions for 1-click recruiter demos and testing

SAMPLE_RESUME_TEXT = """
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
"""

SAMPLE_JOBS = [
    {
        "id": "fullstack-dev",
        "title": "Full Stack Engineer (React / Python)",
        "company": "Veloce Technologies",
        "location": "Remote / San Francisco",
        "experience": "2-4 years",
        "description": """
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
"""
    },
    {
        "id": "ai-engineer",
        "title": "AI / Machine Learning Application Engineer",
        "company": "CognitiveLabs AI",
        "location": "New York, NY / Hybrid",
        "experience": "2+ years",
        "description": """
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
"""
    },
    {
        "id": "frontend-engineer",
        "title": "Senior Frontend Developer (Next.js / TypeScript)",
        "company": "HyperScale Design",
        "location": "Remote",
        "experience": "3+ years",
        "description": """
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
"""
    }
]
