<template>
  <div class="main-content">
    <el-card> <slot></slot> </el-card>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-card {
  background-color: #f0f0f0;
  margin-top: 1%;
  width: 98%;
  max-width: 820px;
  height: 100%;
  min-height: 95vh;
}
</style>
