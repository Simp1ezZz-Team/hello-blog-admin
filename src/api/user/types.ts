import type { PageQuery } from "@/api/model/types";

/**
 * 用户详情，包括权限信息
 */
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

/**
 * 用户查询参数
 */
export interface UserQuery extends PageQuery {
  /**
   * 用户名
   */
  username?: string;
  /**
   * 用户昵称
   */
  nickname?: string;
  /**
   * 用户状态
   */
  loginType?: number;
}

/**
 * 用户状态
 */
export interface UserStatus {
  /**
   * 用户id
   */
  id: number;
  /**
   * 禁用状态
   */
  disableFlag: number;
}

/**
 * 角色信息
 */
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

/**
 * 用户信息
 */
export interface User {
  /**
   * 用户id
   */
  userId: number;
  /**
   * 用户名
   */
  username: string;
  /**
   * 用户密码
   */
  password: string;
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

/**
 * 用户表单
 */
export interface UserForm {
  /**
   * 用户id
   */
  userId: number;
  /**
   * 用户名
   */
  username: string;
  /**
   * 用户密码
   */
  password: string;
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 用户头像
   */
  avatar: string;
  /**
   * 用户角色id列表
   */
  roleIdList: number[];
}
