import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/image.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    setSuccess("Account created successfully!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Create LifeBox Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md font-medium transition-colors duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
