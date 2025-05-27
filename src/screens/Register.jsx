import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!captchaValue) {
      setError('Please complete the reCAPTCHA.');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      setError('No registered account found. Please register first.');
      return;
    }

    if (storedUser.email !== trimmedEmail || storedUser.password !== password) {
      setError('Incorrect email or password.');
      return;
    }

    setSuccess('Login successful!');
    setTimeout(() => {
      navigate('/user-dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Login to MyApp
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-gray-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-gray-50"
            />
          </div>
          <div className="flex justify-center">
            {RECAPTCHA_SITE_KEY ? (
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={(value) => {
                  setCaptchaValue(value);
                  setError('');
                }}
              />
            ) : (
              <p className="text-red-600 text-sm font-medium">
                reCAPTCHA site key missing in environment.
              </p>
            )}
          </div>
          {error && (
            <p className="text-red-600 text-sm font-medium text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm font-medium text-center">{success}</p>
          )}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold uppercase tracking-wide hover:bg-blue-700 transition-colors duration-200 active:scale-95"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;