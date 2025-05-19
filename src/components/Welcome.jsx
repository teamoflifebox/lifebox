import React from "react";
import { Link } from "react-router-dom";
import backgroundImg from "../assets/Lifebox-logo.png";

const HeroSection = () => {
  return (
    <main
      className="h-screen w-full bg-center bg-cover relative flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(0,0,50,0.6)] before:to-[rgba(0,50,100,0.5)] before:z-[1]"
      aria-label="Welcome to LifeBOX NextGen"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="relative z-[2] text-center p-4 sm:p-8 bg-black/40 rounded-2xl backdrop-blur-lg shadow-2xl text-white max-w-[600px]">
        <h1 className="text-4xl sm:text-5xl mb-4 font-bold">
          Welcome to LifeBOX NextGen
        </h1>
        <p className="text-base sm:text-lg mb-8">Your future diary starts here.</p>
        <Link
          to="/home"
          className="px-6 sm:px-8 py-3 text-base bg-blue-600 text-white rounded-lg no-underline hover:bg-blue-700 transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
};

export default HeroSection;
