<template>
  <PageBasic>
    <el-row align="middle" justify="space-between" class="nav-bar">
      <el-image class="nav-img" :src="'/image/avatar.png'" fit="contain" />
      <h1 class="nav-title">title</h1>
      <button class="subscribe-btn" @click="navigateTo('/subscribe')">
        Subscribe
      </button>
    </el-row>

    <el-skeleton :loading="loading" animated>
      <el-collapse
        v-if="articles.length"
        accordion
        border-color="#eee"
        header-text-color="#888"
        content-bg-color="#f9f9f9"
      >
        <el-collapse-item v-for="(article, index) in articles" :key="index">
          <template #title>
            <div class="title-container">
              <p class="title">{{ article.title }}</p>
              <p class="date">{{ article.date }}</p>
            </div>
          </template>
          <p class="content" v-html="article.content" />
        </el-collapse-item>
      </el-collapse>
      <p v-else>no content</p>
    </el-skeleton>
  </PageBasic>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import PageBasic from "~/compontens/page/PageBasic.vue";

interface Article {
  title: string;
  date: string;
  content: string;
}

const loading = ref(true);
const articles = ref<Article[]>([]);

onMounted(async () => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby2TMpkSFlOzY1rzGE0Pq617Wo2AtZcLbX62Rp1urh72GF_lVt-fUGkTD26cneVxZLn/exec"
    );
    articles.value = await response.json();
  } catch (error) {
    console.error("載入失敗:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.subscribe-btn {
  margin-right: 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #000;
  border-bottom-color: #000;
  border-top-color: #777;
  border-right-color: #000;
  border-left-color: #777;
}

.title {
  font-family: SweiHalfMoon-Bold;
  height: 20px;
  margin: 0px;
}

.date {
  font-size: 8px;
  height: 12px;
  margin: 0px;
}

.title-container {
  font-family: SweiHalfMoon;
  display: flex;
  flex-direction: column;
}

.el-row {
  height: 13%;
}

:deep .el-card__body {
  height: 100vh;
  width: 100%;
  padding: 0;
}

:deep .el-collapse {
  height: 87%;
  width: 100%;
  background-color: #f9f9f9;
}
</style>
