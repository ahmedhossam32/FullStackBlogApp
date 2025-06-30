import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import api from "../api";
import { useAuth } from "../context/AuthContext";

function Blog({ setAuthMode }) {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const blogsPerPage = 4;
  const searchRef = useRef(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        const sorted = Array.isArray(res.data)
          ? res.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          : [];
        setBlogs(sorted);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const handleLikeToggle = (blogId) => {
    console.log("TODO: handle like toggle for blog ID", blogId);
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`/blogs/${blogId}`);
      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (page - 1) * blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage
  );

  return (
    <div className="bg-[#fffdf7] mx-auto px-6 py-10 max-w-7xl min-h-screen">
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-5">
        {/* MAIN BLOG LIST */}
        <div className="lg:col-span-4">
          {/* Welcome Message */}
          {currentUser && (
            <div className="mb-4 text-center">
              <h2 className="text-xl font-semibold italic text-black">
                Welcome, {currentUser.name}!
              </h2>
            </div>
          )}

          {/* Section Title & Write Button */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="font-bold text-black text-3xl italic">All Blogs</h1>
            {currentUser && (
              <Link
                to="/create-blog"
                className="flex items-center gap-1 border border-blue-500 px-4 py-2 text-sm text-blue-500 hover:bg-blue-500 hover:text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 11l6-6m2 2l-6 6m0 0H9m3 0v3m0-3h3M4 20h16"
                  />
                </svg>
                Write
              </Link>
            )}
          </div>

          {/* Search */}
          <SearchBar
            searchTerm={searchQuery}
            setSearchTerm={(val) => {
              setSearchQuery(val);
              setPage(1);
            }}
            containerRef={searchRef}
          />

          {/* Blog List */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {paginatedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                community={null}
                author={blog.user}
                currentUser={currentUser}
                onToggleLike={handleLikeToggle}
                commentCount={blog.commentIds?.length || 0}
                onDeleteBlog={
                  currentUser?.role === "ADMIN" ? handleDeleteBlog : null
                }
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            scrollRef={searchRef}
          />
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1">
          <div className="top-24 sticky">
            <Sidebar user={currentUser} setAuthMode={setAuthMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
