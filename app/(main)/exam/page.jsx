"use client";
import React, { useState } from "react";
import { Clock, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import OptionCard from "@/components/exam/OptionCard";
import PaletteButton from "@/components/exam/PaletteButton";
import ParagraphDialog from "@/components/dialogs/ParagraphDialog";
import SubmitDialog from "@/components/dialogs/SubmitDialog";

const ExamInterface = () => {
  const [selectedOption, setSelectedOption] = useState("B");
  const [isParagraphOpen, setIsParagraphOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Mock data for the palette (simulating the state in the screenshot)
  const getQuestionStatus = (num) => {
    if (num === 1 || num === 3 || num === 4 || num === 5 || num === 7)
      return "attended"; // Green
    if (num === 2) return "not-attended"; // Red
    if (num === 6) return "marked"; // Purple
    return "default";
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-6 font-sans">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* ================= LEFT COLUMN: Question Area ================= */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Header Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center border-b border-gray-200">
            <h1 className="font-bold text-gray-800">
              Ancient Indian History MCQ
            </h1>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm font-semibold border border-gray-200">
              01/100
            </span>
          </div>

          {/* Question Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm flex-1 flex flex-col border border-gray-200">
            {/* Context Button */}
            <button
              onClick={() => setIsParagraphOpen(true)}
              className="self-start flex items-center gap-2 bg-[#237c95] hover:bg-[#1b6276] text-white px-4 py-2 rounded mb-6 text-sm font-medium transition-colors"
            >
              <img
                src="/images/ArticleNyTimes.png"
                alt="Doc Icon"
                className="w-4 h-4 object-contain"
              />
              Read Comprehensive Paragraph
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            {/* Question Text */}
            <div className="mb-6">
              <h2 className="text-gray-900 font-medium text-lg mb-4">
                1. Identify the site shown in the image below, which is one of
                the major urban centers of the Indus Valley Civilization.
              </h2>

              {/* Image Placeholder */}
              <div className="w-full max-w-md h-48 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Stupa_of_Mohenjo-daro.jpg/1200px-Stupa_of_Mohenjo-daro.jpg"
                  alt="Indus Valley Ruin"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-gray-500 text-sm mb-3">Choose the answer:</div>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              <OptionCard
                label="A"
                text="Pataliputra"
                isSelected={selectedOption === "A"}
                onClick={() => setSelectedOption("A")}
              />
              <OptionCard
                label="B"
                text="Harappa"
                isSelected={selectedOption === "B"}
                onClick={() => setSelectedOption("B")}
              />
              <OptionCard
                label="C"
                text="Mohenjo-Daro"
                isSelected={selectedOption === "C"}
                onClick={() => setSelectedOption("C")}
              />
              <OptionCard
                label="D"
                text="Lothal"
                isSelected={selectedOption === "D"}
                onClick={() => setSelectedOption("D")}
              />
            </div>

            {/* Footer Actions */}
            <div className="mt-auto flex flex-col md:flex-row gap-4 border-t border-gray-200  pt-6">
              <button
                onClick={() => setIsSubmitOpen(true)}
                className="bg-[#800080] hover:bg-[#6b006b] text-white px-8 py-3 rounded-md font-medium text-sm w-full md:w-auto"
              >
                Mark for review
              </button>

              <div className="flex gap-4 w-full md:w-auto md:ml-auto">
                <button className="flex-1 md:flex-none bg-[#cfd1d4] hover:bg-[#b0b2b5] text-gray-700 px-8 py-3 rounded-md font-medium text-sm">
                  Previous
                </button>
                <button className="flex-1 md:flex-none bg-[#1F2937] hover:bg-[#111827] text-white px-12 py-3 rounded-md font-medium text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Question Palette ================= */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Header & Timer */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-0">
              <h3 className="font-semibold text-gray-800">
                Question No. Sheet:
              </h3>

              <div className="flex items-center gap-2">
                <span>Remaining Time:</span>

                <div className="flex items-center gap-2 bg-[#1F2937] text-white px-3 py-1.5 rounded text-sm font-mono">
                  <img
                    src="/images/Timer.png"
                    alt="Clock"
                    className="w-4 h-4 object-contain brightness-0 invert"
                  />
                  87:13
                </div>
              </div>
            </div>
          </div>

          {/* Grid Area */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                <PaletteButton
                  key={num}
                  number={num}
                  status={getQuestionStatus(num)}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="border-t border-gray-200  pt-4 grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#4CAF50]"></div>
                <span>Attended</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#F44336]"></div>
                <span>Not Attended</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#800080]"></div>
                <span>Marked For Review</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#800080] border-b-2 border-[#4CAF50]"></div>
                <span>Answered and Marked For Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ParagraphDialog
        isOpen={isParagraphOpen}
        onClose={() => setIsParagraphOpen(false)}
      />
      <SubmitDialog
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />
    </div>
  );
};

export default ExamInterface;
