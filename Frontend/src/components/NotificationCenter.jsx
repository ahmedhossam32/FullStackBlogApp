import React, { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import api from "../api";
import { useNavigate } from "react-router-dom";

function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const currentUser = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const fetchNotifications = async () => {
      try {
        const res = await api.get("/api/notifications");
        const unread = res.data.filter((n) => !n.read);
        const sorted = unread.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setNotifications(sorted);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();
  }, [currentUser]);

  const handleClick = (notif) => {
    if (notif.post?.id) {
      navigate(`/blogs/${notif.post.id}`);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/api/notifications/${id}/read`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  if (!currentUser || notifications.length === 0) return null;

  return (
    <div className="mx-auto px-6 py-10 max-w-2xl">
      <h2 className="mb-6 font-semibold text-2xl text-center">
        Unread Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="relative p-4 border-l-4 border-blue-500 rounded shadow-sm bg-white text-gray-800 cursor-pointer"
            onClick={() => handleClick(n)}
          >
            <p className="font-medium">{n.message}</p>
            <p className="mt-1 text-gray-500 text-xs">
              {new Date(n.timestamp).toLocaleString()}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                markAsRead(n.id);
              }}
              className="mt-2 text-blue-600 text-xs hover:underline"
            >
              Mark as read
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationCenter;
