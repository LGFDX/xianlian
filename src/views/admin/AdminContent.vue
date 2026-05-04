<template>
  <el-card shadow="never">
    <template #header>内容管理</template>
    <el-table :data="contentRows" stripe>
      <el-table-column prop="title" label="内容标题" />
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作">
        <template #default>
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { contentRows } from '@/data/mock'
</script>
