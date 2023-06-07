import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `/api/scontract`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getData = async (data) => {
  const response = await axios.post(`${API_URL}/getData`, data, config);
  return response.data;
};

const giveFeedback = async (data) => {
  const response = await axios.post(`${API_URL}/giveFeedback`, data, config);
  return response.data;
};

export const scontractService = {
  getData,
  giveFeedback,
};
