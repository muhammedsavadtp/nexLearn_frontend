import React from 'react';
import ResponsiveModal from '../ui/ResponsiveModal';

const ParagraphDialog = ({ isOpen, onClose }) => {
  return (
    <ResponsiveModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Comprehensive Paragraph"
      maxWidth="56rem" // Wider for text content
    >
      <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 text-justify">
        <p>
          Ancient Indian history spans several millennia and offers a profound glimpse into the origins of one of the world's oldest and most diverse civilizations. It begins with the Indus Valley Civilization (c. 2500–1500 BCE), which is renowned for its advanced urban planning, architecture, and water management systems.
        </p>
        <p>
          Cities like Harappa and Mohenjo-Daro were highly developed, with sophisticated drainage systems and well-organized streets, showcasing the early brilliance of Indian civilization. The decline of this civilization remains a mystery, but it marks the transition to the next significant phase in Indian history.
        </p>
        <p>
          Following the Indus Valley Civilization, the Vedic Period (c. 1500–600 BCE) saw the arrival of the Aryans in northern India. This period is characterized by the composition of the Vedas, which laid the foundations of Hinduism and early Indian society.
        </p>
        <p>
          It was during this time that the varna system (social hierarchy) began to develop, which later evolved into the caste system. The Vedic Age also witnessed the rise of important kingdoms and the spread of agricultural practices across the region, significantly impacting the social and cultural fabric of ancient India.
        </p>
        <p>
          The 6th century BCE marked a turning point with the emergence of new religious and philosophical movements. Buddhism and Jainism, led by Gautama Buddha and Mahavira, challenged the existing Vedic orthodoxy and offered alternative paths to spiritual enlightenment.
        </p>
      </div>

      <div className="mt-8 flex justify-end">
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