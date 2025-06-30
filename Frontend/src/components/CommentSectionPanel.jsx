import React, { useEffect, useState } from "react";
import api from "../api";
import { getUser } from "../utils/auth";

function CommentSectionPanel({ blogId, onClose }) {
  const currentUser = getUser();
  const [allComments, setAllComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/posts/${blogId}/comments`);
      setAllComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchComments();
    }
  }, [blogId]);

  const handlePost = async () => {
    if (!text.trim()) return;
    try {
      await api.post(`/posts/${blogId}/comment`, { content: text });
      setText("");
      fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleEditSave = async (commentId, newContent) => {
    try {
      await api.put(`/posts/comments/${commentId}`, { content: newContent });
      setEditingId(null);
      fetchComments();
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/comments/${deletingId}`);
      setDeletingId(null);
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-[420px] h-full bg-white shadow-lg z-50 border-l border-gray-300 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Responses</h2>
        <button onClick={onClose}>
          <i className="fas fa-times text-gray-600 hover:text-black"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {allComments.map((comment) => {
          const avatar = comment.user?.profileImage
            ? `http://localhost:8000${comment.user.profileImage}`
            : "/images/userpic.jpg";

          return (
            <div key={comment.id} className="text-sm border-b pb-4 relative">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">
                    {comment.user?.name || comment.user?.username || "Unknown"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="ml-auto">
                  <button
                    className="text-gray-400 hover:text-black"
                    onClick={() => {
                      if (currentUser?.id === comment.user?.id) {
                        setEditingId(
                          editingId === comment.id ? null : comment.id
                        );
                      } else {
                        alert("Reported. Thank you!");
                      }
                    }}
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>

              {editingId === comment.id ? (
                <div className="mt-2">
                  <textarea
                    defaultValue={comment.content}
                    onBlur={(e) => handleEditSave(comment.id, e.target.value)}
                    className="w-full border p-2 text-sm rounded"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2 mt-2 text-xs">
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                    <button
                      className="text-red-500"
                      onClick={() => setDeletingId(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 ml-11">{comment.content}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t">
        <textarea
          placeholder="What are your thoughts?"
          className="w-full border p-2 text-sm rounded resize-none"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="mt-2 w-full bg-black text-white py-2 rounded hover:bg-gray-800 text-sm font-semibold"
        >
          Post Comment
        </button>
      </div>

      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm">
            <p className="mb-4 text-sm">Delete this comment permanently?</p>
            <div className="flex justify-end gap-2 text-sm">
              <button onClick={() => setDeletingId(null)}>Cancel</button>
              <button className="text-red-600" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentSectionPanel;
