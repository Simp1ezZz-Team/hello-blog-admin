<template>
  <el-container class="container">
    <el-header class="header"><logo /></el-header>
    <el-container>
      <SideBar class="sidebar-container" />
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SideBar from "./SideBar/index.vue";
import Logo from "@/layout/SideBar/Logo.vue";
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.module.scss";
.container {
  width: 100%;
  height: 100vh;
  .header {
    width: 100%;
    height: $headerHeight;
    background-color: $headerBg;
  }
  .sidebar-container {
    width: $sideBarWidth;
    overflow: hidden;
    background-color: $menuBg;
  }
  .main {
    background-color: $mainBg;
  }
}
</style>
