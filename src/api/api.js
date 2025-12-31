import axios from "axios";

const API = axios.create({
  baseURL:`${process.env.REACT_APP_API_URL}/api`,
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
