"use client";
import React, { useState, useEffect, useCallback } from "react";
import OptionCard from "@/components/exam/OptionCard";
import PaletteButton from "@/components/exam/PaletteButton";
import ParagraphDialog from "@/components/dialogs/ParagraphDialog";
import SubmitDialog from "@/components/dialogs/SubmitDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementTime,
  setAnswer,
  toggleMarkForReview,
  initializeState,
} from "@/lib/redux/slices/examSlice";
import { fetchExamData } from "@/lib/redux/slices/examThunks";

const ExamInterface = () => {
  const [isParagraphOpen, setIsParagraphOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const dispatch = useDispatch();

  const examState = useSelector((state) => state.exam);

  const timeRemaining = examState?.timeRemaining ?? 0;
  const questions = examState?.questions ?? [];
  const answers = examState?.answers ?? {};
  const markedForReview = examState?.markedForReview ?? [];
  const isLoading = examState?.isLoading ?? false;
  const error = examState?.error ?? null;

  useEffect(() => {
    dispatch(initializeState());
  }, [dispatch]);

  useEffect(() => {
    if (questions.length === 0) {
      dispatch(fetchExamData());
    }
  }, [dispatch, questions.length]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch, timeRemaining]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === 0 && questions.length > 0) {
      setIsSubmitOpen(true);
    }
  }, [timeRemaining, questions.length]);

  const formatTime = useCallback((seconds) => {
    if (seconds < 0) seconds = 0;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleSelectOption = useCallback(
    (optionId) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return;

      dispatch(
        setAnswer({
          questionId: currentQuestion.question_id,
          optionId,
        })
      );
    },
    [dispatch, questions, currentQuestionIndex]
  );

  const handleMarkForReview = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    dispatch(toggleMarkForReview(currentQuestion.question_id));
  }, [dispatch, questions, currentQuestionIndex]);

  const handleQuestionSelect = useCallback((index) => {
    setCurrentQuestionIndex(index);
  }, []);

  const getQuestionStatus = useCallback(
    (questionId) => {
      const safeAnswers = answers || {};
      const safeMarkedForReview = markedForReview || [];

      const isAnswered = safeAnswers[questionId] !== undefined;
      const isMarked = safeMarkedForReview.includes(questionId);

      if (isAnswered && isMarked) {
        return "answered-and-marked";
      } else if (isAnswered) {
        return "attended";
      } else if (isMarked) {
        return "marked";
      } else {
        return "not-attended";
      }
    },
    [answers, markedForReview]
  );

  const currentQuestion = questions[currentQuestionIndex];

  const isCurrentMarked = currentQuestion
    ? (markedForReview || []).includes(currentQuestion.question_id)
    : false;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading exam...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-red-600 text-lg">Error: {error}</div>
      </div>
    );
  }

  // No questions state
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center">
        <div className="text-gray-600 text-lg">No questions available.</div>
      </div>
    );
  }

  const selectedOption = currentQuestion
    ? (answers || {})[currentQuestion.question_id] ?? null
    : null;

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
              {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>

          {/* Question Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm flex-1 flex flex-col border border-gray-200">
            {/* Context Button */}
            {currentQuestion?.comprehension && (
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
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}

            {/* Question Text */}
            <div className="mb-6">
              <h2 className="text-gray-900 font-medium text-lg mb-4">
                {currentQuestion?.number}. {currentQuestion?.question}
              </h2>

              {/* Image Placeholder */}
              {currentQuestion?.image && (
                <div className="w-full max-w-md h-48 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={currentQuestion.image}
                    alt="Question"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="text-gray-500 text-sm mb-3">Choose the answer:</div>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQuestion?.options?.map((option, index) => (
                <OptionCard
                  key={option.id}
                  label={String.fromCharCode(65 + index)}
                  text={option.option}
                  isSelected={selectedOption === option.id}
                  onClick={() => handleSelectOption(option.id)}
                />
              ))}
            </div>

            {/* Footer Actions */}
            <div className="mt-auto flex flex-col md:flex-row gap-4 border-t border-gray-200 pt-6">
              <button
                onClick={handleMarkForReview}
                className={`${
                  isCurrentMarked
                    ? "bg-[#6b006b]"
                    : "bg-[#800080] hover:bg-[#6b006b]"
                } text-white px-8 py-3 rounded-md font-medium text-sm w-full md:w-auto`}
              >
                {isCurrentMarked ? "Unmark Review" : "Mark for Review"}
              </button>

              <div className="flex gap-4 w-full md:w-auto md:ml-auto">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1 md:flex-none bg-[#cfd1d4] hover:bg-[#b0b2b5] text-gray-700 px-8 py-3 rounded-md font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={() => setIsSubmitOpen(true)}
                    className="flex-1 md:flex-none bg-[#4CAF50] hover:bg-[#45a049] text-white px-12 py-3 rounded-md font-medium text-sm"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex-1 md:flex-none bg-[#1F2937] hover:bg-[#111827] text-white px-12 py-3 rounded-md font-medium text-sm"
                  >
                    Next
                  </button>
                )}
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

                <div
                  className={`flex items-center gap-2 ${
                    timeRemaining <= 60 ? "bg-red-600" : "bg-[#1F2937]"
                  } text-white px-3 py-1.5 rounded text-sm font-mono`}
                >
                  <img
                    src="/images/Timer.png"
                    alt="Clock"
                    className="w-4 h-4 object-contain brightness-0 invert"
                  />
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>
          </div>

          {/* Grid Area */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
              {questions.map((question, index) => (
                <PaletteButton
                  key={question.question_id}
                  number={question.number}
                  status={getQuestionStatus(question.question_id)}
                  isActive={currentQuestionIndex === index}
                  onClick={() => handleQuestionSelect(index)}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-gray-600">
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
        paragraph={currentQuestion?.comprehension}
      />
      <SubmitDialog
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        answers={answers}
        questions={questions}
        markedForReview={markedForReview}
        timeRemaining={timeRemaining}
      />
    </div>
  );
};

export default ExamInterface;
