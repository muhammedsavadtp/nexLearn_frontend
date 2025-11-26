import React from 'react';
import ResponsiveModal from '../ui/ResponsiveModal';
import { Clock, HelpCircle, FileText, Bookmark } from 'lucide-react';

const StatRow = ({ icon: Icon, colorClass, label, value }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3">
      <div className={`p-1.5 rounded-md text-white ${colorClass}`}>
        <Icon size={18} />
      </div>
      <span className="text-gray-600 font-medium text-sm md:text-base">{label}:</span>
    </div>
    <span className="font-bold text-gray-900">{value}</span>
  </div>
);

const SubmitDialog = ({ isOpen, onClose }) => {
  return (
    <ResponsiveModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Are you sure you want to submit the test?"
      maxWidth="40rem"
    >
      <div className="space-y-1 mb-6">
        <StatRow 
          icon={Clock} 
          colorClass="bg-[#1e293b]" // Dark Blue
          label="Remaining Time" 
          value="87:13" 
        />
        <StatRow 
          icon={FileText} 
          colorClass="bg-[#eab308]" // Yellow
          label="Total Questions" 
          value="100" 
        />
        <StatRow 
          icon={HelpCircle} 
          colorClass="bg-[#22c55e]" // Green
          label="Questions Answered" 
          value="003" 
        />
        <StatRow 
          icon={Bookmark} 
          colorClass="bg-[#9333ea]" // Purple
          label="Marked for review" 
          value="001" 
        />
      </div>

      <button 
        className="w-full bg-[#1F2937] hover:bg-[#111827] text-white py-3 rounded-lg font-semibold transition-colors shadow-lg"
        onClick={() => alert("Test Submitted!")}
      >
        Submit Test
      </button>
    </ResponsiveModal>
  );
};

export default SubmitDialog;