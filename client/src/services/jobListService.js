import axios from "axios";

function getData(page, size) {
  return axios.get(
    `http://localhost:8000/api/jobList/getData?page=${page}&size=${size}`
  );
}

function filter(params) {
  return axios.post("http://localhost:8000/api/jobList/filter", params);
}

export const jobListService = {
  getData,
  filter,
};
