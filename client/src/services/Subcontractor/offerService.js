import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `http://localhost:5000/api/offer`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getData = async (data) => {
  const response = await axios.post(`${API_URL}/getData`, data, config);
  return response.data;
};

const declineOffer = async (data) => {
  const response = await axios.post(`${API_URL}/declineOffer`, data, config);
  return response.data;
};

const acceptOffer = async (data) => {
  const response = await axios.post(`${API_URL}/acceptOffer`, data, config);
  return response.data;
};

export const offerService = {
  getData,
  declineOffer,
  acceptOffer,
};
