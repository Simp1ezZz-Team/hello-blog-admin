<template>
  <template v-if="item.meta || item.children">
    <template v-if="item.meta?.title && !item.meta?.hidden">
      <el-sub-menu v-if="item.children" :index="resolvePath(item.path)">
        <template #title>
          <el-icon size="18">
            <svg-icon class="icon" :name="item.meta.icon ? item.meta.icon : 'hello'" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <SidebarItem
          v-for="child in item.children"
          :item="child"
          :base-path="resolvePath(item.path)"
          :key="child.path"
        />
      </el-sub-menu>

      <el-menu-item v-else :index="resolvePath(item.path)">
        <el-icon size="18">
          <svg-icon class="icon" :name="item.meta.icon ? item.meta.icon : 'hello'" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <template v-else-if="item.children">
      <SidebarItem v-for="child in item.children" :item="child" :base-path="resolvePath(item.path)" :key="child.path" />
    </template>
  </template>
</template>

<script setup lang="ts">
import { type RouteRecordRaw } from "vue-router";
import type { PropType } from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  basePath: {
    type: String,
    required: true
  }
});

const resolvePath = (routePath: string) => {
  return getNormalPath(props.basePath + "/" + routePath);
};
const getNormalPath = (p: string) => {
  if (p.length === 0 || !p || p == "undefined") {
    return p;
  }
  const res = p.replace("//", "/");
  if (res[res.length - 1] === "/") {
    return res.slice(0, res.length - 1);
  }
  return res;
};
</script>

<style scoped lang="scss">
span {
  font-size: 14px;
}

// 修复svg图标位置无法点击的问题
.icon {
  pointer-events: none;
}
</style>
