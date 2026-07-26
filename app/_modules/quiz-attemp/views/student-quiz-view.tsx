"use client";

import { useState } from "react";

import { Quiz } from "@/app/_modules/quiz/entity/quiz";

import { QuizAttempt } from "../entity/quiz-attempt";
import ActiveQuizAttempt from "./active-quiz-attempt";
import QuizAttemptOverview from "./quiz-attempt-overview";
import { AttemptQuestion } from "./quiz-player";

type StudentQuizViewProps = {
  quiz: Quiz;
  questions: AttemptQuestion[];
  attemptsCount: number;
};

export default function StudentQuizView({
  quiz,
  questions,
  attemptsCount,
}: StudentQuizViewProps) {
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(
    null,
  );

  if (selectedAttempt) {
    return (
      <ActiveQuizAttempt
        attempt={selectedAttempt}
        quiz={quiz}
        questions={questions}
        attemptsCount={attemptsCount}
        onBackToQuiz={() => setSelectedAttempt(null)}
        onTryAgain={() => setSelectedAttempt(null)}
      />
    );
  }

  return (
    <QuizAttemptOverview
      quiz={quiz}
      questionsCount={questions.length}
      onAttemptReady={(attempt) => {
        setSelectedAttempt(attempt);
      }}
    />
  );
}
