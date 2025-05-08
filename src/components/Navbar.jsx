"use client";

import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("Home");

  const navItems = [
    "Home",
    "Listings",
    "Property",
    "About Us",
    "Admin",
    "Contact",
  ];

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <svg
          className="w-6 h-6 text-[#0F1C46]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2L2 7v11h6v-5h4v5h6V7l-8-5z" />
        </svg>
        <span className="text-xl font-sans font-extrabold text-gray-800">
          <div className="text-2xl font-bold text-yellow-400">
            RA<span className="text-[#0F1C46]">Group</span> •
          </div>
        </span>
      </div>

      <div className="space-x-6 flex items-center">
        {navItems.map((label) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`relative text-gray-700 font-medium transition-all duration-200 hover:text-indigo-900
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-400
              after:transition-all after:duration-300
              ${
                active === label
                  ? "text-indigo-900 after:w-full"
                  : "after:w-0 hover:after:w-full"
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
