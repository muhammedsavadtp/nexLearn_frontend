import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { verifyOtp, sendOtp } from '@/lib/redux/slices/authThunks'; 
import toast from 'react-hot-toast';

const OtpStep = ({ onNext }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const { mobile, loading } = useSelector((state) => state.auth);

  const handleVerifyOtp = async () => {
    try {
      const result = await dispatch(verifyOtp({ mobile, otp })).unwrap();
      if (result.login) {
        onNext();
      } else {
        onNext();
      }
    } catch (error) {
      toast.error(error.message || "OTP verification failed");
    }
  };

  const handleResendOtp = () => {
    const formData = new FormData();
    formData.append('mobile', mobile);
    dispatch(sendOtp(formData));
    toast.success('OTP Resent!');
  };

  return (
    <div className="flex flex-col h-full justify-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Enter the code we texted you</h2>
        <p className="text-sm text-gray-500">
          We've sent an SMS to  {mobile}
        </p>
      </div>

      <Input 
        label="SMS code" 
        placeholder="123 456" 
        type="text"
        className="tracking-widest" 
        value={otp}
        onChange={(e) => setOtp(e.target.value.slice(0, 6))}
        maxLength={6}
      />

      <div className="space-y-6">
        <p className="text-xs text-gray-500">
          Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
        </p>
        
        <button
          onClick={handleResendOtp}
          className="text-sm font-semibold text-gray-700 underline hover:text-gray-900"
        >
          Resend code
        </button>

        <Button onClick={handleVerifyOtp} disabled={otp.length !== 6 || loading} loading={loading}>Get Started</Button>
      </div>
    </div>
  );
};

export default OtpStep;