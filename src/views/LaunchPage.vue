<template>
  <main :class="['launch-page', { 'is-ready': isReady, 'is-leaving': isLeaving }]">
    <section class="launch-panel" aria-label="乡链项目引导页">
      <header class="launch-header">
        <h1 class="launch-line launch-title" :style="lineStyle(0)">乡链行动・筑梦兴乡</h1>
        <p class="launch-line launch-subtitle" :style="lineStyle(1)">高校耕读教育 + 乡村振兴一体化服务平台</p>
      </header>

      <section class="launch-intro" aria-labelledby="launch-intro-title">
        <h2 id="launch-intro-title" class="launch-line launch-heading" :style="lineStyle(2)">详细项目介绍</h2>
        <div class="launch-paragraphs">
          <p
            v-for="(paragraph, index) in introParagraphs"
            :key="paragraph"
            class="launch-line launch-paragraph"
            :style="lineStyle(index + 3)"
          >
            {{ paragraph }}
          </p>
        </div>
      </section>

      <div class="launch-actions">
        <button class="launch-button" type="button" :disabled="isLeaving" @click="enterPlatform">
          <span class="launch-button__label">进入乡链平台</span>
          <span
            v-for="ripple in ripples"
            :key="ripple.id"
            class="launch-button__ripple"
            :style="ripple.style"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

type Ripple = {
  id: number
  style: Record<string, string>
}

const router = useRouter()
const isReady = ref(false)
const isLeaving = ref(false)
const ripples = ref<Ripple[]>([])

const introParagraphs = [
  '乡链数字平台是 “乡链” 行动的核心数字化载体，是连接高校资源、乡村需求与市场渠道的一体化服务枢纽。平台以轻量化、本土化、易用性为设计理念，打通线上服务与乡村落地的全链路通道，将产业赋能、人才培育、治理创新、校地实践、资源链接五大服务精准输送至乡村一线。',
  '平台整合村务管理、农产品电商、文旅推广、实践报名、供需对接、数据监测六大功能模块，为村委提供数字化治理工具；为村民搭建产品上行与技能学习通道，实现农产品线上销售、实用技能随学随用；为高校师生提供乡村实践阵地与项目对接入口，让智力成果高效落地；为合作企业打通乡村优质资源直连渠道。',
  '它打破城乡信息壁垒，让高校人才、技术、课程等资源一键下沉乡村，让乡村需求、特色产品、文旅资源快速对接外部支持，以数字之力激活乡村内生动力，推动校地协同、多方共赢，成为劳动教育成果转化、乡村全面振兴的重要数字支撑。'
]

let enterFrame = 0
let leaveTimer = 0
let rippleTimer = 0

function lineStyle(index: number) {
  return { '--delay': `${0.08 * index}s` }
}

function enterPlatform(event: MouseEvent) {
  if (isLeaving.value) {
    return
  }

  const button = event.currentTarget as HTMLButtonElement | null
  if (button) {
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.8
    const pointerX = event.clientX === 0 && event.clientY === 0 ? rect.width / 2 : event.clientX - rect.left
    const pointerY = event.clientX === 0 && event.clientY === 0 ? rect.height / 2 : event.clientY - rect.top
    const rippleId = Date.now() + Math.random()

    ripples.value = [
      ...ripples.value,
      {
        id: rippleId,
        style: {
          left: `${pointerX - size / 2}px`,
          top: `${pointerY - size / 2}px`,
          width: `${size}px`,
          height: `${size}px`
        }
      }
    ]

    rippleTimer = window.setTimeout(() => {
      ripples.value = ripples.value.filter(ripple => ripple.id !== rippleId)
    }, 650)
  }

  isLeaving.value = true

  leaveTimer = window.setTimeout(() => {
    void router.push('/home')
  }, 500)
}

onMounted(() => {
  enterFrame = window.requestAnimationFrame(() => {
    isReady.value = true
  })
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(enterFrame)
  window.clearTimeout(leaveTimer)
  window.clearTimeout(rippleTimer)
})
</script>

<style scoped>
.launch-page {
  --launch-green: #2e7d32;
  --launch-blue: #1976d2;
  --launch-brown: #8d6e63;
  --launch-yellow: #ffb300;
  --launch-ink: #173024;
  --launch-muted: #5f7268;
  --launch-surface: rgba(255, 255, 255, 0.52);
  --launch-stroke: rgba(46, 125, 50, 0.14);
  --launch-shadow: 0 20px 60px rgba(23, 48, 36, 0.12);
  position: fixed;
  inset: 0;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  display: grid;
  place-items: center;
  padding: clamp(20px, 4vw, 44px);
  color: var(--launch-ink);
  background:
    radial-gradient(circle at 16% 18%, rgba(46, 125, 50, 0.16), transparent 28%),
    radial-gradient(circle at 82% 14%, rgba(25, 118, 210, 0.14), transparent 24%),
    linear-gradient(135deg, #eff6ee 0%, #edf4f9 54%, #f7f4ec 100%);
  opacity: 0;
  transform: translateY(18px) scale(0.985);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.launch-page::before,
.launch-page::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.launch-page::before {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0) 22%),
    radial-gradient(circle at 50% 4%, rgba(255, 179, 0, 0.05), transparent 24%);
}

