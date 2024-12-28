import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../Context/CartManager/CartManager";

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getNavLinkClass = ({ isActive }) =>
    `text-lg text-white inline-block w-max hover:text-gray-300 ${
      isActive ? "border-b-2 border-white" : ""
    }`;

  return (
    <nav className="bg-[#3d1689] shadow-md dark:bg-gray-900">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-0">
          <img
            src="jm.png"
            alt="Logo"
            className="h-15 w-20 mr-2 filter invert brightness-0"
          />
        </div>

        {/* Menu for Large Screens */}
        <div className="hidden md:flex space-x-10">
          <NavLink to="/Byer" className={getNavLinkClass}>
            Buy
          </NavLink>
          <NavLink to="/Seller" className={getNavLinkClass}>
            Sell
          </NavLink>
          <div className="relative">
            <NavLink to="/Cart" className={getNavLinkClass}>
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>
          <button
            onClick={() => {
              onLogout();
            }}
            className="text-lg text-white"
          >
            Logout
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-lg text-white hover:text-gray-300"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-6 py-4 space-y-2">
          <NavLink to="/Byer" className={getNavLinkClass}>
            Buy
          </NavLink>
          <NavLink to="/Seller" className={getNavLinkClass}>
            Sell
          </NavLink>
          <NavLink to="/Cart" className={getNavLinkClass}>
            Cart
          </NavLink>
          <button
            onClick={() => {
              onLogout();
            }}
            className="block w-max text-left text-lg text-white py-2 px-4 border border-white"
          >
            Logout
          </button>
          {/* Dark Mode Toggle for Mobile */}
          <button
            onClick={toggleDarkMode}
            className="block w-max text-left text-lg text-white py-2 px-4 border border-white"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
