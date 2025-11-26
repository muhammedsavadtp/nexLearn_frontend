import React from 'react';

const Input = ({ label, type = "text", value, onChange, placeholder, prefix, className }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500 transition-all">
        {label}
      </label>
      <div className="flex items-center w-full rounded-md border border-gray-300 bg-white px-3 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        {prefix && <span className="mr-2 text-gray-500 font-medium text-nowrap">{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent p-0 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Input;