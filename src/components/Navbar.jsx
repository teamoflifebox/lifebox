import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import lifeboxLogo from "../assets/Lifebox-logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = ["help", "support"];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0f172a]/80 to-[#1e293b]/80 backdrop-blur-lg shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center text-2xl font-bold text-cyan-300 tracking-wider drop-shadow-lg">
          <img
            src={lifeboxLogo}
            alt="LifeBox Logo"
            className="w-10 h-10 mr-3 rounded-full object-cover shadow-md"
          />
          LifeBox
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-10 text-base font-medium text-white">
          {navLinks.map((page) => {
            const path = `/${page}`;
            const isActive = location.pathname === path;

            return (
              <li key={page} className="relative group">
                <Link
                  to={path}
                  className={`transition duration-300 ${
                    isActive ? "text-cyan-400" : "text-white hover:text-cyan-300"
                  }`}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-full ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </li>
            );
          })}
        </ul>

        {/* Hamburger Menu Icon */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none z-50"
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] bg-[#0f172a] text-white shadow-lg backdrop-blur-md p-6 pt-24 z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="space-y-6 text-lg font-semibold tracking-wide">
          {navLinks.map((page) => {
            const path = `/${page}`;
            const isActive = location.pathname === path;

            return (
              <li key={page}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`block transition duration-300 ${
                    isActive ? "text-cyan-400" : "hover:text-cyan-300"
                  }`}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
