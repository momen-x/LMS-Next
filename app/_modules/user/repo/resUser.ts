import api from "@/utils/axiosInstance";
import {
  TUpdatePasswordAPI,
  TUpdateUsername,
  TUploadUserAvatar,
} from "../dto/update-user-profile";
import { IUserAPI } from "./user";
import { User } from "../entity/user";
import { TUpdateUserPasswordByAdmin } from "../dto/update-user-by-admin";
import { GetAllUsersResponse } from "../utile/type";

const BASE_URL = "/api/users";

export const resUserAPI: IUserAPI = {
  getCurrentUser: async () => {
    const user = await api.get<User>(`${BASE_URL}/me`);
    return user.data;
  },
  updateUsername: async (dto: TUpdateUsername) => {
    const user = await api.patch<User>(`${BASE_URL}/me/name`, dto);
    return user.data;
  },
  updatePassword: async (dto: TUpdatePasswordAPI) => {
    const user = await api.patch<User>(`${BASE_URL}/me/password`, dto);
    return user.data;
  },
  deleteUser: async () => {
    const user = await api.delete<User>(`${BASE_URL}/me`);
    return user.data;
  },
  deleteUserAvatar: async () => {
    const user = await api.delete<User>(`${BASE_URL}/me/avatar`);
    return user.data;
  },
  getAll: async (page: number = 1, limit: number = 10, userRole?: string) => {
    const userRoleFilter = userRole ? `&role=${userRole}` : "";
    const users = await api.get<GetAllUsersResponse>(
      `${BASE_URL}?page=${page}&limit=${limit}${userRoleFilter}`,
    );
    return users.data;
  },
  getById: async (id: string) => {
    const user = await api.get<User>(`${BASE_URL}/${id}`);
    return user.data;
  },
  deleteUserAccountByAdmin: async (id: string) => {
    const deleteUser = await api.delete<User>(`${BASE_URL}/${id}`);
    return deleteUser.data;
  },
  uploadAvatar: async (dto: TUploadUserAvatar) => {
    const formData = new FormData();
    if (dto.avatar) formData.append("avatar", dto.avatar);

    const user = await api.put<User>(`${BASE_URL}/me/avatar`, formData);
    return user.data;
  },

  updatePasswordByAdmin: async (dto: TUpdateUserPasswordByAdmin) => {
    const updateUser = await api.put<User>(`${BASE_URL}/admin/password`, dto);
    return updateUser.data;
  },
};
