import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `/api/auth`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, config);
  return response.data;
};

// Forgot password
const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgotPassword`, email, config);
  return response.data;
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

export const authService = {
  createAccountGmail,
  updateProfile,
  logout,
  login,
  forgotPassword,
};
