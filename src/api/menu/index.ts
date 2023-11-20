import type { Menu, MenuQuery } from "@/api/menu/types";
import request from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Result } from "@/api/model/types";

export function getMenuList(params: MenuQuery): AxiosPromise<Result<Menu[]>> {
  return request({
    url: "/admin/menu/list",
    method: "get",
    params
  });
}
