import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const toggleLike = async (postId, liked) => {
  const token = localStorage.getItem("token");
  console.log("📌 toggleLike called:", { postId, liked });
  console.log("📌 Token from localStorage:", token);

  try {
    const response = await api({
      method: liked ? "delete" : "post",
      url: `/posts/${postId}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ toggleLike success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ toggleLike failed:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.config?.headers,
      url: error.config?.url,
    });
    throw error;
  }
};

export const checkIfLiked = async (postId) => {
  const token = localStorage.getItem("token");

  try {
    const res = await api.get(`/blogs/${postId}/liked-by-me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.liked;
  } catch (error) {
    console.error("❌ Failed to check liked status:", error);
    return false;
  }
};

export default api;
