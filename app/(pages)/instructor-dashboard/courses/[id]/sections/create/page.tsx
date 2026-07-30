import { Metadata } from "next";

import CreateSection from "@/app/_modules/section/views/create-section";
import { TParams } from "@/types/params";

export const metadata: Metadata = {
  title: "Course Sections Page",
};

const CreateSectionPage = async ({ params }: TParams) => {
  const { id } = await params;

  return (
    <div>
      <CreateSection courseId={id} />
    </div>
  );
};

export default CreateSectionPage;
