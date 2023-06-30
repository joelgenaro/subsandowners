import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `/api/yourHires`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Get all subcontractors
const getData = async (data) => {
  const response = await axios.post(`${API_URL}/getData`, data, config);
  return response.data;
};

// Filter subs
const filter = async (data) => {
  const response = await axios.post(`${API_URL}/filter`, data, config);
  return response.data;
};

export const yourHiresService = {
  getData,
  filter,
};
