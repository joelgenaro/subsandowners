import axios from "axios";

function createAccountGmail(params) {
  return axios.post("http://localhost:5000/api/authOwner/add", params);
}

function updateOwner(params) {
  return axios.post("http://localhost:5000/api/authOwner/update", params);
}

export const ownerService = {
  createAccountGmail,
  updateOwner,
};
