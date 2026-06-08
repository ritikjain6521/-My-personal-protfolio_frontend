import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE } from "@/lib/api";

interface AdminUser {
  email: string;
  name: string;
  token?: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasAdmin: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = "portfolio_admin_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hasAdmin, setHasAdmin] = useState(true); // Assume true by default in prod

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setUser(parsed);
        setToken(parsed.token);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) return false;
      // Auto-login after signup
      return await login(email, password);
    } catch {
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      
      const sessionUser = { name: "Admin", email: data.email, token: data.token };
      setUser(sessionUser);
      setToken(data.token);
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, hasAdmin, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
