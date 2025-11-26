import React from 'react';

const Button = ({ children, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-lg bg-[#1F2937] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;