import NProgress from "nprogress";
import router from "@/router";
import useStore from "@/stores";
import { getToken } from "@/utils/token";
import { ElMessage } from "element-plus";

// NProgress.configure({
//   easing: "ease",
//   speed: 500,
//   showSpinner: false,
//   trickleSpeed: 200,
//   minimum: 0.3
// });

const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  const { userStore, permissionStore } = useStore();
  if (getToken()) {
    // 如果已经登录，访问登录页面则跳转到首页
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (userStore.roleList.length === 0) {
        userStore
          .GetInfo()
          .then(() => {
            permissionStore.generateRoutes().then(accessRoutes => {
              accessRoutes.forEach(route => {
                router.addRoute(route);
              });
              next({ ...to, replace: true });
            });
          })
          .catch(err => {
            userStore.LogOut().then(() => {
              ElMessage.error(err);
              next({ path: "/login" });
            });
          });
      } else {
        next();
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
