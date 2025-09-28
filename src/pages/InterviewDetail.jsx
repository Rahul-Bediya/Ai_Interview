import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // adjust path if needed

export default function InterviewDetail() {
  const { interviewId } = useParams();

  const candidate = {
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "56543785374",
    date: "9/27/2025 at 7:35:55 PM",
    score: 85,
    summary: "Strong technical performance with good communication skills.",
  };

  const responses = [
    {
      id: 1,
      difficulty: "easy",
      question: "What is the difference between let, const, and var in JavaScript?",
      answer: "",
      notes: "AI evaluation would go here",
      score: 63,
      time: "0:21 / 0:20",
    },
    {
      id: 2,
      difficulty: "easy",
      question: "Explain what React components are and their purpose.",
      answer: "",
      notes: "AI evaluation would go here",
      score: 97,
      time: "0:01 / 0:20",
    },
    {
      id: 3,
      difficulty: "medium",
      question: "How would you optimize a React component for performance? Mention at least 3 techniques.",
      answer: "dds",
      notes: "AI evaluation would go here",
      score: 3,
      time: "0:20 / 1:00",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Navbar */}
      <Navbar />

      <main className="p-6 flex flex-col md:flex-row gap-6">
        {/* Left Panel - Candidate Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/3 bg-gray-900/70 border border-white/10 shadow-lg rounded-2xl p-6 backdrop-blur"
        >
          <Link to="/dashboard" className="text-indigo-400 text-sm hover:underline">
            ← Back to Dashboard
          </Link>
          <h2 className="text-xl font-semibold mt-4">{candidate.name}</h2>
          <p className="text-gray-400">Interview Details & Performance</p>

          <div className="mt-4 space-y-2 text-sm text-gray-300">
            <p>📧 {candidate.email}</p>
            <p>📞 {candidate.phone}</p>
            <p>🗓 {candidate.date}</p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-4xl font-bold text-emerald-400">{candidate.score}</p>
            <p className="text-gray-500">Final Score</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-white">AI Summary</h3>
            <p className="text-sm text-gray-400">{candidate.summary}</p>
          </div>
        </motion.div>

        {/* Right Panel - Responses */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-2/3 bg-gray-900/70 border border-white/10 shadow-lg rounded-2xl p-6 backdrop-blur"
        >
          <h2 className="text-lg font-semibold mb-4 text-white">Interview Responses</h2>

          <div className="space-y-6">
            {responses.map((res) => (
              <motion.div
                key={res.id}
                whileHover={{ scale: 1.02 }}
                className="border-b border-white/10 pb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-white">
                    Question {res.id}{" "}
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        res.difficulty === "easy"
                          ? "bg-green-500/20 text-green-400"
                          : res.difficulty === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {res.difficulty}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">{res.time}</p>
                </div>

                <p className="text-gray-300 text-sm mb-2">
                  <span className="font-semibold">Question:</span> {res.question}
                </p>
                <p className="text-gray-300 text-sm mb-2">
                  <span className="font-semibold">Answer:</span>{" "}
                  {res.answer || (
                    <span className="text-gray-500 italic">
                      No answer provided (time expired)
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">AI Notes:</span> {res.notes}
                </p>

                <p className="text-sm font-medium mt-2">
                  Score:{" "}
                  <span
                    className={
                      res.score > 70
                        ? "text-green-400"
                        : res.score > 40
                        ? "text-yellow-400"
                        : "text-red-400"
                    }
                  >
                    {res.score}/100
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
