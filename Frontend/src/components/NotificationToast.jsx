import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../utils/auth";
import api from "../api";
import { useNavigate } from "react-router-dom";

function NotificationToast() {
  const [queue, setQueue] = useState([]);
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);
  const currentUser = getUser();
  const navigate = useNavigate();

  // ✅ Poll notifications every 5 seconds
  useEffect(() => {
    if (!currentUser) return;

    const interval = setInterval(async () => {
      try {
        const res = await api.get("/api/notifications");
        const unread = res.data.filter((n) => !n.read);
        const sorted = unread
          .map((n) => ({
            id: n.id,
            message: n.message,
            timestamp: n.timestamp,
            postId: n.postId || null,
          }))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setQueue((prevQueue) => {
          const currentIds = new Set(prevQueue.map((n) => n.id));
          if (toast) currentIds.add(toast.id);
          const newItems = sorted.filter((n) => !currentIds.has(n.id));
          return [...prevQueue, ...newItems];
        });
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentUser, toast]);

  // ✅ Show next toast in queue
  useEffect(() => {
    if (!toast && queue.length > 0) {
      setToast(queue[0]);
    }
  }, [queue, toast]);

  // ✅ Handle display duration + mark as read
  useEffect(() => {
    if (!toast) return;

    // ✅ Mark as read as soon as it's shown
    api
      .put(`/api/notifications/${toast.id}/read`)
      .catch((err) => console.error("Auto mark as read failed:", err));

    timeoutRef.current = setTimeout(() => {
      setToast(null);
      setQueue((prev) => prev.slice(1));
    }, 10000); // 10 seconds

    return () => clearTimeout(timeoutRef.current);
  }, [toast]);

  const handleDismiss = () => {
    clearTimeout(timeoutRef.current);
    setToast(null);
    setQueue((prev) => prev.slice(1));
  };

  const handleClick = () => {
    if (toast?.postId) {
      navigate(`/blogs/${toast.postId}`);
    }
    handleDismiss();
  };

  if (!currentUser || !toast) return null;

  return (
    <div className="right-4 bottom-4 z-50 fixed w-80">
      <div
        onClick={handleClick}
        className="relative bg-white shadow-lg px-4 py-3 border-blue-500 border-l-4 rounded text-gray-800 text-sm cursor-pointer"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="top-2 right-2 absolute text-gray-400 hover:text-red-500 text-xs"
        >
          ✕
        </button>
        <p className="font-medium">{toast.message}</p>
        <p className="mt-1 text-gray-500 text-xs">
          {new Date(toast.timestamp).toLocaleString()}
        </p>
        <div className="flex gap-4 mt-3 text-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss(); // already marked, just remove
            }}
            className="text-green-600 hover:underline"
          >
            Mark as read
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="text-red-500 hover:underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationToast;
