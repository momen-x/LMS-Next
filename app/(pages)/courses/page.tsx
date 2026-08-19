import { Metadata } from "next";
import CoursePageView from "@/app/_modules/course/views/course-page-view";
import { Award, BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Courses",
  description: "Student Dashboard - Explore Courses",
};

const CoursePage = () => {
  return (
    <CoursePageView>
      <div className="my-6 rounded-2xl bg-linear-to-r from-blue-900/40 via-indigo-900/20 to-purple-900/40 p-6 border border-indigo-500/20 backdrop-blur-md w-[95vw] m-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ready to level up?</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Expand Your Knowledge Today
            </h3>
            <p className="text-sm text-gray-400 max-w-xl">
              Access high-quality courses curated by industry experts and earn
              certificates to boost your career.
            </p>
          </div>

          <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                <BookOpen className="w-5 h-5" />
              </div>
           
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">Verified</p>
                <p className="text-xs text-gray-400">Certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoursePageView>
  );
};

export default CoursePage;
