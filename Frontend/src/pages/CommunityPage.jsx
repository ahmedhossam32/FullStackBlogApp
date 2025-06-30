import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { getUser } from "../utils/auth";
import BlogCard from "../components/BlogCard";
import CommunitySidebar from "../components/CommunitySidebar";

function CommunityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const currentUser = getUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [communitiesRes, postsRes] = await Promise.all([
          api.get("/communities"),
          api.get(`/community-posts/by-community/${id}`),
        ]);

        const comm = communitiesRes.data.find((c) => c.id.toString() === id);
        if (!comm) return;

        setCommunity(comm);
        setBlogs(postsRes.data || []);
      } catch (err) {
        console.error("Error fetching community or posts:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;

    try {
      await api.delete(`/blogs/${blogId}`);
      setBlogs((prev) => prev.filter((b) => b.id !== blogId));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  const handleDeleteCommunity = async () => {
    if (
      !window.confirm("Are you sure you want to delete this entire community?")
    )
      return;

    try {
      await api.delete(`/communities/${id}`);
      navigate("/communities");
    } catch (err) {
      console.error("Failed to delete community:", err);
    }
  };

  if (!community) {
    return (
      <p className="mt-20 text-gray-500 text-center">Community not found.</p>
    );
  }

  return (
    <div className="mx-auto px-6 py-10 max-w-7xl">
      <div className="gap-10 grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-bold text-3xl">r/{community.name}</h1>
            {currentUser?.role === "ADMIN" && (
              <button
                onClick={handleDeleteCommunity}
                className="text-red-600 hover:text-red-800 text-sm underline"
              >
                Delete Community
              </button>
            )}
          </div>

          <h2 className="mb-4 font-semibold text-2xl">Community Posts</h2>
          {blogs.length > 0 ? (
            <div className="flex flex-col gap-6">
              {blogs.map((blog) => (
                <div key={blog.id} className="pb-6 border-b">
                  <BlogCard
                    blog={blog}
                    community={community}
                    author={blog.user}
                    commentCount={blog.comments?.length || 0}
                    currentUser={currentUser}
                    onDeleteBlog={handleDeleteBlog}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts in this community yet.</p>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="top-24 sticky">
            <CommunitySidebar community={community} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
