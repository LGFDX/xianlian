<template>
  <header :class="['top-nav', { scrolled: scrolled }]">
    <div class="container nav-inner">
      <router-link class="brand" to="/home">
        <span class="brand-mark">乡链</span>
        <div>
          <strong>乡链数字平台</strong>
          <p>耕读教育 × 乡村振兴</p>
        </div>
      </router-link>

      <nav class="desktop-nav">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path">
          {{ item.label }}
        </router-link>
      </nav>

      <div class="actions desktop-only">
        <el-select v-model="roleModel" class="role-select" size="small">
          <el-option v-for="role in roles" :key="role" :label="role" :value="role" />
        </el-select>
        <template v-if="!isLoggedIn">
          <el-button text @click="$router.push('/home/auth')">登录</el-button>
          <el-button type="success" plain @click="$router.push('/home/auth')">注册</el-button>
        </template>
      </div>

      <div class="mobile-actions">
        <el-button text @click="drawerVisible = true">菜单</el-button>
      </div>
    </div>

    <el-drawer v-model="drawerVisible" direction="rtl" size="78%" title="乡链导航" append-to-body>
      <div class="drawer-block">
        <el-select v-model="roleModel" class="role-select-mobile" placeholder="选择角色">
          <el-option v-for="role in roles" :key="role" :label="role" :value="role" />
        </el-select>
        <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="drawer-link" @click="drawerVisible = false">
          {{ item.label }}
        </router-link>
        <el-button v-if="!isLoggedIn" type="success" class="drawer-link-button" @click="$router.push('/home/auth')">登录 / 注册</el-button>
      </div>
    </el-drawer>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { roles } from '@/data/mock'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const appStore = useAppStore()
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
const drawerVisible = ref(false)
const scrolled = ref(false)

const menuItems = [
  { label: '首页', path: '/home' },
  { label: '产业赋能', path: '/home/industry' },
  { label: '人才培育', path: '/home/talent' },
  { label: '治理创新', path: '/home/governance' },
  { label: '校地实践', path: '/home/practice' },
  { label: '资源链接', path: '/home/resources' }
]

const navItems = computed(() => {
  return isLoggedIn.value
    ? [...menuItems, { label: '个人中心', path: '/profile' }]
    : menuItems
})

const roleModel = computed({
  get: () => appStore.currentRole,
  set: value => appStore.setRole(value)
})

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(drawerVisible, value => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
  background: rgba(245, 247, 242, 0.75);
}

.top-nav.scrolled {
  background: rgba(245, 247, 242, 0.9);
  box-shadow: 0 12px 28px rgba(23, 48, 36, 0.08);
}

.nav-inner {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  background: linear-gradient(135deg, var(--xl-green), var(--xl-blue));
  box-shadow: 0 10px 18px rgba(25, 118, 210, 0.22);
}

.brand strong {
  display: block;
  font-size: 16px;
}

.brand p {
  margin: 2px 0 0;
  color: var(--xl-muted);
  font-size: 12px;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 18px;
}

.desktop-nav a {
  color: var(--xl-text);
  font-weight: 500;
  padding: 8px 0;
  position: relative;
}

.desktop-nav a.router-link-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--xl-green), var(--xl-blue));
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.role-select {
  width: 120px;
}

.mobile-actions {
  display: none;
}

.drawer-block {
  display: grid;
  gap: 12px;
}

.drawer-link {
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(46, 125, 50, 0.06);
}

.drawer-link-button {
  margin-top: 8px;
}

@media (max-width: 1100px) {
  .desktop-nav,
  .desktop-only {
    display: none;
  }

  .mobile-actions {
    display: block;
  }
}
</style>