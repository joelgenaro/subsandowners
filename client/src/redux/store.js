import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectReducer from "./projectSlice";
import jobListReducer from "./jobListSlice";
import candidateListReducer from "./candidateListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    jobList: jobListReducer,
    candidateList: candidateListReducer,
  },
});
