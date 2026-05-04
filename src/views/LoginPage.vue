<template>
  <main class="login-page" :class="{ ready: isReady }">
    <section class="login-shell">
      <aside class="brand-panel panel" :class="{ ready: isReady }">
        <div class="brand-decor" aria-hidden="true" />

        <div class="brand-body">
          <div class="brand-logo" aria-hidden="true">
            <span class="brand-logo__mark">乡链</span>
          </div>

          <h1>乡链行动・筑梦兴乡</h1>
          <p class="brand-subtitle">高校耕读教育 + 乡村振兴一体化服务平台</p>
          <p class="brand-copy">
            以清新自然的乡土底色承载简约科技的服务入口，让不同身份的用户都能快速进入对应流程。
          </p>

          <div class="brand-tags" aria-label="平台特征">
            <span>田野调研</span>
            <span>校地共建</span>
            <span>产业赋能</span>
          </div>
        </div>
      </aside>

      <section class="auth-panel panel" :class="{ ready: isReady }">
        <div class="auth-decor" aria-hidden="true" />

        <div class="auth-body">
          <header class="auth-header">
            <p class="auth-eyebrow">身份入口</p>
            <h2>{{ activeIdentity.title }}</h2>
            <p class="auth-lead">{{ activeIdentity.lead }}</p>
          </header>

          <div class="identity-grid" role="tablist" aria-label="身份选择">
            <button
              v-for="card in identityCards"
              :key="card.key"
              type="button"
              class="identity-card"
              :class="[card.themeClass, { active: card.key === selectedIdentityKey }]"
              :aria-pressed="card.key === selectedIdentityKey"
              @click="selectIdentity(card.key)"
            >
              <span class="identity-card__icon" aria-hidden="true">
                <svg v-if="card.key === 'village'" viewBox="0 0 24 24">
                  <path d="M4 18h16" />
                  <path d="M6 18v-5l6-4 6 4v5" />
                  <path d="M8 18v-3h8v3" />
                  <path d="M5 13l7-5 7 5" />
                </svg>
                <svg v-else viewBox="0 0 24 24">
                  <path d="M4 19h16" />
                  <path d="M6 6h12v11H6z" />
                  <path d="M8 9h8" />
                  <path d="M8 12h8" />
                  <path d="M10 6v13" />
                </svg>
              </span>

              <span class="identity-card__text">
                <strong>{{ card.title }}</strong>
                <small>{{ card.subtitle }}</small>
              </span>

              <span class="identity-card__chevron" aria-hidden="true">进入</span>
            </button>
          </div>

          <div class="flow-banner">
            <span class="flow-banner__label">当前流程</span>
            <strong>{{ activeIdentity.flowLabel }}</strong>
            <p>{{ activeIdentity.flowHint }}</p>
          </div>

          <el-segmented v-model="mode" class="mode-switch" :options="modeOptions" />

          <el-form class="auth-form" :model="form" label-position="top">
            <el-form-item v-if="mode === '注册'" label="姓名">
              <el-input v-model="form.name" placeholder="请输入姓名" />
            </el-form-item>

            <el-form-item label="手机号">
              <el-input v-model="form.phone" placeholder="请输入手机号" />
            </el-form-item>

            <el-form-item label="验证码">
              <el-input v-model="form.code" placeholder="请输入验证码">
                <template #append>
                  <el-button text>获取验证码</el-button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item v-if="mode === '登录'" label="密码">
              <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
            </el-form-item>

            <el-form-item v-if="mode === '注册'" label="单位">
              <el-input v-model="form.organization" placeholder="村委会 / 学校 / 企业" />
            </el-form-item>

            <button class="submit-button" type="button" @click="submit">
              {{ submitLabel }}
            </button>
          </el-form>
        </div>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore, type UserRole } from '@/stores/app'

type AuthMode = '登录' | '注册'
type IdentityKey = 'village' | 'university'

interface IdentityCard {
  key: IdentityKey
  title: string
  subtitle: string
  lead: string
  flowLabel: string
  flowHint: string
  role: UserRole
  nextRoute: string
  themeClass: string
}

const modeOptions: AuthMode[] = ['登录', '注册']

