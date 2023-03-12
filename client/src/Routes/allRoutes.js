import React from "react";
/** Add Route Component */

// Public Section
const LandingPage = React.lazy(() => import("../pages/Home/Layout2/Layout2"));
const SignIn = React.lazy(() => import("../pages/Auth/SignIn"));
const SignOut = React.lazy(() => import("../pages/Auth/SignOut"));
const ChooseOption = React.lazy(() => import("../pages/Auth/ChooseOption"));
const ResetPassword = React.lazy(() => import("../pages/Auth/ResetPassword"));
const ComingSoon = React.lazy(() => import("../pages/ExtraPages/ComingSoon"));
const Error404 = React.lazy(() => import("../pages/ExtraPages/Error404"));

// Owner Section
const SignUpForOwner = React.lazy(() => import("../pages/Auth/owner/SignUp"));
const RegisterForOwner = React.lazy(() =>
  import("../pages/Auth/owner/Register")
);
const LetsStart = React.lazy(() => import("../pages/Auth/owner/LetsStart"));
const CandidateList = React.lazy(() =>
  import("../pages/Owner/Candidate/Candidate")
);
const JobPost = React.lazy(() =>
  import("../pages/Subcontractor/Jobs/JobPost/JobPost")
);
const AllJobPosts = React.lazy(() =>
  import("../pages/Owner/AllJobPosts/AllJobPosts")
);
const SavedTalents = React.lazy(() =>
  import("../pages/Owner/SavedTalents/SavedTalents")
);
const Applicants = React.lazy(() =>
  import("../pages/Owner/Applicants/Applicants")
);

// Subcontractor Section
const SignUpForSub = React.lazy(() => import("../pages/Auth/sub/SignUp"));
const RegisterForSub = React.lazy(() => import("../pages/Auth/sub/Register"));
const JobDetails = React.lazy(() =>
  import("../pages/Subcontractor/Jobs/JobDetails/JobDetails")
);
const OfferDetails = React.lazy(() =>
  import("../pages/Subcontractor/OfferDetails/OfferDetails")
);
const JobList = React.lazy(() =>
  import("../pages/Subcontractor/Jobs/JobList/JobList")
);
const Proposals = React.lazy(() =>
  import("../pages/Subcontractor/Proposals/Proposals")
);
const SavedJobs = React.lazy(() =>
  import("../pages/Subcontractor/SavedJobs/SavedJobs")
);
const ActiveContracts = React.lazy(() =>
  import("../pages/Subcontractor/ActiveContracts/ActiveContracts")
);

// Routes
const authLayoutForPublicRoutes = [
  { path: "/signin", component: SignIn },
  { path: "/choose-option", component: ChooseOption },
  { path: "/signup-owner", component: SignUpForOwner },
  { path: "/signup-sub", component: SignUpForSub },
  { path: "/signout", component: SignOut },
  { path: "/reset-password", component: ResetPassword },
  { path: "/coming-soon", component: ComingSoon },
];

const authLayoutForPrivateRoutes = [
  { path: "/register-sub", component: RegisterForSub },
  { path: "/register-owner", component: RegisterForOwner },
  { path: "/lets-start", component: LetsStart },
];

const commonLayoutForPublicRoutes = [
  { path: "/", component: LandingPage },
  { path: "*", component: Error404 },
];

const commonLayoutForPrivateRoutes = [
  { path: "/job-list", component: JobList },
  { path: "/job-post", component: JobPost },
  { path: "/proposals", component: Proposals },
  { path: "/jobs/:jobId", component: JobDetails },
  { path: "/offer/:applicationId", component: OfferDetails },
  { path: "/candidate-list", component: CandidateList },
  { path: "/all-jobs", component: AllJobPosts },
  { path: "/active-contracts", component: ActiveContracts },
  { path: "/saved-jobs", component: SavedJobs },
  { path: "/saved-talents", component: SavedTalents },
  { path: "/saved-talents", component: SavedTalents },
  { path: "/saved-talents", component: SavedTalents },
  { path: "/applicants/:jobId", component: Applicants },
];

export {
  authLayoutForPublicRoutes,
  authLayoutForPrivateRoutes,
  commonLayoutForPublicRoutes,
  commonLayoutForPrivateRoutes,
};
