


// import React, { useEffect, useRef, useState } from "react";
// import { Mic, Video,Loader2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { saveAnswer, completeSession, resetSession,hydrateSession ,setTimeLeft} from "../store/sessionSlice";
// import { addCandidate } from "../store/candidatesSlice";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { Scene3D } from "../ui/Scene3D";
// // import { hydrateSession, resetSession } from "../store/sessionSlice";
// import WelcomeBackModal from "../components/WelcomeBackModel";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// const TIMER_MAP= {Easy:30,Medium:60,Hard:120};

// const questions = [
//   { id: 1, type: "situational", level: "Medium", text: "You worked as a React Developer and handled backend API integration. Describe a time when you encountered an issue while integrating a backend API. How did you troubleshoot it?" },
//   { id: 2, type: "technical", level: "Hard", text: "Explain how React’s reconciliation algorithm works. How does it decide which DOM nodes to update?" },
//   { id: 3, type: "behavioral", level: "Easy", text: "Tell me about a time when you had to work under a tight deadline. How did you handle it?" },
//   { id: 4, type: "technical", level: "Easy", text: "Explain the difference between let, const and var." },
//   { id: 5, type: "technical", level: "Medium", text: "How would you optimize a React component for performance?" },
//   { id: 6, type: "technical", level: "Hard", text: "Describe how you'd design a scalable API for a large application." },
// ];

// export default function Interview() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const session = useSelector((state) => state.session);

//   const [showWelcomeBack, setShowWelcomeBack] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [manualAnswer, setManualAnswer] = useState(""); // ✅ allow typing

//   const videoRef = useRef(null);
//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();


//   // start timer resume whenever question changes
//   useEffect(()=>{
//     if(!currentQuestion) return;

//     let time=session.timeLeft ?? TIMER_MAP[currentQuestion.level];
//     dispatch(setTimeLeft(time));

//     if()
//   })

//   // ✅ On first load, check localStorage
//   useEffect(() => {
//     const savedSession = localStorage.getItem("interviewSession");
//     if (savedSession) {
//       setShowWelcomeBack(true); // show modal
//     }
//   }, []);

//   // ✅ Persist state whenever it changes
//   useEffect(() => {
//     if (session.currentCandidate) {
//       localStorage.setItem("interviewSession", JSON.stringify(session));
//     }
//   }, [session]);

//   const handleResume = () => {
//     const savedSession = JSON.parse(localStorage.getItem("interviewSession"));
//     if (savedSession) {
//       dispatch(hydrateSession(savedSession));
//     }
//     setShowWelcomeBack(false);
//   };

//   const handleNew = () => {
//     localStorage.removeItem("interviewSession");
//     dispatch(resetSession());
//     setShowWelcomeBack(false);
//   };

//   useEffect(() => {
//     if (!session.currentCandidate) {
//       navigate("/");
//     }
//   }, [session.currentCandidate, navigate]);

//   useEffect(() => {
//     async function initCamera() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.warn("Camera denied or not available:", err);
//       }
//     }
//     initCamera();
//   }, []);

//   if (!browserSupportsSpeechRecognition) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Your browser doesn't support SpeechRecognition API. Use Chrome or Edge.
//       </div>
//     );
//   }

//   const currentIndex = session.currentQuestion || 0;
//   const currentQuestion = questions[currentIndex] || questions[0];

//   const handleNext = () => {
//     if (!currentQuestion) return;

//     const score = Math.floor(Math.random() * 100);
//     const notes = score > 70 ? "Strong answer." : score > 40 ? "Average answer." : "Weak answer.";

//     // ✅ Combine transcript + manualAnswer
//     const finalAnswer = [transcript, manualAnswer].filter(Boolean).join(" ");

//     dispatch(
//       saveAnswer({
//         id: currentQuestion.id,
//         text: currentQuestion.text,
//         level: currentQuestion.level,
//         type: currentQuestion.type,
//         answer: finalAnswer,
//         timeTaken: 0,
//         score,
//         notes,
//       })
//     );

//     resetTranscript();
//     setManualAnswer(""); // ✅ clear input

//     if (currentIndex >= questions.length - 1) {
//       handleSubmit();
//     }
//   };

//   const handleSubmit = () => {
//     setLoading(true);

//     const score = Math.floor(Math.random() * 100);
//     const summary = "Candidate showed good problem-solving skills and React knowledge.";

//     setTimeout(() => {
//       dispatch(completeSession({ finalScore: score, summary }));

//       const candidateData = {
//         ...session.currentCandidate,
//         answers: [...session.answers],
//         finalScore: score,
//         summary,
//         id: session.currentCandidate?.id || Date.now(),
//         date: new Date().toLocaleString(),
//         status: "completed",
//       };

