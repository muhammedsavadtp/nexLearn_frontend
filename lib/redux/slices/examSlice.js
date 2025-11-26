import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  instructions: "",
  totalMarks: 0,
  totalTime: 0,
  isLoading: false,
  error: null,
  answers: {},
  timeRemaining: 0,
  markedForReview: [],
  examResult: null, // New state property for exam results
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload || [];
    },
    setInstructions: (state, action) => {
      state.instructions = action.payload || "";
    },
    setTotalMarks: (state, action) => {
      state.totalMarks = action.payload || 0;
    },
    setTotalTime: (state, action) => {
      state.totalTime = action.payload || 0;
      state.timeRemaining = (action.payload || 0) * 60;
    },
    setAnswer: (state, action) => {
      const { questionId, optionId } = action.payload;
      // Ensure answers object exists
      if (!state.answers) {
        state.answers = {};
      }
      if (questionId !== undefined && optionId !== undefined) {
        state.answers[questionId] = optionId;
      }
    },
    clearAnswer: (state, action) => {
      const questionId = action.payload;
      // Ensure answers object exists
      if (!state.answers) {
        state.answers = {};
        return;
      }
      if (state.answers[questionId] !== undefined) {
        delete state.answers[questionId];
      }
    },
    decrementTime: (state) => {
      if (state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },
    toggleMarkForReview: (state, action) => {
      const questionId = action.payload;
      if (questionId === undefined) return;
      
      // Ensure markedForReview array exists
      if (!state.markedForReview) {
        state.markedForReview = [];
      }
      
      const index = state.markedForReview.indexOf(questionId);
      if (index === -1) {
        state.markedForReview.push(questionId);
      } else {
        state.markedForReview.splice(index, 1);
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setExamResult: (state, action) => {
      state.examResult = action.payload;
    },
    // Reset exam but ensure all properties are initialized
    resetExam: (state) => {
      state.questions = [];
      state.instructions = "";
      state.totalMarks = 0;
      state.totalTime = 0;
      state.isLoading = false;
      state.error = null;
      state.answers = {};
      state.timeRemaining = 0;
      state.markedForReview = [];
      state.examResult = null; // Also reset examResult
    },
    // Initialize state - useful for redux-persist hydration issues
    initializeState: (state) => {
      if (!state.answers) state.answers = {};
      if (!state.markedForReview) state.markedForReview = [];
      if (!state.questions) state.questions = [];
      if (state.timeRemaining === undefined) state.timeRemaining = 0;
      if (state.isLoading === undefined) state.isLoading = false;
      if (state.error === undefined) state.error = null;
      if (state.examResult === undefined) state.examResult = null;
    },
  },
});

export const {
  setQuestions,
  setInstructions,
  setTotalMarks,
  setTotalTime,
  setAnswer,
  clearAnswer,
  decrementTime,
  toggleMarkForReview,
  setLoading,
  setError,
  setExamResult,
  resetExam,
  initializeState,
} = examSlice.actions;

export default examSlice.reducer;