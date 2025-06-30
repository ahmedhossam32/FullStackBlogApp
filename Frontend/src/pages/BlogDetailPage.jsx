import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api, { toggleLike, checkIfLiked } from "../api";
import CommentSectionPanel from "../components/CommentSectionPanel";

function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, authReady } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCommentsPanel, setShowCommentsPanel] = useState(false);

  useEffect(() => {
    if (!authReady) return;

    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
        setLikesCount(res.data.likeIds?.length || 0);
      } catch (err) {
        console.error("❌ Failed to fetch blog:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [authReady, id]);

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!blog?.id || !currentUser?.id) return;
      const likedStatus = await checkIfLiked(blog.id);
      setLiked(likedStatus);
    };

    checkLikeStatus();
  }, [blog?.id, currentUser?.id]);

  const canEditOrDelete =
    currentUser?.role === "ADMIN" || currentUser?.id === blog?.writerId;

  const handleDeleteBlog = async () => {
    try {
      await api.delete(`/blogs/${blog.id}`);
      setShowDeleteConfirm(false);
      navigate("/my-blogs");
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  const handleLikeClick = async () => {
    try {
      await toggleLike(blog.id, liked);
      setLiked((prev) => !prev);
      setLikesCount((prev) => prev + (liked ? -1 : 1));
    } catch (err) {
      alert("Error liking/unliking this blog.");
    }
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return "Date unavailable";
    const created = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : `${diff} day${diff > 1 ? "s" : ""} ago`;
  };

  const writerAvatar = blog?.writerAvatar
    ? `http://localhost:8000${blog.writerAvatar}`
    : "/images/userpic.jpg";

  if (loading)
    return (
      <p className="mt-20 font-sans text-gray-500 text-center">Loading...</p>
    );

  if (!blog)
    return (
      <p className="mt-20 font-sans text-gray-500 text-center">
        Blog not found.
      </p>
    );

  return (
    <>
      {showCommentsPanel && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowCommentsPanel(false)}
          />
          <div className="fixed top-0 right-0 z-50">
            <CommentSectionPanel
              blogId={blog.id}
              onClose={() => setShowCommentsPanel(false)}
            />
          </div>
        </>
      )}

      <div className="max-w-3xl mx-auto px-6 py-10 bg-[#fffdf7] min-h-screen font-serif">
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center max-w-xs">
              <p className="text-lg mb-4">
                Are you sure you want to delete this blog?
              </p>
              <div className="flex justify-around">
                <button
                  onClick={handleDeleteBlog}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {canEditOrDelete && (
          <div className="flex justify-end mb-4 text-sm text-gray-500">
            <button
              onClick={() => navigate(`/edit-blog/${blog.id}`)}
              className="mr-4 text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        )}

        <h1 className="text-4xl font-bold text-black mb-5">{blog.title}</h1>

        {/* 👇 Avatar + Username + Date */}
        <div className="flex items-center gap-3 text-gray-600 text-sm mb-4">
          <img
            src={writerAvatar}
            alt="author"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span>@{blog.writerName || "unknown"}</span>
          <span className="mx-1">•</span>
          <span>{timeAgo(blog.createdAt)}</span>
        </div>

        <div className="flex items-center gap-6 text-gray-500 text-sm mb-8 border-b pb-4">
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-red-500"
            onClick={handleLikeClick}
          >
            <i className={`fa${liked ? "s" : "r"} fa-heart text-red-500`}></i>
            <span>
              {likesCount} Like{likesCount !== 1 ? "s" : ""}
            </span>
          </div>
          <button
            onClick={() => setShowCommentsPanel(true)}
            className="flex items-center gap-1 hover:text-black"
          >
            <i className="far fa-comment"></i>
            <span>
              {blog.commentIds?.length || 0} Comment
              {blog.commentIds?.length !== 1 ? "s" : ""}
            </span>
          </button>
        </div>

        {blog.image && (
          <div className="flex justify-center mb-10">
            <img
              src={`http://localhost:8000${blog.image}`}
              alt={blog.title}
              className="rounded-md shadow-md object-cover w-full max-w-3xl max-h-[500px]"
            />
          </div>
        )}

        <div
          className="text-[17px] font-sans leading-8 text-gray-800 mb-16"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </>
  );
}

export default BlogDetailPage;
