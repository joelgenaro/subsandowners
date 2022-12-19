import axios from "axios";

function getData(page, size) {
  return axios.get(
    `http://localhost:8000/api/candidate/getData?page=${page}&size=${size}`
  );
}

function filter(params) {
  return axios.post("http://localhost:8000/api/candidate/filter", params);
}

export const candidateListService = {
  getData,
  filter,
};
