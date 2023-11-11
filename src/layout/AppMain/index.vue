<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" v-if="show" />
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import useStore from "@/stores/index";

const { appStore } = useStore();

const show = ref(true);
/**
 * 监听刷新请求，销毁并重新创建页面
 */
watch(
  () => appStore.refresh,
  () => {
    show.value = false;
    nextTick(() => {
      show.value = true;
    });
  }
);
</script>

<style scoped lang="scss"></style>
