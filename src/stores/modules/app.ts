import { defineStore } from "pinia";
import type { AppState } from "@/stores/interface";

const useAppStore = defineStore("appStore", {
  state: (): AppState => ({
    isCollapse: false
  }),
  actions: {
    changeCollapse(isCollapse: boolean) {
      this.isCollapse = isCollapse;
    }
  },
  persist: {
    storage: localStorage
  }
});

export default useAppStore;
