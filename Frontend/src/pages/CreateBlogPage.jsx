import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUser } from "../utils/auth";
import { Editor } from "@tinymce/tinymce-react";
import api from "../api";

function CreateBlogPage() {
  const navigate = useNavigate();
  const currentUser = getUser();
  const [searchParams] = useSearchParams();
  const communityId = searchParams.get("communityId");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // Actual file
  const [imagePreview, setImagePreview] = useState(""); // For preview
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await api.post("/blogs/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data; // /uploads/filename.jpg
  };

  const handleCreate = async () => {
    if (!currentUser) {
      alert("Please log in to post a blog.");
      return navigate("/login");
    }

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage();
      }

      await api.post("/blogs", {
        title,
        content,
        imageUrl,
        type: communityId ? "community" : "public",
        communityId: communityId || null,
      });

      navigate(communityId ? `/communities/${communityId}` : "/my-blogs");
    } catch (err) {
      setError("Failed to create blog.");
      console.error("Error creating blog:", err);
    }
  };

  return (
    <div className="mx-auto px-6 py-10 max-w-3xl font-body text-gray-900">
      <h1 className="mb-6 font-serif font-bold text-3xl text-center">
        {communityId ? `Post in r/...` : "Post in Public"}
      </h1>

      {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}

      <label className="block mb-2 font-sans font-medium">Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-3 border border-black rounded w-full font-body text-gray-800 text-sm"
        placeholder="Enter blog title"
      />

      <label className="block mb-2 font-sans font-medium">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-2"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mb-4 rounded w-full h-60 object-cover"
        />
      )}

      <label className="block mb-2 font-sans font-medium">Content</label>
      <Editor
        apiKey="5hp921fgsfdzfbdr3td0isf0dygta9y12tmv1gukflmyjspz"
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            "advlist autolink lists link image imagetools media emoticons charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime table paste help wordcount",
          ],
          toolbar:
            "undo redo | formatselect fontselect fontsizeselect | " +
            "bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image media emoticons charmap | preview code",
        }}
      />

      <button
        onClick={handleCreate}
        className="bg-black hover:bg-gray-800 mt-6 px-4 py-2 rounded-none w-full font-serif font-semibold text-white text-sm transition"
      >
        Post Blog
      </button>
    </div>
  );
}

export default CreateBlogPage;
