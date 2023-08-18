import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://stilettoapi.com/api",

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axios;
