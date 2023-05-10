import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `https://bidderbadger.com/api/candidate`;
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

const updateFavOfDB = async (data) => {
  const response = await axios.post(`${API_URL}/updateFavOfDB`, data, config);
  return response.data;
};

const removeFav = async (data) => {
  const response = await axios.post(`${API_URL}/removeFav`, data, config);
  return response.data;
};

export const candidateListService = {
  getData,
  filter,
  updateFavOfDB,
  removeFav,
};
