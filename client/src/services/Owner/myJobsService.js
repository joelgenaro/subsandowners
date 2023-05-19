import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `http://localhost:5000/api/myJobs`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getData = async (data) => {
  const response = await axios.post(`${API_URL}/getData`, data, config);
  return response.data;
};

export const myJobsService = {
  getData,
};
