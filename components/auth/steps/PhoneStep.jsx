import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { sendOtp } from '@/lib/redux/slices/authThunks';
import { setMobile as setMobileAction } from '@/lib/redux/slices/authSlice';

const PhoneStep = ({ onNext }) => {
  const [mobile, setMobile] = useState('');
  const dispatch = useDispatch();

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      const formData = new FormData();
      formData.append('mobile', `+91${mobile}`);
      dispatch(setMobileAction(`+91${mobile}`));
      dispatch(sendOtp(formData));
      onNext();
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

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
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <div>
        <p className="text-[10px] text-gray-400 mb-6">
          By tapping Get started, you agree to the <span className="underline cursor-pointer">Terms & Conditions</span>
        </p>
        <Button onClick={handleSendOtp}>Get Started</Button>
      </div>
    </div>
  );
};

export default PhoneStep;