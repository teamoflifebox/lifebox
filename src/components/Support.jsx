import React, { useState } from 'react';
import backgroundImg from '../assets/image.png'; // optional, use same background as Help

const Support = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! Our team will get back to you shortly.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-0"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-xl mx-4">
        <h1 className="sr-only">Contact Support</h1> {/* Hidden from view but accessible */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white/80 backdrop-blur-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white/80 backdrop-blur-sm"
            required
          />
          <textarea
            name="message"
            placeholder="How can we help you?"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-white/80 backdrop-blur-sm"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
