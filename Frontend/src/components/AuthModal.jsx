import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { saveToken } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

function AuthModal({ onClose, mode, onSwitchMode }) {
  const isLogin = mode === "login";
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password || (!isLogin && (!name || !email || !dob))) {
      setError("All fields are required.");
      return;
    }

    try {
      if (isLogin) {
        const response = await api.post("/auth/login", { username, password });
        const { token, user } = response.data;

        saveToken(token.replace("Bearer ", ""));
        login(user);
        onClose();
        navigate("/blogs");
      } else {
        const age = calculateAge(dob);
        let profileImagePath = null;

        // ✅ Upload image if provided
        if (profileImageFile) {
          const formData = new FormData();
          formData.append("image", profileImageFile);

          const uploadRes = await api.post(
            "/api/users/upload-image",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          profileImagePath = uploadRes.data; // e.g. /uploads/somefile.png
        }

        // ✅ Signup
        await api.post("/auth/signup", {
          name,
          username,
          email,
          password,
          age,
          profileImage: profileImagePath,
        });

        const loginResponse = await api.post("/auth/login", {
          username,
          password,
        });
        const { token, user } = loginResponse.data;

        saveToken(token.replace("Bearer ", ""));
        login(user);
        onClose();
        navigate("/blogs");
      }
    } catch (err) {
      console.error("❌ Auth error:", err);
      setError(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white p-8 rounded-lg w-full max-w-md">
        <button className="top-3 right-3 absolute text-2xl" onClick={onClose}>
          ×
        </button>
        <h2 className="mb-6 font-semibold text-2xl text-center">
          {isLogin ? "Welcome back." : "Join Blogies."}
        </h2>

        {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                className="mb-3 p-2 border rounded w-full"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="mb-3 p-2 border rounded w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="date"
                className="mb-3 p-2 border rounded w-full"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />

              <label className="block text-sm font-medium mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImageFile(e.target.files[0])}
                className="mb-3"
              />
            </>
          )}
          <input
            className="mb-3 p-2 border rounded w-full"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="mb-4 p-2 border rounded w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="flex justify-center items-center hover:bg-black py-2 border border-gray-400 rounded-full w-full font-medium text-black hover:text-white transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isLogin ? (
            <>
              New here{" "}
              <button
                onClick={() => onSwitchMode("signup")}
                className="underline"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => onSwitchMode("login")}
                className="underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
