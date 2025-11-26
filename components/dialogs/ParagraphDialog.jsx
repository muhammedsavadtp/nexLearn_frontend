import React from 'react';
import ResponsiveModal from '../ui/ResponsiveModal';

const ParagraphDialog = ({ isOpen, onClose, paragraph }) => {
  return (
    <ResponsiveModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Comprehensive Paragraph"
      maxWidth="56rem" 
    >
      <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 text-justify">
        <p>{paragraph}</p>
      </div>

      <div className="mt-8 hidden md:flex justify-end">
        <button 
          className="bg-[#1F2937] hover:bg-[#111827] text-white px-8 py-2.5 rounded-lg font-medium transition-colors"
          onClick={onClose}
        >
          Minimize
        </button>
      </div>
    </ResponsiveModal>
  );
};

export default ParagraphDialog;