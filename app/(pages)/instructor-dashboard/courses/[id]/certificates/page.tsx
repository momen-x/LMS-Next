import CourseCertificates from "@/app/_modules/certificate/views/course-certificates";
import { TParams } from "@/types/params";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course certificates",
  description: "Course certificates page",
};
async function CourseCertificatesPage({ params }: TParams) {
  const { id: courseId } = await params;
  return (
    <div>
      <CourseCertificates courseId={courseId} />
    </div>
  );
}

export default CourseCertificatesPage;
