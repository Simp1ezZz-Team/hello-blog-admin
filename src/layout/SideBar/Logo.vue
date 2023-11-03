<template>
  <div class="sidebar-logo-container" :class="{ collapse: isCollapse }">
    <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
      <svgIcon v-if="collapse" name="electron" size="30px" />
      <h1 v-else class="sidebar-title">博客后台管理系统</h1>
    </router-link>
    <RouterLink v-else key="expand" class="sidebar-logo-link" to="/">
      <svgIcon name="electron" size="30px" />
      <h1 class="sidebar-title">博客后台管理系统</h1>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";

const props = defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
});

const state = reactive({
  isCollapse: props.collapse
});

const { isCollapse } = toRefs(state);
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  overflow: hidden;
  .sidebar-logo-link {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .sidebar-logo {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }

  .sidebar-title {
    display: inline-block;
    margin: 0;
    color: #fff;
    font-weight: 600;
    line-height: 60px;
    font-size: 14px;
    font-family:
      Avenir,
      Helvetica Neue,
      Arial,
      Helvetica,
      sans-serif;
    vertical-align: middle;
    margin-left: 12px;
  }

  .collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
