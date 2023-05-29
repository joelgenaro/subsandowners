import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `/api/settings`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getData = async (data) => {
  const response = await axios.post(`${API_URL}/getData`, data, config);
  return response.data;
};

const updateEmail = async (data) => {
  const response = await axios.post(`${API_URL}/updateEmail`, data, config);
  return response.data;
};

const reset_password = async (data) => {
  const response = await axios.post(`${API_URL}/reset_password`, data, config);
  return response.data;
};

export const settingsService = {
  getData,
  updateEmail,
  reset_password,
};