const identityCards: IdentityCard[] = [
  {
    key: 'village',
    title: '我是乡村代表',
    subtitle: '村务协同、产业对接、治理服务',
    lead: '面向村委、合作社与基层治理场景，进入乡村侧的协同流程。',
    flowLabel: '乡村代表流程',
    flowHint: '侧重村务办理、资源对接与产业协同。',
    role: '村民',
    nextRoute: '/home/governance',
    themeClass: 'theme-green'
  },
  {
    key: 'university',
    title: '我是高校代表',
    subtitle: '课题共建、实践报名、成果转化',
    lead: '面向老师、学生与实践团队，进入高校侧的协作流程。',
    flowLabel: '高校代表流程',
    flowHint: '侧重项目实践、教学共建与成果转化。',
    role: '高校',
    nextRoute: '/home/practice',
    themeClass: 'theme-blue'
  }
]

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()

const mode = ref<AuthMode>('登录')
const isReady = ref(false)
const selectedIdentityKey = ref<IdentityKey>(resolveIdentity(route.query.identity))

const form = reactive({
  phone: '',
  code: '',
  password: '',
  name: '',
  organization: ''
})

const activeIdentity = computed(() => identityCards.find(card => card.key === selectedIdentityKey.value) ?? identityCards[0])
const submitLabel = computed(() => `${mode.value}并进入${activeIdentity.value.flowLabel}`)

function resolveIdentity(value: unknown): IdentityKey {
  if (Array.isArray(value)) {
    return value[0] === 'university' ? 'university' : 'village'
  }

  return value === 'university' ? 'university' : 'village'
}

function syncRole(identityKey: IdentityKey) {
  const card = identityCards.find(item => item.key === identityKey) ?? identityCards[0]
  selectedIdentityKey.value = card.key
  appStore.setRole(card.role)
}

function selectIdentity(identityKey: IdentityKey) {
  if (identityKey === selectedIdentityKey.value) {
    return
  }

  syncRole(identityKey)
  router.push({ path: '/home/auth', query: { identity: identityKey } })
}

function submit() {
  appStore.toggleLogin()
  void router.push(activeIdentity.value.nextRoute)
}

// Keep the selected identity tied to the URL so the flow can be shared or restored.
watch(
  () => route.query.identity,
  value => {
    syncRole(resolveIdentity(value))
  },
  { immediate: true }
)

let enterFrame = 0

onMounted(() => {
  // Trigger the entrance animation after the first paint.
  enterFrame = window.requestAnimationFrame(() => {
    isReady.value = true
  })

  if (!route.query.identity) {
    router.replace({ path: '/home/auth', query: { identity: selectedIdentityKey.value } })
  }
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(enterFrame)
})
</script>

