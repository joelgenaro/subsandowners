import axios from "axios";

function getData(page, size) {
  return axios.get(
    `https://scheduleasub.onrender.com/api/jobList/getData?page=${page}&size=${size}`
  );
}

function filter(params) {
  return axios.post(
    "https://scheduleasub.onrender.com/api/jobList/filter",
    params
  );
}

export const jobListService = {
  getData,
  filter,
};
