import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `/api/profile`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getProfile = async (data) => {
  const response = await axios.post(`${API_URL}/getProfile`, data, config);
  return response.data;
};

export const profileService = {
  getProfile,
};
