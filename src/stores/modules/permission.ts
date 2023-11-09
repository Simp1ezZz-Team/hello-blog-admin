import { defineStore } from "pinia";
import { constantRoutes } from "@/router";
import type { PermissionState } from "@/stores/interface";
import type { RouteRecordRaw } from "vue-router";

const usePermissionStore = defineStore({
  id: "permissionStore",
  state: (): PermissionState => ({
    routes: []
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = constantRoutes.concat(routes);
    }
  }
});

export default usePermissionStore;
