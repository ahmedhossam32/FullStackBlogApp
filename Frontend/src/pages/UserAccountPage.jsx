import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

function UserAccountPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [searchBlog, setSearchBlog] = useState("");
  const [searchComment, setSearchComment] = useState("");
  const [pageBlog, setPageBlog] = useState(1);
  const [pageComment, setPageComment] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, blogRes, commRes] = await Promise.all([
          api.get("/auth/admin/users"), // will filter manually
          api.get("/blogs"),
          api.get("/communities"),
        ]);

        const matchedUser = userRes.data.find(
          (u) => u.id.toString() === userId
        );
        setUser(matchedUser);

        const blogs = blogRes.data.filter(
          (b) => b.user?.id.toString() === userId
        );
        const comments = blogs.flatMap(
          (b) =>
            b.comments?.map((c) => ({
              ...c,
              blogTitle: b.title,
              blogId: b.id,
            })) || []
        );
        const joined = commRes.data.filter((c) =>
          c.members?.some((m) => m.id.toString() === userId)
        );

        setUserBlogs(blogs);
        setUserComments(comments);
        setUserCommunities(joined);
      } catch (err) {
        console.error("Error loading user account data:", err);
      }
    };

    fetchAll();
  }, [userId]);

  if (!user) {
    return (
      <p className="mt-20 font-sans text-gray-500 text-center">
        User not found.
      </p>
    );
  }

  const filteredBlogs = userBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchBlog.toLowerCase())
  );
  const filteredComments = userComments.filter((c) =>
    c.content.toLowerCase().includes(searchComment.toLowerCase())
  );

  return (
    <div className="mx-auto px-6 py-10 max-w-4xl font-sans text-gray-900">
      <h1 className="mb-6 font-serif font-bold text-3xl">
        {user.name}'s Profile
      </h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <img
          src={user.avatar}
          alt={user.name}
          className="rounded-full w-52 h-52 object-cover"
        />
        <div className="text-center">
          <p className="font-serif font-semibold text-xl">
            {user.name} (@{user.username})
          </p>
          <p className="text-sm">{user.email}</p>
          <p className="text-gray-600 text-sm">
            Age: {user.age} • Role: {user.role}
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="mb-4 font-serif font-semibold text-2xl">
          Joined Communities
        </h2>

        {userCommunities.length > 0 ? (
          <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
            {userCommunities.map((comm) => (
              <Link to={`/communities/${comm.id}`} key={comm.id}>
                <div className="flex justify-center items-center gap-6 hover:shadow p-3 border rounded-full cursor-pointer">
                  <img
                    src={comm.image}
                    alt={comm.name}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <span className="font-serif font-medium">r/{comm.name}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="font-sans text-gray-500">No communities joined.</p>
        )}
      </div>

      <div className="mb-10">
        <h2 className="mb-4 font-serif font-semibold text-2xl">Posts</h2>
        <SearchBar
          searchTerm={searchBlog}
          setSearchTerm={(val) => {
            setSearchBlog(val);
            setPageBlog(1);
          }}
          placeholder="Search their posts..."
        />

        {filteredBlogs.length > 0 ? (
          <>
            <div className="space-y-4">
              {filteredBlogs
                .slice((pageBlog - 1) * perPage, pageBlog * perPage)
                .map((blog) => (
                  <Link to={`/blogs/${blog.id}`} key={blog.id}>
                    <div className="hover:shadow p-4 border rounded cursor-pointer">
                      <h3 className="font-semibold">{blog.title}</h3>
                      <p
                        className="text-gray-600 text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      ></p>
                    </div>
                  </Link>
                ))}
            </div>
            <Pagination
              currentPage={pageBlog}
              totalPages={Math.ceil(filteredBlogs.length / perPage)}
              onPageChange={setPageBlog}
            />
          </>
        ) : (
          <p className="font-sans text-gray-500">No posts written.</p>
        )}
      </div>

      <div>
        <h2 className="mb-4 font-serif font-semibold text-2xl">Comments</h2>
        <SearchBar
          searchTerm={searchComment}
          setSearchTerm={(val) => {
            setSearchComment(val);
            setPageComment(1);
          }}
          placeholder="Search their comments..."
        />

        {filteredComments.length > 0 ? (
          <>
            <div className="flex flex-col gap-6">
              {filteredComments
                .slice((pageComment - 1) * perPage, pageComment * perPage)
                .map((comment) => (
                  <Link
                    to={`/blogs/${comment.blogId}#${comment.id}`}
                    key={comment.id}
                  >
                    <div className="flex flex-col gap-6 hover:shadow p-4 border-b-2 border-black cursor-pointer">
                      <h3 className="font-serif text-black text-md italic">
                        → {comment.blogTitle}
                      </h3>
                      <p className="mb-6 font-sans text-gray-800 text-sm">
                        {comment.content}
                      </p>
                      <div className="text-right">
                        <p className="font-sans text-gray-500 text-xs">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            <Pagination
              currentPage={pageComment}
              totalPages={Math.ceil(filteredComments.length / perPage)}
              onPageChange={setPageComment}
            />
          </>
        ) : (
          <p className="font-sans text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default UserAccountPage;
