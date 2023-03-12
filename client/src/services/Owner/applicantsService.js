import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `https://subsandowners.onrender.com/api/applicants`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const updateJob = async (data) => {
  const response = await axios.post(`${API_URL}/updateJob`, data, config);
  return response.data;
};

const getProposals = async (data) => {
  const response = await axios.post(`${API_URL}/getProposals`, data, config);
  return response.data;
};

const sendOffer = async (data) => {
  const response = await axios.post(`${API_URL}/sendOffer`, data, config);
  return response.data;
};

export const applicantsService = {
  updateJob,
  getProposals,
  sendOffer,
};
