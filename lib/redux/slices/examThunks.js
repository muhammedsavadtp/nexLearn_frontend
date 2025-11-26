import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios/axiosInstance";
import {
  setQuestions,
  setInstructions,
  setTotalMarks,
  setTotalTime,
  setLoading,
  setError,
  setExamResult,
} from "./examSlice";

export const fetchExamData = createAsyncThunk(
  "exam/fetchData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await axiosInstance.get("/question/list");
      const data = response.data;
      
      if (!data.success) {
        throw new Error("Failed to fetch exam data");
      }
      
      // Validate and set questions
      if (Array.isArray(data.questions)) {
        dispatch(setQuestions(data.questions));
      } else {
        dispatch(setQuestions([]));
      }
      
      // Format instructions into an ordered list HTML string
      const rawInstructions = data.instruction || "";
      const instructionsArray = rawInstructions
        .split(". ")
        .filter((instruction) => instruction.trim() !== ""); 
      const formattedInstructions = `<ol>${instructionsArray
        .map((instruction) => `<li>${instruction.trim()}</li>`)
        .join("")}</ol>`;

      dispatch(setInstructions(formattedInstructions));
      dispatch(setTotalMarks(data.total_marks || 0));
      dispatch(setTotalTime(data.total_time || 0));
      
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error fetching exam data";
      console.error("Error fetching exam data:", error);
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      return rejectWithValue(errorMessage);
    }
  }
);

export const submitExam = createAsyncThunk(
  "exam/submitExam",
  async (answersPayload, { dispatch, rejectWithValue }) => {
    try {
      const formattedAnswers = Object.entries(answersPayload).map(([questionId, optionId]) => ({
        question_id: parseInt(questionId),
        selected_option_id: optionId,
      }));

      const formData = new FormData();
      formData.append("answers", JSON.stringify(formattedAnswers));

      const response = await axiosInstance.post("/answers/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setExamResult(response.data));
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.detail && error.response.data.detail.startsWith("Missing answers for questions:")) {
        return rejectWithValue(error.response.data.detail);
      }
      const errorMessage = error.response?.data?.message || error.message || "Error submitting exam";
      console.error("Error submitting exam:", error);
      return rejectWithValue(errorMessage);
    }
  }
);