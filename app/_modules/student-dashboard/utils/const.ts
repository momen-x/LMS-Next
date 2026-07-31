import { Award, BookOpenCheck, Compass, LayoutDashboardIcon } from "lucide-react";

export const dashboardNaves = [
  {
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: BookOpenCheck,
    label: "My Learning",
    path: "/courses",
  },

  {
    icon: Compass,
    label: "Explore Courses",
    path: "/explore-courses",
  },
  {
    icon: Award,
    label: "Certificates",
    path: "/certificates",
  },
];
