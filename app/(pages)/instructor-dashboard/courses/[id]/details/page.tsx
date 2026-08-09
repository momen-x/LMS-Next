import CourseDetails from "@/app/_modules/course/views/course-details";
import { QuestionsBankDialogProvider } from "@/app/_modules/question-bank/context/question-bank-dialog-context";
import { TParams } from "@/types/params";

const CourseDetailsPage = async ({ params }: TParams) => {
  const { id } = await params;

  return (
    <div>
      {" "}
      <QuestionsBankDialogProvider>
        <CourseDetails
          courseId={id}
          onDelete={`/instructor-dashboard/courses/${id}/delete`}
          onEdit={`/instructor-dashboard/courses/${id}/edit`}
          manageSections={`/instructor-dashboard/courses/${id}/sections`}
          manageQuestionBank={`/instructor-dashboard/courses/${id}/questions-bank-table`}
          manageQuizzes={`/instructor-dashboard/courses/${id}/quizzes`}
          viewStudents={`/instructor-dashboard/courses/${id}/students`}
        />
      </QuestionsBankDialogProvider>
    </div>
  );
};

export default CourseDetailsPage;
