import type { Menu, MenuForm, MenuOption, MenuQuery, MenuTree } from "@/api/menu/types";
import request from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Result } from "@/api/model/types";

/**
 * 获取菜单列表
 * @param params
 */
export function getMenuList(params: MenuQuery): AxiosPromise<Result<Menu[]>> {
  return request({
    url: "/admin/menu/list",
    method: "get",
    params
  });
}

/**
 * 获取菜单选项列表
 */
export function getMenuOptions(): AxiosPromise<Result<MenuOption[]>> {
  return request({
    url: "/admin/menu/list/options",
    method: "get"
  });
}

/**
 * 获取菜单下拉树
 */
export function getMenuTree(): AxiosPromise<Result<MenuTree[]>> {
  return request({
    url: "/admin/menu/tree",
    method: "get"
  });
}

/**
 * 根据菜单id获取菜单详情
 * @param menuId
 */
export function getMenuById(menuId: number): AxiosPromise<Result<Menu>> {
  return request({
    url: `/admin/menu/${menuId}`,
    method: "get"
  });
}

/**
 * 删除菜单
 * @param menuId 菜单id
 */
export function deleteMenuById(menuId: number): AxiosPromise<Result<null>> {
  return request({
    url: `/admin/menu/${menuId}`,
    method: "delete"
  });
}

/**
 * 更新菜单信息
 * @param menu
 */
export function updateMenu(menu: MenuForm): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/menu",
    method: "patch",
    data: menu
  });
}

/**
 * 新增菜单
 * @param menu
 */
export function addMenu(menu: MenuForm): AxiosPromise<Result<null>> {
  return request({
    url: "/admin/menu",
    method: "post",
    data: menu
  });
}
