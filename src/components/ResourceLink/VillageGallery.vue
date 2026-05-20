<template>
  <section class="section-card village-gallery-panel">
    <div class="village-gallery-panel__head">
      <div class="village-gallery-panel__title">乡村画廊</div>
      <div class="village-gallery-panel__stats">
        <el-tag type="success" effect="light">{{ villageData.length }} 个村落</el-tag>
        <el-tag type="warning" effect="light">{{ totalImages }} 张图片</el-tag>
      </div>
    </div>

    <div class="village-gallery-grid">
      <Village3DCard
        v-for="(village, index) in villageData"
        :key="village.id"
        :village="village"
        :index="index"
        @open="openVillage(village)"
      />
    </div>

    <el-dialog
      v-model="dialogVisible"
      class="village-gallery-dialog"
      :width="dialogWidth"
      align-center
      :lock-scroll="false"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      destroy-on-close
    >
      <template #header>
        <div v-if="selectedVillage" class="village-gallery-dialog__header">
          <div>
            <p class="village-gallery-dialog__eyebrow">村落图册详情</p>
            <h3>{{ selectedVillage.name }}</h3>
          </div>
          <el-tag type="success" effect="light">{{ selectedVillage.images.length }} 张图片</el-tag>
        </div>
      </template>

      <div
        v-if="selectedVillage"
        ref="dialogBodyRef"
        class="village-gallery-dialog__body"
        :class="{ 'is-expanded': isGalleryExpanded }"
        @wheel="handleDialogWheel"
      >
        <div class="village-gallery-dialog__viewer">
          <el-carousel :height="carouselHeight" trigger="click" indicator-position="outside">
            <el-carousel-item v-for="(image, imageIndex) in selectedVillage.images" :key="image">
              <button
                type="button"
                class="village-gallery-dialog__slide"
                :class="{ 'is-expanded': expandedImageIndex === imageIndex }"
                :aria-pressed="expandedImageIndex === imageIndex"
                :aria-label="`${selectedVillage.name} 第 ${imageIndex + 1} 张图，点击${expandedImageIndex === imageIndex ? '收起' : '放大'}`"
                @pointermove="handleSlidePointerMove($event, imageIndex)"
                @pointerleave="resetSlideMotion($event, imageIndex)"
                @click="toggleImageExpand(imageIndex)"
              >
                <img
                  :src="image"
                  :alt="`${selectedVillage.name} - ${imageIndex === 0 ? '封面' : `第 ${imageIndex} 张图`}`"
                  loading="lazy"
                />
                <div class="village-gallery-dialog__slide-shine" aria-hidden="true" />
                <div class="village-gallery-dialog__caption">
                  <span>{{ imageIndex === 0 ? '封面图' : `编号图 ${imageIndex}` }}</span>
                  <em>{{ imageIndex + 1 }}/{{ selectedVillage.images.length }}</em>
                </div>
              </button>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="village-gallery-dialog__detail">
          <div class="village-gallery-dialog__meta">
            <span><strong>封面</strong>1 张</span>
            <span><strong>内容图</strong>{{ selectedVillage.images.length - 1 }} 张</span>
          </div>

          <p class="village-gallery-dialog__summary">
            轮播图按封面和编号图依次排列，以下正文来自对应的介绍.txt。
          </p>

          <div class="village-gallery-dialog__content">
            <p>{{ selectedVillage.intro }}</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { Village } from '@/data/villageData'
import { villageData } from '@/data/villageData'
import Village3DCard from '@/components/ResourceLink/Village3DCard.vue'

const selectedVillage = ref<Village | null>(null)
const expandedImageIndex = ref<number | null>(null)
const dialogBodyRef = ref<HTMLElement | null>(null)
const supportsHover = ref(true)

const isGalleryExpanded = computed(() => expandedImageIndex.value !== null)

const dialogVisible = computed({
  get: () => selectedVillage.value !== null,
  set: value => {
    if (!value) {
      selectedVillage.value = null
      expandedImageIndex.value = null
    }
  }
})

const totalImages = computed(() => villageData.reduce((sum, village) => sum + village.images.length, 0))

