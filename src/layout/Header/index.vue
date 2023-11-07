<template>
  <div class="header-container">
    <div class="breadcrumb-container">
      <svg-icon
        @click="changeCollapse"
        class="collapse-button"
        :name="app.isCollapse ? 'expand' : 'collapse'"
        size="24px"
      />
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item v-for="route in currentRoute.matched" :key="route.path" v-show="route.meta.title">
          <span>{{ route.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
import useStore from "@/stores";
import { useRoute } from "vue-router";

const currentRoute = useRoute();
const { app } = useStore();
const changeCollapse = () => {
  app.changeCollapse(!app.isCollapse);
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.module.scss";

.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .breadcrumb-container {
    display: flex;
    align-items: center;
    .collapse-button {
      cursor: pointer;
    }
    .breadcrumb {
      margin-left: 20px;
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
