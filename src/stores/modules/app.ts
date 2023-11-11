import { defineStore } from "pinia";
import type { AppState } from "@/stores/interface";

const useAppStore = defineStore("appStore", {
  state: (): AppState => ({
    isCollapse: false,
    refresh: false
  }),
  actions: {
    changeCollapse(isCollapse: boolean) {
      this.isCollapse = isCollapse;
    },
    changeRefresh() {
      this.refresh = !this.refresh;
    }
  },
  persist: {
    storage: localStorage
  }
});

export default useAppStore;
