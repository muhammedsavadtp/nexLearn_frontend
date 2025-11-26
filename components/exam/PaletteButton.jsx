import React from 'react';

const PaletteButton = ({ number, status }) => {
  // Status logic to match the visual language
  const getStyles = () => {
    switch(status) {
      case 'attended': return 'bg-[#4CAF50] text-white border-[#4CAF50]'; // Green
      case 'not-attended': return 'bg-[#F44336] text-white border-[#F44336]'; // Red
      case 'marked': return 'bg-[#800080] text-white border-[#800080]'; // Purple
      case 'marked-answered': return 'bg-[#800080] text-white border-[#4CAF50] border-b-4'; // Complex visual (simplified for css)
      default: return 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'; // Default
    }
  };

  return (
    <button className={`
      w-full aspect-square flex items-center justify-center text-sm font-medium rounded border
      ${getStyles()}
    `}>
      {number}
    </button>
  );
};

export default PaletteButton;