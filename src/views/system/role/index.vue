<template>
  <div class="app-container">
    <el-form :model="queryParams" :inline="true">
      <el-form-item label="角色名称">
        <el-input v-model="queryParams.roleName" placeholder="请输入角色名称" style="width: 200px" clearable />
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
    <el-row :gutter="10" style="margin-bottom: 15px">
      <el-col :span="1.5">
        <el-button type="primary" icon="Plus" @click="openAddDialog">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="Delete" @click="batchDelete">批量删除</el-button>
      </el-col>
    </el-row>
    <el-table stripe :data="roleList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="roleId" label="角色ID" align="center" min-width="80" />
      <el-table-column prop="roleName" label="角色名称" align="center" min-width="80" />
      <el-table-column prop="roleDesc" label="角色描述" align="center" mmin-width="160" />
      <el-table-column prop="status" label="角色状态" align="center" min-width="80">
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
      <el-table-column prop="createTime" label="创建时间" align="center" min-width="180" />

      <!-- 操作 -->
      <el-table-column label="操作" align="center" min-width="160">
        <template #default="scope">
          <el-button type="primary" icon="Edit" link @click="openEditDialog(scope.row)"> 编辑</el-button>
          <el-button type="danger" icon="Delete" link @click="deleteRole(scope.row)"> 删除</el-button>
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
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名" style="width: 250px" clearable />
        </el-form-item>
        <el-form-item label="角色状态" prop="disableFlag">
          <el-radio-group v-model="roleForm.disableFlag">
            <el-radio v-for="disableFlag in disableFlags" :key="disableFlag.value" :label="disableFlag.value">
              {{ disableFlag.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand">展开/折叠</el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll">全选/全不选</el-checkbox>
          <el-checkbox v-model="menuCheckStrictly">父子联动</el-checkbox>
          <el-tree
            class="tree-border"
            :data="treeData"
            show-checkbox
            ref="treeRef"
            node-key="menuId"
            :default-expand-all="false"
            :check-strictly="!menuCheckStrictly"
            empty-text="加载中，请稍候"
            :props="defaultProps"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input
            v-model="roleForm.roleDesc"
            :autosize="{ minRows: 2, maxRows: 4 }"
            resize="none"
            type="textarea"
            placeholder="请输入内容"
          />
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
import Pagination from "@/components/Pagination/index.vue";
import type { FormInstance, FormRules } from "element-plus";
import { messageConfirm, notifySuccess, notifyWarning } from "@/utils/modal";
import type { Role, RoleForm, RoleQuery } from "@/api/role/types";
import {
  addRole,
  deleteRoleBatch,
  deleteRoleById,
  getRoleById,
  getRoleList,
  getRoleMenuIdList,
  updateRole,
  updateRoleStatus
} from "@/api/role";
import type { MenuTree } from "@/api/menu/types";
import { ElTree } from "element-plus";
import { getMenuTree } from "@/api/menu";

const roleFormRef = ref<FormInstance>();
const treeRef = ref<InstanceType<typeof ElTree>>();
const rules = reactive<FormRules>({
  roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
});
const defaultProps = {
  children: "children",
  label: "menuName"
};

const data = reactive({
  addOrUpdate: false,
  menuExpand: false,
  menuNodeAll: false,
  menuCheckStrictly: false,
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
  roleList: [] as Role[],
  roleForm: {} as RoleForm,
  treeData: [] as MenuTree[]
});

const {
  addOrUpdate,
  menuExpand,
  menuNodeAll,
  menuCheckStrictly,
  dialogTitle,
  count,
  multipleSelection,
  queryParams,
  statusList,
  disableFlags,
  roleList,
  roleForm,
  treeData
} = toRefs(data);

/**
 * 查询按钮
 */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
};

/**
 * 多选绑定值
 * @param val
 */
const handleSelectionChange = (val: Role[]) => {
  multipleSelection.value = val;
};

/**
 * 打开新增角色窗口
 */
const openAddDialog = () => {
  reset();
  addOrUpdate.value = true;
  roleForm.value = {} as RoleForm;
  dialogTitle.value = "新增角色";
};

/**
 * 打开编辑角色窗口
 * @param role
 */
const openEditDialog = (role: Role) => {
  addOrUpdate.value = true;
  dialogTitle.value = "编辑角色";
  reset();
  // 获取最新用户信息
  getRoleById(role.roleId).then(({ data }) => {
    roleForm.value.roleId = data.data.roleId;
    roleForm.value.roleName = data.data.roleName;
    roleForm.value.roleDesc = data.data.roleDesc;
    roleForm.value.disableFlag = data.data.disableFlag;
  });
  // 获取角色菜单权限
  getRoleMenuIdList(role.roleId).then(({ data }) => {
    treeRef.value!.setCheckedKeys(data.data);
  });
  roleFormRef.value?.clearValidate();
};

/**
 * 编辑或新增表单提交
 * 通过roleForm的roleId字段是否为空判断为新增或修改
 */
const submitForm = () => {
  roleFormRef.value?.validate(valid => {
    if (valid) {
      roleForm.value.menuIdList = getMenuAllCheckedKeys();
      // 更新用户
      if (roleForm.value.roleId != undefined) {
        updateRole(roleForm.value).then(({ data }) => {
          if (data.flag) {
            notifySuccess(data.msg);
            getList();
            addOrUpdate.value = false;
          }
        });
      } else {
        // 新增用户
        addRole(roleForm.value).then(({ data }) => {
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
 * @param role
 */
const deleteRole = (role: Role) => {
  messageConfirm("确定要删除角色【" + role.roleName + "】吗?").then(() => {
    deleteRoleById(role.roleId).then(({ data }) => {
      if (data.flag) {
        notifySuccess(data.msg);
        getList();
      }
    });
  });
};

/**
 * 批量删除角色
 */
const batchDelete = () => {
  if (multipleSelection.value.length === 0) {
    notifyWarning("请选择要删除的角色");
    return;
  }
  messageConfirm("确定要删除选中的角色吗?").then(() => {
    const roleIds = multipleSelection.value.map(role => role.roleId);
    deleteRoleBatch(roleIds).then(({ data }) => {
      if (data.flag) {
        notifySuccess(data.msg);
        getList();
      }
    });
  });
};

/**
 * 修改角色状态
 * @param role
 */
const handleChangeStatus = (role: Role) => {
  const text = role.disableFlag === 0 ? "启用" : "停用";
  messageConfirm("确定要" + text + role.roleName + "吗?").then(() => {
    updateRoleStatus({ id: role.roleId, disableFlag: role.disableFlag }).then(({ data }) => {
      if (data.flag) {
        notifySuccess(data.msg);
      } else {
        role.disableFlag = role.disableFlag === 0 ? 1 : 0;
      }
    });
  });
};

/**
 * 展开折叠菜单权限
 */
const handleCheckedTreeExpand = () => {
  const nodesMap = treeRef.value!.store.nodesMap;
  for (const j in nodesMap) {
    nodesMap[j].expanded = menuExpand.value;
  }
};

/**
 * 菜单权限全选/取消
 */
const handleCheckedTreeNodeAll = () => {
  treeRef.value!.setCheckedNodes(menuNodeAll.value ? (treeData.value as Node[]) : []);
};

/**
 * 获取所有选择的菜单权限
 */
const getMenuAllCheckedKeys = () => {
  // 目前被选中的菜单节点
  const checkedKeys = treeRef.value!.getCheckedKeys();
  // 半选中的菜单节点
  const halfCheckedKeys = treeRef.value!.getHalfCheckedKeys();
  checkedKeys.unshift(...halfCheckedKeys);
  return checkedKeys;
};

/**
 * 重置表单
 */
const reset = () => {
  if (treeRef.value !== undefined) {
    treeRef.value.setCheckedKeys([]);
  }
  menuExpand.value = false;
  menuNodeAll.value = false;
  menuCheckStrictly.value = false;
  roleFormRef.value?.clearValidate();
};

/**
 * 获取角色列表
 */
const getList = () => {
  getRoleList(queryParams.value).then(({ data }) => {
    roleList.value = data.data.records;
    count.value = data.data.total;
  });
};

/**
 * 初始化获取角色列表
 */
onMounted(() => {
  getList();
  getMenuTree().then(({ data }) => {
    treeData.value = data.data;
  });
});
</script>

<style scoped lang="scss"></style>
