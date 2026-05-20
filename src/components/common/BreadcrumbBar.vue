<template>
  <div v-if="show" class="container breadcrumb-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in trail" :key="item.path" :to="item.path ? { path: item.path } : undefined">
        {{ item.label }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routeMap: Record<string, { label: string; path?: string }[]> = {
  '/home/industry': [{ label: '产业赋能' }],
  '/home/talent': [{ label: '人才培育' }],
  '/home/governance': [{ label: '治理创新' }],
  '/home/practice': [{ label: '校地实践' }],
  '/home/resources': [{ label: '资源链接' }],
  '/home/auth': [{ label: '身份登录' }],
  '/profile': [{ label: '个人中心' }],
  '/admin/dashboard': [{ label: '后台管理' }, { label: '数据总览' }],
  '/admin/users': [{ label: '后台管理' }, { label: '用户管理' }],
  '/admin/content': [{ label: '后台管理' }, { label: '内容管理' }],
  '/admin/orders': [{ label: '后台管理' }, { label: '订单管理' }],
  '/admin/village': [{ label: '后台管理' }, { label: '村务管理' }],
  '/admin/settings': [{ label: '后台管理' }, { label: '系统设置' }]
}

const trail = computed(() => routeMap[route.path] ?? [])
const show = computed(() => route.path !== '/home')
</script>

<style scoped>
.breadcrumb-wrap {
  padding: 18px 0 0;
}
</style>