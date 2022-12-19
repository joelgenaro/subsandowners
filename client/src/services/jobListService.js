import axios from "axios";

function getData(page, size) {
  return axios.get(
    `http://localhost:5000/api/jobList/getData?page=${page}&size=${size}`
  );
}

function filter(params) {
  return axios.post("http://localhost:5000/api/jobList/filter", params);
}

export const jobListService = {
  getData,
  filter,
};
