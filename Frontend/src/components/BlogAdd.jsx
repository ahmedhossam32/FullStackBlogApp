import React from 'react';
import { useNavigate } from 'react-router-dom';

function BlogAdd({ user }) {
  const navigate = useNavigate();

  const handlePostBlog = () => {
    if (!user) {
      alert('Please log in to post a blog.');
      return navigate('/login');
    }
    navigate('/create-blog');
  };

  return (
    <div className="shadow p-4 border border-gray-200 rounded-none font-sans text-gray-700 text-sm text-center">
      <h3 className="mb-3 font-serif font-bold text-black text-md">
        Want to share your thoughts?
      </h3>
      <button
        onClick={handlePostBlog}
        className="bg-transparent hover:bg-black px-4 py-2 border border-gray-400 rounded-none w-full font-semibold text-gray-600 hover:text-white text-sm transition"
      >
        Post a Blog
      </button>
    </div>
  );
}

export default BlogAdd;
