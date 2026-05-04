<template>
  <el-row :gutter="16">
    <el-col :xs="24" :lg="14">
      <el-card shadow="never">
        <template #header>系统设置</template>
        <el-form label-width="100px">
          <el-form-item label="平台名称">
            <el-input value="乡链数字平台" />
          </el-form-item>
          <el-form-item label="备案号">
            <el-input value="滇ICP备20260001号" />
          </el-form-item>
          <el-form-item label="轮播图管理">
            <el-input placeholder="上传首页轮播图地址" />
          </el-form-item>
          <el-form-item label="数据备份">
            <el-button type="primary">立即备份</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
    <el-col :xs="24" :lg="10">
      <el-card shadow="never">
        <template #header>配置项说明</template>
        <div v-for="item in settingsRows" :key="item.title" class="setting-item">
          <strong>{{ item.title }}</strong>
          <p>{{ item.desc }}</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { settingsRows } from '@/data/mock'
</script>

<style scoped>
.setting-item {
  padding: 12px 0;
  border-bottom: 1px solid rgba(46, 125, 50, 0.08);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-item p {
  margin: 6px 0 0;
  color: var(--xl-muted);
}
</style>
