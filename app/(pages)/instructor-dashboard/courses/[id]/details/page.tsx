import CourseDetails from "@/app/_modules/course/views/course-details";
import { QuestionsBankDialogProvider } from "@/app/_modules/question-bank/context/question-bank-dialog-context";
import { TParams } from "@/types/params";
/**
 *
 *
 * @param {TParams} { params }
 * @return {*}
 */
const CourseDetailsPage = async ({ params }: TParams) => {
  const { id } = await params;
  const BASE_URL = `/instructor-dashboard/courses/${id}`;

  return (
    <div>
      {" "}
      <QuestionsBankDialogProvider>
        <CourseDetails
          courseId={id}
          onDelete={`${BASE_URL}/delete`}
          onEdit={`${BASE_URL}/edit`}
          manageSections={`${BASE_URL}/sections`}
          manageQuestionBank={`${BASE_URL}/questions-bank-table`}
          manageQuizzes={`${BASE_URL}/quizzes`}
          viewStudents={`${BASE_URL}/students`}
          courseCertificates={`${BASE_URL}/certificates`}
        />
      </QuestionsBankDialogProvider>
    </div>
  );
};

export default CourseDetailsPage;
