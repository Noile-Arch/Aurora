import { createContext, useState, ReactNode, useEffect } from "react";
import { authApi } from "./auth";
import { RegisterInput } from "../pages/auth/schema";

// Add Product interface
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  preparationTime: number;
  isAvailable: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

// Update AuthContextType to include products
interface AuthContextType {
  user: User | null;
  products: Product[];
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: RegisterInput) => Promise<void>;
  fetchProducts: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/products`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      // Debug log

      const { token, user: userData } = response.data;

      // Store token
      localStorage.setItem("auroraAuth", JSON.stringify(token));

      // Set user state
      setUser(userData);

      
    } catch (error) {
      console.error("Login error:", error);
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
    <AuthContext.Provider
      value={{
        user,
        products,
        setUser,
        logout,
        login,
        signup,
        fetchProducts,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
