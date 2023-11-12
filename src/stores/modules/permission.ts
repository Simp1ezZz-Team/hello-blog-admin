import { defineStore } from "pinia";
import { constantRoutes } from "@/router";
import type { PermissionState } from "@/stores/interface";
import type { RouteRecordRaw } from "vue-router";
import { getUserMenu } from "@/api/user";

const modules = import.meta.glob("../../views/**/**.vue");

export const Layout = () => import("../../layout/index.vue");
export const filterAsyncRoutes = (routes: RouteRecordRaw[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach(route => {
    const tmpRoute = { ...(route as any) };
    if (tmpRoute.component == "Layout") {
      tmpRoute.component = Layout;
    } else {
      Object.keys(modules).forEach(url => {
        if (url == `../../views${tmpRoute.component}.vue`) {
          tmpRoute.component = modules[url];
        }
      });
    }
    res.push(tmpRoute);
    if (tmpRoute.children) {
      tmpRoute.children = filterAsyncRoutes(tmpRoute.children);
    }
  });
  return res;
};

const usePermissionStore = defineStore({
  id: "permissionStore",
  state: (): PermissionState => ({
    routes: constantRoutes
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = this.routes.concat(routes);
    },
    generateRoutes(): Promise<RouteRecordRaw[]> {
      return new Promise((resolve, reject) => {
        getUserMenu()
          .then(({ data }) => {
            if (data.flag) {
              const asyncRoutes = data.data;
              const accessedRoutes = filterAsyncRoutes(asyncRoutes);
              this.setRoutes(accessedRoutes);
              resolve(accessedRoutes);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

export default usePermissionStore;
