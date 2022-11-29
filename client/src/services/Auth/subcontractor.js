import axios from "axios";

function createAccountGmail(params) {
  return axios.post("http://localhost:5000/api/authSubcontractor/add", params);
}

function updateSubcontractor(params) {
  return axios.post(
    "http://localhost:5000/api/authSubcontractor/update",
    params
  );
}

export const subcontractorService = {
  createAccountGmail,
  updateSubcontractor,
};
