import type { PageQuery } from "@/api/model/types";

/**
 * 角色查询类型
 */
export interface RoleQuery extends PageQuery {
  roleName: string;
  disableFlag: number;
}

/**
 * 角色
 */
export interface Role {
  /**
   * 角色id
   */
  roleId: number;
  /**
   * 角色名称
   */
  roleName: string;
  /**
   * 角色描述
   */
  roleDesc: string;
  /**
   * 禁用状态 (0正常 1禁用)
   */
  disableFlag: number;
  /**
   * 创建时间
   */
  createTime: string;
}

/**
 * 角色状态
 */
export interface RoleStatus {
  /**
   * 角色id
   */
  roleId: number;
  /**
   * 禁用状态 (0正常 1禁用)
   */
  disableFlag: number;
}

/**
 * 角色表单
 */
export interface RoleForm {
  roleName: string;
  roleDesc: string;
}
