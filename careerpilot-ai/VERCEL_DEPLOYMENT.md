# 🚀 Vercel Deployment Guide for CareerPilot AI

CareerPilot AI is **100% pre-configured for 1-Click Vercel Deployment**.

Thanks to its dual-engine architecture:
- All API endpoints (`/api/analyze-resume`, `/api/sample-resume`, `/api/match-job`, `/api/generate-interview-questions`, `/api/evaluate-answer`) run natively on Vercel Serverless.
- **Zero external servers are required** to make the full application live!
- Recruiters can immediately test all features with 100% uptime.

---

## 📋 Step-by-Step Deployment Instructions

### Step 1: Push Project to GitHub
1. Create a new repository on [GitHub](https://github.com/new) named `careerpilot-ai`.
2. Push your project code to GitHub.

---

### Step 2: Import into Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New…** → **Project**.
3. Select your `careerpilot-ai` GitHub repository.
4. In the **Project Configuration** screen:
   - **Framework Preset**: `Next.js` (detected automatically)
   - **Build Command**: `next build` (default)
   - **Output Directory**: `.next` (default)

---

### Step 3: (Optional) Add Environment Variables
In the **Environment Variables** section on Vercel:
- `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API Key.
  *(If omitted, CareerPilot AI will automatically run its built-in NLP heuristic engine so your live demo never crashes or fails!)*
- `NEXT_PUBLIC_API_URL`: *(Optional)* If you host the Python FastAPI backend on Render or Railway, paste its URL here. If left empty, Vercel uses the built-in serverless route handlers!

---

### Step 4: Click Deploy! 🎉
1. Click **Deploy**.
2. Within 60 seconds, your site will be live at `https://<your-project>.vercel.app`.
3. Add this live URL to your GitHub README and your Resume under Projects!
