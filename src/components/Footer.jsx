import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Dairy', to: '/dairy' },
    { name: 'Library', to: '/library' },
    { name: 'TimeCapsule', to: '/timecapsule' },
    { name: 'Editing', to: '/editing' },
    { name: 'Community', to: '/community' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: 'M21 8.59l-5.787-5.786a1 1 0 00-1.414 0L2 14.586V21h6.414L20.293 9.707a1 1 0 000-1.414z' },
    { name: 'Facebook', href: 'https://facebook.com', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
    { name: 'Instagram', href: 'https://instagram.com', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.326 2.633-1.301 3.608-.975.975-2.242 1.24-3.608 1.301-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.326-3.608-1.301-.975-.975-1.24-2.242-1.301-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.326-2.633 1.301-3.608.975-.975 2.242-1.24 3.608-1.301 1.266-.058 1.646-.07 4.85-.07z' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">MyApp</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering creativity and connection through Dairy, Library, TimeCapsule, Editing, and Community features.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SignUp and Social Media */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Join Us</h3>
              <Link
                to="/signup"
                className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-sm uppercase tracking-wide"
              >
                Sign Up
              </Link>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;