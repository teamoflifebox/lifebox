import React, { useState } from "react";
import { Link } from "react-router-dom";
import lifeboxLogo from "../assets/Lifebox-logo.png";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(prev => !prev);

  return (
    <nav className="bg-black/85 text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50 backdrop-blur-md">
      {/* Logo */}
      <Link to="/" className="flex items-center text-2xl font-semibold tracking-wide">
        <img
          src={lifeboxLogo}
          alt="LifeBox Logo"
          className="w-11 h-11 mr-3 rounded-full object-cover shadow-sm"
        />
        LifeBox
      </Link>

      {/* Hamburger (Mobile) */}
      <button
        className="block md:hidden focus:outline-none z-[60]"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <div className="space-y-1 transition-transform duration-300">
          <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${showMenu ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${showMenu ? "opacity-0" : "opacity-100"}`} />
          <span className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${showMenu ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </div>
      </button>

      {/* Menu */}
      <div
        className={`${
          showMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        } md:opacity-100 md:scale-100 md:pointer-events-auto absolute md:static top-16 right-6 md:right-0 bg-black/90 md:bg-transparent p-6 md:p-0 rounded-lg md:rounded-none shadow-xl md:shadow-none transition-all duration-300 ease-in-out md:flex md:items-center z-50`}
      >
        <ul className="space-y-4 md:space-y-0 md:flex md:gap-10 text-lg font-medium tracking-wide">
          {["home", "profile", "services", "contact"].map(page => (
            <li key={page}>
              <Link
                to={`/${page}`}
                onClick={() => setShowMenu(false)}
                className="relative inline-block px-1.5 py-1 transition-colors duration-300 hover:text-cyan-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-cyan-400 after:transition-all after:duration-300 after:rounded"
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
