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
    <el-row :gutter="10" style="margin-bottom: 15px">
      <el-col :span="1.5">
        <el-button type="primary" icon="Plus" @click="openAddDialog">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="Sort" @click="toggleExpandAll">
          {{ expandAll === false ? "展开全部" : "折叠全部" }}
        </el-button>
      </el-col>
    </el-row>
    <el-table
      v-if="refreshTable"
      :data="menuList"
      row-key="menuId"
      :default-expand-all="expandAll"
      highlight-current-row
    >
      <el-table-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="200" />
      <el-table-column prop="icon" label="图标" align="center" width="80">
        <template #default="scope">
          <svg-icon :name="scope.row.icon" size="1rem" />
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" width="60" />
      <el-table-column prop="menuType" label="类型" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.menuType === 'D'" type="warning">目录</el-tag>
          <el-tag v-if="scope.row.menuType === 'M'" type="success">菜单</el-tag>
          <el-tag v-if="scope.row.menuType === 'B'" type="danger">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="disableFlag" label="状态" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.disableFlag === 0">正常</el-tag>
          <el-tag v-if="scope.row.disableFlag === 1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="perms" label="权限标识" :show-overflow-tooltip="true" />
      <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true" />
      <el-table-column prop="hiddenFlag" label="是否隐藏" align="center" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.hiddenFlag === 0">显示</el-tag>
          <el-tag v-if="scope.row.hiddenFlag === 1" type="danger">隐藏</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" align="center" width="210">
        <template #default="scope">
          <el-button
            v-if="scope.row.menuType === 'D' || scope.row.menuType === 'M'"
            type="success"
            icon="Plus"
            link
            @click="openEditDialog(scope.row)"
          >
            新增</el-button
          >
          <el-button type="primary" icon="Edit" link @click="openEditDialog(scope.row)"> 编辑</el-button>
          <el-button type="danger" icon="Delete" link @click="deleteUser(scope.row)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, toRefs } from "vue";
import type { Menu, MenuQuery } from "@/api/menu/types";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { getMenuList } from "@/api/menu";

const data = reactive({
  expandAll: false,
  refreshTable: true,
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
  menuList: [] as Menu[]
});

const { expandAll, refreshTable, queryParams, disableFlags, menuList } = toRefs(data);

const handleQuery = () => {};

const openAddDialog = () => {};

/**
 * 展开折叠表格
 */
const toggleExpandAll = () => {
  refreshTable.value = false;
  expandAll.value = !expandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
};

const getList = () => {
  getMenuList(queryParams.value).then(({ data }) => {
    menuList.value = data.data;
  });
};

onMounted(() => {
  getList();
});
</script>

<style scoped lang="scss"></style>
