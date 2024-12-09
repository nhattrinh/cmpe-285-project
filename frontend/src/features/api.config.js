import axios from "axios";

const DEV_BASE_URL = "http://localhost:8000/api";
const PROD_BASE_URL = "/api";

const BASE_URL = process.env.NODE_ENV === "development" ? DEV_BASE_URL : PROD_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ({
  
});
