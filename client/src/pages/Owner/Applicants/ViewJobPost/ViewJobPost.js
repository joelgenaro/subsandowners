import React from "react";
import JobDetails from "./JobDetails";
import EditJob from "./EditJob";
import { useSelector } from "react-redux";

const ViewJobPost = () => {
  const { isEditJob } = useSelector((state) => state.applicants);

  return (
    <React.Fragment>{isEditJob ? <EditJob /> : <JobDetails />}</React.Fragment>
  );
};

export default ViewJobPost;
