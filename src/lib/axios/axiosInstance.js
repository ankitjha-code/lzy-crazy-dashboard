// src/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api", // adjust this if your backend runs on a different port or domain
  withCredentials: true, // Important: allows cookies (token) to be included
});

export default instance;
