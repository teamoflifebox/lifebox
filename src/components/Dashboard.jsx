import React from "react";
import { useNavigate } from "react-router-dom";
import lifeboxBg from "../assets/image.png";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center font-sans"
      style={{
        backgroundImage: `url(${lifeboxBg})`,
      }}
    >
      <div className="bg-white/15 rounded-3xl p-6 sm:p-10 w-full max-w-[85%] md:max-w-[900px] backdrop-blur-2xl shadow-2xl text-white text-center animate-fadeInUp">
        <h1 className="text-3xl sm:text-5xl font-bold mb-2">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            LifeBox Notion
          </span>
        </h1>
        <p className="text-base sm:text-lg mb-8 text-gray-200">
          Explore how you want to remember...
        </p>

        <div className="flex gap-5 justify-center flex-wrap">
          <div className="bg-white/10 border border-white/30 rounded-2xl p-5 w-full sm:w-[280px] text-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-100">
            <h2 className="mb-2 text-lg font-semibold">📔 Digital Diary</h2>
            <p className="text-sm mb-4 text-gray-300">
              Capture your thoughts, emotions, and life journey through notes,
              pictures, and videos.
            </p>
            <button
              className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-400 transition-colors duration-300"
              onClick={() => navigate("/diary-info")}
            >
              Explore Digital Diary
            </button>
          </div>

          <div className="bg-white/10 border border-white/30 rounded-2xl p-5 w-full sm:w-[280px] text-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-100">
            <h2 className="mb-2 text-lg font-semibold">🖼️ Digital Memories</h2>
            <p className="text-sm mb-4 text-gray-300">
              Organize your life through pictures, videos, and voice notes. Store
              your highlights beautifully.
            </p>
            <button
              className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-400 transition-colors duration-300"
              onClick={() => navigate("/memories-info")}
            >
              Explore Digital Memories
            </button>
          </div>
        </div>

        <button
          className="mt-8 bg-transparent border border-white/50 text-white/80 px-5 py-2 rounded-full text-sm hover:bg-white/20 transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          Skip Introduction
        </button>
      </div>
    </div>
  );
};

export default Dashboard;