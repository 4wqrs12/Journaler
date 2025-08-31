import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");

  async function login(username, password) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const json = await res.json();
      setToken(json.accessToken);
      console.log(json);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  async function logout() {
    try {
      await fetch(`${import.meta.env.VITE_BASE_API}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      setToken(null);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  async function refreshToken() {
    try {
      const res = await fetch(`${import.meta.env}/api/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        const json = await res.json();
        setToken(json.accessToken);
      } else {
        setToken(null);
      }
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
