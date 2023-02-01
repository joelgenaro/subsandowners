import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `https://subsandowners.onrender.com/api/proposal`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const placeBid = async (data) => {
  const response = await axios.post(`${API_URL}/placeBid`, data, config);
  return response.data;
};

const getProposal = async (data) => {
  const response = await axios.post(`${API_URL}/getProposal`, data, config);
  return response.data;
};

const retract = async (data) => {
  const response = await axios.post(`${API_URL}/retract`, data, config);
  return response.data;
};

const myProposal = async (data) => {
  const response = await axios.post(`${API_URL}/myProposal`, data, config);
  return response.data;
};

export const proposalService = {
  placeBid,
  getProposal,
  retract,
  myProposal,
};
