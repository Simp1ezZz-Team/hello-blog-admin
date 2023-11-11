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

export interface PermissionState {
  routes: RouteRecordRaw[];
}

export interface TabView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export interface TabViewState {
  visitedViews: TabView[];
}
