import Layout from "@/layout/index.vue";
import type { Router, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

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
        meta: { title: "首页", icon: "dashboard", affix: true }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      hidden: true
    }
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
    meta: { hidden: true }
  },
  {
    path: "/system",
    component: Layout,
    name: "System",
    meta: {
      title: "系统管理",
      icon: "system"
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/system/user/index.vue"),
        name: "user",
        meta: {
          title: "用户管理",
          icon: "user"
        }
      },
      {
        path: "role",
        component: () => import("@/views/system/role/index.vue"),
        name: "role",
        meta: {
          title: "角色管理",
          icon: "role"
        }
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        name: "menu",
        meta: {
          title: "菜单管理",
          icon: "menu"
        }
      }
    ]
  }
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
});

export default router;
