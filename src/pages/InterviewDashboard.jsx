


// import React from "react";
// import Navbar from "../components/Navbar";
// import { motion } from "framer-motion";
// import { User, Mail, Phone, Calendar, Star } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function InterviewDashboard() {
//   const navigate = useNavigate();
//   const rawCandidates = useSelector((state) => state.candidates);

//   // ✅ Normalize candidates state into an array
//   const candidates = Array.isArray(rawCandidates)
//     ? rawCandidates
//     : Object.values(rawCandidates || {}).filter(
//         (c) => c && typeof c === "object" && !c._persist
//       );

//   console.log("📌 Candidates in Dashboard (normalized):", candidates);

//   return (
//     <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
//       <Navbar />

//       {/* Floating particles */}
//       <div className="absolute inset-0">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Infinity,
//               delay: Math.random() * 2,
//             }}
//           />
//         ))}
//       </div>

//       {/* Content */}
//       <div className="flex-1 relative z-10 p-10">
//         <h1 className="text-3xl font-bold text-white mb-8">Interview Dashboard</h1>

//         {candidates.length === 0 ? (
//           <p className="text-gray-400">No completed interviews yet.</p>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {candidates.map((candidate, index) => (
//               <motion.div
//                 key={candidate.id || index}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white/5 backdrop-blur-md border border-white/10 
//                            rounded-2xl p-6 shadow-lg flex flex-col justify-between"
//               >
//                 {/* Header */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <User className="w-10 h-10 text-indigo-400" />
//                   <div>
//                     <h2 className="text-lg font-semibold text-white">
//                       {candidate.name}
//                     </h2>
//                     <p className="text-sm text-gray-400">{candidate.status}</p>
//                   </div>
//                 </div>

//                 {/* Info */}
//                 <div className="space-y-2 text-gray-300 text-sm mb-4">
//                   <p className="flex items-center gap-2">
//                     <Mail className="w-4 h-4 text-indigo-400" /> {candidate.email}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-indigo-400" /> {candidate.phone}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Calendar className="w-4 h-4 text-indigo-400" />{" "}
//                     {candidate.date}
//                   </p>
//                 </div>

//                 {/* Score */}
//                 <div className="flex items-center justify-between">
//                   <p className="text-gray-400 text-sm">
//                     {candidate.answers?.length || 0} / 6 questions answered
//                   </p>
//                   <span className="flex items-center gap-1 text-emerald-400 font-semibold">
//                     <Star className="w-4 h-4" /> {candidate.finalScore || 0}
//                   </span>
//                 </div>

//                 {/* Button */}
//                 <button
//                   onClick={() => navigate(`/detail/${candidate.id || index}`)}
//                   className="mt-4 w-full py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 
//                              rounded-lg text-white font-semibold hover:shadow-lg transition"
//                 >
//                   View Details
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Star, Search, SortAsc } from "lucide-react";
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

  // 🔍 Search + Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");

  // ✅ Filtering + Sorting with useMemo for performance
  const filteredCandidates = useMemo(() => {
    let filtered = candidates.filter((c) => {
      const query = searchQuery.toLowerCase();
      return (
        c.name?.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query) ||
        c.phone?.toLowerCase().includes(query)
      );
    });

    // Sorting logic
    switch (sortOption) {
      case "score-desc":
        filtered.sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0));
        break;
      case "score-asc":
        filtered.sort((a, b) => (a.finalScore || 0) - (b.finalScore || 0));
        break;
      case "name-asc":
        filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name-desc":
        filtered.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    return filtered;
  }, [candidates, searchQuery, sortOption]);

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
        <h1 className="text-3xl font-bold text-white mb-6">Interview Dashboard</h1>

        {/* 🔍 Search & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 w-full md:w-1/2">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="bg-transparent outline-none text-white w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4 text-gray-400" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-black/10 text-white px-3 py-2 rounded-lg outline-none"
            >
              <option value="date-desc">📅 Date (Newest)</option>
              <option value="date-asc">📅 Date (Oldest)</option>
              <option value="score-desc">⭐ Score (High → Low)</option>
              <option value="score-asc">⭐ Score (Low → High)</option>
              <option value="name-asc">🔤 Name (A → Z)</option>
              <option value="name-desc">🔤 Name (Z → A)</option>
            </select>
          </div>
        </div>

        {filteredCandidates.length === 0 ? (
          <p className="text-gray-400">No interviews match your search.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((candidate, index) => (
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
                    <Calendar className="w-4 h-4 text-indigo-400" /> {candidate.date}
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
