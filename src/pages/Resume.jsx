

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Scene3D } from "../ui/Scene3D";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCandidate } from "../store/sessionSlice";
import { extractTextFromPDF, extractFieldsFromText } from "../utils/parseResume";

export  function Resume() {
  const [uploaded, setUploaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploaded(true);

    try {
      // PDF only for now (you can extend for DOCX using 'mammoth')
      if (!file.name.toLowerCase().endsWith(".pdf")) {
        // still try but warn user
        console.warn("Non-PDF uploaded — parsing may fail");
      }

      const text = await extractTextFromPDF(file);
      const { name, email, phone } = extractFieldsFromText(text || "");

      // set candidate in session
      dispatch(
        setCandidate({
          name: name || "",
          email: email || "",
          phone: phone || "",
        })
      );

      // redirect to profile for job fields
      setTimeout(() => navigate("/profile"), 900);
    } catch (err) {
      console.error("Resume parsing failed:", err);
      alert("Failed to parse resume. Please try a valid PDF.");
      setUploaded(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <Scene3D />
      <Navbar />
        {/* Floating particles */}
                  <div className="absolute inset-0">
                      {[...Array(20)].map((_, i) => (
                          <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-indigo-300/40 rounded-full"
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

      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-lg text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-emerald-300 bg-clip-text text-transparent">
              Crisp Interview
            </span>
          </h1>
          <p className="text-gray-300 mb-8">Upload your resume to begin the AI-powered interview process</p>

          <div className="border-2 border-dashed border-gray-500/40 rounded-xl p-10 hover:border-indigo-400 transition mb-6">
            <Upload className="w-10 h-10 text-indigo-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Upload your resume</h3>
            <p className="text-gray-400 mb-4">Drag and drop your resume, or click to browse</p>
            <p className="text-sm text-gray-500 mb-6">Supports PDF (best) — DOCX optional</p>

            <label className="inline-block cursor-pointer">
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
              <span className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-400 to-emerald-400 text-white font-semibold shadow hover:shadow-lg">
                Choose File
              </span>
            </label>
          </div>

          {uploaded && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-emerald-500/20 border border-emerald-400/30 rounded-lg text-white">
              ✅ Resume uploaded successfully — redirecting to profile...
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
