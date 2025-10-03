


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // active interview session data
  currentCandidate: null, // { id, name, email, phone, jobTitle, jobDescription, experience, date }
  currentQuestion: 0,
  answers: [], // saved during interview (per-question with score & notes)
  timeLeft: null, //add timer
};

 const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    // called after parsing resume (Resume.jsx)
    setCandidate: (state, action) => {
      state.currentCandidate = {
        ...action.payload,
        id: action.payload.id || Date.now(),
        date: action.payload.date || new Date().toLocaleString(),
      };
      state.currentQuestion = 0;
      state.answers = [];
      state.timeLeft=null; // add state for time store 
    },

    // called by Profile.jsx to add jobTitle/jd/experience
    updateCandidate: (state, action) => {
      if (!state.currentCandidate) return;
      state.currentCandidate = {
        ...state.currentCandidate,
        ...action.payload,
      };
    },

    // save answer during interview; reducer also increments currentQuestion
    saveAnswer: (state, action) => {
      // action.payload expected: { id, text, level, type, answer, timeTaken, score?, notes? }
      state.answers.push(action.payload);
      state.currentQuestion = (state.currentQuestion || 0) + 1;
      state.timeLeft=null; //reset for next question
    },

    // finalize this session (does NOT push to global candidates list)
    completeSession: (state, action) => {
      // action.payload: { finalScore, summary }
      if (!state.currentCandidate) return;

      // attach final summary & score to the currentCandidate object (temporary)
      state.currentCandidate = {
        ...state.currentCandidate,
        answers: state.answers,
        finalScore: action.payload.finalScore,
        summary: action.payload.summary,
        status: "completed",
      };

      // After completing, we keep currentCandidate populated so component can read it if needed.
      // Clearing/resetting should be done by the caller (resetSession) after pushing to candidates store.
    },

    // clear active session
    resetSession: (state) => {
      state.currentCandidate = null;
      state.currentQuestion = 0;
      state.answers = [];
    },
     // ✅ NEW
    hydrateSession: (state, action) => {
      return { ...state, ...action.payload };
    },

    setTimeLeft:(state,action)=>{
      state.timeLeft=action.payload;
    }
  },
});



export const { setCandidate, updateCandidate, setQuestions, saveAnswer, completeSession, resetSession, hydrateSession,setTimeLeft } = sessionSlice.actions;
export default sessionSlice.reducer;
