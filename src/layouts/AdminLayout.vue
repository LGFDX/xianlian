<template>
  <el-container class="admin-layout">
    <el-aside class="sidebar" width="240px">
      <div class="admin-brand">
        <strong>乡链后台</strong>
        <span>运营与治理管理中心</span>
      </div>
      <el-menu router :default-active="route.path" class="menu" background-color="transparent" text-color="#173024" active-text-color="#1976D2">
        <el-menu-item index="/admin/dashboard">数据总览</el-menu-item>
        <el-menu-item index="/admin/users">用户管理</el-menu-item>
        <el-menu-item index="/admin/content">内容管理</el-menu-item>
        <el-menu-item index="/admin/orders">订单管理</el-menu-item>
        <el-menu-item index="/admin/village">村务管理</el-menu-item>
        <el-menu-item index="/admin/settings">系统设置</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <BreadcrumbBar />
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'

const route = useRoute()
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: linear-gradient(180deg, #eef4ea, #f8faf6);
}

.sidebar {
  padding: 18px;
  background: rgba(255, 255, 255, 0.74);
  backdrop-filter: blur(12px);
  border-right: 1px solid rgba(46, 125, 50, 0.08);
}

.admin-brand {
  padding: 12px 10px 20px;
}

.admin-brand strong {
  display: block;
  font-size: 20px;
}

.admin-brand span {
  color: var(--xl-muted);
  font-size: 12px;
}

.menu {
  border-right: none;
}

.header {
  height: auto;
  padding: 0;
}

.main {
  padding: 0 20px 28px;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .main {
    padding: 0 12px 24px;
  }
}
</style>
