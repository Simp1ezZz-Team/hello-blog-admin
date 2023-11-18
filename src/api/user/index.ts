import request from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { PageResult, Result } from "@/api/model/types";
import type { User, UserForm, UserInfo, UserQuery, UserRole, UserStatus } from "@/api/user/types";
import type { RouteRecordRaw } from "vue-router";

/**
 * 获取登录的用户信息
 */
export function getUserInfo(): AxiosPromise<Result<UserInfo>> {
  return request({
    url: "/admin/user/info",
    method: "get"
  });
}

/**
 * 获取登录的用户拥有的菜单列表
 */
export function getUserMenu(): AxiosPromise<Result<RouteRecordRaw[]>> {
  return request({
    url: "/admin/user/menu",
    method: "get"
  });
}

/**
 * 获取用户列表
 * @param params
 */
export function getUserList(params: UserQuery): AxiosPromise<Result<PageResult<User[]>>> {
  return request({
    url: "/admin/user/list",
    method: "get",
    params
  });
}

/**
 * 获取权限列表
 */
export function getUserRoleList(): AxiosPromise<Result<UserRole[]>> {
  return request({
    url: "/admin/role/list/all",
    method: "get",
    params: {
      disableFlag: 0
    }
  });
}

/**
 * 更新用户状态
 * @param data
 */
export function updateUserStatus(data: UserStatus): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/user/status",
    method: "patch",
    data
  });
}

/**
 * 修改用户信息
 * @param data
 */
export function updateUser(data: UserForm): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/user",
    method: "patch",
    data
  });
}

/**
 * 新增用户
 * @param data
 */
export function addUser(data: UserForm): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/user",
    method: "post",
    data
  });
}

/**
 * 根据id删除用户
 * @param id
 */
export function deleteUserById(id: number): AxiosPromise<Result<null>> {
  return request({
    url: `/admin/user/${id}`,
    method: "delete"
  });
}

/**
 * 批量删除用户
 * @param ids
 */
export function deleteUserBatch(ids: number[]): AxiosPromise<Result<null>> {
  return request({
    url: `/admin/user/batch`,
    method: "delete",
    data: ids
  });
}
