import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `https://subsandowners.onrender.com/api/applicants`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const sendOffer = async (data) => {
  const response = await axios.post(`${API_URL}/sendOffer`, data, config);
  return response.data;
};

const updateJob = async (data) => {
  const response = await axios.post(`${API_URL}/updateJob`, data, config);
  return response.data;
};

const getProposals = async (data) => {
  const response = await axios.post(`${API_URL}/getProposals`, data, config);
  return response.data;
};

const getHiredCandidates = async (data) => {
  const response = await axios.post(
    `${API_URL}/getHiredCandidates`,
    data,
    config
  );
  return response.data;
};

const endContract = async (data) => {
  const response = await axios.post(`${API_URL}/endContract`, data, config);
  return response.data;
};

export const applicantsService = {
  sendOffer,
  updateJob,
  getProposals,
  getHiredCandidates,
  endContract,
};
