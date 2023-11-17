<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item label="用户昵称">
        <el-input v-model="queryParams.nickname" placeholder="请输入用户昵称" style="width: 200px" clearable />
      </el-form-item>
      <el-form-item label="登录方式">
        <el-select v-model="queryParams.loginType" placeholder="请选择登录方式" style="width: 200px" clearable>
          <el-option v-for="type in typeList" :key="type.value" :label="type.label" :value="type.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" border>
      <el-table-column prop="userId" label="用户id" align="center" />
      <el-table-column prop="avatar" label="用户头像" align="center">
        <template #default="scope">
          <el-image :src="scope.row.avatar" style="width: 60px; height: 60px" />
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="用户昵称" align="center" />
      <el-table-column prop="loginType" label="登录方式" align="center">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.loginType == 1">邮箱</el-tag>
          <el-tag v-if="scope.row.loginType == 2">QQ</el-tag>
          <el-tag type="danger" v-if="scope.row.loginType == 3">Gitee</el-tag>
          <el-tag type="info" v-if="scope.row.loginType == 4">Github</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleList" label="用户角色" align="center">
        <template #default="scope">
          <el-tag v-for="role in scope.row.roleList" :key="role.id" style="margin-right: 4px; margin-top: 4px">
            {{ role.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-switch
            v-model="scope.row.disableFlag"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="1"
            @change="handleChangeStatus(scope.row)"
          />
        </template>
      </el-table-column>
      <!-- 登录ip -->
      <el-table-column prop="ipAddress" label="登录ip" align="center" />
      <!-- 登录地址 -->
      <el-table-column prop="ipSource" label="登录地址" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center">
        <template #default="scope">
          <div class="create-time">
            <el-icon>
              <Clock />
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- 登录时间 -->
      <el-table-column prop="loginTime" label="登录时间" align="center">
        <template #default="scope">
          <div class="create-time">
            <el-icon>
              <Clock />
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.loginTime }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" icon="Edit" link @click="openModel(scope.row)"> 编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="count"
      v-model:page-num="queryParams.pageNum"
      v-model:page-size="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import type { User, UserQuery } from "@/api/user/types";
import { Clock } from "@element-plus/icons-vue";
import { getUserList } from "@/api/user";
import Pagination from "@/components/Pagination/index.vue";

const data = reactive({
  count: 0,
  queryParams: {
    pageNum: 1,
    pageSize: 10
  } as UserQuery,
  typeList: [
    {
      value: 1,
      label: "邮箱"
    },
    {
      value: 2,
      label: "QQ"
    },
    {
      value: 3,
      label: "Gitee"
    },
    {
      value: 4,
      label: "Github"
    }
  ],
  userList: [] as User[]
});

const { count, queryParams, typeList, userList } = toRefs(data);

const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

const handleChangeStatus = (user: User) => {};

const openModel = (user: User) => {};

const getList = () => {
  getUserList(queryParams.value).then(({ data }) => {
    userList.value = data.data.records;
    count.value = data.data.total;
  });
};

onMounted(() => {
  getList();
});
</script>

<style scoped lang="scss"></style>
