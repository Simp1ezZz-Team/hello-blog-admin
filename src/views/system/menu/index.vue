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
            @click="openAddDialog(scope.row)"
          >
            新增
          </el-button>
          <el-button type="primary" icon="Edit" link @click="openEditDialog(scope.row.menuId)"> 编辑</el-button>
          <el-button type="danger" icon="Delete" link @click="deleteMenu(scope.row.menuId)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="addOrUpdate" :title="dialogTitle" append-to-body width="680px" @close="closeDialog">
      <el-form ref="menuFormRef" :model="menuForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <el-tree-select
                v-model="menuForm.parentId"
                :data="menuOptions"
                placeholder="请选择上级菜单"
                check-strictly
                filterable
                :render-after-expand="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="menuForm.menuType">
                <el-radio label="D">目录</el-radio>
                <el-radio label="M">菜单</el-radio>
                <el-radio label="B">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="menuForm.menuType !== 'B'">
            <el-form-item label="菜单图标" prop="icon">
              <el-popover placement="bottom-start" :width="540" trigger="click">
                <template #reference>
                  <el-input v-model="menuForm.icon" placeholder="点击选择图标" readonly @click="showChooseIcon = true">
                    <template #prefix>
                      <svg-icon v-if="menuForm.icon" :name="menuForm.icon" />
                      <el-icon v-else style="height: 32px; width: 16px">
                        <Search />
                      </el-icon>
                    </template>
                  </el-input>
                </template>
                <icon-select @selected="selected" />
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number
                :min="1"
                controls-position="right"
                v-model="menuForm.orderNum"
                placeholder="请输入排序"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="menuForm.menuType !== 'B'">
            <el-form-item>
              <template #label>
                <span>
                  <el-tooltip content="访问的路由地址，如：user" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  路由地址
                </span>
              </template>
              <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="menuForm.menuType !== 'B'">
            <el-form-item>
              <template #label>
                <span>
                  <el-tooltip content="访问的组件路径，如：/user/index，默认在views目录下" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  组件路径
                </span>
              </template>
              <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="menuForm.menuType !== 'D'">
            <el-form-item>
              <template #label>
                <span>
                  <el-tooltip content="控制器中定义的权限字符，如：system:user:list" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  权限字符
                </span>
              </template>
              <el-input v-model="menuForm.perms" placeholder="请输入权限标识" maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="menuForm.menuType !== 'B'">
            <el-form-item>
              <template #label>
                <span>
                  <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  显示状态
                </span>
              </template>
              <el-radio-group v-model="menuForm.hiddenFlag">
                <el-radio v-for="hiddenFlag in hiddenFlags" :key="hiddenFlag.value" :label="hiddenFlag.value">
                  {{ hiddenFlag.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="menuForm.menuType !== 'B'">
            <el-form-item>
              <template #label>
                <span>
                  <el-tooltip content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  菜单状态
                </span>
              </template>
              <el-radio-group v-model="menuForm.disableFlag">
                <el-radio v-for="disableFlag in disableFlags" :key="disableFlag.value" :label="disableFlag.value">
                  {{ disableFlag.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRefs } from "vue";
import type { Menu, MenuForm, MenuOption, MenuQuery } from "@/api/menu/types";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { addMenu, deleteMenuById, getMenuById, getMenuList, getMenuOptions, updateMenu } from "@/api/menu";
import type { FormInstance, FormRules } from "element-plus";
import { QuestionFilled, Search } from "@element-plus/icons-vue";
import { messageConfirm, notifySuccess } from "@/utils/modal";

// 表单ref
const menuFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  menuName: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
  component: [{ required: true, message: "组件不能为空", trigger: "blur" }],
  orderNum: [{ required: true, message: "顺序不能为空", trigger: "blur" }],
  path: [{ required: true, message: "路由地址不能为空", trigger: "blur" }]
});

const data = reactive({
  expandAll: false,
  refreshTable: true,
  showChooseIcon: false,
  dialogTitle: "",
  addOrUpdate: false,
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
  hiddenFlags: [
    {
      label: "显示",
      value: 0
    },
    {
      label: "隐藏",
      value: 1
    }
  ],
  menuList: [] as Menu[],
  menuForm: {} as MenuForm,
  menuOptions: [] as MenuOption[]
});

const {
  expandAll,
  refreshTable,
  dialogTitle,
  addOrUpdate,
  showChooseIcon,
  queryParams,
  disableFlags,
  hiddenFlags,
  menuList,
  menuForm,
  menuOptions
} = toRefs(data);

/**
 * 重置表单数据
 */
const reset = () => {
  menuForm.value = {
    menuId: undefined,
    parentId: undefined,
    menuName: "",
    menuType: "M",
    path: undefined,
    icon: undefined,
    component: undefined,
    orderNum: 1,
    isHidden: 0,
    isDisable: 0,
    perms: undefined
  };
};
/**
 * 查询按钮
 */
const handleQuery = () => {
  getList();
};

/**
 * 新增菜单对话框
 * @param menu
 */
const openAddDialog = (menu?: Menu) => {
  reset();
  if (menu != undefined && menu.menuId) {
    menuForm.value.parentId = menu.menuId;
  } else {
    menuForm.value.parentId = 0;
  }
  dialogTitle.value = "新增菜单";
  addOrUpdate.value = true;
};

/**
 * 编辑菜单对话框
 * @param menuId
 */
const openEditDialog = (menuId: number) => {
  getMenuById(menuId).then(({ data }) => {
    menuForm.value = data.data;
    dialogTitle.value = "修改菜单";
    addOrUpdate.value = true;
  });
};

/**
 * 关闭对话框
 */
const closeDialog = () => {
  addOrUpdate.value = false;
  menuFormRef.value?.clearValidate();
  reset();
};

/**
 * 已选中的图标
 * @param name
 */
const selected = (name: string) => {
  menuForm.value.icon = name;
  showChooseIcon.value = false;
};

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

/**
 * 获取菜单列表
 */
const getList = () => {
  getMenuList(queryParams.value).then(({ data }) => {
    menuList.value = data.data;
  });
};

/**
 * 添加或编辑菜单表单提交
 */
const submitForm = () => {
  menuFormRef.value?.validate(valid => {
    if (valid) {
      if (menuForm.value.menuId != undefined) {
        updateMenu(menuForm.value).then(({ data }) => {
          if (data.flag) {
            notifySuccess(data.msg);
            getList();
          }
          closeDialog();
        });
      } else {
        addMenu(menuForm.value).then(({ data }) => {
          if (data.flag) {
            notifySuccess(data.msg);
            getList();
          }
          closeDialog();
        });
      }
    }
  });
};

/**
 * 删除菜单
 *
 * @param menuId
 */
const deleteMenu = (menuId: number) => {
  messageConfirm("确认删除该菜单？").then(() => {
    deleteMenuById(menuId).then(({ data }) => {
      if (data.flag) {
        notifySuccess(data.msg);
        getList();
      }
    });
  });
};

/**
 * 初始化
 */
onMounted(() => {
  getList();
  getMenuOptions().then(({ data }) => {
    const menuOption: MenuOption = { value: 0, label: "顶级菜单", children: data.data };
    menuOptions.value.push(menuOption);
  });
});
</script>

<style scoped lang="scss"></style>
