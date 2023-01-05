import React from "react";
/** Add Route Component */

const Layout2 = React.lazy(() => import("../pages/Home/Layout2/Layout2"));
const JobPost = React.lazy(() => import("../pages/Jobs/JobPost/JobPost"));
const JobDetails = React.lazy(() =>
  import("../pages/Jobs/JobDetails/JobDetails")
);
const CandidateList = React.lazy(() => import("../pages/Candidate/Candidate"));
const JobList = React.lazy(() => import("../pages/Jobs/JobList/JobList"));

// AuthLayout Section
const ChooseOption = React.lazy(() => import("../pages/Auth/ChooseOption"));
const SignIn = React.lazy(() => import("../pages/Auth/SignIn"));
const SignUpForSub = React.lazy(() => import("../pages/Auth/sub/SignUp"));
const SignUpForOwner = React.lazy(() => import("../pages/Auth/owner/SignUp"));
const SignOut = React.lazy(() => import("../pages/Auth/SignOut"));
const RegisterForSub = React.lazy(() => import("../pages/Auth/sub/Register"));
const RegisterForOwner = React.lazy(() =>
  import("../pages/Auth/owner/Register")
);
const LetsStart = React.lazy(() => import("../pages/Auth/owner/LetsStart"));
const ResetPassword = React.lazy(() => import("../pages/Auth/ResetPassword"));
const ComingSoon = React.lazy(() => import("../pages/ExtraPages/ComingSoon"));
const Error404 = React.lazy(() => import("../pages/ExtraPages/Error404"));

const publicRoutes = [
  { path: "/candidatelist", component: CandidateList },
  { path: "/joblist", component: JobList },
  { path: "/jobpost", component: JobPost },
  { path: "/jobs/:jobId", component: JobDetails },
  { path: "/", component: Layout2 },
];

const authRoutes = [
  { path: "/error404", component: Error404 },
  { path: "/comingsoon", component: ComingSoon },
  { path: "/resetpassword", component: ResetPassword },
  { path: "/signout", component: SignOut },
  { path: "/signin", component: SignIn },
  { path: "/signupForSub", component: SignUpForSub },
  { path: "/registerForSub", component: RegisterForSub },
  { path: "/signupForOwner", component: SignUpForOwner },
  { path: "/registerForOwner", component: RegisterForOwner },
  { path: "/letsStart", component: LetsStart },
  { path: "/chooseOption", component: ChooseOption },
];
export { authRoutes, publicRoutes };