//       console.log("✅ Candidate saved:", candidateData);
//       dispatch(addCandidate(candidateData));
      

//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//         videoRef.current.srcObject = null;
//       }

//       dispatch(resetSession());
//       setLoading(false);
//       navigate("/dashboard");
//     }, 1500);
//   };

//   return (
//     <>
//     {showWelcomeBack && (
//         <WelcomeBackModal onResume={handleResume} onNew={handleNew} />
//       )}
//     <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
//       <Scene3D />
//       <Navbar />
//       <main className="flex-1 flex flex-col md:flex-row gap-6 p-6 relative z-10">
//         {/* Video + Mic Section */}
//         <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow p-4 flex flex-col">
//           <h3 className="font-semibold text-white mb-2">Interview Recording</h3>
//           <video ref={videoRef} autoPlay playsInline muted className="w-[80%] h-[500px] mx-auto rounded-lg bg-black object-cover" />

//           <div className="flex justify-between items-center mt-4">
//             <button
//               onClick={() => (listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening({ continuous: true }))}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${listening ? "bg-red-500" : "bg-indigo-500"}`}
//             >
//               {listening ? <Mic className="w-4 h-4" /> : <Video className="w-4 h-4" />}
//               {listening ? "Recording..." : "Start Recording"}
//             </button>
//             <span className="text-gray-300">Question {currentIndex + 1}/{questions.length}</span>
//           </div>
//         </div>

//         {/* Question + Answer Section */}
//         <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow p-6 flex flex-col">
//           <div className="mb-4">
//             <span className="px-2 py-1 text-xs rounded bg-blue-200 text-blue-800">{currentQuestion.type}</span>
//             <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800">{currentQuestion.level}</span>
//           </div>

//           <h4 className="font-semibold text-white mb-3">Question</h4>
//           <p className="text-gray-200 mb-6">{currentQuestion.text}</p>

//           <h4 className="font-semibold text-white mb-2">Answer</h4>

//           {/* ✅ Transcript preview */}
//           <div className="p-3 border rounded-lg bg-black/30 text-sm text-gray-200 mb-4">
//             {transcript || "🎤 Speak your answer..."}
//           </div>

//           {/* ✅ Manual typing option */}
//           <textarea
//             value={manualAnswer}
//             onChange={(e) => setManualAnswer(e.target.value)}
//             placeholder="Or type your answer here..."
//             className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white text-sm mb-4"
//             rows={4}
//           />

//           <button onClick={handleNext} disabled={loading} className="mt-2 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
//             {currentIndex < questions.length - 1 ? "Next Question »" : loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
//               </span>
//             ) : "Submit Interview"}
//           </button>
//         </div>
//       </main>
//     </section>
//     </>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { Mic, Video, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer, completeSession, resetSession, hydrateSession } from "../store/sessionSlice";
import { addCandidate } from "../store/candidatesSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Scene3D } from "../ui/Scene3D";
import WelcomeBackModal from "../components/WelcomeBackModel";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const TIMER_MAP = { Easy: 30, Medium: 60, Hard: 120 };

const questions = [
  { id: 1, type: "situational", level: "Medium", text: "You worked as a React Developer and handled backend API integration. Describe a time when you encountered an issue while integrating a backend API. How did you troubleshoot it?" },
  { id: 2, type: "technical", level: "Hard", text: "Explain how React’s reconciliation algorithm works. How does it decide which DOM nodes to update?" },
  { id: 3, type: "behavioral", level: "Easy", text: "Tell me about a time when you had to work under a tight deadline. How did you handle it?" },
  { id: 4, type: "technical", level: "Easy", text: "Explain the difference between let, const and var." },
  { id: 5, type: "technical", level: "Medium", text: "How would you optimize a React component for performance?" },
  { id: 6, type: "technical", level: "Hard", text: "Describe how you'd design a scalable API for a large application." },
];

