"use client";
import React, { useState } from "react";
import LeftPanel from "@/components/auth/LeftPanel";
import PhoneStep from "@/components/auth/steps/PhoneStep";
import OtpStep from "@/components/auth/steps/OtpStep";
import DetailsStep from "@/components/auth/steps/DetailsStep";

const page = () => {
  const [step, setStep] = useState(1);

  // Simple step navigation handler
  const nextStep = () => setStep((prev) => prev + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PhoneStep onNext={nextStep} />;
      case 2:
        return <OtpStep onNext={nextStep} />;
      case 3:
        return <DetailsStep />;
      default:
        return <PhoneStep onNext={nextStep} />;
    }
  };
  return (
    <div className="min-h-screen  w-full bg-auth-bg bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Abstract Background Decoration (Simulating the waves) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[80%] rounded-full bg-blue-900/20 blur-[100px]" />
        <div className="absolute top-[20%] right-[0%] w-[40%] h-[70%] rounded-full bg-blue-800/20 blur-[100px]" />
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-[900px] bg-[#1e293b] rounded-2xl shadow-2xl overflow-hidden flex min-h-[550px] md:p-5">
        {/* Left Side (Illustration) */}
        <LeftPanel />

        {/* Right Side (Forms) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center rounded-md z-10">
          {renderStep()}
        </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] to-[#0f172a] z-0"></div>
      </div>
    </div>
  );
};

export default page;
