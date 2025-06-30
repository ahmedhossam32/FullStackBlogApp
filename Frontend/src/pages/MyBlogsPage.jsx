import React, { useEffect, useRef, useState } from "react";
import BlogCard from "../components/BlogCard";
import Sidebar from "../components/Sidebar";
import { getUser } from "../utils/auth";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import api from "../api";

function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const searchRef = useRef(null);

  useEffect(() => {
    const user = getUser();
    setCurrentUser(user);

    if (user) {
      const fetchBlogs = async () => {
        try {
          const res = await api.get("/blogs/user");
          const blogsWithMeta = res.data.map((blog) => ({
            ...blog,
            likeCount: blog.likeIds?.length || 0,
            commentCount: blog.commentIds?.length || 0,
            writerName: blog.writerName || user?.name || "unknown", // ✅ uses DTO field
          }));
          setBlogs(blogsWithMeta);
        } catch (err) {
          console.error("Error loading user blogs:", err);
        }
      };

      fetchBlogs();
    }
  }, []);

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await api.delete(`/blogs/${blogId}`);
      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!currentUser) {
    return (
      <p className="mt-20 text-gray-600 text-center">
        You must be logged in to view your blogs.
      </p>
    );
  }

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / perPage);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="mx-auto px-6 py-10 max-w-7xl font-body text-gray-900">
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-4">
          <h1 className="mb-6 font-serif font-bold text-3xl">
            {currentUser.role === "ADMIN" ? "All Blogs (Admin)" : "My Blogs"}
          </h1>

          <SearchBar
            inputRef={searchRef}
            searchTerm={searchTerm}
            setSearchTerm={(term) => {
              setSearchTerm(term);
              setPage(1);
            }}
          />

          {paginatedBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {paginatedBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    author={{ name: blog.writerName }}
                    currentUser={currentUser}
                    onDeleteBlog={handleDeleteBlog}
                    onToggleLike={() => {}}
                  />
                ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className="text-gray-500">No blogs found.</p>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="top-24 sticky">
            <Sidebar user={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBlogsPage;
