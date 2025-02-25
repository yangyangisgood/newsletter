<template>
  <PageBasic>
    <el-image :src="'/image/avatar.png'" fit="contain" class="avatar" />
    <p class="description">description。</p>

    <el-form>
      <el-form-item>
        <el-input v-model="name" placeholder="你是誰" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="email" placeholder="輸入你的電子郵件..." />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Subscribe</el-button>
      </el-form-item>
    </el-form>

    <el-button type="text" @click="navigateTo('/')">Learn More 〉</el-button>

    <el-dialog v-model="showSuccess">
      <p>訂閱成功！請檢查您的電子郵件。</p>
      <el-button type="primary" @click="navigateTo('/')">返回首頁</el-button>
    </el-dialog>

    <el-dialog v-model="showError">
      <p>系統錯誤，請稍後再試。</p>
    </el-dialog>
  </PageBasic>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageBasic from "~/compontens/page/PageBasic.vue";

const name = ref("");
const email = ref("");
const showSuccess = ref(false);
const showError = ref(false);

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = async () => {
  if (!validateEmail(email.value)) {
    alert("電子郵件格式錯誤！");
    return;
  }

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbypAdzpfJSbhYnzxIhBwH8w4ab6sK5Aywz7vliSw0V60NTLELJ9coe6nYUckwZ2ATvcog/exec",
      {
        method: "POST",
        body: JSON.stringify({ name: name.value, mail: email.value }),
        headers: { "Content-Type": "application/json" },
      }
    );
    showSuccess.value = true;
  } catch (error) {
    showError.value = true;
    console.error("訂閱失敗:", error);
  }
};
</script>

<style scoped>
.avatar {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.description {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}
</style>
