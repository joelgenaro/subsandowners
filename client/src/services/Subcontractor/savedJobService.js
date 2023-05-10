import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `https://bidderbadger.com/api/savedJob`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getData = async (data) => {
  const response = await axios.post(`${API_URL}/getData`, data, config);
  return response.data;
};

const removeFav = async (data) => {
  const response = await axios.post(`${API_URL}/removeFav`, data, config);
  return response.data;
};

export const savedJobService = {
  getData,
  removeFav,
};
