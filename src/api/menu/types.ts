import type { PageQuery } from "@/api/model/types";

/**
 * 菜单查询
 */
export interface MenuQuery extends PageQuery {
  /**
   * 菜单名称
   */
  menuName: string;
  /**
   * 禁用状态 (0正常 1禁用)
   */
  disableFlag: number;
}

/**
 * 菜单列表
 */
export interface Menu {
  /**
   * 菜单id
   */
  menuId: number;
  /**
   * 父菜单id
   */
  parentId: number;
  /**
   * 菜单名称
   */
  menuName: string;
  /**
   * 菜单类型 (0:目录 1:菜单 2:按钮)
   */
  menuType: number;
  /**
   * 路由地址
   */
  path: string;
  /**
   * 图标
   */
  icon: string;
  /**
   * 组件
   */
  component: string;
  /**
   * 权限字符串
   */
  perms: string;
  /**
   * 是否隐藏 (0否 1是)
   */
  hiddenFlag: number;
  /**
   * 是否禁用 (0否 1是)
   */
  disableFlag: number;
  /**
   * 排序
   */
  orderNum: number;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 子菜单列表
   */
  children: Menu[];
}

export interface MenuForm {
  /**
   * 菜单id
   */
  menuId?: number;
  /**
   * 父菜单id
   */
  parentId: number;
  /**
   * 菜单名称
   */
  menuName: string;
  /**
   * 菜单类型 (D:目录 M:菜单 B:按钮)
   */
  menuType: string;
  /**
   * 路由地址
   */
  path: string;
  /**
   * 图标
   */
  icon: string;
  /**
   * 组件地址
   */
  component: string;
  /**
   * 权限字符串
   */
  perms: string;
  /**
   * 是否隐藏 (0否 1是)
   */
  hiddenFlag: number;
  /**
   * 是否禁用 (0否 1是)
   */
  disableFlag: number;
  /**
   * 排序
   */
  orderNum: number;
}

/**
 * 菜单选项树
 */
export interface MenuOption {
  /**
   * 菜单id
   */
  value: number;
  /**
   * 菜单名称
   */
  label: string;
  /**
   * 子菜单
   */
  children?: MenuOption[];
}
