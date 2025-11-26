import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { verifyOtp } from '@/lib/redux/slices/authThunks';

const OtpStep = ({ onNext }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const { mobile } = useSelector((state) => state.auth);

  const handleVerifyOtp = async () => {
    try {
      const result = await dispatch(verifyOtp({ mobile, otp })).unwrap();
      if (result.login) {
        // If the user already exists, we can redirect to the main page
        // For now, let's just go to the next step
        onNext();
      } else {
        onNext();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Enter the code we texted you</h2>
        <p className="text-sm text-gray-500">
          We've sent an SMS to +91 {mobile}
        </p>
      </div>

      <Input 
        label="SMS code" 
        placeholder="123 456" 
        type="text"
        className="tracking-widest" // Makes the numbers spaced out like the design
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <div className="space-y-6">
        <p className="text-xs text-gray-500">
          Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
        </p>
        
        <button className="text-sm font-semibold text-gray-700 underline hover:text-gray-900">
          Resend code
        </button>

        <Button onClick={handleVerifyOtp}>Get Started</Button>
      </div>
    </div>
  );
};

export default OtpStep;