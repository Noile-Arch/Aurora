import { createContext, useState, ReactNode } from "react";
import { authApi } from "./auth";
import { RegisterInput } from "../pages/auth/schema";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: RegisterInput) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      console.log('Login response:', response);

      if (!response.data?.user || !response.data?.token) {
        throw new Error('Invalid response format');
      }

      const { token, user: userData } = response.data;
      console.log('User data:', userData);

      localStorage.setItem("auroraAuth", JSON.stringify(token));
      setUser(userData);
      
      console.log('User state after set:', user);
      
      setTimeout(() => {
        console.log('User state after delay:', user);
      }, 100);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (data: RegisterInput) => {
    const { token, user: userData } = await authApi.signup(data);
    localStorage.setItem("auroraAuth", JSON.stringify(token));

    setUser(userData);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auroraAuth");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
