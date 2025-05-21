import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImg from "../assets/Lifebox-logo.png";

const HeroSection = () => {
  // Disable scrolling when Hero is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Re-enable on unmount
    };
  }, []);

  return (
    <main
      className="fixed inset-0 w-full h-screen bg-center bg-cover flex items-center justify-center z-40 before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(0,0,50,0.6)] before:to-[rgba(0,50,100,0.5)] before:z-10"
      style={{ backgroundImage: `url(${backgroundImg})` }}
      aria-label="Welcome to LifeBOX NextGen"
    >
      <div className="relative z-20 text-center p-6 sm:p-10 bg-black/50 rounded-2xl backdrop-blur-lg shadow-2xl text-white max-w-lg mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to LifeBOX NextGen
        </h1>
        <p className="text-lg sm:text-xl mb-6">Your future diary starts here.</p>
        <Link
          to="/home"
          className="inline-block px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 text-base font-medium"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
};

export default HeroSection;
