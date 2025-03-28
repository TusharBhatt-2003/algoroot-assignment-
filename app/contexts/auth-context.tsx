"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email: string, password: string) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.email === email && userData.password === password) {
        setUser({ name: userData.name, email: userData.email });
        return true;
      }
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    if (!name || !email || !password) return false;
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    setUser({ name, email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const deleteAccount = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
