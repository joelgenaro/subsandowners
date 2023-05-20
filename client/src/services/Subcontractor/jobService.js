import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `https://bidderbadger.com/api/job`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const createJob = async (data) => {
  const response = await axios.post(`${API_URL}/create`, data, config);
  return response.data;
};

const updateFavOfDB = async (data) => {
  const response = await axios.post(`${API_URL}/updateFavOfDB`, data, config);
  return response.data;
};

const getJobDetails = async (data) => {
  const response = await axios.post(`${API_URL}/getJobDetails`, data, config);
  return response.data;
};

const getAllJobs = async (data) => {
  const response = await axios.post(`${API_URL}/getAllJobs`, data, config);
  return response.data;
};

export const jobService = {
  createJob,
  getJobDetails,
  getAllJobs,
  updateFavOfDB,
};
