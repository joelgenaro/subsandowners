import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Extra/authSlice";
import candidateListReducer from "./Owner/candidateListSlice";
import savedTalentReducer from "./Owner/savedTalentSlice";
import yourHiresReducer from "./Owner/yourHiresSlice";
import applicantsReducer from "./Owner/applicantsSlice";
import jobPostingsReducer from "./Owner/jobPostingsSlice";
import myJobsReducer from "./Owner/myJobsSlice";
import proposalReducer from "./Subcontractor/proposalSlice";
import savedJobReducer from "./Subcontractor/savedJobSlice";
import jobReducer from "./Subcontractor/jobSlice";
import offerReducer from "./Subcontractor/offerSlice";
import activeContractsReducer from "./Subcontractor/activeContractsSlice";
import allContractsForSubReducer from "./Subcontractor/allContractsSlice";
import scontractReducer from "./Subcontractor/scontractSlice";
import profileReducer from "./Profile/profileSlice";
import settingsReducer from "./Extra/settingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    candidateList: candidateListReducer,
    savedTalent: savedTalentReducer,
    yourHires: yourHiresReducer,
    applicants: applicantsReducer,
    myJobs: myJobsReducer,
    jobPostings: jobPostingsReducer,
    proposal: proposalReducer,
    savedJob: savedJobReducer,
    job: jobReducer,
    offer: offerReducer,
    activeContracts: activeContractsReducer,
    scontract: scontractReducer,
    profile: profileReducer,
    settings: settingsReducer,
    allContractsForSub: allContractsForSubReducer,
  },
});
