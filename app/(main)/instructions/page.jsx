// components/Instructions.jsx

"use client";
import React, { useEffect, useMemo } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamData } from "@/lib/redux/slices/examThunks";
import { parseInstructions } from "@/utils/parseInstructions";

const StatBox = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center px-4 md:px-12 py-2">
    <span className="text-gray-400 text-xs md:text-sm font-medium mb-1">
      {label}
    </span>
    <span className="text-2xl md:text-4xl font-light text-white">{value}</span>
  </div>
);

const Instructions = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { instructions, totalMarks, totalTime, questions } = useSelector(
    (state) => state.exam
  );

  useEffect(() => {
    dispatch(fetchExamData());
  }, [dispatch]);

  const handleStartTest = () => {
    router.push("/exam");
  };

  // Parse instructions using utility function
  const instructionItems = useMemo(() => {
    return parseInstructions(instructions);
  }, [instructions]);

  return (
    <div className="min-h-screen bg-[#F0F6FA] flex flex-col font-sans">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        {/* Page Title */}
        <h1 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 text-center">
          Ancient Indian History MCQ
        </h1>

        {/* Stats Card */}
        <div className="bg-[#1F2937] rounded-lg shadow-lg w-full max-w-3xl overflow-hidden mb-8">
          <div className="flex justify-between divide-x divide-gray-600 py-8">
            <StatBox label="Total MCQ's:" value={questions?.length || 0} />
            <StatBox label="Total marks:" value={totalMarks || 0} />
            <StatBox label="Total time:" value={`${totalTime || 0}:00`} />
          </div>
        </div>

        {/* Instructions Section */}
        <div className="w-full max-w-3xl">
          <h3 className="text-gray-700 font-bold mb-4 text-sm md:text-base">
            Instructions:
          </h3>

          {instructionItems.length > 0 ? (
            <ol className="list-decimal pl-6 space-y-3 text-gray-600 text-xs md:text-sm leading-relaxed">
              {instructionItems.map((item, index) => (
                <li key={index} className="pl-2">
                  {item}
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 text-sm">Loading instructions...</p>
          )}
        </div>

        {/* Start Button */}
        <div className="mt-10">
          <Button onClick={handleStartTest} className="primary-btn">
            Start Test
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Instructions;