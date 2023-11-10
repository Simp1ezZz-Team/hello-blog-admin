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
      <template v-for="item in visitedTabs" :key="item.path">
        <el-tab-pane class="tab-pane" :name="item.path" :label="item?.meta?.title" :closable="!isAffix(item)">
          <template #label>
            <el-dropdown
              trigger="contextmenu"
              :id="item.path"
              @visible-change="handleChange($event, item.path)"
              ref="dropdownRef"
            >
              <span :class="activeTabName === item.path ? 'label' : ''">
                {{ item.title }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="!isAffix(item)" @click="removeTab(item.path as string)">
                    <el-icon>
                      <Close />
                    </el-icon>
                    关闭当前
                  </el-dropdown-item>
                  <el-dropdown-item @click.stop="removeOtherTabs(item)">
                    <el-icon>
                      <CircleClose />
                    </el-icon>
                    关闭其他
                  </el-dropdown-item>
                  <el-dropdown-item v-if="!isFirstTab(item)" @click.stop="removeLeftTabs(item)">
                    <el-icon>
                      <Close />
                    </el-icon>
                    关闭左侧
                  </el-dropdown-item>
                  <el-dropdown-item v-if="!isLastTab(item)" @click.stop="removeRightTabs(item)">
                    <el-icon>
                      <Close />
                    </el-icon>
                    关闭右侧
                  </el-dropdown-item>
                  <el-dropdown-item @click.stop="removeAllTabs(item)">
                    <el-icon>
                      <CircleClose />
                    </el-icon>
                    关闭全部
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import useStore from "@/stores/index";
import { type RouteRecordRaw, useRoute, useRouter } from "vue-router";
import type { TabsPaneContext } from "element-plus";
import type { TabView } from "@/stores/interface";
import { CircleClose, Close } from "@element-plus/icons-vue";

const activeTabName = ref();
const dropdownRef = ref();

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
const isAffix = (view: TabView): undefined | boolean => {
  return view.meta && view.meta.affix;
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
 * 处理右键点击多个tab页时下拉列表重复出现的问题
 * @param visible
 * @param name
 */
const handleChange = (visible: boolean, name: string | undefined) => {
  if (!visible) return;
  dropdownRef.value.forEach((item: { id: string; handleClose: () => void }) => {
    if (item.id === name) return;
    item.handleClose();
  });
};

/**
 * 关闭其他标签页
 * @param tab 选中的tab
 */
const removeOtherTabs = (tab: TabView) => {
  tabStore.delOtherViews(tab).then(() => {
    //设置激活的tab为当前选中的tab
    activeTabName.value = tab.path;
  });
};

/**
 * 选中的tab是否为第一个tab
 * @param tab 选中的tab
 */
const isFirstTab = (tab: TabView) => {
  return tabStore.visitedViews[0].path === tab.path;
};

/**
 * 删除选中的tab左侧tab
 * @param tab 选中的tab
 */
const removeLeftTabs = (tab: TabView) => {
  tabStore.delLeftViews(tab).then(() => {
    // 如果选中的不是已经激活的tab，而且已经激活的tab已经被删除，那就把激活的tab设置为当前选中的tab
    if (activeTabName.value !== tab.path) {
      if (!tabStore.hasView(activeTabName.value)) {
        activeTabName.value = tab.path;
      }
    }
  });
};

/**
 * 选中的tab是否是最后一个tab
 * @param tab 选中的tab
 */
const isLastTab = (tab: TabView) => {
  return tabStore.visitedViews[tabStore.visitedViews.length - 1].path === tab.path;
};

/**
 * 删除选中的tab右侧tab
 * @param tab 选中的tab
 */
const removeRightTabs = (tab: TabView) => {
  tabStore.delRightViews(tab).then(() => {
    // 如果选中的不是已经激活的tab，而且已经激活的tab已经被删除，那就把激活的tab设置为当前选中的tab
    if (activeTabName.value !== tab.path) {
      if (!tabStore.hasView(activeTabName.value)) {
        activeTabName.value = tab.path;
      }
    }
  });
};

/**
 * 删除全部tab，除了固定的tab
 * @param tab
 */
const removeAllTabs = (tab: TabView) => {
  tabStore.delAllViews().then(() => {
    // 如果选中的tab不是固定的tab，则把激活的tab设置为第一个tab，如果选中的tab是固定的tab，则把激活的tab设置为选中的tab
    if (isAffix(tab)) {
      activeTabName.value = tab.path;
    } else {
      activeTabName.value = tabStore.visitedViews[0].path;
    }
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

.label {
  color: var(--el-color-primary); //激活标签页高亮
}

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
