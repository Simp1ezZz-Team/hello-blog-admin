import { defineStore } from "pinia";
import { login, logout } from "@/api/login";
import { removeToken, setToken } from "@/utils/token";
import type { LoginForm } from "@/api/login/types";

const useUserStore = defineStore("userStore", {
  state: () => ({
    userId: null,
    avatar: "",
    roleList: [],
    permissionList: []
  }),
  actions: {
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
    LogOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.userId = null;
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
    }
  },
  getters: {}
});

export default useUserStore;
