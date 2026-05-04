import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type UserRole = '村民' | '高校' | '企业' | '管理员'

type CartProduct = {
  name: string
  price: number
  origin: string
  tag: string
  image: string
}

interface CartItem extends CartProduct {
  quantity: number
}

const CART_STORAGE_KEY = 'xianglian-cart-items'
const BUY_NOW_STORAGE_KEY = 'xianglian-buy-now-item'

function isBrowser() {
  return typeof window !== 'undefined'
}

// 兼容异常或旧格式数据，避免本地存储损坏时影响页面使用。
function normalizeCartItems(rawValue: unknown): CartItem[] {
  if (!Array.isArray(rawValue)) {
    return []
  }

  const mergedItems = new Map<string, CartItem>()

  rawValue.forEach(item => {
    if (!item || typeof item !== 'object') {
      return
    }

    const candidate = item as Partial<CartItem>

    if (typeof candidate.name !== 'string' || !candidate.name) {
      return
    }

    const normalizedItem: CartItem = {
      name: candidate.name,
      price: Number(candidate.price) || 0,
      origin: typeof candidate.origin === 'string' ? candidate.origin : '',
      tag: typeof candidate.tag === 'string' ? candidate.tag : '',
      image: typeof candidate.image === 'string' ? candidate.image : '',
      quantity: Math.max(1, Math.floor(Number(candidate.quantity) || 1))
    }

    const existingItem = mergedItems.get(normalizedItem.name)

    if (existingItem) {
      existingItem.quantity += normalizedItem.quantity
      return
    }

    mergedItems.set(normalizedItem.name, normalizedItem)
  })

  return [...mergedItems.values()]
}

function readCartItems() {
  if (!isBrowser()) {
    return [] as CartItem[]
  }

  try {
    const rawValue = window.localStorage.getItem(CART_STORAGE_KEY)
    return normalizeCartItems(rawValue ? JSON.parse(rawValue) : [])
  } catch {
    return [] as CartItem[]
  }
}

function persistCartItems(items: CartItem[]) {
  if (!isBrowser()) {
    return
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // 本地存储不可用时静默失败，避免影响页面交互。
  }
}

function persistBuyNowItem(product: CartProduct, quantity: number) {
  if (!isBrowser()) {
    return
  }

  try {
    window.localStorage.setItem(
      BUY_NOW_STORAGE_KEY,
      JSON.stringify({
        product: {
          ...product,
          quantity
        },
        quantity,
        createdAt: new Date().toISOString()
      })
    )
  } catch {
    // 本地存储不可用时静默失败，避免影响页面交互。
  }
}

export const useAppStore = defineStore('app', () => {
  const currentRole = ref<UserRole>('村民')
  const cartItems = ref<CartItem[]>(readCartItems())
  const loading = ref(false)
  const isLoggedIn = ref(false)

  const roleLabel = computed(() => currentRole.value)
  const cartCount = computed(() => cartItems.value.reduce((total, item) => total + item.quantity, 0))

  function setRole(role: UserRole) {
    currentRole.value = role
  }

  function toggleLogin() {
    isLoggedIn.value = !isLoggedIn.value
  }

  function addToCart(product: CartProduct, quantity = 1) {
    const safeQuantity = Math.max(1, Math.floor(quantity))
    const existingItem = cartItems.value.find(item => item.name === product.name)

    if (existingItem) {
      existingItem.quantity += safeQuantity
    } else {
      cartItems.value = [...cartItems.value, { ...product, quantity: safeQuantity }]
    }

    persistCartItems(cartItems.value)

    return cartCount.value
  }

  function buyNow(product: CartProduct, quantity = 1) {
    const safeQuantity = Math.max(1, Math.floor(quantity))
    const totalCount = addToCart(product, safeQuantity)
    persistBuyNowItem(product, safeQuantity)

    return totalCount
  }

  function clearCart() {
    cartItems.value = []

    if (isBrowser()) {
      window.localStorage.removeItem(CART_STORAGE_KEY)
    }
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  return {
    currentRole,
    cartItems,
    cartCount,
    loading,
    isLoggedIn,
    roleLabel,
    setRole,
    toggleLogin,
    addToCart,
    buyNow,
    clearCart,
    setLoading
  }
})