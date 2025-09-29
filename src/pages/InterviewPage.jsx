import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resumeSession, resetSession } from "./store/sessionSlice";

export default function WelcomeBackModal() {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (session.status === "paused" || session.status === "in_progress") {
      setShow(true);
    }
  }, [session]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Welcome Back!</h2>
        <p className="mb-6">You have an unfinished interview session.</p>
        <div className="flex justify-between">
          <button
            onClick={() => {
              dispatch(resumeSession());
              setShow(false);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Resume
          </button>
          <button
            onClick={() => {
              dispatch(resetSession());
              setShow(false);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Start New
          </button>
        </div>
      </div>
    </div>
  );
}
