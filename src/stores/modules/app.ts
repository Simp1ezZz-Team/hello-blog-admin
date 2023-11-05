import { defineStore } from "pinia";
import type { AppState } from "@/stores/interface";

const useAppStore = defineStore("useAppStore", {
  state: (): AppState => ({
    isCollapse: false
  })
});

export default useAppStore;
