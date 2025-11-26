import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios/axiosInstance";
import {
  setUser,
  setToken,
  setRefreshToken,
  setLoading,
  setError,
} from "./authSlice";

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
      dispatch(setError(error.response.data));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ mobile, otp }, { dispatch }) => {
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
      }
    } catch (error) {
      dispatch(setError(error.response.data));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const createProfile = createAsyncThunk(
  "auth/createProfile",
  async (profileData, { dispatch }) => {
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
      dispatch(setError(error.response.data));
      dispatch(setLoading(false));
      throw error;
    }
  }
);
