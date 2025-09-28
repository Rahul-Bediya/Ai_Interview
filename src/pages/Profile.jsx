import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export const Profile = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
        jobDescription: "",
        experience: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile Data:", form);
        navigate("/interview"); // go to interview page
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
            <Navbar />

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


            <div className="flex items-center justify-center min-h-screen px-6 py-12">
                <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 
                  rounded-2xl shadow-lg p-10">
                    <h1 className="text-3xl font-bold text-center text-white mb-6">
                        Complete Your Profile
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400"
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400"
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="Job Title"
                            className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400"
                            onChange={handleChange}
                        />
                        <textarea
                            name="jobDescription"
                            placeholder="Job Description"
                            className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400"
                            onChange={handleChange}
                        ></textarea>
                        <input
                            type="number"
                            name="experience"
                            placeholder="Years of Experience"
                            className="w-full p-3 rounded bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400"
                            onChange={handleChange}
                        />

                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-indigo-400 to-emerald-400 
                   rounded-lg font-semibold text-white hover:shadow-lg transition-all"
                        >
                            Start Interview
                        </button>
                    </form>
                </div>
            </div>

        </section>
    );
};

export default Profile;
