import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

export interface AppState {
  /**
   * 侧边栏是否展开
   */
  isCollapse: boolean;

  /**
   * 刷新,值变动时刷新页面
   */
  refresh: boolean;
}

export interface UserState {
  /**
   * 用户id
   */
  userId: number | null;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 角色列表
   */
  roleList: string[];
  /**
   * 权限列表
   */
  permissionList: string[];
}

export interface PermissionState {
  routes: RouteRecordRaw[];
}

export interface TabView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export interface TabViewState {
  visitedViews: TabView[];
}
