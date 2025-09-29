


import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

export default function InterviewDetail() {
  const { id } = useParams();
  const rawCandidates = useSelector((state) => state.candidates);

  // ✅ Normalize into array (in case it's an object with numeric keys)
  const candidates = Array.isArray(rawCandidates)
    ? rawCandidates
    : Object.values(rawCandidates || {}).filter(
        (c) => c && typeof c === "object" && !c._persist
      );

  const candidate = candidates.find((c) => String(c.id) === String(id));

  if (!candidate) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>
          <p>No interview found.</p>
          <Link to="/dashboard" className="text-indigo-400 underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar />
      <main className="p-6 flex flex-col md:flex-row gap-6">
        {/* Candidate Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/3 bg-gray-900/70 border border-white/10 shadow-lg rounded-2xl p-6 backdrop-blur"
        >
          <Link
            to="/dashboard"
            className="text-indigo-400 text-sm hover:underline"
          >
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
            <p className="text-4xl font-bold text-emerald-400">
              {candidate.finalScore}
            </p>
            <p className="text-gray-500">Final Score</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-white">AI Summary</h3>
            <p className="text-sm text-gray-400">{candidate.summary}</p>
          </div>
        </motion.div>

        {/* Responses */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-2/3 bg-gray-900/70 border border-white/10 shadow-lg rounded-2xl p-6 backdrop-blur"
        >
          <h2 className="text-lg font-semibold mb-4 text-white">
            Interview Responses
          </h2>

          <div className="space-y-6">
            {candidate.answers?.map((res, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="border-b border-white/10 pb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-white">
                    Question {i + 1}{" "}
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        res.level === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : res.level === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {res.level}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    {res.timeTaken || "—"}
                  </p>
                </div>

                <p className="text-gray-300 text-sm mb-2">
                  <span className="font-semibold">Question:</span> {res.text}
                </p>
                <p className="text-gray-300 text-sm mb-2">
                  <span className="font-semibold">Answer:</span>{" "}
                  {res.answer || (
                    <span className="text-gray-500 italic">
                      No answer provided
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">AI Notes:</span>{" "}
                  {res.notes || "Evaluation pending"}
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
                    {res.score || 0}/100
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
