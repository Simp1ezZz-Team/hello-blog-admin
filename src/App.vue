<template>
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>
<style lang="scss" scoped></style>
