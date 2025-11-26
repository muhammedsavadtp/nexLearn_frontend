import React from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const PhoneStep = ({ onNext }) => {
  return (
    <div className="flex flex-col h-full justify-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Enter your phone number</h2>
        <p className="text-sm text-gray-500">
          We use your mobile number to identify your account
        </p>
      </div>

      <Input 
        label="Phone number" 
        prefix="🇮🇳 +91" 
        placeholder="1234 567891"
        type="tel"
      />

      <div>
        <p className="text-[10px] text-gray-400 mb-6">
          By tapping Get started, you agree to the <span className="underline cursor-pointer">Terms & Conditions</span>
        </p>
        <Button onClick={onNext}>Get Started</Button>
      </div>
    </div>
  );
};

export default PhoneStep;