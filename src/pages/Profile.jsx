


// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { updateCandidate } from "../store/sessionSlice";

// export default function Profile() {
//   const session = useSelector((state) => state.session);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [form, setForm] = useState(session.currentCandidate || {});

//   useEffect(() => {
//     if (session.currentCandidate) setForm(session.currentCandidate);
//   }, [session.currentCandidate]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateCandidate(form));
//     navigate("/interview");
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
//       <Navbar />
//       <div className="flex items-center justify-center min-h-screen px-6 py-12">
//         <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-10">
//           <h1 className="text-3xl font-bold text-center text-white mb-6">Complete Your Profile</h1>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input type="text" name="name" value={form.name || ""} onChange={handleChange} placeholder="Full Name" className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white" />
//             <input type="email" name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white" />
//             <input type="tel" name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white" />

//             <input type="text" name="jobTitle" value={form.jobTitle || ""} onChange={handleChange} placeholder="Job Title" className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white" />
//             <textarea name="jobDescription" value={form.jobDescription || ""} onChange={handleChange} placeholder="Job Description" className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white"></textarea>
//             <input type="number" name="experience" value={form.experience || ""} onChange={handleChange} placeholder="Years of Experience" className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white" />

//             <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-lg font-semibold text-white hover:shadow-lg transition-all">Start Interview</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }


// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { updateCandidate, setQuestions } from "../store/sessionSlice";
import { generateQuestions } from "../ai_api/grok";

export const Profile = () => {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(session.currentCandidate || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session.currentCandidate) {
      setForm(session.currentCandidate);
    }
  }, [session.currentCandidate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1️⃣ Update Redux with profile info
    dispatch(updateCandidate(form));

    try {
      // 2️⃣ Call Grok AI to generate interview questions
      const questions = await generateQuestions({
        resume: form.resume || "Resume not available",
        jobTitle: form.jobTitle,
        jobDescription: form.jobDescription,
      });

      console.log("✅ AI-generated questions:", questions);

      // 3️⃣ Save questions into Redux
      dispatch(setQuestions(questions));
    } catch (err) {
      console.error("❌ Failed to generate questions:", err);
    }

    setLoading(false);

    // 4️⃣ Redirect to Interview page
    navigate("/interview");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-10">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white"
              required
            />
            <input
              type="tel"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white"
            />

            <input
              type="text"
              name="jobTitle"
              value={form.jobTitle || ""}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white"
              required
            />
            <textarea
              name="jobDescription"
              value={form.jobDescription || ""}
              onChange={handleChange}
              placeholder="Job Description"
              className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white"
              required
            ></textarea>
            <input
              type="number"
              name="experience"
              value={form.experience || ""}
              onChange={handleChange}
              placeholder="Years of Experience"
              className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-lg font-semibold text-white hover:shadow-lg transition-all"
            >
              {loading ? "Generating Questions..." : "Start Interview"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
