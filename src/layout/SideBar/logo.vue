<template>
  <div class="sidebar-logo-container">
    <RouterLink class="sidebar-logo-link" to="/">
      <svgIcon name="hello" size="50px" />
      <h1 class="sidebar-title" v-show="!app.isCollapse">HELLO BLOG</h1>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import useStore from "@/stores";

const { app } = useStore();
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.module.scss";

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  overflow: hidden;

  .sidebar-logo-link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar-title {
    display: inline-block;
    white-space: nowrap;
    color: $title;
    font-weight: 600;
    line-height: 60px;
    font-size: 20px;
    margin: 0 0 0 6px;
  }
}
</style>
