import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleLike, checkIfLiked } from "../api";

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function BlogCard({ blog, author, currentUser, onDeleteBlog }) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(
    blog.likeIds?.length || blog.likeCount || 0
  );
  const commentCount = blog.commentIds?.length || blog.commentCount || 0;

  useEffect(() => {
    const fetchLiked = async () => {
      if (!blog?.id || !currentUser?.id) return;
      const likedStatus = await checkIfLiked(blog.id);
      setLiked(likedStatus);
    };

    fetchLiked();
  }, [blog?.id, currentUser?.id]);

  const title =
    blog.title.length > 100 ? blog.title.slice(0, 100) + "..." : blog.title;
  const excerpt = stripHtml(blog.content).slice(0, 150) + "...";
  const date = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date unavailable";

  const defaultImage = "/images/post5.png";
  const fullImageUrl = blog.image
    ? `http://localhost:8000${blog.image}`
    : defaultImage;

  const avatarUrl = blog.writerAvatar
    ? `http://localhost:8000${blog.writerAvatar}`
    : "/images/userpic.jpg";

  const handleLikeClick = async (postId) => {
    try {
      await toggleLike(postId, liked);
      const newLiked = !liked;
      setLiked(newLiked);
      setLikesCount((prev) => Math.max(0, prev + (newLiked ? 1 : -1)));
    } catch (err) {
      alert("Error liking/unliking the post.");
    }
  };

  return (
    <div
      onClick={() => navigate(`/blogs/${blog.id}`)}
      className="flex flex-col hover:shadow-md p-5 border border-gray-300 transition cursor-pointer"
    >
      <div className="flex justify-between items-center mb-3 font-serif text-gray-600 text-sm">
        <span>{date}</span>
        <div className="flex items-center gap-2">
          <img
            src={avatarUrl}
            alt="Author Avatar"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs text-gray-500 font-medium">
            @{author?.name || blog.writerName || "unknown"}
          </span>
        </div>
      </div>

      <img
        src={fullImageUrl}
        alt={blog.title}
        className="mb-4 w-full h-48 object-cover rounded"
      />

      <h3 className="mb-2 font-serif font-semibold text-black text-md text-left leading-snug">
        {title}
      </h3>

      <p className="mb-4 font-sans text-gray-700 text-sm text-left leading-relaxed">
        {excerpt}
      </p>

      <span className="font-serif font-medium text-[13px] text-black text-left underline tracking-wide">
        READ MORE
      </span>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-black font-serif text-gray-500 text-xs">
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClick(blog.id);
          }}
          className="flex items-center gap-1 hover:text-red-500 transition cursor-pointer"
        >
          <i className={`fa${liked ? "s" : "r"} fa-heart text-red-500`}></i>
          <span>
            {likesCount} Like{likesCount !== 1 ? "s" : ""}
          </span>
        </div>
        <span>
          <span className="font-semibold text-red-500">{commentCount}</span>{" "}
          Comment{commentCount !== 1 ? "s" : ""}
        </span>
      </div>

      {currentUser?.role === "ADMIN" && onDeleteBlog && (
        <div className="mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteBlog(blog.id);
            }}
            className="text-red-600 hover:text-red-800 text-xs underline"
          >
            Delete Blog
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogCard;
