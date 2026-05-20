<template>
  <section
    ref="sceneRef"
    class="village-parallax section-card"
    :class="{ 'is-static': !supportsHover, 'is-expanded': isExpanded }"
    aria-label="伪3D乡村风貌展示"
    role="button"
    :aria-pressed="isExpanded"
    :aria-label="isExpanded ? '收起 3D 预览' : '点击放大 3D 预览'"
    tabindex="0"
    @click="toggleExpanded"
    @keydown.enter.prevent="toggleExpanded"
    @keydown.space.prevent="toggleExpanded"
    @pointermove="handlePointerMove"
    @pointerleave="resetMotion"
  >
    <div class="village-parallax__layers" aria-hidden="true">
      <div class="village-parallax__layer village-parallax__layer--preview" :style="buildLayerStyle(previewLayer)" />
    </div>

    <div class="village-parallax__shade" aria-hidden="true" />
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

type SceneLayerKey = 'preview'

interface SceneLayer {
  key: SceneLayerKey
  className: string
  image: string
  depthX: number
  depthY: number
  scale: number
  position: string
}

const sceneRef = ref<HTMLElement | null>(null)
const supportsHover = ref(true)
const isExpanded = ref(false)

const previewLayer: SceneLayer = {
  key: 'preview',
  className: 'village-parallax__layer--preview',
  image: new URL('../../../图片/3D预览图.png', import.meta.url).href,
  depthX: 40,
  depthY: 28,
  scale: 1.14,
  position: 'center center'
}

const setMotion = (moveX = 0, moveY = 0) => {
  const element = sceneRef.value
  if (!element) return

  element.style.setProperty('--move-x', moveX.toFixed(4))
  element.style.setProperty('--move-y', moveY.toFixed(4))
  element.style.setProperty('--tilt-x', `${(-moveY * 8).toFixed(4)}deg`)
  element.style.setProperty('--tilt-y', `${(moveX * 10).toFixed(4)}deg`)
  element.style.setProperty('--scene-scale', moveX === 0 && moveY === 0 ? (isExpanded.value ? '1.02' : '1') : (isExpanded.value ? '1.05' : '1.015'))
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  resetMotion()
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const handlePointerMove = (event: PointerEvent) => {
  if (!supportsHover.value || !sceneRef.value) return

  const rect = sceneRef.value.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return

  const relativeX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  const relativeY = ((event.clientY - rect.top) / rect.height - 0.5) * 2

  setMotion(clamp(relativeX, -1, 1), clamp(relativeY, -1, 1))
}

const resetMotion = () => {
  setMotion(0, 0)
}

const buildLayerStyle = (layer: SceneLayer): Record<string, string> => ({
  backgroundImage: `linear-gradient(180deg, rgba(10, 52, 28, 0.06), rgba(10, 52, 28, 0.28)), url(${layer.image})`,
  backgroundPosition: layer.position,
  '--depth-x': `${layer.depthX}px`,
  '--depth-y': `${layer.depthY}px`,
  '--layer-scale': String(layer.scale)
})

let hoverMediaQuery: MediaQueryList | null = null

const syncHoverSupport = () => {
  supportsHover.value = typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : true
}

onMounted(() => {
  syncHoverSupport()
  resetMotion()

  hoverMediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  hoverMediaQuery.addEventListener('change', syncHoverSupport)
})

onBeforeUnmount(() => {
  hoverMediaQuery?.removeEventListener('change', syncHoverSupport)
  resetMotion()
})
</script>

<style scoped>
.village-parallax {
  position: relative;
  height: 400px;
  min-height: 400px;
  overflow: hidden;
  border-radius: 12px;
  isolation: isolate;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(8, 35, 18, 0.2)),
    linear-gradient(145deg, rgba(6, 95, 70, 0.12), rgba(16, 185, 129, 0.08));
  box-shadow: 0 16px 36px rgba(23, 48, 36, 0.14);
  transform: perspective(800px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--scene-scale));
  transform-style: preserve-3d;
  transition: transform 0.16s ease-out, box-shadow 0.16s ease-out, height 0.24s ease, min-height 0.24s ease;
  cursor: zoom-in;
  --move-x: 0;
  --move-y: 0;
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --scene-scale: 1;
}

.village-parallax.is-expanded {
  height: clamp(560px, 78vh, 860px);
  min-height: clamp(560px, 78vh, 860px);
  box-shadow: 0 22px 48px rgba(23, 48, 36, 0.2);
  cursor: zoom-out;
}

.village-parallax__layers {
  position: absolute;
  inset: 0;
}

.village-parallax__layer {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-size: cover;
  transition: transform 0.14s ease-out, filter 0.14s ease-out;
  will-change: transform;
  transform-origin: center center;
  transform:
    translate3d(
      calc(var(--move-x) * var(--depth-x)),
      calc(var(--move-y) * var(--depth-y)),
      0
    )
    scale(var(--layer-scale));
}

.village-parallax__layer--preview {
  filter: saturate(1.08) brightness(1.04) contrast(1.04);
  z-index: 1;
}

.village-parallax.is-expanded .village-parallax__layer--preview {
  filter: saturate(1.12) brightness(1.06) contrast(1.06);
}

.village-parallax__shade {
  position: absolute;
  inset: 0;
  z-index: 4;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.06) 35%, rgba(5, 150, 105, 0.22) 100%),
    radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.3), transparent 28%),
    radial-gradient(circle at 82% 12%, rgba(16, 185, 129, 0.18), transparent 24%);
  pointer-events: none;
}

.village-parallax.is-static .village-parallax__layer {
  transition: none;
}

.village-parallax.is-static {
  transform: none;
}

.village-parallax.is-static,
.village-parallax.is-static.is-expanded {
  cursor: default;
}

@media (hover: none), (pointer: coarse) {
  .village-parallax {
    cursor: default;
  }

  .village-parallax.is-expanded {
    cursor: default;
  }

  .village-parallax__layer {
    transform: scale(var(--layer-scale));
  }
}

@media (max-width: 768px) {
  .village-parallax {
    height: 400px;
  }
}
</style>