import React from "react";
import { useNavigate } from "react-router-dom";
import lifeboxBg from "../assets/image.png";

const DiaryIntro = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center relative before:absolute before:inset-0 before:bg-black/50 before:z-[1]"
      style={{
        backgroundImage: `url(${lifeboxBg})`,
      }}
    >
      <div className="relative z-[2] bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 w-full max-w-2xl mx-4 sm:mx-8 shadow-2xl">
        <div className="mb-6">
          <button
            className="text-white/80 hover:text-white bg-transparent border border-white/50 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-white/20"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            📔 Digital Diary
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mb-6">
            Welcome to the <strong>Digital Diary</strong> by Lifebox NextGen Pvt
            Ltd – your private sanctuary for capturing life’s thoughts,
            reflections, and experiences...
          </p>

          <ul className="list-none space-y-4 mb-6">
            <li className="text-gray-100">
              <strong>Write with Ease:</strong> Create daily entries
              effortlessly, with automatic timestamps to track your memories over
              time.
            </li>
            <li className="text-gray-100">
              <strong>Organize Your Thoughts:</strong> Categorize entries (e.g.,
              personal, work, dreams) for quick retrieval and reflection.
            </li>
            <li className="text-gray-100">
              <strong>Stay Secure:</strong> Every entry is encrypted and stored
              securely, aligning with Lifebox’s privacy-first mission.
            </li>
            <li className="text-gray-100">
              <strong>Access Anytime, Anywhere:</strong> Seamlessly sync your
              diary across devices, so your memories are always at your
              fingertips.
            </li>
          </ul>

          <p className="text-base sm:text-lg text-gray-200">
            Whether you’re journaling a fleeting thought, a cherished moment, or a
            lifelong goal, the Digital Diary empowers you to preserve your story
            with confidence. <br />
            <strong>Start writing today with Lifebox.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiaryIntro;