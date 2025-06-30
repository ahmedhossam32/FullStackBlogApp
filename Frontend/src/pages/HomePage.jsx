import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../components/AuthModal";

function HomePage() {
  const [authMode, setAuthMode] = useState(null); // 'login' or 'signup'

  const closeModal = () => setAuthMode(null);
  const switchMode = (mode) => setAuthMode(mode);

  return (
    <div className="bg-[#fffdf7] min-h-screen text-gray-900">
      {/* Auth Modal */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={closeModal}
          onSwitchMode={switchMode}
        />
      )}

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-3 border-b text-sm">
        <Link to="/">
          <img
            src="/images/Logo500X500.png"
            alt="Blogies Logo"
            className="w-16 h-20"
          />
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/blogs"
            className="hover:underline underline-offset-2 transition-all"
          >
            Blogs
          </Link>
          <button
            onClick={() => setAuthMode("login")}
            className="hover:underline underline-offset-2 transition-all"
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className="bg-black hover:bg-gray-800 px-4 py-1 rounded-full text-white transition"
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex lg:flex-row flex-col-reverse justify-between items-center ml-10 py-20 pl-16 max-w-full">
        <div className="max-w-xl lg:text-left text-center">
          <h1 className="mb-6 font-extrabold text-7xl leading-tight">
            Inspire.
            <br />
            Express.
            <br />
            Share.
          </h1>
          <p className="mb-6 text-gray-600 text-2xl">
            Where your words find a voice.
          </p>
          <button
            onClick={() => setAuthMode("signup")}
            className="inline-block bg-black hover:bg-gray-800 px-6 py-3 rounded-full font-semibold text-white text-sm transition"
          >
            Start Reading & Writing
          </button>
        </div>

        <div className="mt-12 lg:mt-0">
          <img
            src="/images/hand-drawing.png"
            alt="Hand Drawing"
            className="mx-auto"
            style={{ width: "50rem" }}
          />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
