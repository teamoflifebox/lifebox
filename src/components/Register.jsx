import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/image.png";
import "./Form.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

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

  const checkPasswordStrength = (pwd) => {
    if (pwd.length < 6) return "Weak";
    const hasLetters = /[a-zA-Z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    if (pwd.length >= 8 && hasLetters && hasNumbers && hasSymbols) return "Strong";
    if (hasLetters && hasNumbers) return "Medium";
    return "Weak";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);

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

    if (strength === "Weak") {
      setError("Password is too weak. Use letters, numbers, and symbols.");
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
      className="hero-section"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="form-container">
        <h2>Create LifeBox Account</h2>
        <form onSubmit={handleRegister} className="login-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrength(checkPasswordStrength(e.target.value));
            }}
            required
          />
          {password && (
            <p className={`strength ${passwordStrength.toLowerCase()}`}>
              Password Strength: {passwordStrength}
            </p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                terms and conditions
              </a>
            </label>
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
