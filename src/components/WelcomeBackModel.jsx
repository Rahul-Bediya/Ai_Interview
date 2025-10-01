// src/components/WelcomeBackModal.jsx
import React from "react";

export default function WelcomeBackModal({ onResume, onNew }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg text-center text-white max-w-md">
        <h2 className="text-2xl font-bold mb-4">Welcome Back 👋</h2>
        <p className="text-gray-300 mb-6">
          You have an unfinished interview session. Would you like to resume where you left off?
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onResume}
            className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-semibold"
          >
            Resume Interview
          </button>
          <button
            onClick={onNew}
            className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-semibold"
          >
            Start New
          </button>
        </div>
      </div>
    </div>
  );
}
