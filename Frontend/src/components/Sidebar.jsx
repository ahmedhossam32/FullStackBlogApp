import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BlogAdd from "./BlogAdd";
import api from "../api";

function Sidebar({ setAuthMode }) {
  const { currentUser, logout } = useAuth();
  const isGuest = !currentUser;
  const navigate = useNavigate();

  const [blogCount, setBlogCount] = useState(0);
  const [memberSince, setMemberSince] = useState("");

  const baseBtn =
    "w-full py-2 text-sm font-serif font-semibold rounded-none border transition";
  const btnDefault = `${baseBtn} border-gray-400 text-gray-600 bg-transparent hover:bg-black hover:text-white`;
  const btnBlue = `${baseBtn} border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white`;

  const avatarUrl =
    !isGuest && currentUser.profileImage
      ? `http://localhost:8000${currentUser.profileImage}`
      : "/images/userpic.jpg";

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get(`/api/users/${currentUser.id}/summary`);
        setBlogCount(res.data.blogCount || 0);
        const date = new Date(res.data.memberSince);
        const formatted = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        });
        setMemberSince(formatted);
      } catch (err) {
        console.error("Failed to fetch user summary:", err);
      }
    };

    if (!isGuest) {
      fetchSummary();
    }
  }, [currentUser]);

  return (
    <div className="space-y-6 font-sans text-gray-700 text-sm">
      {/* USER BLOCK */}
      <div className="shadow p-4 border border-gray-200 rounded-none">
        <div className="flex flex-col items-center text-center">
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="mb-3 rounded-full w-20 h-20 object-cover"
          />
          <h2 className="mb-1 font-serif font-bold text-black text-lg">
            {isGuest ? "Guest" : currentUser.name}
          </h2>

          {!isGuest ? (
            <>
              <p className="font-sans text-gray-500 text-sm italic">
                "Exploring ideas, one blog at a time."
              </p>
              <p className="mt-2 text-sm">Blogs Written: {blogCount}</p>
              <p className="text-sm whitespace-nowrap">
                Member Since: {memberSince}
              </p>

              {/* Added margin-top for spacing */}
              <button onClick={logout} className={`${btnDefault} mt-3`}>
                Sign Out
              </button>
            </>
          ) : (
            <div className="space-y-2 mt-3 w-full">
              <button
                onClick={() => setAuthMode("login")}
                className={btnDefault}
              >
                Log In
              </button>
              <button onClick={() => setAuthMode("signup")} className={btnBlue}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SOCIALS BLOCK */}
      <div className="shadow p-4 border border-gray-200 rounded-none">
        <h3 className="mb-3 font-serif font-bold text-black text-md text-center">
          Follow Us
        </h3>
        <div className="flex justify-center gap-4 text-gray-600 text-xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="hover:text-black fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="hover:text-black fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="hover:text-black fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* CTA */}
      <BlogAdd user={currentUser} />
    </div>
  );
}

export default Sidebar;
