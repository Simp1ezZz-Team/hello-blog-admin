<template>
  <div class="header-container">
    <RouterLink key="expand" class="title-container" to="/">
      <svgIcon name="hello" size="32px" />
      <h1 class="title">博客后台管理系统</h1>
    </RouterLink>
    <div class="setting-container">
      <el-button class="button" circle><svg-icon name="search" size="18px" /></el-button>
      <el-button class="button" circle><svg-icon name="language" size="18px" /></el-button>
      <el-button class="button" circle><svg-icon name="sun" size="18px" /></el-button>
      <el-button class="button" circle><svg-icon name="msgBox" size="18px" /></el-button>
      <el-button class="button" circle><svg-icon name="setting" size="18px" /></el-button>
      <el-dropdown trigger="click" class="avatar-container">
        <el-button class="button" circle><svg-icon name="avatar" size="32px" /></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人主页</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.module.scss";

.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .title-container {
    display: flex;
    align-items: center;

    .title {
      color: $title;
      font-size: 20px;
      margin: 0 0 0 6px;
    }
  }

  .setting-container {
    display: flex;
    align-items: center;

    .button {
      width: 32px;
      height: 32px;
    }

    .avatar-container {
      margin-left: 12px;
    }
  }
}
</style>
