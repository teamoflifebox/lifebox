import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBirthdayCake, FaEnvelope, FaIdCard } from 'react-icons/fa';
import backgroundImg from "../assets/image.png";

const HeritageForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lifeboxId: '',
    name: '',
    dob: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkip = () => {
    navigate('/dashboard'); // Update if route differs
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
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-1">
          Let we create a
        </h1>
        <h2 className="text-xl font-semibold text-center text-blue-800 mb-6">
          Heritage
        </h2>

        <div className="space-y-4">
          {/* LifeBox ID */}
          <div className="relative">
            <FaIdCard className="input-icon" />
            <input
              type="text"
              name="lifeboxId"
              placeholder="LifeBox ID"
              value={formData.lifeboxId}
              onChange={handleChange}
              className="input pl-10"
            />
          </div>

          {/* Name */}
          <div className="relative">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Person Name"
              value={formData.name}
              onChange={handleChange}
              className="input pl-10"
            />
          </div>

          {/* DOB */}
          <div className="relative">
            <FaBirthdayCake className="input-icon" />
            <input
              type="date"
              name="dob"
              placeholder="DOB"
              value={formData.dob}
              onChange={handleChange}
              className="input pl-10"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Mail ID"
              value={formData.email}
              onChange={handleChange}
              className="input pl-10"
            />
          </div>
        </div>

        <button
          onClick={handleSkip}
          className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition"
        >
          Skip
        </button>

        <style>{`
          .input {
            width: 100%;
            padding: 0.75rem;
            border-radius: 0.75rem;
            border: 1px solid #ccc;
            font-size: 1rem;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(5px);
            transition: 0.3s;
          }
          .input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
            background: #fff;
          }
          .input-icon {
            position: absolute;
            top: 50%;
            left: 12px;
            transform: translateY(-50%);
            color: #3b82f6;
          }
        `}</style>
      </div>
    </div>
  );
};

export default HeritageForm;
