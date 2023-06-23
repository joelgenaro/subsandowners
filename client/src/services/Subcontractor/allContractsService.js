import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `/api/allContractsForSub`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getData = async (data) => {
  const response = await axios.post(`${API_URL}/getData`, data, config);
  return response.data;
};

const filter = async (data) => {
  const response = await axios.post(`${API_URL}/filter`, data, config);
  return response.data;
};

export const allContractsService = {
  getData,
  filter,
};
