<template>
  <el-container class="container">
    <el-header class="header">
      <Header />
    </el-header>
    <el-container>
      <SideBar />
      <el-main class="main">
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import SideBar from "./SideBar/index.vue";
import Header from "@/layout/Header/index.vue";
import AppMain from "@/layout/AppMain/index.vue";
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

  .main {
    background-color: $mainBg;
  }
}
</style>
