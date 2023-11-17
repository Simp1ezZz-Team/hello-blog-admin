<template>
  <el-pagination
    class="pagination-container"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="pageSizes"
    :background="background"
    :layout="layout"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import { computed } from "vue";

const props = defineProps({
  total: {
    required: true,
    type: Number as PropType<number>,
    default: 0
  },
  pageNum: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 50, 100, 200, 500];
    }
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper"
  },
  background: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["update:pageNum", "update:pageSize", "pagination"]);

const currentPage = computed({
  get: () => props.pageNum,
  set: val => {
    emit("update:pageNum", val);
  }
});

const pageSize = computed({
  get() {
    return props.pageSize;
  },
  set(val) {
    emit("update:pageSize", val);
  }
});

const handleSizeChange = (val: number) => {
  emit("pagination", { pageNum: currentPage.value, pageSize: val });
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  emit("pagination", { pageNum: val, pageSize: pageSize.value });
};
</script>
<style scoped lang="scss"></style>
