import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser, saveUser, logout as logoutUtil } from "../utils/auth";
import api from "../api"; // ✅ load it here to control axios globally

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUser());
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const user = getUser();
    setCurrentUser(user);

    const token = localStorage.getItem("token");
    if (token) {
      console.log("🔐 Re-attaching token to axios");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("🚫 No token found on refresh");
    }

    setAuthReady(true);
  }, []);

  const login = (user) => {
    saveUser(user);
    setCurrentUser(user);
  };

  const logout = () => {
    logoutUtil();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
