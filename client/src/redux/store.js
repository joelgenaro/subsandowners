import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import candidateListReducer from "./candidateListSlice";
import proposalReducer from "./proposalSlice";
import jobPostingsReducer from "./jobPostingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    candidateList: candidateListReducer,
    proposal: proposalReducer,
    jobPostings: jobPostingsReducer,
  },
});
