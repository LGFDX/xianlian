<template>
  <div class="container page-wrap">
    <section class="section-card page-card">
      <div class="page-head">
        <div>
          <h1>产业赋能</h1>
        </div>
        <div class="head-actions">
          <el-badge :value="cartCount" :hidden="cartCount === 0" :max="99" class="cart-badge">
            <el-button size="small" plain type="success" @click="openCartDrawer">购物车</el-button>
          </el-badge>
          <el-tag type="success" effect="light">乡链产业中心</el-tag>
        </div>
      </div>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="农产品商城" name="products">
          <div class="product-grid">
            <article v-for="product in products" :key="product.name" class="product-card section-card">
              <img :src="product.image" :alt="product.name" />
              <div class="body">
                <el-tag size="small" effect="light">{{ product.tag }}</el-tag>
                <h3>{{ product.name }}</h3>
                <p>{{ product.origin }}</p>
                <strong>￥{{ product.price }}</strong>
                <div class="btn-row">
                  <el-button size="small" type="success" @click="handleAddToCart(product)">加入购物车</el-button>
                  <el-button size="small" plain @click="handleBuyNow(product)">立即购买</el-button>
                </div>
              </div>
            </article>
          </div>
        </el-tab-pane>
        <el-tab-pane label="文旅产品" name="tourism">
          <div class="product-grid tourism-grid">
            <article v-for="item in tourismProducts" :key="item.title" class="product-card section-card">
              <img :src="item.image" :alt="item.title" />
              <div class="body">
                <el-tag size="small" effect="light">{{ item.status }}</el-tag>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
                <strong>{{ item.price }}</strong>
                <div class="btn-row">
                  <el-button size="small" type="primary">在线预订</el-button>
                </div>
              </div>
            </article>
          </div>
        </el-tab-pane>
        <el-tab-pane label="产业案例" name="cases">
          <div class="case-list">
            <article v-for="item in industryCases" :key="item.title" class="case-card section-card">
              <img :src="item.image" :alt="item.title" />
              <div class="body">
                <h3>{{ item.title }}</h3>
                <p><strong>前：</strong>{{ item.before }}</p>
                <p><strong>后：</strong>{{ item.after }}</p>
                <el-alert :title="item.impact" type="success" :closable="false" show-icon />
              </div>
            </article>
          </div>
        </el-tab-pane>
        <el-tab-pane label="产销对接" name="docking">
          <el-row :gutter="16">
            <el-col :xs="24" :md="12">
              <el-card shadow="never" class="dock-card">
                <template #header>企业采购需求</template>
                <el-timeline>
                  <el-timeline-item v-for="item in supplyDemand.filter(i => i.type === '采购需求')" :key="item.title" :timestamp="item.area">
                    <strong>{{ item.title }}</strong>
                    <p>{{ item.quantity }} · {{ item.status }}</p>
                  </el-timeline-item>
                </el-timeline>
              </el-card>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-card shadow="never" class="dock-card">
                <template #header>农户供应信息</template>
                <el-timeline>
                  <el-timeline-item v-for="item in supplyDemand.filter(i => i.type === '供应信息')" :key="item.title" :timestamp="item.area">
                    <strong>{{ item.title }}</strong>
                    <p>{{ item.quantity }} · {{ item.status }}</p>
                  </el-timeline-item>
                </el-timeline>
                <el-button type="success" plain>发布信息</el-button>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-drawer
        v-model="cartDrawerVisible"
        direction="rtl"
        size="min(92vw, 420px)"
        title="购物车"
        append-to-body
      >
        <template #header>
          <div class="drawer-header">
            <div>
              <strong>购物车</strong>
              <p>共 {{ cartCount }} 件商品 · 合计 ￥{{ cartTotalAmount }}</p>
            </div>
            <el-button v-if="cartItems.length" text type="danger" @click="handleClearCart">清空</el-button>
          </div>
        </template>

        <div class="drawer-body">
          <el-empty v-if="!cartItems.length" description="购物车暂无商品" />

          <div v-else class="cart-list">
            <article v-for="item in cartItems" :key="item.name" class="cart-item">
              <img :src="item.image" :alt="item.name" />
              <div class="cart-item__info">
                <div class="cart-item__top">
                  <h3>{{ item.name }}</h3>
                  <span>×{{ item.quantity }}</span>
                </div>
                <p>{{ item.origin }} · {{ item.tag }}</p>
                <strong>￥{{ item.price }}</strong>
              </div>
            </article>
          </div>
        </div>
      </el-drawer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { products, tourismProducts, industryCases, supplyDemand, type ProductItem } from '@/data/mock'

const activeTab = ref('products')
const cartDrawerVisible = ref(false)
const appStore = useAppStore()
const { cartItems, cartCount } = storeToRefs(appStore)

const cartTotalAmount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
})

function openCartDrawer() {
  cartDrawerVisible.value = true
}

function handleAddToCart(product: ProductItem) {
  const totalCount = appStore.addToCart(product)
  cartDrawerVisible.value = true
  ElMessage.success(`${product.name} 已加入购物车，当前购物车共 ${totalCount} 件商品。`)
}

function handleBuyNow(product: ProductItem) {
  const totalCount = appStore.buyNow(product)
  cartDrawerVisible.value = true
  ElMessage.success(`${product.name} 已加入立即购买清单。`)
}

function handleClearCart() {
  appStore.clearCart()
  ElMessage.success('购物车已清空。')
}
</script>

<style scoped>
.page-wrap {
  position: relative;
  z-index: 0;
  isolation: isolate;
  padding: 22px 0 30px;
}

.page-wrap::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),
    url('../../图片/产业赋能.png');
  background-position: center center, center center;
  background-size: cover, cover;
  background-repeat: no-repeat, no-repeat;
}

.page-card {
  padding: 22px;
}

.page-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.head-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.cart-badge {
  display: inline-flex;
}

.page-head h1 {
  margin: 0 0 8px;
}

.page-head p {
  margin: 0;
  color: var(--xl-muted);
}

.product-grid,
.case-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.product-card,
.case-card {
  overflow: hidden;
}

.product-card img,
.case-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.body {
  padding: 16px;
}

.body h3 {
  margin: 10px 0 6px;
}

.body p {
  margin: 0 0 8px;
  color: var(--xl-muted);
}

.body strong {
  color: var(--xl-green);
}

.btn-row {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tourism-grid,
.dock-card {
  margin-top: 8px;
}

.drawer-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.drawer-header strong {
  display: block;
  font-size: 16px;
}

.drawer-header p {
  margin: 6px 0 0;
  color: var(--xl-muted);
}

.drawer-body {
  padding-top: 4px;
}

.cart-list {
  display: grid;
  gap: 12px;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(46, 125, 50, 0.1);
}

.cart-item img {
  width: 72px;
  height: 72px;
  border-radius: 14px;
  object-fit: cover;
  flex-shrink: 0;
}

.cart-item__info {
  flex: 1;
  min-width: 0;
}

.cart-item__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.cart-item__top h3 {
  margin: 0;
  font-size: 15px;
}

.cart-item__top span {
  color: var(--xl-green);
  font-weight: 700;
  white-space: nowrap;
}

.cart-item__info p {
  margin: 6px 0 8px;
  color: var(--xl-muted);
}

.cart-item__info strong {
  color: var(--xl-green);
}

@media (max-width: 768px) {
  .product-grid,
  .case-list {
    grid-template-columns: 1fr;
  }

  .page-head {
    flex-direction: column;
  }

  .head-actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
