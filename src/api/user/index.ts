import request from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { PageResult, Result } from "@/api/model/types";
import type { User, UserInfo, UserQuery } from "@/api/user/types";
import type { RouteRecordRaw } from "vue-router";

export function getUserInfo(): AxiosPromise<Result<UserInfo>> {
  return request({
    url: "/admin/user/info",
    method: "get"
  });
}

export function getUserMenu(): AxiosPromise<Result<RouteRecordRaw[]>> {
  return request({
    url: "/admin/user/menu",
    method: "get"
  });
}

export function getUserList(params: UserQuery): AxiosPromise<Result<PageResult<User[]>>> {
  return request({
    url: "/admin/user/list",
    method: "get",
    params
  });
}
