import React from "react";
/** Add Route Component */
//Home Section
const Layout1 = React.lazy(() => import("../pages/Home/Layout1/Layout1"));
const Layout2 = React.lazy(() => import("../pages/Home/Layout2/Layout2"));
const Layout3 = React.lazy(() => import("../pages/Home/Layout3/Layout3"));

/** Owner */
// Project Section
const JobPost = React.lazy(() => import("../pages/Owner/Project/Post"));

// Candidate Section
const CandidateList = React.lazy(() =>
  import("../pages/Owner/Candidate/CandidateList")
);

/** Subcontractor */

// Auth Section
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

const subcontractorRoutes = [
  //Jobs Section

  //Home Section
  { path: "/layout3", component: Layout3 },
  { path: "/", component: Layout2 },
  { path: "/layout2", component: Layout1 },
];

const ownerRoutes = [
  //Candidate Section
  { path: "/candidatelist", component: CandidateList },
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
  { path: "/jobpost", component: JobPost },
  { path: "/chooseOption", component: ChooseOption },
];
export { authRoutes, subcontractorRoutes, ownerRoutes };
