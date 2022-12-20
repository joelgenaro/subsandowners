import axios from "axios";

function getData(page, size) {
  return axios.get(
    `https://subsandowners.onrender.com/api/jobList/getData?page=${page}&size=${size}`
  );
}

function filter(params) {
  return axios.post(
    "https://subsandowners.onrender.com/api/jobList/filter",
    params
  );
}

export const jobListService = {
  getData,
  filter,
};
