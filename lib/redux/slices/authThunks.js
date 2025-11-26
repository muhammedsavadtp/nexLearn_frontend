import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios/axiosInstance";
import {
  setUser,
  setToken,
  setRefreshToken,
  setLoading,
  setError,
  logout as logoutAction,
} from "./authSlice";


const getErrorMessage = (error) => {
  if (error.response?.data) {
    return error.response.data;
  }
  if (error.message) {
    return { message: error.message };
  }
  return { message: "An unexpected error occurred" };
};

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (mobile, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post("/auth/send-otp", mobile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      const errorData = getErrorMessage(error);
      dispatch(setError(errorData));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ mobile, otp }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("mobile", mobile);
      formData.append("otp", otp);
      const response = await axiosInstance.post("/auth/verify-otp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        if (response.data.login) {
          dispatch(setToken(response.data.access_token));
          dispatch(setRefreshToken(response.data.refresh_token));
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("refreshToken", response.data.refresh_token);
        }
        dispatch(setLoading(false));
        return response.data;
      } else {
        throw new Error(response.data.message || "Verification failed");
      }
    } catch (error) {
      const errorData = getErrorMessage(error);
      dispatch(setError(errorData));
      dispatch(setLoading(false));
      return rejectWithValue(errorData);
    }
  }
);

export const createProfile = createAsyncThunk(
  "auth/createProfile",
  async (profileData, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(
        "/auth/create-profile",
        profileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        dispatch(setToken(response.data.access_token));
        dispatch(setRefreshToken(response.data.refresh_token));
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        dispatch(setUser(response.data.user));
      }
      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      const errorData = getErrorMessage(error);
      dispatch(setError(errorData));
      dispatch(setLoading(false));
      return rejectWithValue(errorData);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  try {
    await axiosInstance.post("/auth/logout");
    dispatch(logoutAction());
  } catch (error) {
    // console.error("Logout failed", error);
    dispatch(logoutAction());
  }
});