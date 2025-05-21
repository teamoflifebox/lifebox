import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import lifeboxBg from '../assets/image.png';
import {
  FiUser, FiHome, FiMapPin, FiMail, FiPhone, FiGlobe,
} from 'react-icons/fi';

const iconMap = {
  fullName: <FiUser />,
  nickName: <FiUser />,
  village: <FiHome />,
  mandal: <FiMapPin />,
  pincode: <FiMapPin />,
  state: <FiMapPin />,
  country: <FiGlobe />,
  recoveryEmail: <FiMail />,
  recoveryMobile: <FiPhone />,
  recoveryName: <FiUser />,
};

const UserDetailsForm = () => {
  const navigate = useNavigate();
  const firstErrorRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    nickName: '',
    village: '',
    mandal: '',
    pincode: '',
    state: '',
    country: '',
    recoveryEmail: '',
    recoveryMobile: '',
    recoveryName: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const upperFields = ['village', 'mandal', 'state', 'country'];
    const newValue = upperFields.includes(name) ? value.toUpperCase() : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const validate = () => {
    const newErrors = {};
    const phonePatternIndia = /^[6-9]\d{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const requiredFields = Object.keys(formData);
    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    }

    ['village', 'mandal', 'state', 'country'].forEach((field) => {
      if (formData[field] && !/^[A-Z\s]+$/.test(formData[field])) {
        newErrors[field] = 'Only uppercase letters allowed';
      }
    });

    if (formData.country === 'INDIA' && formData.recoveryMobile) {
      if (!phonePatternIndia.test(formData.recoveryMobile)) {
        newErrors.recoveryMobile = 'Enter valid 10-digit Indian mobile number';
      }
    }

    if (formData.recoveryEmail && !emailPattern.test(formData.recoveryEmail)) {
      newErrors.recoveryEmail = 'Enter a valid email address';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        if (firstErrorRef.current) firstErrorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitted data:', formData);
      alert('Details submitted successfully!');
      navigate('/special-days');
    } else {
      alert('Please correct the highlighted errors before submitting.');
    }
  };

  return (
    <div className="fixed inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${lifeboxBg})` }}>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[8px] z-0" />

<div className="relative z-10 flex items-center justify-center h-full pt-24">

        <div className="w-full max-w-xl h-[90vh] flex flex-col rounded-3xl bg-white/50 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden">
          <div className="text-center py-4 px-6 flex-none">
            <h2 className="text-3xl font-bold text-blue-800 drop-shadow-lg">Tell us more about you</h2>
          </div>

          <div className="flex-1 overflow-y-auto scroll-hide px-6 pb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {['fullName', 'nickName', 'village', 'mandal', 'pincode', 'state', 'country'].map((field, idx) => (
                  <div key={field} className="relative" ref={idx === 0 ? firstErrorRef : null}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <div className="relative">
                      <span className="input-icon">{iconMap[field]}</span>
                      <input
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        onChange={handleChange}
                        value={formData[field]}
                        className={`input ${errors[field] ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-blue-700 mt-8 mb-4">Account recovery details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {['recoveryEmail', 'recoveryMobile'].map((field) => (
                  <div key={field} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <div className="relative">
                      <span className="input-icon">{iconMap[field]}</span>
                      <input
                        name={field}
                        placeholder={field.replace('recovery', 'Recovery ')}
                        onChange={handleChange}
                        value={formData[field]}
                        className={`input ${errors[field] ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                  </div>
                ))}
                <div className="relative sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recovery Name</label>
                  <div className="relative">
                    <span className="input-icon">{iconMap.recoveryName}</span>
                    <input
                      name="recoveryName"
                      placeholder="Recovery Name"
                      onChange={handleChange}
                      value={formData.recoveryName}
                      className={`input ${errors.recoveryName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.recoveryName && <p className="text-red-500 text-sm mt-1">{errors.recoveryName}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #ccc;
          border-radius: 0.75rem;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          width: 100%;
          transition: all 0.2s ease-in-out;
        }

        .input:focus {
          outline: none;
          border-color: #3b82f6;
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        .input-icon {
          position: absolute;
          top: 50%;
          left: 0.9rem;
          transform: translateY(-50%);
          color: #3b82f6;
          font-size: 1.1rem;
          pointer-events: none;
        }

        .scroll-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scroll-hide::-webkit-scrollbar {
          display: none;
        }

        .input.border-red-500 {
          border-color: #f87171;
        }
      `}</style>
    </div>
  );
};

export default UserDetailsForm;