<style scoped>
.login-page {
  --login-green: #2e7d32;
  --login-blue: #1976d2;
  --login-brown: #8d6e63;
  --login-yellow: #ffb300;
  --login-text: #173024;
  --login-muted: #5f7268;
  --login-panel: rgba(255, 255, 255, 0.56);
  --login-border: rgba(46, 125, 50, 0.12);
  --login-shadow: 0 22px 56px rgba(23, 48, 36, 0.12);
  --login-radius: 28px;
  position: relative;
  overflow-x: hidden;
  min-height: calc(100vh - 180px);
  padding: 28px 0 40px;
  background:
    radial-gradient(circle at 14% 16%, rgba(46, 125, 50, 0.12), transparent 26%),
    radial-gradient(circle at 82% 18%, rgba(25, 118, 210, 0.1), transparent 24%),
    linear-gradient(135deg, #eff6ee 0%, #edf4f9 52%, #f8f4ea 100%);
}

.login-page::before,
.login-page::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.login-page::before {
  background:
    radial-gradient(circle at 18% 12%, rgba(255, 179, 0, 0.05) 0 1px, transparent 1.2px) 0 0 / 54px 54px,
    radial-gradient(circle at 78% 22%, rgba(25, 118, 210, 0.05) 0 1px, transparent 1.2px) 0 0 / 64px 64px;
  opacity: 0.42;
}

.login-page::after {
  inset: auto 0 0;
  height: 34%;
  background:
    radial-gradient(ellipse at 14% 100%, rgba(46, 125, 50, 0.16) 0 25%, transparent 26%),
    radial-gradient(ellipse at 35% 100%, rgba(141, 110, 99, 0.12) 0 23%, transparent 24%),
    radial-gradient(ellipse at 60% 100%, rgba(25, 118, 210, 0.12) 0 24%, transparent 25%),
    radial-gradient(ellipse at 84% 100%, rgba(255, 179, 0, 0.1) 0 22%, transparent 23%),
    linear-gradient(180deg, transparent 0%, rgba(245, 247, 242, 0.88) 100%);
  opacity: 0.95;
}

.login-shell {
  position: relative;
  z-index: 1;
  width: min(1260px, calc(100% - 32px));
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  gap: clamp(18px, 2.6vw, 28px);
  min-width: 0;
}

.panel {
  position: relative;
  overflow: hidden;
  min-width: 0;
  border-radius: var(--login-radius);
  border: 1px solid var(--login-border);
  background: var(--login-panel);
  backdrop-filter: blur(16px);
  box-shadow: var(--login-shadow);
}

.brand-panel {
  flex: 4 1 0;
  max-width: 42%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(28px, 4vw, 42px);
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.brand-panel.ready {
  opacity: 1;
  transform: translateY(0);
}

.brand-panel::before,
.brand-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.brand-panel::before {
  background:
    radial-gradient(circle at 26% 22%, rgba(25, 118, 210, 0.1) 0 1px, transparent 1.3px) 0 0 / 42px 42px,
    radial-gradient(circle at 76% 24%, rgba(46, 125, 50, 0.12) 0 1px, transparent 1.3px) 0 0 / 56px 56px;
  opacity: 0.55;
}

.brand-panel::after {
  inset: auto -10% -2%;
  height: 42%;
  background:
    radial-gradient(ellipse at 14% 100%, rgba(46, 125, 50, 0.18) 0 29%, transparent 30%),
    radial-gradient(ellipse at 40% 100%, rgba(141, 110, 99, 0.12) 0 27%, transparent 28%),
    radial-gradient(ellipse at 66% 100%, rgba(25, 118, 210, 0.12) 0 28%, transparent 29%),
    radial-gradient(ellipse at 90% 100%, rgba(255, 179, 0, 0.08) 0 24%, transparent 25%);
  opacity: 0.24;
}

.brand-body {
  position: relative;
  z-index: 1;
  width: min(100%, 420px);
  display: grid;
  justify-items: center;
  gap: 14px;
}

.brand-logo {
  width: 82px;
  height: 82px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--login-green), var(--login-blue));
  color: #fff;
  box-shadow: 0 16px 30px rgba(25, 118, 210, 0.22);
}

.brand-logo__mark {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.brand-body h1 {
  margin: 0;
  font-size: clamp(30px, 3.6vw, 48px);
  line-height: 1.1;
  color: var(--login-text);
}

.brand-subtitle {
  margin: 0;
  font-size: clamp(15px, 1.8vw, 19px);
  line-height: 1.55;
  color: var(--login-muted);
}

.brand-copy {
  margin: 0;
  color: var(--login-text);
  line-height: 1.8;
  font-size: clamp(13px, 1.4vw, 15px);
}

.brand-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 6px;
}

.brand-tags span {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(46, 125, 50, 0.12);
  background: rgba(255, 255, 255, 0.68);
  color: var(--login-muted);
  font-size: 12px;
  letter-spacing: 0.04em;
}

.auth-panel {
  flex: 6 1 0;
  min-width: 0;
  padding: clamp(22px, 3vw, 34px);
  border-color: rgba(25, 118, 210, 0.12);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
}

.auth-panel.ready {
  opacity: 1;
  transform: translateY(0);
}

.auth-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 24% 16%, rgba(25, 118, 210, 0.08) 0 1px, transparent 1.2px) 0 0 / 48px 48px,
    radial-gradient(circle at 82% 18%, rgba(46, 125, 50, 0.06) 0 1px, transparent 1.2px) 0 0 / 58px 58px;
  opacity: 0.36;
}

.auth-body {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 16px;
}

.auth-header {
  display: grid;
  gap: 8px;
}

