import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaIdCard } from 'react-icons/fa';
import backgroundImg from "../assets/image.png";

const CreateFamily = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lifeboxId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkip = () => {
    navigate('/heritage-family');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.lifeboxId) {
      alert("Please fill out all fields.");
      return;
    }

    console.log('Family Created:', formData);
    navigate('/heritage-family');
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center sticky top-0 z-0"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-1">Let’s create a family</h1>
        <h2 className="text-lg text-center text-gray-700 mb-6">Family Details</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              className="input pl-11"
              required
            />
          </div>

          {/* Email */}
          <div className="input-wrapper">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Lifebox Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              className="input pl-11"
              required
            />
          </div>

          {/* Lifebox ID */}
          <div className="input-wrapper">
            <FaIdCard className="input-icon" />
            <input
              type="text"
              name="lifeboxId"
              placeholder="Lifebox ID"
              value={formData.lifeboxId}
              onChange={handleChange}
              autoComplete="off"
              className="input pl-11"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={handleSkip}
              className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition"
            >
              Skip
            </button>
            <button
              type="submit"
              className="w-1/2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition"
            >
              Create Family
            </button>
          </div>
        </form>

        {/* Custom CSS */}
        <style>{`
          .input-wrapper {
            position: relative;
          }
          .input {
            width: 100%;
            padding: 0.75rem 1rem;
            padding-left: 2.75rem;
            border-radius: 0.75rem;
            border: 1px solid #ccc;
            font-size: 1rem;
            background: rgba(255, 255, 255, 0.75); /* Slightly darker */
            color: #1e293b;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease-in-out;
          }
          .input::placeholder {
            color: #64748b;
          }
          .input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
            background: #fff;
          }
          .input-icon {
            position: absolute;
            top: 50%;
            left: 0.9rem;
            transform: translateY(-50%);
            font-size: 1.2rem;
            color: #1e3a8a; /* Darker icon color for visibility */
          }
        `}</style>
      </div>
    </div>
  );
};

export default CreateFamily;
