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
        path: "/index",
        component: () => import("@/views/home/index.vue"),
        name: "Index",
        meta: { title: "首页", icon: "index" }
      },
      {
        path: "/test",
        component: Layout,
        name: "test",
        meta: { title: "测试", icon: "menu" }
      },
      {
        path: "/user",
        component: Layout,
        name: "user",
        meta: { title: "用户管理", icon: "fuzhi" },
        children: [
          {
            path: "/add",
            component: Layout,
            name: "add",
            meta: { title: "新增用户", icon: "shanchu", hidden: false }
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
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
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