.auth-eyebrow {
  margin: 0;
  color: var(--login-green);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.auth-header h2 {
  margin: 0;
  font-size: clamp(26px, 3vw, 40px);
  line-height: 1.12;
  color: var(--login-text);
}

.auth-lead {
  margin: 0;
  color: var(--login-muted);
  line-height: 1.8;
  max-width: 60ch;
}

.identity-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.identity-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
  padding: 16px 18px;
  border: 1px solid rgba(46, 125, 50, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 12px 28px rgba(23, 48, 36, 0.08);
  color: var(--login-text);
  text-align: left;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease;
}

.identity-card:hover {
  transform: scale(1.05);
  box-shadow: 0 18px 36px rgba(23, 48, 36, 0.14);
}

.identity-card:focus-visible {
  outline: 2px solid rgba(25, 118, 210, 0.45);
  outline-offset: 2px;
}

.identity-card.active.theme-green {
  border-color: rgba(46, 125, 50, 0.32);
  background: linear-gradient(135deg, rgba(46, 125, 50, 0.12), rgba(46, 125, 50, 0.05));
}

.identity-card.active.theme-blue {
  border-color: rgba(25, 118, 210, 0.32);
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.12), rgba(25, 118, 210, 0.05));
}

.identity-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.identity-card__icon svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.theme-green .identity-card__icon {
  color: var(--login-green);
  background: rgba(46, 125, 50, 0.12);
}

.theme-blue .identity-card__icon {
  color: var(--login-blue);
  background: rgba(25, 118, 210, 0.12);
}

.identity-card__text {
  min-width: 0;
  display: grid;
  gap: 4px;
}

.identity-card__text strong {
  font-size: 15px;
  line-height: 1.3;
}

.identity-card__text small {
  display: block;
  color: var(--login-muted);
  line-height: 1.5;
}

.identity-card__chevron {
  color: var(--login-muted);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.flow-banner {
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(25, 118, 210, 0.12);
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.08), rgba(46, 125, 50, 0.06));
}

.flow-banner__label {
  display: inline-block;
  font-size: 12px;
  color: var(--login-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.flow-banner strong {
  display: block;
  margin-top: 6px;
  color: var(--login-text);
  font-size: 16px;
}

.flow-banner p {
  margin: 6px 0 0;
  color: var(--login-muted);
  line-height: 1.6;
}

.mode-switch {
  width: 100%;
}

.mode-switch :deep(.el-segmented) {
  width: 100%;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(46, 125, 50, 0.1);
  border-radius: 16px;
}

.auth-form {
  display: grid;
  gap: 14px;
}

.auth-form :deep(.el-form-item) {
  margin-bottom: 0;
}

.auth-form :deep(.el-form-item__label) {
  padding-bottom: 6px;
  color: var(--login-muted);
  font-weight: 600;
}

.auth-form :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(46, 125, 50, 0.1);
  background: rgba(255, 255, 255, 0.92);
}

.auth-form :deep(.el-input-group__append) {
  box-shadow: inset 0 0 0 1px rgba(46, 125, 50, 0.1);
  background: rgba(255, 255, 255, 0.96);
}

.submit-button {
  width: 100%;
  margin-top: 4px;
  padding: 15px 18px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--login-blue), #1f7edc);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 16px 28px rgba(25, 118, 210, 0.24);
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
}

.submit-button:hover {
  transform: translateY(-1px) scale(1.02);
  filter: brightness(1.06);
  box-shadow: 0 20px 34px rgba(25, 118, 210, 0.2);
}

.submit-button:active {
  transform: translateY(0) scale(0.99);
}

@media (max-width: 1024px) {
  .login-shell {
    width: min(100% - 24px, 1260px);
    gap: 18px;
  }

  .brand-panel {
    max-width: 44%;
  }
}

@media (max-width: 860px) {
  .login-page {
    padding: 18px 0 28px;
  }

  .login-shell {
    flex-direction: column;
  }

  .brand-panel,
  .auth-panel {
    max-width: none;
    flex: none;
    width: 100%;
  }

  .brand-panel {
    min-height: auto;
    padding: 24px 20px;
  }

  .auth-panel {
    padding: 22px 18px;
  }

  .identity-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .login-shell {
    width: min(100% - 18px, 1260px);
  }

  .panel {
    border-radius: 22px;
  }

  .brand-body h1 {
    font-size: clamp(26px, 8vw, 34px);
  }

  .brand-logo {
    width: 72px;
    height: 72px;
    border-radius: 22px;
  }

  .identity-card {
    padding: 14px 15px;
  }

  .identity-card:hover {
    transform: translateY(-2px) scale(1.02);
  }

  .submit-button {
    padding: 14px 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-panel,
  .auth-panel,
  .identity-card,
  .submit-button {
    transition-duration: 0.01ms !important;
  }

  .brand-panel.ready,
  .auth-panel.ready {
    transform: none;
  }

  .identity-card:hover,
  .submit-button:hover {
    transform: none;
  }
}
</style>