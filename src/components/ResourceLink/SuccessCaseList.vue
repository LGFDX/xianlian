<template>
  <section class="section-card success-case-panel">
    <div class="success-case-panel__head">
      <div>
        <p class="success-case-panel__eyebrow">乡村振兴成功案例</p>
        <h2>可复制、可落地的乡村实践样板</h2>
        <p>六条模拟案例覆盖产业、文创、冷链、治理、协作与实践转化场景。</p>
      </div>

      <el-tag type="success" effect="light">{{ successCases.length }} 个案例</el-tag>
    </div>

    <div class="success-case-grid">
      <button
        v-for="item in successCases"
        :key="item.id"
        type="button"
        class="success-case-card"
        :aria-label="`查看 ${item.title} 的详细内容`"
        @click="openCase(item)"
      >
        <div class="success-case-card__cover">
          <img :src="item.cover" :alt="item.title" loading="lazy" />
          <span class="success-case-card__location">{{ item.location }}</span>
        </div>

        <div class="success-case-card__body">
          <div class="success-case-card__meta">
            <span>{{ item.time }}</span>
          </div>

          <h3>{{ item.title }}</h3>
          <p>{{ item.shortDesc }}</p>
        </div>
      </button>
    </div>

    <SuccessCaseModal v-model="dialogVisible" :case-item="selectedCase" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SuccessCase } from '@/data/successCases'
import { successCases } from '@/data/successCases'
import SuccessCaseModal from '@/components/ResourceLink/SuccessCaseModal.vue'

const selectedCase = ref<SuccessCase | null>(null)

const dialogVisible = computed({
  get: () => selectedCase.value !== null,
  set: value => {
    if (!value) {
      selectedCase.value = null
    }
  }
})

const openCase = (caseItem: SuccessCase) => {
  selectedCase.value = caseItem
}
</script>

<style scoped>
.success-case-panel {
  padding: 24px;
}

.success-case-panel__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
}

.success-case-panel__eyebrow {
  margin: 0 0 6px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--xl-green);
  text-transform: uppercase;
}

.success-case-panel__head h2 {
  margin: 0;
  font-size: clamp(1.2rem, 1.8vw, 1.6rem);
  line-height: 1.3;
  color: var(--xl-text);
}

.success-case-panel__head p {
  margin: 10px 0 0;
  color: var(--xl-muted);
  line-height: 1.7;
}

.success-case-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.success-case-card {
  appearance: none;
  border: 1px solid rgba(46, 125, 50, 0.1);
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  padding: 0;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 14px 32px rgba(23, 48, 36, 0.08);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
}

.success-case-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 20px 40px rgba(23, 48, 36, 0.14);
  border-color: rgba(5, 150, 105, 0.24);
}

.success-case-card:focus-visible {
  outline: 3px solid rgba(5, 150, 105, 0.25);
  outline-offset: 3px;
}

.success-case-card__cover {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: #edf5ee;
}

.success-case-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.success-case-card:hover .success-case-card__cover img {
  transform: scale(1.05);
}

.success-case-card__location {
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(5, 150, 105, 0.88);
  color: #fff;
  font-size: 0.78rem;
  font-weight: 600;
  box-shadow: 0 10px 20px rgba(5, 150, 105, 0.18);
}

.success-case-card__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 16px 18px;
}

.success-case-card__meta {
  color: var(--xl-green);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.success-case-card__body h3 {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.45;
  color: var(--xl-text);
}

.success-case-card__body p {
  margin: 0;
  color: var(--xl-muted);
  line-height: 1.75;
}

@media (max-width: 1024px) {
  .success-case-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .success-case-panel {
    padding: 20px;
  }

  .success-case-panel__head {
    flex-direction: column;
  }

  .success-case-grid {
    grid-template-columns: 1fr;
  }
}
</style>