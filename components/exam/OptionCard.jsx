import React from "react";

const OptionCard = ({ label, text, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all
        ${
          isSelected
            ? "border-blue-400 bg-blue-50"
            : "border-gray-200 bg-white hover:bg-gray-50"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-700">{label}.</span>
        <span className="text-gray-800 font-medium">{text}</span>
      </div>

      {/* Radio Circle */}
      <div
        className={`
        w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0
        ${isSelected ? "border-blue-600" : "border-gray-300"}
      `}
      >
        {isSelected && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
      </div>
    </div>
  );
};

export default OptionCard;