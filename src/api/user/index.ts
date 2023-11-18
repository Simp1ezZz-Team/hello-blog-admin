import request from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { PageResult, Result } from "@/api/model/types";
import type { User, UserForm, UserInfo, UserQuery, UserRole, UserStatus } from "@/api/user/types";
import type { RouteRecordRaw } from "vue-router";

export function getUserInfo(): AxiosPromise<Result<UserInfo>> {
  return request({
    url: "/admin/user/info",
    method: "get"
  });
}

export function getUserMenu(): AxiosPromise<Result<RouteRecordRaw[]>> {
  return request({
    url: "/admin/user/menu",
    method: "get"
  });
}

export function getUserList(params: UserQuery): AxiosPromise<Result<PageResult<User[]>>> {
  return request({
    url: "/admin/user/list",
    method: "get",
    params
  });
}

export function getUserRoleList(): AxiosPromise<Result<UserRole[]>> {
  return request({
    url: "/admin/role/list/all",
    method: "get",
    params: {
      disableFlag: 0
    }
  });
}

export function updateUserStatus(data: UserStatus): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/user/status",
    method: "patch",
    data
  });
}

export function updateUser(data: UserForm): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/user",
    method: "patch",
    data
  });
}

export function addUser(data: UserForm): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/user",
    method: "post",
    data
  });
}

export function deleteUserById(id: number): AxiosPromise<Result<null>> {
  return request({
    url: `/admin/user/${id}`,
    method: "delete"
  });
}
