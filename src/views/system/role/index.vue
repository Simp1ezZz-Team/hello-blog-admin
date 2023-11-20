<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item label="角色名称">
        <el-input v-model="queryParams.roleName" placeholder="请输入角色名" style="width: 200px" clearable />
      </el-form-item>
      <el-form-item label="角色状态">
        <el-select v-model="queryParams.disableFlag" placeholder="角色状态" style="width: 200px" clearable>
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
      </el-form-item>
    </el-form>
    <div style="padding-bottom: 10px">
      <el-button type="primary" icon="Plus" @click="openAddDialog">新增</el-button>
      <el-button type="danger" icon="Delete" @click="batchDelete">批量删除</el-button>
    </div>
    <el-table stripe :data="roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="roleId" label="角色id" align="center" min-width="80px" />
      <el-table-column prop="roleName" label="角色名称" align="center" min-width="80px" />
      <el-table-column prop="roleDesc" label="角色描述" align="center" min-width="80px" />
      <el-table-column prop="status" label="状态" align="center" min-width="60px">
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
      <!--创建时间-->
      <el-table-column prop="createTime" label="创建时间" align="center" min-width="150px">
        <template #default="scope">
          <div class="create-time" v-if="scope.row.createTime">
            <el-icon>
              <Clock />
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center" min-width="130px">
        <template #default="scope">
          <el-button type="primary" icon="Edit" link @click="openEditDialog(scope.row)"> 编辑</el-button>
          <el-button type="primary" icon="Delete" link @click="deleteRole(scope.row)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination
      :total="count"
      v-model:page-num="queryParams.pageNum"
      v-model:page-size="queryParams.pageSize"
      @pagination="getList"
    />
    <!--弹出框-->
    <el-dialog v-model="addOrUpdate" :title="dialogTitle" append-to-body width="500px">
      <el-form ref="roleFormRef" label-width="100px" :model="roleForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="userForm.username"
            :disabled="userForm.userId != null"
            placeholder="请输入用户名"
            style="width: 250px"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="userForm.userId == null">
          <el-input
            type="password"
            v-model="userForm.password"
            placeholder="请输入密码"
            style="width: 250px"
            clearable
          />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="userForm.nickname" placeholder="请输入用户昵称" style="width: 250px" clearable />
        </el-form-item>
        <el-form-item label="角色" prop="roleIdList">
          <el-checkbox-group v-model="roleIdList" style="width: 250px">
            <el-checkbox v-for="userRole in userRoleList" :key="userRole.roleId" :label="userRole.roleId">
              {{ userRole.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="addOrUpdate = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
import { Clock } from "@element-plus/icons-vue";
import Pagination from "@/components/Pagination/index.vue";
import type { FormInstance, FormRules } from "element-plus";
import { messageConfirm, notifySuccess, notifyWarning } from "@/utils/modal";
import type { Role, RoleQuery } from "@/api/role/types";

const roleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "用户名长度在 3 到 20 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码不能少于6位", trigger: "blur" }
  ],
  roleIdList: [{ type: "array", min: 1, message: "请选择角色", trigger: "blur" }]
});

const data = reactive({
  addOrUpdate: false,
  dialogTitle: "",
  count: 0,
  multipleSelection: [] as Role[],
  queryParams: {
    pageNum: 1,
    pageSize: 10
  } as RoleQuery,
  statusList: [
    {
      label: "正常",
      value: 0
    },
    {
      label: "禁用",
      value: 1
    }
  ],
  roleList: [] as Role[],
  roleForm:
});

const { addOrUpdate, dialogTitle, count, queryParams, multipleSelection, statusList, roleList } = toRefs(data);

/**
 * 查询按钮
 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

/**
 * 打开新增用户窗口
 */
const openAddDialog = () => {
  addOrUpdate.value = true;
  userForm.value = {} as UserForm;
  roleIdList.value = [];
  dialogTitle.value = "新增用户";
};

/**
 * 打开编辑用户窗口
 * @param user
 */
const openEditDialog = (user: User) => {
  addOrUpdate.value = true;
  dialogTitle.value = "编辑用户";
  userForm.value.userId = user.userId;
  userForm.value.username = user.username;
  userForm.value.password = user.password;
  userForm.value.nickname = user.nickname;
  roleIdList.value = [];
  user.roleList.forEach(role => {
    roleIdList.value.push(role.roleId);
  });
  userFormRef.value?.clearValidate();
};

/**
 * 编辑或新增表单提交
 * 通过userForm的userId字段是否为空判断为新增或修改
 */
const submitForm = () => {
  userFormRef.value?.validate(valid => {
    if (valid) {
      userForm.value.roleIdList = roleIdList.value;
      // 更新用户
      if (userForm.value.userId != null) {
        updateUser(userForm.value).then(({ data }) => {
          if (data.flag) {
            notifySuccess(data.msg);
            getList();
            addOrUpdate.value = false;
          }
        });
      } else {
        // 新增用户
        addUser(userForm.value).then(({ data }) => {
          if (data.flag) {
            notifySuccess(data.msg);
            getList();
            addOrUpdate.value = false;
          }
        });
      }
    } else {
      return false;
    }
  });
};

/**
 * 删除用户
 * @param user
 */
const deleteRole = (user: User) => {
  messageConfirm("确定要删除用户【" + user.username + "】吗?").then(() => {
    deleteUserById(user.userId).then(({ data }) => {
      if (data.flag) {
        notifySuccess(data.msg);
        getList();
      }
    });
  });
};

const batchDelete = () => {
  if (multipleSelection.value.length === 0) {
    notifyWarning("请选择要删除的用户");
    return;
  }
  messageConfirm("确定要删除选中的用户吗?").then(() => {
    const userIds = multipleSelection.value.map(user => user.userId);
    deleteUserBatch(userIds).then(({ data }) => {
      if (data.flag) {
        notifySuccess(data.msg);
        getList();
      }
    });
  });
};

/**
 * 修改用户状态
 * @param user
 */
const handleChangeStatus = (user: User) => {
  const text = user.disableFlag === 0 ? "解封" : "封禁";
  messageConfirm("确定要" + text + user.username + "吗?").then(() => {
    updateUserStatus({ id: user.userId, disableFlag: user.disableFlag }).then(({ data }) => {
      if (data.flag) {
        notifySuccess(data.msg);
      } else {
        user.disableFlag = user.disableFlag === 0 ? 1 : 0;
      }
    });
  });
};

/**
 * 获取用户列表
 */
const getList = () => {
  getUserList(queryParams.value).then(({ data }) => {
    userList.value = data.data.records;
    count.value = data.data.total;
  });
};

/**
 * 初始化获取用户列表及全部角色列表
 */
onMounted(() => {
  getList();
  getUserRoleList().then(({ data }) => {
    userRoleList.value = data.data;
  });
});
</script>

<style scoped lang="scss"></style>
