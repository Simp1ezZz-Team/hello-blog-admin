<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      ref="ruleFormRef"
      :rules="rules"
    >
      <div class="form-main">
        <h1 class="title">Hello Blog</h1>
        <h2 class="sub-title">博客后台管理系统</h2>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            size="large"
            placeholder="账号"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            size="large"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin(ruleFormRef)"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%"
            @click.prevent="handleLogin(ruleFormRef)"
          >
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="login-footer">
      <span
        >Copyright © 2023 - {{ new Date().getFullYear() }} By SimpleZzz</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import useStore from "@/stores";
import router from "@/router";
import { ElNotification } from "element-plus";

const { user } = useStore();
const loading = ref(false);
const loginForm = reactive({ username: "", password: "" });
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码不能少于6位", trigger: "blur" }
  ]
});
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      loading.value = true;
      user
        .Login(loginForm)
        .then(() => {
          ElNotification({
            title: "登录成功",
            message: "欢迎回来",
            type: "success"
          });
          router.push({ path: "/" });
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      return false;
    }
  });
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url("@/assets/images/login-bg1.jpg") no-repeat;
  background-size: cover;

  .login-form {
    width: 700px;
    border-radius: 40px;
    backdrop-filter: blur(10px);

    .form-main {
      color: #fff;
      padding: 20px 40px;

      .title {
        text-align: center;
        font-size: 60px;
      }

      .sub-title {
        text-align: center;
        font-size: 30px;
      }
    }
  }

  .login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: sans-serif;
    font-size: 14px;
    letter-spacing: 1px;
  }
}
</style>