const dialogWidth = 'min(1260px, calc(100vw - 24px))'
const carouselHeight = computed(() => (isGalleryExpanded.value ? 'clamp(500px, 62vw, 820px)' : 'clamp(360px, 46vw, 560px)'))

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const setSlideMotion = (element: HTMLElement, moveX = 0, moveY = 0, isExpanded = false) => {
  element.style.setProperty('--move-x', moveX.toFixed(4))
  element.style.setProperty('--move-y', moveY.toFixed(4))
  element.style.setProperty('--tilt-x', `${(-moveY * (isExpanded ? 12 : 10)).toFixed(4)}deg`)
  element.style.setProperty('--tilt-y', `${(moveX * (isExpanded ? 15 : 12)).toFixed(4)}deg`)
  element.style.setProperty('--scene-scale', isExpanded ? '1.08' : '1.02')
}

const openVillage = (village: Village) => {
  selectedVillage.value = village
  expandedImageIndex.value = null
}

const toggleImageExpand = (imageIndex: number) => {
  expandedImageIndex.value = expandedImageIndex.value === imageIndex ? null : imageIndex
}

const handleSlidePointerMove = (event: PointerEvent, imageIndex: number) => {
  if (!supportsHover.value) return

  const target = event.currentTarget as HTMLElement | null
  if (!target) return

  const rect = target.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return

  const relativeX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  const relativeY = ((event.clientY - rect.top) / rect.height - 0.5) * 2

  setSlideMotion(target, clamp(relativeX, -1, 1), clamp(relativeY, -1, 1), expandedImageIndex.value === imageIndex)
}

const resetSlideMotion = (event?: PointerEvent, imageIndex?: number) => {
  if (!event) return

  const target = event.currentTarget as HTMLElement | null
  if (!target) return

  setSlideMotion(target, 0, 0, expandedImageIndex.value === imageIndex)
}

const handleDialogWheel = (event: WheelEvent) => {
  if (!dialogBodyRef.value) return

  event.preventDefault()
  dialogBodyRef.value.scrollTop += event.deltaY
}

let hoverMediaQuery: MediaQueryList | null = null

const syncHoverSupport = () => {
  supportsHover.value = typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : true
}

onMounted(() => {
  syncHoverSupport()
  hoverMediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  hoverMediaQuery.addEventListener('change', syncHoverSupport)
})

onBeforeUnmount(() => {
  hoverMediaQuery?.removeEventListener('change', syncHoverSupport)
})
</script>

<style scoped>
.village-gallery-panel {
  position: relative;
  overflow: hidden;
  padding: 24px;
}

.village-gallery-panel::before,
.village-gallery-panel::after {
  content: '';
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(46, 125, 50, 0.18), transparent 70%);
  filter: blur(18px);
}

.village-gallery-panel::before {
  top: -72px;
  right: -56px;
  width: 190px;
  height: 190px;
}

.village-gallery-panel::after {
  left: -90px;
  bottom: -86px;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, rgba(25, 118, 210, 0.12), transparent 72%);
}

.village-gallery-panel__head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.village-gallery-panel__title {
  font-size: 1.18rem;
  font-weight: 800;
  color: var(--xl-text);
  letter-spacing: 0.08em;
}

.village-gallery-panel__stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.village-gallery-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

:deep(.village-gallery-dialog) {
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.98);
}

:deep(.village-gallery-dialog .el-dialog__header) {
  margin-right: 0;
  padding: 22px 24px 8px;
}

:deep(.village-gallery-dialog .el-dialog__body) {
  padding: 0 24px 24px;
}

.village-gallery-dialog__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.village-gallery-dialog__eyebrow {
  margin: 0 0 6px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--xl-green);
  text-transform: uppercase;
}

.village-gallery-dialog__header h3 {
  margin: 0;
  font-size: 1.32rem;
  line-height: 1.3;
  color: var(--xl-text);
}

.village-gallery-dialog__body {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
  gap: 20px;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  padding-right: 4px;
}

.village-gallery-dialog__body.is-expanded {
  grid-template-columns: 1fr;
}

.village-gallery-dialog__viewer {
  overflow: hidden;
  border-radius: 18px;
  background: rgba(237, 244, 234, 0.9);
  box-shadow: inset 0 0 0 1px rgba(46, 125, 50, 0.08);
}

:deep(.village-gallery-dialog .el-carousel) {
  width: 100%;
}