.launch-page::after {
  inset: auto -10% -2%;
  height: 38%;
  background:
    radial-gradient(ellipse at 18% 100%, rgba(46, 125, 50, 0.16) 0 34%, transparent 35%),
    radial-gradient(ellipse at 48% 100%, rgba(141, 110, 99, 0.12) 0 30%, transparent 31%),
    radial-gradient(ellipse at 78% 100%, rgba(25, 118, 210, 0.12) 0 32%, transparent 33%),
    linear-gradient(180deg, transparent 0%, rgba(245, 247, 242, 0.82) 100%);
  opacity: 0.95;
}

.launch-page.is-ready {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.launch-page.is-leaving {
  opacity: 0;
  transform: translateY(-14px) scale(0.99);
  transition-duration: 0.5s;
}

.launch-panel {
  position: relative;
  z-index: 1;
  width: min(920px, 100%);
  max-height: 100%;
  display: grid;
  gap: clamp(14px, 2vw, 22px);
  padding: clamp(20px, 3.6vw, 40px);
  border: 1px solid var(--launch-stroke);
  border-radius: 28px;
  background: var(--launch-surface);
  backdrop-filter: blur(16px);
  box-shadow: var(--launch-shadow);
}

.launch-header {
  display: grid;
  gap: 10px;
  text-align: center;
}

.launch-line {
  margin: 0;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.7s ease var(--delay, 0s),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s);
}

.is-ready .launch-line {
  opacity: 1;
  transform: translateY(0);
}

.launch-title {
  font-size: clamp(34px, 5.2vw, 68px);
  line-height: 1.08;
  letter-spacing: 0.02em;
}

.launch-subtitle {
  font-size: clamp(15px, 2vw, 22px);
  line-height: 1.5;
  color: var(--launch-muted);
}

.launch-intro {
  display: grid;
  gap: 12px;
}

.launch-heading {
  font-size: clamp(14px, 1.7vw, 18px);
  line-height: 1.45;
  text-align: center;
  color: var(--launch-green);
  font-weight: 700;
}

.launch-paragraphs {
  display: grid;
  gap: 10px;
}

.launch-paragraph {
  font-size: clamp(12px, 1.5vw, 16px);
  line-height: 1.7;
  color: var(--launch-ink);
  text-align: left;
}

.launch-actions {
  display: flex;
  justify-content: center;
  padding-top: clamp(8px, 1.5vw, 16px);
}

.launch-button {
  position: relative;
  overflow: hidden;
  min-width: min(320px, 100%);
  padding: 15px 30px;
  border: 0;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--launch-blue), #1f7edc);
  color: #fff;
  font-size: clamp(15px, 1.8vw, 18px);
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 14px 26px rgba(25, 118, 210, 0.26);
  cursor: pointer;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    filter 0.22s ease;
}

.launch-button:hover:not(:disabled) {
  transform: translateY(-1px) scale(1.02);
  filter: brightness(1.06);
  box-shadow: 0 18px 32px rgba(25, 118, 210, 0.22);
}

.launch-button:active:not(:disabled) {
  transform: translateY(0) scale(0.99);
}

.launch-button:disabled {
  cursor: wait;
  opacity: 0.94;
}

.launch-button__label {
  position: relative;
  z-index: 1;
}

.launch-button__ripple {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.16) 40%, transparent 72%);
  transform: scale(0);
  animation: ripple-wave 0.65s ease-out;
  pointer-events: none;
}

@keyframes ripple-wave {
  0% {
    opacity: 0.5;
    transform: scale(0);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .launch-page {
    padding: 14px;
  }

  .launch-panel {
    padding: 18px 16px 20px;
    border-radius: 22px;
    gap: 12px;
  }

  .launch-header {
    gap: 8px;
  }

  .launch-intro {
    gap: 8px;
  }

  .launch-paragraphs {
    gap: 8px;
  }

  .launch-actions {
    padding-top: 4px;
  }

  .launch-button {
    width: 100%;
    min-width: 0;
    padding: 14px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .launch-page,
  .launch-line,
  .launch-button,
  .launch-button__ripple {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
</style>