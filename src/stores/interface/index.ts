import type { RouteRecordRaw } from "vue-router";

export interface AppState {
  /**
   * 侧边栏是否展开
   */
  isCollapse: boolean;
}

export interface PermissionState {
  routes: RouteRecordRaw[];
}
