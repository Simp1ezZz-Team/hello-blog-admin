<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item label="用户名">
        <el-input v-model="queryParams.menuName" placeholder="请输入菜单名称" style="width: 200px" clearable />
      </el-form-item>
      <el-form-item label="菜单状态">
        <el-select v-model="queryParams.disableFlag" placeholder="禁用状态" style="width: 200px" clearable>
          <el-option v-for="item in disableFlags" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button type="primary" icon="Plus" @click="openAddDialog">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="Delete" @click="batchDelete">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="menuList" row-key="menuId" highlight-current-row>
      <el-table-column />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import type { Menu, MenuQuery } from "@/api/menu/types";

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10
  } as MenuQuery,
  disableFlags: [
    {
      label: "正常",
      value: 0
    },
    {
      label: "禁用",
      value: 1
    }
  ],
  menuList: [] as Menu
});

const { queryParams, disableFlags, menuList } = toRefs(data);

const handleQuery = () => {};

const openAddDialog = () => {};

const batchDelete = () => {};
</script>

<style scoped lang="scss"></style>
