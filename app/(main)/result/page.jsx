"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { HelpCircle, CheckSquare, XSquare, Square } from "lucide-react";
import { resetExam } from "@/lib/redux/slices/examSlice";
import { persistedStore } from "@/lib/redux/store/store";

const StatRow = ({ icon: Icon, colorClass, label, value }) => {
  return (
    <div className="flex items-center justify-between py-3 px-2">
      <div className="flex items-center gap-4">
        <div
          className={`w-8 h-8 rounded flex items-center justify-center text-white shadow-sm ${colorClass}`}
        >
          <Icon size={18} strokeWidth={3} />
        </div>

        <span className="text-slate-600 font-medium text-base">{label}:</span>
      </div>

      <span className="text-slate-900 font-bold text-base">{value}</span>
    </div>
  );
};

const ResultPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const examResult = useSelector((state) => state.exam.examResult);

  useEffect(() => {
    if (!examResult) {
      router.push("/instructions");
    }
  }, [examResult, router]);

  if (!examResult) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p>Loading results or redirecting...</p>
      </div>
    );
  }

  const { score, correct, wrong, not_attended } = examResult;
  const calculatedTotalQuestions = correct + wrong + not_attended;

  const handleDone = () => {
    dispatch(resetExam()); 
    persistedStore.purge(); 
    router.push("/auth/login"); 
  };

  return (
    <div className="min-h-screen w-full bg-[#F0F9FF] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[400px] flex flex-col gap-6">
        <div className="bg-gradient-to-b from-[#117C99] to-[#173042] rounded-xl p-8 text-center text-white shadow-lg shadow-cyan-900/20">
          <h2 className="text-sm font-medium opacity-90 mb-2 tracking-wide">
            Marks Obtained:
          </h2>
          <div className="text-5xl font-semibold tracking-tight">
            {score} / {calculatedTotalQuestions}
          </div>
        </div>

        <div className="flex flex-col gap-1 px-2">
          <StatRow
            icon={HelpCircle}
            colorClass="bg-[#EAB308]"
            label="Total Questions"
            value={calculatedTotalQuestions}
          />

          <StatRow
            icon={CheckSquare}
            colorClass="bg-[#4CAF50]"
            label="Correct Answers"
            value={correct}
          />

          <StatRow
            icon={XSquare}
            colorClass="bg-[#EF4444]"
            label="Incorrect Answers"
            value={wrong}
          />

          <StatRow
            icon={Square}
            colorClass="bg-[#6B7280]"
            label="Not Attended Questions"
            value={not_attended}
          />
        </div>

        <button
          onClick={handleDone}
          className="w-full bg-[#1F2937] hover:bg-[#111827] text-white py-3.5 rounded-lg font-semibold text-sm transition-all shadow-md mt-2"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
