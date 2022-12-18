import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:10000/api/authOwner";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Register User
const createAccountGmail = async (userData) => {
  const response = await axios.post(`${API_URL}/add`, userData, config);
  return response.data;
};

// Update User profile
const updateProfile = async (params) => {
  const response = await axios.post(`${API_URL}/update`, params, config);
  return response.data;
};

// Logout
const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`);
  return response.data;
};

export const ownerService = {
  createAccountGmail,
  updateProfile,
  logout,
};
