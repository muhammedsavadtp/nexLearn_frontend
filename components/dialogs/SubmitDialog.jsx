import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { submitExam } from '@/lib/redux/slices/examThunks';
import ResponsiveModal from '../ui/ResponsiveModal';
import { Clock, HelpCircle, FileText, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast'; // Import toast

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

const SubmitDialog = ({ 
  isOpen, 
  onClose,
  answers = {},
  questions = [],
  markedForReview = [],
  timeRemaining = 0 
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate stats
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const markedForReviewCount = markedForReview.length;

  // Format time
  const formatTime = (seconds) => {
    if (seconds < 0) seconds = 0;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(submitExam(answers)).unwrap();
      router.push('/result');
    } catch (error) {
      console.error("Failed to submit exam:", error);
      if (typeof error === 'string' && error.startsWith("Missing answers for questions:")) {
        toast.error(error); // Display specific error message
      } else {
        toast.error("Failed to submit exam. Please try again."); // Generic error message
      }
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

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
          value={formatTime(timeRemaining)} 
        />
        <StatRow 
          icon={FileText} 
          colorClass="bg-[#eab308]" // Yellow
          label="Total Questions" 
          value={totalQuestions} 
        />
        <StatRow 
          icon={HelpCircle} 
          colorClass="bg-[#22c55e]" // Green
          label="Questions Answered" 
          value={answeredQuestions.toString().padStart(3, "0")} 
        />
        <StatRow 
          icon={Bookmark} 
          colorClass="bg-[#9333ea]" // Purple
          label="Marked for review" 
          value={markedForReviewCount.toString().padStart(3, "0")} 
        />
      </div>

      <button 
        className="w-full bg-[#1F2937] hover:bg-[#111827] text-white py-3 rounded-lg font-semibold transition-colors shadow-lg disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Test"}
      </button>
    </ResponsiveModal>
  );
};

export default SubmitDialog;