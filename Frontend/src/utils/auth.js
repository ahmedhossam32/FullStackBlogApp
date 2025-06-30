import api from "../api";

export function saveUser(user) {
  if (!user) {
    localStorage.removeItem("currentUser");
  } else {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const logout = () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
};

export const saveToken = (token) => {
  localStorage.setItem("token", token); // raw token
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // ✅ add prefix here only
};
