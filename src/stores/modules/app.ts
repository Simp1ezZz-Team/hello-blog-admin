import { defineStore } from "pinia";
import type { AppState } from "@/stores/interface";

const useAppStore = defineStore("useAppStore", {
  state: (): AppState => ({
    isCollapse: false
  }),
  actions: {
    changeCollapse(isCollapse: boolean) {
      this.isCollapse = isCollapse;
    }
  }
});

export default useAppStore;
