<template>
  <el-card shadow="never">
    <template #header>用户管理</template>
    <el-table :data="userRows" stripe>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="permissions" label="权限" />
      <el-table-column label="操作">
        <template #default>
          <el-button size="small" type="primary">权限设置</el-button>
          <el-button size="small" plain>禁用/启用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { userRows } from '@/data/mock'
</script>
