import { useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [role, setRole] = useState("interviewee");

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 
                    relative z-20 bg-black/30 backdrop-blur-md">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg"
            animate={{ rotateY: [0, 360], scale: [1, 1.1, 1] }}
            transition={{
              rotateY: { duration: 4, repeat: Infinity },
              scale: { duration: 2, repeat: Infinity },
            }}
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
        </Link>

        <div>
          <h1 className="text-lg font-semibold text-white">Crisp Interview</h1>
          <p className="text-xs text-gray-400">AI-Powered Technical Interviews</p>
        </div>
      </div>

      {/* Role toggle */}
      <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
        <Link to="/upload">
          <button
            onClick={() => setRole("interviewee")}
            className={`px-4 py-1 text-sm font-medium rounded-lg transition ${role === "interviewee"
                ? "bg-white text-black"
                : "text-white hover:bg-white/20"
              }`}
          >
            Interviewee
          </button>
        </Link>
        <Link to="/dashboard">
          <button
            onClick={() => setRole("interviewer")}
            className={`px-4 py-1 text-sm font-medium rounded-lg transition ${role === "interviewer"
                ? "bg-white text-black"
                : "text-white hover:bg-white/20"
              }`}
          >
            Interviewer
          </button>
        </Link>
      </div>
    </nav>
  );
}
