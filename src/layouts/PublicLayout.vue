<template>
  <div class="page-shell">
    <TopNav />
    <BreadcrumbBar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import TopNav from '@/components/common/TopNav.vue'
import SiteFooter from '@/components/common/SiteFooter.vue'
import BreadcrumbBar from '@/components/common/BreadcrumbBar.vue'
</script>
