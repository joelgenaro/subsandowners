import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:10000/api/project";
const config = {
  headers: {
    "Content-Type": "application/json",
    "Content-type": "multipart/form-data",
  },
};

// Register User
const createProject = async (data) => {
  const response = await axios.post(`${API_URL}/create`, data, config);
  return response.data;
};

export const projectService = {
  createProject,
};
