import axios from "axios";

function createJob(params) {
  return axios.post("http://localhost:5000/api/jobPost/add", params);
}

export const jobPostService = {
  createJob,
};
