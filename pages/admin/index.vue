<template>
  <PageBasic>
    <div>
      <h3>後台管理</h3>
      <el-button type="primary" @click="navigateTo('/')">home</el-button>
    </div>
    <el-form>
      <el-input v-model="addArticleForm.title" placeholder="標題" />
      <el-input
        type="textarea"
        autosize
        v-model="addArticleForm.content"
        placeholder="內容"
        :min-height="100"
      />
    </el-form>
    <el-button type="primary" @click="addArticle">add</el-button>
  </PageBasic>
</template>

<script setup lang="ts">
import PageBasic from "~/compontens/page/PageBasic.vue";
import { dateCodeMap } from "./mock-data";

type AddArticleForm = {
  title: string;
  content: string;
  date: string;
};
const addArticleForm = ref<AddArticleForm>({
  title: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
});

const addArticle = async () => {
  try {
    const body = {
      ...addArticleForm.value,
      content: addArticleForm.value.content.replace(/\n/g, "<br>"), // 將後台輸入的換行處(\n)直接換成<br>標籤傳進api方便之後render
      date: dateFormat.value, // 日期傳入格式化後的值
    };
    await $fetch(
      "https://script.google.com/macros/s/AKfycby2TMpkSFlOzY1rzGE0Pq617Wo2AtZcLbX62Rp1urh72GF_lVt-fUGkTD26cneVxZLn/exec",
      {
        redirect: "follow", // 重定向 for cors issue
        method: "POST",
        body, // body已在上面定義
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    );
    ElMessage.success("新增成功");
    navigateTo("/"); // 新增成功後回首頁，nuxt的路由會自動省略index，所以實際上是導到/index
  } catch {
    ElMessage.error("新增失敗");
  }
};

// 日期格式化
// 2025-01-01 => 1 Jan, 2025
// 月份轉換英文的codemap放在pages/admin/mock-data
const dateFormat = computed(() => {
  const dateArray = addArticleForm.value.date.split("-");
  const monthNumber = Number(dateArray?.[1]);
  const monthFormat = dateCodeMap.find(
    (item: { code: number }) => item.code === monthNumber
  )?.name;
  const formatDate = dateArray?.[2] + " " + monthFormat + "," + dateArray?.[0];
  return formatDate.toString(); // 確保回傳的是string
});
</script>
