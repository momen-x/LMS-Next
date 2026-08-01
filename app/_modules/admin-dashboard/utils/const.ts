import {
  BookOpenCheck,
  CircleDashed,
  CreditCard,
  LayoutDashboardIcon,
  MessageSquarePlus,
  User,
} from "lucide-react";

export const dashboardNaves = [
  { icon: LayoutDashboardIcon, label: "Dashboard", path: "/" },
  {
    icon: User,
    label: "Users",
    path: "/users",
  },
  {
    icon: MessageSquarePlus,
    label: "Categories",
    path: "/categories",
  },
  { icon: BookOpenCheck, label: "Courses", path: "/courses" },
  { icon: CircleDashed, label: "Draft Courses", path: "/draft-courses" },

  { icon: CreditCard, label: "Payments", path: "/payments" },
];
