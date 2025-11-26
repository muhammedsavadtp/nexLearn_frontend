import React from "react";

const PaletteButton = ({ number, status, isActive, onClick }) => {
  const getStyles = () => {
    switch (status) {
      case "attended":
        return "bg-[#4CAF50] text-white border-[#4CAF50]";
      case "not-attended":
        return "bg-[#F44336] text-white border-[#F44336]";
      case "marked":
        return "bg-[#800080] text-white border-[#800080]";
      case "answered-and-marked":
        return "bg-[#800080] text-white border-[#800080] border-b-4 border-b-[#4CAF50]";
      default:
        return "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-full aspect-square flex items-center justify-center text-sm font-medium rounded border
        ${getStyles()}
        ${isActive ? "ring-2 ring-blue-500 ring-offset-1" : ""}
      `}
    >
      {number}
    </button>
  );
};

export default PaletteButton;