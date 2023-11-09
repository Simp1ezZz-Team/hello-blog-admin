import useUserStore from "@/stores/modules/user";
import useAppStore from "@/stores/modules/app";
import usePermissionStore from "@/stores/modules/permission";
import useTabStore from "@/stores/modules/tab";

const useStore = () => ({
  userStore: useUserStore(),
  appStore: useAppStore(),
  permissionStore: usePermissionStore(),
  tabStore: useTabStore()
});

export default useStore;
