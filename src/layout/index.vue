<template>
  <el-container class="container">
    <!--侧边栏-->
    <SideBar />
    <el-container>
      <el-header class="header">
        <!--头部-->
        <Header />
        <!---->
        <TagView />
      </el-header>
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
import TagView from "@/components/TabView/index.vue";
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.module.scss";

.container {
  width: 100%;
  height: 100vh;

  .header {
    width: 100%;
    height: calc($headerHeight + $tabHeight);
    background-color: $headerBg;
    padding: 0;
  }

  .main {
    background-color: $mainBg;
  }
}
</style>
