<template>
  <el-container class="container">
    <el-aside width="200px" class="aside">
      <logo :collapse="false" />
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Logo from "@/layout/SideBar/Logo.vue";
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  .aside {
    background-color: #304156;
  }
  .header {
    background-color: aqua;
  }
  .main {
    background-color: blueviolet;
  }
}
</style>
