import useUserStore from "@/stores/modules/user";

const useStore = () => ({
  user: useUserStore()
});

export default useStore;
