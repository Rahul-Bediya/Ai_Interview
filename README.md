
# Crisp Interview

This project is an AI-driven Interview Assistant built with React and Redux. It simulates a real interview process where candidates upload resumes, answer AI-generated questions, and receive automated scoring and feedback. Interviewers can review candidates in a dashboard with detailed analytics.
## 🚀 Features
🎙 Interviewee (Candidate Side)
- Resume Upload: Accepts PDF/DOCX, extracts Name, Email, Phone.
- Data Collection: If any field is missing, the chatbot prompts the candidate before starting.
- Timed Interview:6 questions (2 Easy → 2 Medium → 2 Hard).
   Timers per question:  
          - Easy → ⏱ 30s  
        - Medium → ⏱ 60s  
      - Hard → ⏱ 120s   
   Auto-submit when time runs out.
- Answer Options: Speak (speech-to-text) or type answers manually.
- Camera & Mic: Records real-time during interview.
- Final Evaluation: AI generates scores and summary

📊 Interviewer (Dashboard)
- Candidate List: Displays all candidates ordered by score.
- Detailed View: View profile, answers, AI notes, and final performance.
- Persistence: Data stored locally (Redux + redux-persist).
- Welcome Back Modal: If a session is interrupted, the candidate can resume seamlessly.



## 🛠Tech Stack

* **Frontend**: React (Vite), Redux Toolkit, redux-persist,TailwindCSS
* **Speech Recognition**: `react-speech-recognition`
* **UI/UX**: TailwindCSS + shadcn + Framer Motion + Lucide Icons
* **Deployment**: Vercel



##  ⚙️Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rahul-Bediya/Ai_Interview.git
   cd Ai_Interview
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```



3. **Start development server**

   ```bash
   npm run dev
   ```

---
    
## 🌐 Deployment

* Deployed on **Vercel** 


## 📹Demo

* **Video Walkthrough**: (Add link here)
* **Live App**: https://ai-interview-kappa-puce.vercel.app/
## 📌Authors

**Rahul Bediya**
Built for **Swipe Internship Assignment**

