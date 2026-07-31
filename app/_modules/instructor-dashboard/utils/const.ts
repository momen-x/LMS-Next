import { BookOpenCheck, CreditCard, LayoutDashboardIcon, Users } from "lucide-react";

export const dashboardNaves = [
  {
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: BookOpenCheck,
    label: "Courses",
    path: "/courses",
  },
  {
    icon: CreditCard,
    label: "Payments",
    path: "/payments",
  },
  {
    icon: Users,
    label: "Enrollments",
    path: "/enrollments",
  },
];

export const instructorRoutes = {
  dashboard: "/",
  courses: "/courses",
  sections: "/sections",
  lessons: "/lessons",
  quizzes: "/quizzes",
  payments: "/payments",
  enrollments: "/enrollments",
};
