import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `http://localhost:5000/api/jobList`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Filter jobs with Text
const getData = async (data) => {
  const response = await axios.post(`${API_URL}/getData`, data, config);
  return response.data;
};

export const jobListService = {
  getData,
};
