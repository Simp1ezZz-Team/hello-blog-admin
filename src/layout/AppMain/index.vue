<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
