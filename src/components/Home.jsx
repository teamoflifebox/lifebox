import React from "react";
import { useNavigate } from "react-router-dom";
import lifeboxBg from "../assets/image.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full relative flex justify-center items-center overflow-hidden p-4 sm:p-6 bg-cover bg-center bg-no-repeat animate-backgroundZoom before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/60 before:to-black/30 before:backdrop-blur-sm before:z-[1]"
      style={{
        backgroundImage: `url(${lifeboxBg})`,
      }}
    >
      <div className="relative z-[2] bg-white/15 border border-white/20 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 md:p-16 text-center shadow-2xl w-full max-w-[600px] mx-4 sm:mx-6 animate-fadeInUp">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-cyan-400 to-pink-500 bg-[length:800%_800%] bg-clip-text text-transparent animate-gradientShift mb-3">
          Welcome to LifeBox Diary
        </h1>
        <p className="text-base sm:text-lg font-medium text-gray-100 drop-shadow-md mb-8 animate-fadeIn">
          Preserve Your Memories in Style
        </p>
        <div className="flex justify-center gap-6 sm:gap-7 flex-wrap animate-popIn md:flex-col md:gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 sm:px-9 py-3 text-sm sm:text-base font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 sm:px-9 py-3 text-sm sm:text-base font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;