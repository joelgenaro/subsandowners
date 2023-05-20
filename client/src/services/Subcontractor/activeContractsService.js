import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `https://bidderbadger.com/api/activeContracts`;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getData = async (data) => {
  const response = await axios.post(`${API_URL}/getData`, data, config);
  return response.data;
};

export const activeContractsService = {
  getData,
};
