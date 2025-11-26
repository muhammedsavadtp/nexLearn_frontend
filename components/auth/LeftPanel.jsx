import React from "react";

const LeftPanel = () => {
  return (
    <div className="hidden md:flex w-full md:w-1/2 flex-col justify-between bg-[#1e293b] p-8 text-white relative overflow-hidden">
      <div className="z-10 w-full flex justify-center pt-5">
        <img
          src="/images/brand.png"
          alt="Brand Logo"
          className="h-20 w-auto object-contain"
        />
      </div>

      {/* Illustration Placeholder */}
      <div className="relative z-10 mt-auto flex justify-center">
        <img
          src="/group.svg"
          alt="Learning Illustration"
          className="w-full max-w-[350px] object-contain drop-shadow-2xl"
        />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] to-[#0f172a] z-0"></div>
    </div>
  );
};

export default LeftPanel;
