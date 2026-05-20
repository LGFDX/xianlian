import { createRouter, createWebHashHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'launch',
      component: () => import('@/views/LaunchPage.vue')
    },
    {
      path: '/home',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: () => import('@/views/HomeView.vue') },
        { path: 'industry', name: 'industry', component: () => import('@/views/IndustryView.vue') },
        { path: 'talent', name: 'talent', component: () => import('@/views/TalentView.vue') },
        { path: 'governance', name: 'governance', component: () => import('@/views/GovernanceView.vue') },
        { path: 'practice', name: 'practice', component: () => import('@/views/PracticeView.vue') },
        { path: 'resources', name: 'resources', component: () => import('@/views/ResourceLink.vue') },
        { path: 'auth', name: 'auth', component: () => import('@/views/LoginPage.vue') }
      ]
    },
    {
      path: '/profile',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('@/views/Profile/ProfilePage.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    { path: '/industry', redirect: '/home/industry' },
    { path: '/talent', redirect: '/home/talent' },
    { path: '/governance', redirect: '/home/governance' },
    { path: '/practice', redirect: '/home/practice' },
    { path: '/resources', redirect: '/home/resources' },
    { path: '/auth', redirect: '/home/auth' },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: '', redirect: '/admin/dashboard' },
        { path: 'dashboard', name: 'admin-dashboard', component: () => import('@/views/admin/AdminDashboard.vue') },
        { path: 'users', name: 'admin-users', component: () => import('@/views/admin/AdminUsers.vue') },
        { path: 'content', name: 'admin-content', component: () => import('@/views/admin/AdminContent.vue') },
        { path: 'orders', name: 'admin-orders', component: () => import('@/views/admin/AdminOrders.vue') },
        { path: 'village', name: 'admin-village', component: () => import('@/views/admin/AdminVillage.vue') },
        { path: 'settings', name: 'admin-settings', component: () => import('@/views/admin/AdminSettings.vue') }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/NotFoundView.vue') }
  ]
})

router.beforeEach(to => {
  const userStore = useUserStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth === true)

  if (requiresAuth && !userStore.isLoggedIn) {
    return {
      path: '/home/auth',
      query: { redirect: to.fullPath }
    }
  }

  if (to.path === '/home/auth' && userStore.isLoggedIn) {
    return { path: '/profile' }
  }

  return true
})

export default router