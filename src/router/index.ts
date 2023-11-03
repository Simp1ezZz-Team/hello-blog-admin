import Layout from "@/layout/index.vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        component: () => import("@/views/home/index.vue"),
        name: "Index",
        meta: { title: "首页", icon: "dashboard", affix: true }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    },
    name: "登录"
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
    meta: {
      hidden: true
    }
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

export default router;
