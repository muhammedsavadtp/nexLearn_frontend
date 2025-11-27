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
        return "bg-[#800080] text-white border-[#800080] relative overflow-hidden";
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
      {status === "answered-and-marked" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4/5 h-4/5 bg-[#4CAF50] rounded-[2px]"></div>
        </div>
      )}

      <span className="relative z-10">{number}</span>
    </button>
  );
};

export default PaletteButton;
