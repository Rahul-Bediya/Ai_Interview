


import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function InterviewDashboard() {
  const navigate = useNavigate();
  const rawCandidates = useSelector((state) => state.candidates);

  // ✅ Normalize candidates state into an array
  const candidates = Array.isArray(rawCandidates)
    ? rawCandidates
    : Object.values(rawCandidates || {}).filter(
        (c) => c && typeof c === "object" && !c._persist
      );

  console.log("📌 Candidates in Dashboard (normalized):", candidates);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <Navbar />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10 p-10">
        <h1 className="text-3xl font-bold text-white mb-8">Interview Dashboard</h1>

        {candidates.length === 0 ? (
          <p className="text-gray-400">No completed interviews yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id || index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 
                           rounded-2xl p-6 shadow-lg flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <User className="w-10 h-10 text-indigo-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {candidate.name}
                    </h2>
                    <p className="text-sm text-gray-400">{candidate.status}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-gray-300 text-sm mb-4">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-400" /> {candidate.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-400" /> {candidate.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />{" "}
                    {candidate.date}
                  </p>
                </div>

                {/* Score */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-sm">
                    {candidate.answers?.length || 0} / 6 questions answered
                  </p>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Star className="w-4 h-4" /> {candidate.finalScore || 0}
                  </span>
                </div>

                {/* Button */}
                <button
                  onClick={() => navigate(`/detail/${candidate.id || index}`)}
                  className="mt-4 w-full py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 
                             rounded-lg text-white font-semibold hover:shadow-lg transition"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
