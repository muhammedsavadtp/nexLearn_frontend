import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import examReducer from "./slices/examSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  exam: examReducer,
});

export default rootReducer;
