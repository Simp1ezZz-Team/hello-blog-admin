import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { ElNotification } from "element-plus";
import { getToken, token_header, token_prefix } from "@/utils/token";
import useStore from "@/stores";

//创建axios对象
const request = axios.create({
  baseURL: "/api",
  timeout: 10000,
  // 请求头
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});
let user = null;
//请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (getToken()) {
      config.headers[token_header] = token_prefix + getToken();
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

//响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    switch (response.data.code) {
      case 400:
        ElNotification({
          title: "失败",
          message: response.data.msg,
          type: "error"
        });
        break;
      case 402:
        ElNotification({
          title: "失败",
          message: "登录已过期，请重新登录",
          type: "error"
        });
        user = useStore().userStore;
        user.LogOut().then(() => {
          location.href = "/login"; //跳转到登录页面
        });
        break;
      case 500:
        ElNotification({
          title: "失败",
          message: response.data.msg,
          type: "error"
        });
        break;
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default request;
