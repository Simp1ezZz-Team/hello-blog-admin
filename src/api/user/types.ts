import type { PageQuery } from "@/api/model/types";

export interface UserInfo {
  /**
   * 用户id
   */
  userId: number;
  /**
   * 用户头像
   */
  avatar: string;
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 角色列表
   */
  roleList: string[];
  /**
   * 权限列表
   */
  permissionList: string[];
}

export interface UserQuery extends PageQuery {
  /**
   * 用户昵称
   */
  nickname?: string;
  /**
   * 用户状态
   */
  loginType?: number;
}

export interface UserRole {
  /**
   * 角色id
   */
  roleId: number;
  /**
   * 角色名
   */
  roleName: string;
}

export interface User {
  /**
   * 用户id
   */
  userId: number;
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 用户头像
   */
  avatar: string;
  /**
   * 登录ip
   */
  ipAddress: string;
  /**
   * 登录地址
   */
  ipSource: string;
  /**
   * 登录方式
   */
  loginType: number;
  /**
   * 角色列表
   */
  roleList: UserRole[];
  /**
   * 是否禁用 (0否 1是)
   */
  disableFlag: number;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 登录时间
   */
  loginTime: string;
}
