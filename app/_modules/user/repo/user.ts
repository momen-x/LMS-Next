import { TUpdateUserPasswordByAdmin } from "../dto/update-user-by-admin";
import {
  TUpdatePasswordAPI,
  TUpdateUsername,
  TUploadUserAvatar,
} from "../dto/update-user-profile";

import { User, UserRole } from "../entity/user";
import { GetAllUsersResponse } from "../utile/type";

export interface IUserAPI {
  getCurrentUser: () => Promise<User>;
  updateUsername: (dto: TUpdateUsername) => Promise<User>;
  updatePassword: (dtp: TUpdatePasswordAPI) => Promise<User>;
  deleteUser: () => Promise<User>;
  deleteUserAvatar: () => Promise<User>;
  getAll: (
    page?: number,
    limit?: number,
    userRole?: UserRole
  ) => Promise<GetAllUsersResponse>;
  getById: (id: string) => Promise<User>;
  deleteUserAccountByAdmin: (userId: string) => Promise<User>;
  uploadAvatar: (dto: TUploadUserAvatar) => Promise<User>;
  updatePasswordByAdmin: (dto: TUpdateUserPasswordByAdmin) => Promise<User>;
}
