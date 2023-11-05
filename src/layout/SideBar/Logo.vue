<template>
  <div class="sidebar-logo-container">
    <RouterLink key="expand" class="sidebar-logo-link" to="/">
      <svgIcon name="hello" size="50px" />
      <h1 class="sidebar-title">博客后台管理系统</h1>
    </RouterLink>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: left;
  overflow: hidden;

  .sidebar-logo-link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .sidebar-title {
    display: inline-block;
    color: $title;
    font-weight: 600;
    line-height: 60px;
    font-size: 20px;
    margin: 0 0 0 6px;
  }
}
</style>
