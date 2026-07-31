import { Metadata } from "next";

import MyLearningView from "@/app/_modules/student-dashboard/views/my-learning-view";

export const metadata: Metadata = {
  title: "My Learning",
  description: "Instructor Dashboard",
};

const MyLearningPage = () => {
  return (
    <div>
      <MyLearningView />
    </div>
  );
};

export default MyLearningPage;
