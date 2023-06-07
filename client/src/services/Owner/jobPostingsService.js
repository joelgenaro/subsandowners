import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `/api/jobPostings`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Get all subcontractors
const getData = async (data) => {
  const response = await axios.get(`${API_URL}/getData?page=${data.page}`);
  return response.data;
};

const deleteJob = async (data) => {
  const response = await axios.post(`${API_URL}/deleteJob`, data, config);
  return response.data;
};

// Filter subs
const filter = async (data) => {
  const response = await axios.post(`${API_URL}/filter`, data, config);
  return response.data;
};

export const jobPostingsService = {
  getData,
  deleteJob,
  filter,
};
