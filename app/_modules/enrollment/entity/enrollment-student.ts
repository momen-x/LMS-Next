import type { User } from "../../user/entity/user";
import type { Enrollment } from "./enrollment";

export type EnrollmentStudent = Pick<
  User,
  "id" | "name" | "email" | "avatar" | "role"
>;

export type EnrollmentWithStudent = Enrollment & {
  student: EnrollmentStudent;
};
