

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

/** Normalize whatever redux-persist gave us into a real array */
const normalizeStateToArray = (s) => {
  if (!s) return [];
  if (Array.isArray(s)) return s;

  // s is likely an object like {0: {...}, 1: {...}, _persist: {...}}
  // Keep only object entries that are candidate objects (exclude _persist)
  return Object.keys(s)
    .filter((k) => k !== "_persist")
    .map((k) => s[k])
    .filter((v) => v && typeof v === "object");
};


export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    addCandidate: (state, action) => {
      const payload = action.payload || {};

      const newCandidate = {
        id: payload.id || Date.now(),
        name: payload.name || "Unknown",
        email: payload.email || "",
        phone: payload.phone || "",
        date: payload.date || new Date().toLocaleString(),
        jobTitle: payload.jobTitle || "",
        jobDescription: payload.jobDescription || "",
        experience: payload.experience || "",
        answers: payload.answers || [],
        finalScore: payload.finalScore || 0,
        summary: payload.summary || "",
        status:payload.status || "completed",
      };

      // ✅ Ensure state is always an array
      // const safeState = Array.isArray(state) ? state : [];
       const safeState = normalizeStateToArray(state);

      const next=[...safeState, newCandidate];
      return next;
    },

    resetCandidates: () => {
      return [];
    },
  },
});

export const { addCandidate, resetCandidates } = candidatesSlice.actions;
export default candidatesSlice.reducer;
