import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/image.png'; // Update the path as needed

const SpecialDaysForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    marriageDate: '',
    spouseName: '',
    spouseDOB: '',
    childrenDetails: '',
    childrenDOB: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    navigate('/create-family'); // ✅ Navigate on submit
  };

  const handleSkip = () => {
    navigate('/create-family'); // ✅ Navigate on skip
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center pt-[20px] flex items-start justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0" />

      <div className="relative z-10 w-full max-w-xl p-6 sm:p-10 mt-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center mb-6">
            Confirm Your Special Days
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">Marriage Date (if married)</label>
              <input
                type="date"
                name="marriageDate"
                value={formData.marriageDate}
                onChange={handleChange}
                className="input"
                placeholder="dd-mm-yyyy"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Spouse Name</label>
              <input
                type="text"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                placeholder="Wife/Husband Name"
                className="input"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Spouse DOB</label>
              <input
                type="date"
                name="spouseDOB"
                value={formData.spouseDOB}
                onChange={handleChange}
                className="input"
                placeholder="dd-mm-yyyy"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Children Details</label>
              <input
                type="text"
                name="childrenDetails"
                value={formData.childrenDetails}
                onChange={handleChange}
                placeholder="Child Name(s)"
                className="input"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">Children DOB</label>
              <input
                type="date"
                name="childrenDOB"
                value={formData.childrenDOB}
                onChange={handleChange}
                className="input"
                placeholder="dd-mm-yyyy"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleSkip}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-6 rounded-xl font-semibold shadow-md transition"
            >
              Skip
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold shadow-md transition"
            >
              Submit
            </button>
          </div>
        </form>

        <style>{`
          .input {
            width: 90%;
            padding: 0.75rem 1rem;
            border: 1px solid #ccc;
            border-radius: 0.75rem;
            font-size: 1rem;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
            transition: all 0.3s ease;
          }
          .input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
            background: white;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SpecialDaysForm;
