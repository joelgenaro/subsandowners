import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `https://subsandowners.onrender.com/api/project`;
const configForCreteProject = {
  headers: {
    "Content-Type": "application/json",
    "Content-type": "multipart/form-data",
  },
};

const configForJobDetails = {
  headers: {
    "Content-Type": "application/json",
  },
};

const createProject = async (data) => {
  const response = await axios.post(
    `${API_URL}/create`,
    data,
    configForCreteProject
  );
  return response.data;
};

const getJobDetails = async (data) => {
  const response = await axios.post(
    `${API_URL}/getJobDetails`,
    data,
    configForJobDetails
  );
  return response.data;
};

export const projectService = {
  createProject,
  getJobDetails,
};
