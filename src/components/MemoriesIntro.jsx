import React from "react";
import { useNavigate } from "react-router-dom";
import lifeboxBg from "../assets/image.png";

const MemoriesIntro = () => {
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
            🖼️ Digital Memories
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mb-6">
            Welcome to <strong>Digital Memories</strong> by Lifebox NextGen Pvt
            Ltd – your secure, privacy-first vault for preserving and reliving
            life’s most precious moments...
          </p>

          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
            📸 Capture and Store Your Moments
          </h3>
          <ul className="list-none space-y-4 mb-6">
            <li className="text-gray-100">
              <strong>Upload Photos and Videos:</strong> Easily add multimedia
              from your device.
            </li>
            <li className="text-gray-100">
              <strong>Add Personal Notes:</strong> Attach thoughts, emotions, or
              context to your memories.
            </li>
            <li className="text-gray-100">
              <strong>Automatic Timestamps:</strong> Every upload is date-tracked
              for easy recall.
            </li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
            🗂️ Organize with Ease
          </h3>
          <ul className="list-none space-y-4 mb-6">
            <li className="text-gray-100">
              <strong>Categorize Memories:</strong> Group memories like Travel,
              Family, or Hobbies.
            </li>
            <li className="text-gray-100">
              <strong>Create Albums:</strong> Organize by themes like “Summer 2025
              Vacation.”
            </li>
            <li className="text-gray-100">
              <strong>Tag and Filter:</strong> Use custom tags and filters for
              fast lookup.
            </li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
            🔐 Protect Your Memories
          </h3>
          <ul className="list-none space-y-4 mb-6">
            <li className="text-gray-100">
              <strong>End-to-End Encryption:</strong> Only you can access your
              content.
            </li>
            <li className="text-gray-100">
              <strong>Secure Cloud Storage:</strong> Hosted on Lifebox's private
              cloud.
            </li>
            <li className="text-gray-100">
              <strong>Local Backup Option:</strong> Save an encrypted copy to your
              own device.
            </li>
            <li className="text-gray-100">
              <strong>No Data Sharing:</strong> 100% privacy – no third-party
              access.
            </li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
            🌍 Access and Relive Anywhere
          </h3>
          <ul className="list-none space-y-4 mb-6">
            <li className="text-gray-100">
              <strong>Cross-Device Sync:</strong> Instant access on phone, tablet,
              or PC.
            </li>
            <li className="text-gray-100">
              <strong>Offline Mode:</strong> View memories without internet (after
              sync).
            </li>
            <li className="text-gray-100">
              <strong>Search and Sort:</strong> Powerful filters by date, tag, or
              note content.
            </li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
            ✨ Enhance Your Memories
          </h3>
          <ul className="list-none space-y-4 mb-6">
            <li className="text-gray-100">
              <strong>Basic Editing:</strong> Brightness, crop, rotate inside the
              app.
            </li>
            <li className="text-gray-100">
              <strong>Memory Highlights:</strong> Auto-curated “Best of”
              collections.
            </li>
            <li className="text-gray-100">
              <strong>Time Capsules:</strong> Unlock memories in the future for a
              surprise.
            </li>
            <li className="text-gray-100">
              <strong>Professional Edits:</strong> Lifebox crafts cinematic edits
              from your Time Capsules.
            </li>
          </ul>

          <p className="text-base sm:text-lg text-gray-200">
            <strong>Why Choose Digital Memories?</strong>
            <br />
            It’s not just secure storage. It’s a beautiful, organized, and private
            archive of your life. Lifebox gives you the tools to cherish, revisit,
            and protect your most meaningful moments. <br />
            <strong>Start preserving your story today.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoriesIntro;