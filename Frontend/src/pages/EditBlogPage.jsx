import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import api from "../api";
import { Editor } from "@tinymce/tinymce-react";

function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getUser();

  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        const found = res.data;
        if (
          !currentUser ||
          (found.writerId !== currentUser.id && currentUser.role !== "ADMIN")
        ) {
          return navigate(`/blogs/${id}`);
        }

        setBlog(found);
        setTitle(found.title);
        setContent(found.content);
        setCurrentImage(found.image || "");
        setPreviewImage(
          found.image ? `http://localhost:8000${found.image}` : ""
        );
      } catch (err) {
        console.error("Error loading blog:", err);
        navigate("/blogs");
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPreviewImage(localUrl);
      setNewImageFile(file);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    let finalImageUrl = currentImage;

    try {
      if (newImageFile) {
        const formData = new FormData();
        formData.append("image", newImageFile);

        const uploadRes = await api.post("/blogs/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        finalImageUrl = uploadRes.data;
      }

      await api.put(`/blogs/${id}`, {
        title,
        content,
        image: finalImageUrl,
      });

      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("Failed to update blog.");
    }
  };

  if (!blog)
    return <p className="mt-20 text-gray-500 text-center">Loading blog...</p>;

  return (
    <div className="mx-auto px-6 py-10 max-w-3xl font-body text-gray-900">
      <h1 className="mb-6 font-serif font-bold text-3xl text-center">
        Edit Blog Post
      </h1>

      <label className="block mb-2 font-sans font-medium">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-3 border border-black rounded w-full font-body text-gray-800 text-sm"
        placeholder="Enter blog title"
      />

      <label className="block mb-2 font-sans font-medium">
        Upload New Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {previewImage && (
        <div className="mb-4">
          <p className="text-sm italic mb-1">Current Image Preview</p>
          <img
            src={previewImage}
            alt="Preview"
            className="rounded w-full h-60 object-cover"
          />
        </div>
      )}

      {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}

      <label className="block mb-2 font-sans font-medium">Content</label>
      <Editor
        apiKey="5hp921fgsfdzfbdr3td0isf0dygta9y12tmv1gukflmyjspz"
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 400,
          menubar: false,
          plugins:
            "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste help wordcount",
          toolbar:
            "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | preview code",
          file_picker_types: "image",
        }}
      />

      <button
        onClick={handleSave}
        className="bg-black hover:bg-gray-800 mt-6 px-4 py-2 rounded-none w-full font-serif font-semibold text-white text-sm transition"
      >
        Save Changes
      </button>
    </div>
  );
}

export default EditBlogPage;
