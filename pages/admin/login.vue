<template>
  <PageBasic>
    <el-form>
      <el-input v-model="formAdminLogin.account" placeholder="帳號" />
      <el-input
        v-model="formAdminLogin.password"
        type="password"
        placeholder="密碼"
      />
    </el-form>
    <el-button @click="handleLogin">登入</el-button>
  </PageBasic>
</template>

<script setup lang="ts">
import PageBasic from "~/compontens/page/PageBasic.vue";

type AdminLogin = { account: string; password: string };
const formAdminLogin = ref<AdminLogin>({
  account: "",
  password: "",
});
const token = useCookie("auth_token");

const handleLogin = async () => {
  try {
    const response: any = await $fetch(
      "https://script.google.com/macros/s/AKfycbzHMlu5HaExWQ554CEq-vPLpVlPPxw_JKblz2SHnDSNvJAoylLm1mx4K8oP3RpauVwf/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(formAdminLogin.value),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    );
    if (response.status === "success") {
      token.value = response.token;
      ElMessage.success("登入成功");
      navigateTo("/admin");
    } else {
      ElMessage.error("帳號或密碼錯誤");
    }
  } catch (error) {
    ElMessage.error("登入失敗");
    console.error("登入失敗:", error);
  }
};
</script>
