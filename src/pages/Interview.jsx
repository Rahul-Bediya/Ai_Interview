import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, Video, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { Scene3D } from "../ui/Scene3D";

const questions = [
    {
        id: 1,
        type: "situational",
        level: "Medium",
        text: "You worked as a React Developer and handled backend API integration. Describe a time when you encountered an issue while integrating a backend API. How did you troubleshoot it?",
    },
    {
        id: 2,
        type: "technical",
        level: "Hard",
        text: "Explain how React’s reconciliation algorithm works. How does it decide which DOM nodes to update?",
    },
    {
        id: 3,
        type: "behavioral",
        level: "Easy",
        text: "Tell me about a time when you had to work under a tight deadline. How did you handle it?",
    },
];

export default function Interview() {
    const [current, setCurrent] = useState(0);
    const [responses, setResponses] = useState({});
    const [recording, setRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [loading, setLoading] = useState(false);

    const videoRef = useRef(null);
    const streamRef = useRef(null);

    // Start webcam
    useEffect(() => {
        async function initCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                streamRef.current = stream;
            } catch (err) {
                console.error("Camera error:", err);
            }
        }
        initCamera();
    }, []);

    // Handle mic + transcript (SpeechRecognition API)
    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) return;
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        if (recording) {
            recognition.start();
            recognition.onresult = (event) => {
                let finalTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    finalTranscript += event.results[i][0].transcript;
                }
                setTranscript(finalTranscript);
            };
        } else {
            recognition.stop();
        }

        return () => recognition.stop();
    }, [recording]);

    // Save answer & go next
    const handleNext = () => {
        setResponses((prev) => ({
            ...prev,
            [questions[current].id]: transcript,
        }));
        setTranscript("");
        if (current < questions.length - 1) {
            setCurrent((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    // Submit final responses
    const handleSubmit = async () => {
        setLoading(true);
        console.log("Interview Responses:", responses);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Interview submitted successfully ✅");
        }, 2000);
    };

    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden 
                       bg-gradient-to-br from-gray-950 via-gray-900 to-black">
            {/* Background 3D Animation */}
            <Scene3D />

            {/* Floating Particles */}
            <div className="absolute inset-0 -z-10">
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

            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-1 flex flex-col md:flex-row gap-6 p-6 relative z-10">
                {/* Video Section */}
                <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 
                        rounded-xl shadow p-4 flex flex-col">
                    <h3 className="font-semibold text-white mb-2">Interview Recording</h3>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-[80%] h-[500px] mx-auto rounded-lg bg-black object-cover"
                    />

                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setRecording(!recording)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${recording ? "bg-red-500" : "bg-indigo-500"
                                }`}
                        >
                            {recording ? <Mic className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                            {recording ? "Recording..." : "Start Recording"}
                        </button>
                        <span className="text-gray-300">Time: 02:25</span>
                    </div>
                </div>

                {/* Question + Transcript Section */}
                <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md border border-white/10 
                        rounded-xl shadow p-6 flex flex-col">
                    <div className="mb-4">
                        <span className="px-2 py-1 text-xs rounded bg-blue-200 text-blue-800">
                            {questions[current].type}
                        </span>
                        <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800">
                            {questions[current].level}
                        </span>
                    </div>
                    <h4 className="font-semibold text-white mb-3">Question</h4>
                    <p className="text-gray-200 mb-6">{questions[current].text}</p>

                    <h4 className="font-semibold text-white mb-2">Answer (Transcript)</h4>
                    <div className="flex-1 p-3 border rounded-lg bg-black/30 overflow-y-auto text-sm text-gray-200">
                        {transcript || "Start speaking..."}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={loading}
                        className="mt-6 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 
                       text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                        {current < questions.length - 1
                            ? "Next Question »"
                            : loading
                                ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                                    </span>
                                )
                                : "Submit Interview"}
                    </button>
                </div>
            </main>

            {/* Background Blobs */}
            <div className="absolute inset-0 -z-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-900/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-900/30 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
        </section>
    );
}
