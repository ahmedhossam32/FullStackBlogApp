import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../utils/auth";
import api from "../api";

function AccountPage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);

  const currentUser = getUser();

  useEffect(() => {
    if (!currentUser) return;
    setUser(currentUser);

    const fetchData = async () => {
      try {
        const [statsRes, recentRes] = await Promise.all([
          api.get("/blogs/user/stats"),
          api.get("/blogs/user/recent"),
        ]);
        setStats(statsRes.data);
        setRecentBlogs(recentRes.data);
      } catch (err) {
        console.error("Failed to fetch user stats or recent blogs", err);
      }
    };

    fetchData();
  }, []);

  if (!user)
    return (
      <p className="mt-20 font-sans text-gray-500 text-center">
        You need to be logged in to view this page.
      </p>
    );

  return (
    <div className="mx-auto px-6 py-10 max-w-3xl font-sans text-gray-900">
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <img
          src={
            user.profileImage
              ? `http://localhost:8000${user.profileImage}`
              : "/images/userpic.jpg"
          }
          alt={user.name}
          className="rounded-full w-40 h-40 object-cover"
        />

        <div className="text-center">
          <p className="font-serif font-semibold text-2xl">
            {user.name} (@{user.username})
          </p>
          <p className="text-sm">{user.email}</p>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="bg-gray-100 border rounded-lg p-6 text-center mb-10">
          <h2 className="font-serif text-xl font-semibold mb-2">
            📊 Account Statistics
          </h2>
          <p className="text-sm text-gray-700">
            Blogs Posted: <strong>{stats.blogCount}</strong> · Likes Received:{" "}
            <strong>{stats.likeCount}</strong> · Comments:{" "}
            <strong>{stats.commentCount}</strong>
          </p>
        </div>
      )}

      {/* Recent Blogs */}
      <div>
        <h2 className="font-serif text-xl font-semibold mb-4">
          📝 Recent Blogs
        </h2>
        {recentBlogs.length > 0 ? (
          <ul className="space-y-3">
            {recentBlogs.map((blog) => (
              <li
                key={blog.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-sans font-medium text-gray-800">
                    {blog.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/edit-blog/${blog.id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-gray-700 text-sm hover:underline"
                  >
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">
            You haven’t written any blogs yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
