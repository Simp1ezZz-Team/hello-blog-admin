import Layout from "@/layout/index.vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/home/index.vue"),
        name: "Index",
        meta: { title: "首页", icon: "index" }
      },
      {
        path: "/user",
        name: "user",
        meta: { title: "用户管理", icon: "fuzhi" },
        children: [
          {
            path: "add1",
            component: () => import("@/views/test/index.vue"),
            name: "add1",
            meta: { title: "测试1", icon: "shanchu", hidden: false }
          },
          {
            path: "add2",
            component: () => import("@/views/test/index.vue"),
            name: "add2",
            meta: { title: "测试2", icon: "shanchu", hidden: false }
          }
        ]
      }
    ]
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    },
    name: "login"
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
    meta: { hidden: true }
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

export default router;
