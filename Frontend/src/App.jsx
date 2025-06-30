import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { AuthProvider } from "./context/AuthContext";

// Components
import NotificationToast from "./components/NotificationToast";
import AuthModal from "./components/AuthModal";
import Header from "./components/Header";

// Pages
import HomePage from "./pages/HomePage";
import MyBlogsPage from "./pages/MyBlogsPage";
import AccountPage from "./pages/AccountPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import CommunityPage from "./pages/CommunityPage";
import EditBlogPage from "./pages/EditBlogPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import UserAccountPage from "./pages/UserAccountPage";
import Blog from "./pages/Blogs";

function AppContent({ setAuthMode }) {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Header setAuthMode={setAuthMode} />}
      <NotificationToast />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<Blog setAuthMode={setAuthMode} />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/my-blogs" element={<MyBlogsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/communities/:id" element={<CommunityPage />} />
        <Route path="/edit-blog/:id" element={<EditBlogPage />} />
        <Route path="/create-blog" element={<CreateBlogPage />} />
        <Route path="/account/:userId" element={<UserAccountPage />} />
      </Routes>
    </div>
  );
}

function App() {
  const [authMode, setAuthMode] = useState(null);

  return (
    <div className="bg-[#fffdf7] min-h-screen">
      <Router>
        <AuthProvider>
          <AppContent setAuthMode={setAuthMode} />
          {authMode && (
            <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
          )}
          <ToastContainer position="bottom-right" />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
