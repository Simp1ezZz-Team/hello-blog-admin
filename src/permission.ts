import NProgress from "nprogress";
import router from "@/router";
import useStore from "@/stores";
import { getToken } from "@/utils/token";

NProgress.configure({
  easing: "ease",
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
});

const wihteList = ["/login"];
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
          .then(() => {})
          .catch(err => {});
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
