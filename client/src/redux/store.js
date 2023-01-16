import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import candidateListReducer from "./candidateListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    candidateList: candidateListReducer,
  },
});