export default function Interview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.session);

  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualAnswer, setManualAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isReading, setIsReading] = useState(true);

  const videoRef = useRef(null);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const currentIndex = session.currentQuestion || 0;
  const currentQuestion = questions[currentIndex] || questions[0];

  // ✅ Setup reading + answer timers
  useEffect(() => {
    if (!currentQuestion) return;

    setIsReading(true);
    setTimeLeft(10); // 10s reading phase

    const readingInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(readingInterval);
          setIsReading(false);

          // start answer timer
          const initialTime = TIMER_MAP[currentQuestion.level] || 30;
          setTimeLeft(initialTime);

          const answerInterval = setInterval(() => {
            setTimeLeft((prev) => {
              if (prev <= 1) {
                clearInterval(answerInterval);
                handleNext(true); // auto when time ends
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(readingInterval);
  }, [currentIndex]);

  // ✅ On first load, check localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem("interviewSession");
    if (savedSession) setShowWelcomeBack(true);
  }, []);

  // ✅ Persist session
  useEffect(() => {
    if (session.currentCandidate) {
      localStorage.setItem("interviewSession", JSON.stringify(session));
    }
  }, [session]);

  const handleResume = () => {
    const savedSession = JSON.parse(localStorage.getItem("interviewSession"));
    if (savedSession) {
      dispatch(hydrateSession(savedSession));
    }
    setShowWelcomeBack(false);
  };

  const handleNew = () => {
    localStorage.removeItem("interviewSession");
    dispatch(resetSession());
    setShowWelcomeBack(false);
  };

  useEffect(() => {
    if (!session.currentCandidate) navigate("/");
  }, [session.currentCandidate, navigate]);

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.warn("Camera denied:", err);
      }
    }
    initCamera();
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Your browser doesn't support SpeechRecognition API.</div>;
  }

  const handleNext = (auto = false) => {
    if (!currentQuestion) return;

    const score = Math.floor(Math.random() * 100);
    const notes = auto ? "⏰ Time ran out" : score > 70 ? "Strong answer." : score > 40 ? "Average answer." : "Weak answer.";

    const finalAnswer = [transcript, manualAnswer].filter(Boolean).join(" ") || (auto ? "⏰ Time ran out" : "");

    dispatch(
      saveAnswer({
        id: currentQuestion.id,
        text: currentQuestion.text,
        level: currentQuestion.level,
        type: currentQuestion.type,
        answer: finalAnswer,
        timeTaken: TIMER_MAP[currentQuestion.level] - timeLeft,
        score,
        notes,
      })
    );

    resetTranscript();
    setManualAnswer("");

    if (currentIndex >= questions.length - 1) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const score = Math.floor(Math.random() * 100);
    const summary = "Candidate showed good problem-solving skills and React knowledge.";

    setTimeout(() => {
      dispatch(completeSession({ finalScore: score, summary }));

      const candidateData = {
        ...session.currentCandidate,
        answers: [...session.answers],
        finalScore: score,
        summary,
        id: session.currentCandidate?.id || Date.now(),
        date: new Date().toLocaleString(),
        status: "completed",
      };

      dispatch(addCandidate(candidateData));

      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      dispatch(resetSession());
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <>
      {showWelcomeBack && <WelcomeBackModal onResume={handleResume} onNew={handleNew} />}

      <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <Scene3D />
        <Navbar />
        <main className="flex-1 flex flex-col md:flex-row gap-6 p-6 relative z-10">
          {/* Video Section */}
          <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow p-4 flex flex-col">
            <h3 className="font-semibold text-white mb-2">Interview Recording</h3>
            <video ref={videoRef} autoPlay playsInline muted className="w-[80%] h-[500px] mx-auto rounded-lg bg-black object-cover" />
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() =>
                  listening
                    ? SpeechRecognition.stopListening()
                    : SpeechRecognition.startListening({ continuous: true })
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${listening ? "bg-red-500" : "bg-indigo-500"}`}
              >
                {listening ? <Mic className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                {listening ? "Recording..." : "Start Recording"}
              </button>
              <span className="text-gray-300">Question {currentIndex + 1}/{questions.length}</span>
            </div>
          </div>

          {/* Question + Answer Section */}
          <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow p-6 flex flex-col">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <span className="px-2 py-1 text-xs rounded bg-blue-200 text-blue-800">{currentQuestion.type}</span>
                <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-200 text-yellow-800">{currentQuestion.level}</span>
              </div>
              {/* ✅ Timer */}
              <span className="text-lg font-bold text-emerald-400">
                {isReading ? `📖 Reading: ${timeLeft}s` : `⏰ Answer: ${timeLeft}s`}
              </span>
            </div>

            <h4 className="font-semibold text-white mb-3">Question</h4>
            <p className="text-gray-200 mb-6">{currentQuestion.text}</p>

            <h4 className="font-semibold text-white mb-2">Answer</h4>
            <div className="p-3 border rounded-lg bg-black/30 text-sm text-gray-200 mb-4">
              {transcript || "🎤 Speak your answer..."}
            </div>

            <textarea
              value={manualAnswer}
              onChange={(e) => setManualAnswer(e.target.value)}
              placeholder="Or type your answer here..."
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white text-sm mb-4"
              rows={4}
            />

            <button
              onClick={() => handleNext(false)}
              disabled={loading || isReading} // disable during reading phase
              className="mt-2 py-2 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              {currentIndex < questions.length - 1
                ? "Next Question »"
                : loading
                ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</span>
                : "Submit Interview"}
            </button>
          </div>
        </main>
      </section>
    </>
  );
}

