<template>
  <el-aside>
    <el-scrollbar>
      <el-menu
        class="menu"
        :default-active="activeMenu"
        :unique-opened="true"
        :collapse="isCollapse"
        :collapse-transition="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
      >
        <sidebar-item v-for="route in constantRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
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

const { app } = useStore();
const route = useRoute();
const activeMenu = computed(() => route.path);
const isCollapse = computed(() => app.isCollapse);
</script>

<style scoped lang="scss">
.menu {
  border-right: none;
}
</style>
