import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
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

  const disposableDomains = [
    'tempmail.com', 'mailinator.com', '10minutemail.com',
    'guerrillamail.com', 'yopmail.com', 'fakeinbox.com',
    'throwawaymail.com', 'trashmail.com'
  ];

  const isDisposableEmail = (email) => {
    const domain = email.split('@')[1]?.toLowerCase() || '';
    return disposableDomains.includes(domain);
  };

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

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (isDisposableEmail(email)) {
      setError('Disposable or temporary email addresses are not allowed.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    if (!captchaValue) {
      setError('Please complete the reCAPTCHA.');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email.trim()) {
      setError('Email is already registered.');
      return;
    }

    const user = { name: name.trim(), email: email.trim(), password };
    localStorage.setItem('user', JSON.stringify(user));
    setSuccess('Registration successful! Logging you in...');
    setTimeout(() => {
      navigate('/user-dashboard');
    }, 1000);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setCaptchaValue(null);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => { setIsLogin(true); resetForm(); }}
            className={`px-4 py-2 text-sm font-semibold rounded-l-lg ${
              isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); resetForm(); }}
            className={`px-4 py-2 text-sm font-semibold rounded-r-lg ${
              !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Register
          </button>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          {isLogin ? 'Login to MyApp' : 'Create an Account'}
        </h2>
        <form onSubmit={isLogin ? handleLogin : handleRegister} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-gray-50"
              />
            </div>
          )}
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
          {!isLogin && (
            <>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 hover:bg-gray-50"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    terms and conditions
                  </Link>
                </label>
              </div>
            </>
          )}
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
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;