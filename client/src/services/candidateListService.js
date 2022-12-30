import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `http://localhost:5000/api/candidate`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Get all subcontractors
const getData = async (data) => {
  const response = await axios.get(
    `${API_URL}/getData?page=${data.page}&size=${data.size}`
  );
  return response.data;
};

// Filter subs
const filter = async (data) => {
  const response = await axios.post(`${API_URL}/filter`, data, config);
  return response.data;
};

export const candidateListService = {
  getData,
  filter,
};
