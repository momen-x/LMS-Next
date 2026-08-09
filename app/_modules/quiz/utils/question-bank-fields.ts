import {
  ClosedCaption,
  FileQuestion,
  FileQuestionMark,
  Award,
  RotateCcw,
  Timer,
} from "lucide-react";
import { CreateQuizData } from "../dto/create-quiz";

import { FormField } from "@/types/form-fields";

export const quizFields = [
  {
    name: "title",
    title: "Enter quiz title",
    placeholder: "Enter quiz title",
    Icon: ClosedCaption,
    type: "text",
  },
  {
    name: "duration",
    title: "Duration (minutes)",
    placeholder: "30",
    Icon: Timer,
    type: "number",
  },
  {
    name: "passingScore",
    title: "Passing Score (%)",
    placeholder: "50",
    Icon: FileQuestionMark,
    type: "number",
  },
  {
    name: "maxAttempts",
    title: "Enter the maximum attempts",
    placeholder: "3",
    Icon: RotateCcw,
    type: "number",
  },
  {
    name: "questionCount",
    title: "Question Count",
    placeholder: "10",
    Icon: FileQuestion,
    type: "number",
  },
  {
    name: "totalMark",
    title: "Total Mark",
    placeholder: "10",
    Icon: Award,
    type: "number",
  },
] satisfies FormField<keyof CreateQuizData & string>[];
