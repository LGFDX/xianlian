<template>
  <button type="button" class="village-3d-card" :style="cardStyle" @click="emit('open')">
    <div class="village-3d-card__media">
      <img :src="village.cover" :alt="village.name" loading="lazy" />
      <div class="village-3d-card__shine"></div>
      <div class="village-3d-card__badge">
        <span>村落画廊</span>
        <strong>{{ village.images.length }} 图</strong>
      </div>
    </div>

    <div class="village-3d-card__body">
      <div class="village-3d-card__meta">
        <span>#{{ String(index + 1).padStart(2, '0') }}</span>
        <span>点击展开图册</span>
      </div>

      <h3>{{ village.name }}</h3>
      <p>{{ village.intro }}</p>

      <div class="village-3d-card__footer">
        <span>查看完整介绍</span>
        <span class="village-3d-card__arrow">→</span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Village } from '@/data/villageData'

const props = withDefaults(
  defineProps<{
    village: Village
    index?: number
  }>(),
  {
    index: 0
  }
)

const emit = defineEmits<{
  open: []
}>()

const cardStyle = computed(() => ({
  '--card-delay': `${props.index * 70}ms`
}))
</script>

<style scoped>
.village-3d-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  border: 1px solid rgba(46, 125, 50, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 14px 34px rgba(23, 48, 36, 0.1);
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  color: inherit;
  font: inherit;
  transform-style: preserve-3d;
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    border-color 0.28s ease;
  animation: village-card-in 0.72s ease both;
  animation-delay: var(--card-delay);
}

.village-3d-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.72), transparent 36%),
    linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(23, 48, 36, 0.12) 100%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.28s ease;
}

.village-3d-card::after {
  content: '';
  position: absolute;
  inset: auto 16px 16px auto;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.48), transparent 72%);
  filter: blur(10px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.28s ease;
}

.village-3d-card:hover {
  transform: perspective(1200px) translateY(-8px) rotateX(3deg) rotateY(-5deg);
  box-shadow: 0 22px 44px rgba(23, 48, 36, 0.16);
  border-color: rgba(5, 150, 105, 0.22);
}

.village-3d-card:hover::before,
.village-3d-card:hover::after {
  opacity: 1;
}

.village-3d-card:focus-visible {
  outline: 3px solid rgba(5, 150, 105, 0.26);
  outline-offset: 4px;
}

.village-3d-card__media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #edf4ea;
}

.village-3d-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.village-3d-card:hover .village-3d-card__media img {
  transform: scale(1.07);
}

.village-3d-card__shine {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0) 35%, rgba(9, 35, 23, 0.72) 100%),
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.36), transparent 36%);
  pointer-events: none;
}

.village-3d-card__badge {
  position: absolute;
  left: 14px;
  bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.24);
  color: #fff;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16);
}

.village-3d-card__badge span {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.village-3d-card__badge strong {
  font-size: 0.82rem;
  font-weight: 700;
}

.village-3d-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  min-height: 182px;
  padding: 16px 16px 18px;
}

.village-3d-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--xl-green);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.village-3d-card__body h3 {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.45;
  color: var(--xl-text);
}

.village-3d-card__body p {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: var(--xl-muted);
  line-height: 1.75;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.village-3d-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 2px;
  color: var(--xl-green);
  font-size: 0.9rem;
  font-weight: 700;
}

.village-3d-card__arrow {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(46, 125, 50, 0.1);
}

@keyframes village-card-in {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>