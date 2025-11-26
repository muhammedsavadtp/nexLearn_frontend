import React from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const OtpStep = ({ onNext }) => {
  return (
    <div className="flex flex-col h-full justify-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Enter the code we texted you</h2>
        <p className="text-sm text-gray-500">
          We've sent an SMS to +91 1234 567891
        </p>
      </div>

      <Input 
        label="SMS code" 
        placeholder="123 456" 
        type="text"
        className="tracking-widest" // Makes the numbers spaced out like the design
      />

      <div className="space-y-6">
        <p className="text-xs text-gray-500">
          Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
        </p>
        
        <button className="text-sm font-semibold text-gray-700 underline hover:text-gray-900">
          Resend code
        </button>

        <Button onClick={onNext}>Get Started</Button>
      </div>
    </div>
  );
};

export default OtpStep;