import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import examReducer from "./slices/examSlice";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  auth: authReducer,
  exam: examReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
    storage.removeItem("persist:root");
  }

  return appReducer(state, action);
};

export default rootReducer;
