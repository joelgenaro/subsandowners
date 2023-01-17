import React from "react";
/** Add Route Component */

// First Page Section
const LandingPage = React.lazy(() => import("../pages/Home/Layout2/Layout2"));

// Auth Section
const SignIn = React.lazy(() => import("../pages/Auth/SignIn"));
const ChooseOption = React.lazy(() => import("../pages/Auth/ChooseOption"));
const SignOut = React.lazy(() => import("../pages/Auth/SignOut"));
const ResetPassword = React.lazy(() => import("../pages/Auth/ResetPassword"));

// Auth Owner Section
const SignUpForOwner = React.lazy(() => import("../pages/Auth/owner/SignUp"));
const RegisterForOwner = React.lazy(() =>
  import("../pages/Auth/owner/Register")
);
const LetsStart = React.lazy(() => import("../pages/Auth/owner/LetsStart"));

// Auth Sub Section
const SignUpForSub = React.lazy(() => import("../pages/Auth/sub/SignUp"));
const RegisterForSub = React.lazy(() => import("../pages/Auth/sub/Register"));

// Job Section
const JobPost = React.lazy(() => import("../pages/Jobs/JobPost/JobPost"));
const JobDetails = React.lazy(() =>
  import("../pages/Jobs/JobDetails/JobDetails")
);
const JobList = React.lazy(() => import("../pages/Jobs/JobList/JobList"));

// User Section
const CandidateList = React.lazy(() => import("../pages/Candidate/Candidate"));

// Public Section
const ComingSoon = React.lazy(() => import("../pages/ExtraPages/ComingSoon"));
const Error404 = React.lazy(() => import("../pages/ExtraPages/Error404"));

const authLayoutForPublicRoutes = [
  { path: "/signin", component: SignIn },
  { path: "/chooseOption", component: ChooseOption },
  { path: "/signout", component: SignOut },
  { path: "/resetpassword", component: ResetPassword },
  { path: "/comingsoon", component: ComingSoon },
  { path: "/error404", component: Error404 },
];

const authLayoutForPrivateRoutes = [
  { path: "/signupForSub", component: SignUpForSub },
  { path: "/registerForSub", component: RegisterForSub },
  { path: "/signupForOwner", component: SignUpForOwner },
  { path: "/registerForOwner", component: RegisterForOwner },
  { path: "/letsStart", component: LetsStart },
];

const commonLayoutForPublicRoutes = [{ path: "/", component: LandingPage }];

const commonLayoutForPrivateRoutes = [
  { path: "/joblist", component: JobList },
  { path: "/jobpost", component: JobPost },
  { path: "/jobs/:jobId", component: JobDetails },
  { path: "/candidatelist", component: CandidateList },
];

export {
  authLayoutForPublicRoutes,
  authLayoutForPrivateRoutes,
  commonLayoutForPublicRoutes,
  commonLayoutForPrivateRoutes,
};
