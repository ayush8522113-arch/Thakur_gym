import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.0.118:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  // 🔥 VERY IMPORTANT
  // ❌ DO NOT SET Content-Type HERE
  // Axios will auto-set it for FormData

  return req;
});

export default API;
