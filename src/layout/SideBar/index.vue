<template>
  <el-aside class="sidebar-container">
    <el-scrollbar>
      <el-menu
        class="menu-container"
        :default-active="activeMenu"
        :unique-opened="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :router="true"
      >
        <sidebar-item v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
      <svg-icon class="collapse-button" name="collapse" size="24px" />
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import variables from "@/assets/styles/variables.module.scss";
import { useRoute } from "vue-router";
import { computed } from "vue";
import useStore from "@/stores";
import { constantRoutes } from "@/router";
import SidebarItem from "@/layout/SideBar/SidebarItem.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

const { app } = useStore();
const route = useRoute();
const activeMenu = computed(() => route.path);
const isCollapse = computed(() => app.isCollapse);
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.module.scss";

.sidebar-container {
  width: $sideBarWidth;
  overflow: hidden;
  background-color: $menuBg;
  .collapse-button {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 12px;
    cursor: pointer;
    padding: 5px;
    background-color: #f7f8fa;
  }
}

.menu-container {
  border-right: none;
}
</style>
