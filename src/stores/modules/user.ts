import { defineStore } from "pinia";
import { login, logout } from "@/api/login";
import { removeToken, setToken } from "@/utils/token";
import type { LoginForm } from "@/api/login/types";
import { getUserInfo } from "@/api/user";
import type { UserState } from "@/stores/interface";

const useUserStore = defineStore("userStore", {
  state: (): UserState => ({
    userId: null,
    nickName: "",
    avatar: "",
    roleList: [],
    permissionList: []
  }),
  actions: {
    /**
     * 登录
     * @param LoginForm
     * @constructor
     */
    Login(LoginForm: LoginForm) {
      return new Promise((resolve, reject) => {
        login(LoginForm)
          .then(({ data }) => {
            if (data.flag) {
              setToken(data.data);
              resolve(data);
            } else {
              reject(data.msg);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     * 退出登录
     * @constructor
     */
    LogOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.userId = null;
            this.nickName = "";
            this.avatar = "";
            this.roleList = [];
            this.permissionList = [];
            removeToken();
            resolve(null);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     * 获取用户基本信息
     * @constructor
     */
    GetInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(({ data }) => {
            if (data.flag) {
              this.userId = data.data.userId;
              this.nickName = data.data.nickName;
              this.avatar = data.data.avatar;
              this.roleList = data.data.roleList;
              this.permissionList = data.data.permissionList;
            }
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  getters: {}
});

export default useUserStore;
