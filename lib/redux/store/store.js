import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["exam", "auth"], // Persist 'exam' and 'auth' slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PURGE", "persist/REGISTER", "persist/FLUSH"],
      },
    }),
});

export const persistedStore = persistStore(store);
export default store;
