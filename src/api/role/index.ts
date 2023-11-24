import type { AxiosPromise } from "axios";
import type { Result } from "@/api/model/types";
import type { Role, RoleForm, RoleQuery, RoleStatus } from "@/api/role/types";
import request from "@/utils/request";

/**
 * 获取角色列表
 * @param params
 */
export function getRoleList(params: RoleQuery): AxiosPromise<Result<Role[]>> {
  return request({
    url: "/admin/role/list",
    method: "get",
    params: params
  });
}

/**
 * 根据roleId获取用户信息
 * @param roleId
 */
export function getRoleById(roleId: number): AxiosPromise<Result<Role>> {
  return request({
    url: `/admin/role/${roleId}`,
    method: "get"
  });
}

/**
 * 根据id删除角色
 * @param roleId
 */
export function deleteRoleById(roleId: number): AxiosPromise<Result<null>> {
  return request({
    url: `/admin/role`,
    method: "delete",
    data: [roleId]
  });
}

/**
 * 批量删除角色
 * @param roleIds
 */
export function deleteRoleBatch(roleIds: number[]): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/role",
    method: "delete",
    data: roleIds
  });
}

/**
 * 更新角色
 * @param role
 */
export function updateRole(role: RoleForm): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/role",
    method: "patch",
    data: role
  });
}

/**
 * 更新角色状态
 * @param param
 */
export function updateRoleStatus(param: RoleStatus): AxiosPromise<Result<null>> {
  return request({
    url: "admin/role/status",
    method: "patch",
    data: param
  });
}

/**
 * 添加角色
 * @param role
 */
export function addRole(role: RoleForm): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/role",
    method: "post",
    data: role
  });
}
