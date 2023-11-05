import useUserStore from "@/stores/modules/user";
import useAppStore from "@/stores/modules/app";
import usePermissionStore from "@/stores/modules/permission";

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  permission: usePermissionStore()
});

export default useStore;
