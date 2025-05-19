import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/image.png";

const RECAPTCHA_SITE_KEY = "6Ld5Mj4rAAAAAEXD-hziHWTKkv75PqHF0XiURL1j";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!email || !password) {
      setError("Please fill in all fields.");
    } else if (!captchaValue) {
      setError("Please complete the reCAPTCHA.");
    } else if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setSuccess("Login successful!");
      console.log("Logging in:", { email, password });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setError("Account not found.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 sm:p-6 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/60 before:to-black/30 before:backdrop-blur-sm before:z-[1]"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="relative z-[2] bg-white/15 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 w-full max-w-md mx-auto text-center shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Login to LifeBox
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(value) => {
                setCaptchaValue(value);
                setError("");
              }}
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm font-medium">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm font-medium">{success}</p>
          )}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;