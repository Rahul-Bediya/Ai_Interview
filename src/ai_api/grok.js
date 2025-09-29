// Grok API integration (question generation + reviews)
export async function generateQuestions({ resume, jobTitle, jobDescription }) {
  try {
    const response = await fetch("https://api.grok.cloud/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-1",
        messages: [
          {
            role: "system",
            content: "You are an AI interviewer that generates job-specific interview questions."
          },
          {
            role: "user",
            content: `
              Resume: ${resume}
              Job Title: ${jobTitle}
              Job Description: ${jobDescription}

              Generate 6 structured interview questions.
              Return JSON array: 
              [{ id, text, type (technical/behavioral/situational), level (Easy/Medium/Hard) }]
            `
          }
        ]
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices?.[0]?.message?.content || "[]");
  } catch (err) {
    console.error("❌ Error generating questions:", err);
    return [];
  }
}

// Review candidate’s individual answer
export async function reviewAnswer({ question, answer }) {
  try {
    const response = await fetch("https://api.grok.cloud/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-1",
        messages: [
          {
            role: "system",
            content: "You are an AI Interview Reviewer. Evaluate candidate answers."
          },
          {
            role: "user",
            content: `
              Question: ${question.text}
              Candidate Answer: ${answer}

              Evaluate:
              - Score (0–100)
              - Short review
              Return JSON: { score, notes }
            `
          }
        ],
        temperature: 0.5
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices?.[0]?.message?.content || "{}");
  } catch (err) {
    console.error("❌ Error reviewing answer:", err);
    return { score: 0, notes: "Evaluation failed." };
  }
}

// Final overall review after interview
export async function generateFinalReview({ candidate }) {
  try {
    const response = await fetch("https://api.grok.cloud/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-1",
        messages: [
          {
            role: "system",
            content: "You are an AI Interview Reviewer. Provide overall evaluation."
          },
          {
            role: "user",
            content: `
              Candidate: ${candidate.name}
              Job: ${candidate.jobTitle}
              Answers: ${JSON.stringify(candidate.answers)}

              Provide:
              - Final score (0–100)
              - Short summary
              Return JSON: { finalScore, summary }
            `
          }
        ],
        temperature: 0.5
      }),
    });

    const data = await response.json();
    return JSON.parse(data.choices?.[0]?.message?.content || "{}");
  } catch (err) {
    console.error("❌ Error generating final review:", err);
    return { finalScore: 0, summary: "Evaluation failed." };
  }
}
