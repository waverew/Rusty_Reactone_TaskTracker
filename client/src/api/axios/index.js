import Axios from "axios";

let baseURL = 'http://localhost:44365';

const axiosConfig = {
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
};

const axiosClient = Axios.create(axiosConfig);

export { axiosClient };