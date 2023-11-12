import request from "@/utils/request";
import type { AxiosPromise } from "axios";
import type { Result } from "@/api/model/types";
import type { UserInfo } from "@/api/user/types";

export function getUserInfo(): AxiosPromise<Result<UserInfo>> {
  return request({
    url: "/admin/user/info",
    method: "get"
  });
}
