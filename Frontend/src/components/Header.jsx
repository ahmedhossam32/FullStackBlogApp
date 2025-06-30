import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

function Header({ setAuthMode }) {
  const { currentUser, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Fetch notifications only when dropdown opens
  useEffect(() => {
    if (currentUser && showDropdown) {
      fetchNotifications();
    }
  }, [currentUser, showDropdown]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/api/notifications");
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNotifications(sorted);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id) => {
    try {
      await api.put(`/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ✅ Auto-close dropdown after 3 seconds
  useEffect(() => {
    if (showDropdown) {
      timeoutRef.current = setTimeout(() => setShowDropdown(false), 3000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [showDropdown]);

  return (
    <header className="relative pb-2 border-b border-gray-200 font-sans">
      {/* Logo & Bell */}
      <div className="relative flex justify-center items-center py-4">
        <Link to="/">
          <img
            src="/images/Logo500X500.png"
            alt="Blogies Logo"
            className="w-24 h-28"
          />
        </Link>

        {currentUser && (
          <div className="absolute top-6 right-6 z-50">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <i className="fas fa-bell text-gray-700 text-2xl"></i>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex justify-center items-center bg-red-500 text-white text-[10px] w-4 h-4 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>

            {showDropdown && (
              <div className="absolute right-0 z-50 w-80 max-h-96 overflow-y-auto mt-2 border border-gray-200 bg-white rounded-md shadow">
                <div className="px-4 py-2 border-b bg-gray-50 text-sm font-bold">
                  Your Notifications
                </div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-sm border-b ${
                        !n.read ? "bg-blue-50" : "hover:bg-gray-100"
                      }`}
                    >
                      <p className="italic">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                      {!n.read && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="text-xs text-blue-600 hover:underline mt-1"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex justify-center items-center gap-10 font-serif text-lg text-gray-800">
        <Link to="/blogs" className="hover:underline underline-offset-4">
          Blogs
        </Link>
        <Link to="/communities" className="hover:underline underline-offset-4">
          Communities
        </Link>
        <Link to="/my-blogs" className="hover:underline underline-offset-4">
          My Blogs
        </Link>

        {currentUser ? (
          <>
            <Link to="/account" className="hover:underline underline-offset-4">
              Account
            </Link>
            <Link
              to="/create-blog"
              className="hover:underline underline-offset-4"
            >
              Start a Blog
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline underline-offset-4"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setAuthMode("login")}
              className="hover:underline underline-offset-4"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode("signup")}
              className="hover:underline underline-offset-4"
            >
              Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
