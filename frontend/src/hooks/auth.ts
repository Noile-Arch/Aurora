import api from "./axios";
import { LoginInput, RegisterInput } from "../pages/auth/schema";

export const authApi = {
  login: async (data: LoginInput) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  signup: async (data: RegisterInput) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  verify: async () => {
    const token = localStorage.getItem("auroraAuth");
    if (!token) throw new Error("No token found");

    const response = await api.get("/auth/verify", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};
