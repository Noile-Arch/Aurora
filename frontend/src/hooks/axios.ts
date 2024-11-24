import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auroraAuth");
  if (token) {
    const parsedToken =
      typeof token === "string" ? token.replace(/"/g, "") : token;
    config.headers.Authorization = `Bearer ${parsedToken}`;
  }
  return config;
});

export default api;
