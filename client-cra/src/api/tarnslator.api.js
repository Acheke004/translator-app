import axios from "axios";

const TransLatorApi = axios.create({
  // For local development
  baseURL: "http://10.1.2.3:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
export default TransLatorApi;