.village-gallery-dialog__slide {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: 18px;
  background: #edf4ea;
  cursor: zoom-in;
  appearance: none;
  -webkit-appearance: none;
  overflow: hidden;
  transform-style: preserve-3d;
  transition:
    transform 0.18s ease-out,
    box-shadow 0.18s ease-out,
    filter 0.18s ease-out,
    height 0.18s ease-out;
  transform:
    perspective(760px)
    translate3d(calc(var(--move-x) * 18px), calc(var(--move-y) * 18px), 0)
    rotateX(var(--tilt-x))
    rotateY(var(--tilt-y))
    scale(var(--scene-scale));
  transform-origin: center center;
  --move-x: 0;
  --move-y: 0;
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --scene-scale: 1;
}

.village-gallery-dialog__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.36s ease, filter 0.36s ease;
}

.village-gallery-dialog__slide:hover {
  box-shadow: 0 28px 60px rgba(23, 48, 36, 0.24);
}

.village-gallery-dialog__slide:hover img {
  transform: scale(1.08);
}

.village-gallery-dialog__slide.is-expanded {
  cursor: zoom-out;
  transform:
    perspective(640px)
    translate3d(calc(var(--move-x) * 24px), calc(var(--move-y) * 24px), 0)
    rotateX(var(--tilt-x))
    rotateY(var(--tilt-y))
    scale(var(--scene-scale));
  box-shadow: 0 32px 68px rgba(23, 48, 36, 0.3);
}

.village-gallery-dialog__slide.is-expanded img {
  transform: scale(1.06);
  filter: saturate(1.12) brightness(1.05) contrast(1.05);
}

.village-gallery-dialog__slide:focus-visible {
  outline: 3px solid rgba(5, 150, 105, 0.26);
  outline-offset: 4px;
}

.village-gallery-dialog__slide-shine {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0) 40%, rgba(8, 35, 18, 0.42) 100%),
    radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.28), transparent 28%),
    radial-gradient(circle at 78% 12%, rgba(16, 185, 129, 0.22), transparent 24%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08), transparent 64%);
  pointer-events: none;
}

.village-gallery-dialog__caption {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(11, 33, 21, 0.12), rgba(11, 33, 21, 0.78));
  color: #fff;
  backdrop-filter: blur(10px);
}

.village-gallery-dialog__caption span {
  font-size: 0.92rem;
  font-weight: 600;
}

.village-gallery-dialog__caption em {
  font-style: normal;
  font-size: 0.82rem;
  opacity: 0.86;
}

.village-gallery-dialog__detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.village-gallery-dialog__body.is-expanded .village-gallery-dialog__detail {
  padding-top: 2px;
}

.village-gallery-dialog__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  color: var(--xl-muted);
  font-size: 0.92rem;
}

.village-gallery-dialog__meta strong {
  margin-right: 6px;
  color: var(--xl-text);
}

.village-gallery-dialog__summary {
  margin: 0;
  line-height: 1.8;
  color: var(--xl-text);
  font-weight: 500;
}

.village-gallery-dialog__content {
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(46, 125, 50, 0.06);
  border: 1px solid rgba(46, 125, 50, 0.12);
  color: var(--xl-text);
  line-height: 1.8;
}

.village-gallery-dialog__content p {
  margin: 0;
  white-space: pre-line;
}

@media (max-width: 1120px) {
  .village-gallery-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .village-gallery-panel {
    padding: 20px;
  }

  .village-gallery-panel__head {
    flex-direction: column;
  }

  .village-gallery-panel__stats {
    justify-content: flex-start;
  }

  .village-gallery-grid {
    grid-template-columns: 1fr;
  }

  .village-gallery-dialog__body {
    grid-template-columns: 1fr;
    max-height: calc(100vh - 180px);
  }

  .village-gallery-dialog__slide:hover,
  .village-gallery-dialog__slide.is-expanded {
    transform: scale(1.02);
    box-shadow: 0 22px 44px rgba(23, 48, 36, 0.18);
  }
}

@media (hover: none), (pointer: coarse) {
  .village-gallery-dialog__slide {
    transform: scale(1);
  }

  .village-gallery-dialog__slide:hover,
  .village-gallery-dialog__slide.is-expanded {
    transform: scale(1.02);
  }
}
</style>