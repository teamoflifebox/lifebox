import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/image.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const disposableDomains = [
    "tempmail.com", "mailinator.com", "10minutemail.com",
    "guerrillamail.com", "yopmail.com", "fakeinbox.com",
    "throwawaymail.com", "trashmail.com"
  ];

  const isDisposableEmail = (email) => {
    const domain = email.split("@")[1]?.toLowerCase() || "";
    return disposableDomains.includes(domain);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (isDisposableEmail(email)) {
      setError("Disposable or temporary email addresses are not allowed.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    setSuccess("Account created successfully!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-30 w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-6 before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/60 before:to-black/30 before:backdrop-blur-sm before:z-[1]"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="relative z-[2] bg-white/15 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md mx-auto text-center shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Create LifeBox Account
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4 text-left">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center text-white text-sm gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="terms" className="text-white">
              I agree to the{" "}
              <a href="/terms" className="underline text-blue-300" target="_blank" rel="noopener noreferrer">
                terms and conditions
              </a>
            </label>
          </div>
          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
          {success && <p className="text-green-400 text-sm font-medium">{success}</p>}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
