<template>
  <el-card shadow="never">
    <template #header>订单管理</template>
    <el-table :data="orderRows" stripe>
      <el-table-column prop="id" label="订单号" />
      <el-table-column prop="item" label="商品/服务" />
      <el-table-column prop="amount" label="金额" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作">
        <template #default>
          <el-button size="small" type="success">发货</el-button>
          <el-button size="small" plain>退款</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { orderRows } from '@/data/mock'
</script>
