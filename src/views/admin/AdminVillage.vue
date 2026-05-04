<template>
  <el-card shadow="never">
    <template #header>村务管理</template>
    <el-table :data="villageRows" stripe>
      <el-table-column prop="title" label="事项" />
      <el-table-column prop="author" label="发布方" />
      <el-table-column prop="time" label="时间" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作">
        <template #default>
          <el-button size="small" type="primary">处理</el-button>
          <el-button size="small" plain>归档</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { villageRows } from '@/data/mock'
</script>
