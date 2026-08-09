import { QuestionsBankDialogProvider } from "@/app/_modules/question-bank/context/question-bank-dialog-context";
import QuestionBanksTable from "@/app/_modules/question-bank/views/question-bank-table";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Question Banks Table",
  description: "LMS App",
};

const QuestionBanksTablePage = async ({ params }: TParams) => {
  const { id } = await params;
  return (
    <QuestionsBankDialogProvider>
      <QuestionBanksTable courseId={id} />
    </QuestionsBankDialogProvider>
  );
};

export default QuestionBanksTablePage;
