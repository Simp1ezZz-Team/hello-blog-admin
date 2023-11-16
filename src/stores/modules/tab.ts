import { defineStore } from "pinia";
import type { TabView, TabViewState } from "@/stores/interface";

const useTabStore = defineStore("tabStore", {
  state: (): TabViewState => ({
    visitedViews: []
  }),
  actions: {
    /**
     * 添加已访问的路由信息到仓库
     * @param view
     */
    addVisitedView(view: TabView) {
      // 如果不存在则添加
      if (this.visitedViews.some(v => v.path === view.path)) return;
      // 如果该路由设置为固定，即meta.affix==true，则将该路由放到tab页最前面
      if (view.meta && view.meta.affix) {
        this.visitedViews.unshift(
          Object.assign({}, view, {
            title: view.meta?.title || "新标签页"
          })
        );
      } else {
        this.visitedViews.push(
          Object.assign({}, view, {
            title: view.meta?.title || "新标签页"
          })
        );
      }
    },

    /**
     * 在已访问路由中删除当前传入的路由信息
     * @param view
     */
    delVisitedView(view: TabView) {
      return new Promise(resolve => {
        for (const [i, v] of this.visitedViews.entries()) {
          // 如果传入的路由的path在仓库中，则删除该路由
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },

    /**
     * 删除除了传入的路由及固定的路由之外的已访问路由信息
     * @param view
     */
    delOtherVisitedViews(view: any) {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter(v => {
          return v.meta?.affix || v.path === view.path;
        });
        resolve([...this.visitedViews]);
      });
    },
    updateVisitedView(view: any) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
    delLeftViews(view: any) {
      return new Promise(resolve => {
        const currIndex = this.visitedViews.findIndex(v => v.path === view.path);
        if (currIndex === -1) {
          return;
        }
        this.visitedViews = this.visitedViews.filter((item, index) => {
          // affix:true 固定tab，例如“首页”
          return !!(index >= currIndex || (item.meta && item.meta.affix));
        });
        resolve({
          visitedViews: [...this.visitedViews]
        });
      });
    },
    delRightViews(view: any) {
      return new Promise(resolve => {
        const currIndex = this.visitedViews.findIndex(v => v.path === view.path);
        if (currIndex === -1) {
          return;
        }
        this.visitedViews = this.visitedViews.filter((item, index) => {
          // affix:true 固定tab，例如“首页”
          return !!(index <= currIndex || (item.meta && item.meta.affix));
        });
        resolve({
          visitedViews: [...this.visitedViews]
        });
      });
    },
    addView(view: any) {
      this.addVisitedView(view);
    },
    delView(path: string) {
      return new Promise(resolve => {
        this.delVisitedView({ path: path });
        resolve({
          visitedViews: [...this.visitedViews]
        });
      });
    },
    delOtherViews(view: any) {
      return new Promise(resolve => {
        this.delOtherVisitedViews(view);
        resolve({
          visitedViews: [...this.visitedViews]
        });
      });
    },
    delAllViews() {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter(tab => tab.meta?.affix);
        resolve({
          visitedViews: [...this.visitedViews]
        });
      });
    }
  },
  getters: {
    lastView(): TabView | undefined {
      return this.visitedViews.at(-1);
    },
    hasView() {
      return (tabPath: string) => this.visitedViews.some(tab => tab.path === tabPath);
    }
  }
});

export default useTabStore;
