<template>
  <el-scrollbar class="tab_container">
    <el-tabs
      v-model="activeTabName"
      type="card"
      class="tabs"
      :before-leave="beforeLeave"
      @tab-click="clickTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        class="tab-pane"
        v-for="item in visitedTabs"
        :key="item.path"
        :name="item.path"
        :label="item?.meta?.title"
        :closable="!isAffix(item)"
      />
    </el-tabs>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import useStore from "@/stores/index";
import { type RouteRecordRaw, useRoute, useRouter } from "vue-router";
import type { TabsPaneContext } from "element-plus";
import type { TabView } from "@/stores/interface";

const activeTabName = ref();
const route = useRoute();
const $router = useRouter();
const { tabStore, permissionStore } = useStore();
const visitedTabs = computed(() => tabStore.visitedViews);
/**
 * 添加标签页
 * 向tab仓库中新增
 */
const addTab = () => {
  if (route.name) {
    tabStore.addView(route);
  }
};

/**
 * 将选中的菜单当作激活的标签页
 */
const moveToCurrentTab = () => {
  activeTabName.value = route.path;
};

/**
 * 是否是固定的标签页
 * 非固定标签页有删除按钮
 * @param view 标签页
 */
const isAffix = (view: TabView): boolean => {
  return !!(view.meta && view.meta.affix);
};

/**
 * 点击标签页触发事件
 * 跳转到对应的路由
 * @param pane
 */
const clickTab = (pane: TabsPaneContext) => {
  if (pane.paneName) {
    $router.push({ path: pane.paneName as string });
  }
};

const beforeLeave = (paneName: string) => {
  $router.push({ path: paneName });
};

/**
 * 点击删除标签页按钮触发
 * @param paneName
 */
const removeTab = (paneName: string) => {
  // 删除visitedView
  tabStore.delView(paneName).then(() => {
    // 设置激活的tab，如果删除的tab是当前激活的tab页，则将激活的tab页设置为最后一个tab页
    if (paneName === activeTabName.value) {
      const activeTab = tabStore.visitedViews.at(-1);
      activeTabName.value = activeTab?.path;
    }
  });
};
const filterAffixTabs = (routers: RouteRecordRaw[], basePath: string = ""): TabView[] => {
  let tabs: TabView[] = [];
  routers.forEach(route => {
    if (route.meta && route.meta.affix) {
      const tabPath = getNormalPath(basePath + "/" + route.path);
      tabs.push({
        fullPath: tabPath,
        path: tabPath,
        name: route.name,
        meta: { ...route.meta }
      });
    }
    if (route.children) {
      const childTabs = filterAffixTabs(route.children, route.path);
      if (childTabs.length > 0) {
        tabs = tabs.concat(childTabs);
      }
    }
  });
  return tabs;
};

const getNormalPath = (p: string) => {
  if (p.length === 0 || !p || p == "undefined") {
    return p;
  }
  const res = p.replace("//", "/");
  if (res[res.length - 1] === "/") {
    return res.slice(0, res.length - 1);
  }
  return res;
};

const initTabs = () => {
  //TODO 删除setRoutes
  permissionStore.setRoutes([]);
  const tabs: TabView[] = filterAffixTabs(permissionStore.routes);
  tabs.forEach(tab => {
    tabStore.addView(tab);
  });
};

/**
 * 监听路由变化，新增tab页并跳转到对应的tab页
 */
watch(
  route,
  () => {
    addTab();
    moveToCurrentTab();
  },
  {
    //初始化立即执行
    immediate: true
  }
);

/**
 * 初始化标签页
 * 将路由中所有固定的标签页初始化到仓库
 */
onMounted(() => {
  initTabs();
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.module.scss";

.tab_container {
  height: $tabHeight;

  .tabs {
    height: $tabHeight;
    --el-tabs-header-height: 34px;
    margin: 0;

    .tab-pane {
      margin: 0;
    }
  }
}
</style>
