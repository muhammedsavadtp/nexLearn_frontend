import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between relative shadow-sm z-20">
      <div className="md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
        <img
          src="/images/brand-colored.png"
          alt="NexLearn Logo"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className="w-20 hidden md:block"></div>

      <button className="ml-auto bg-[#237c95] hover:bg-[#1b6276] text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
