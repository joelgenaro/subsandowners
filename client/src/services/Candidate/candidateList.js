import axios from "axios";

function getData(page, size) {
  return axios.get(
    `https://subsandowners.onrender.com/api/candidate/getData?page=${page}&size=${size}`
  );
}

function filter(params) {
  return axios.post(
    "https://subsandowners.onrender.com/api/candidate/filter",
    params
  );
}

export const candidateListService = {
  getData,
  filter,
};
