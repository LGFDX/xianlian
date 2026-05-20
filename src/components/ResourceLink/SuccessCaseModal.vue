<template>
  <el-dialog
    v-model="dialogVisible"
    class="success-case-modal"
    :width="dialogWidth"
    align-center
    :lock-scroll="false"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    destroy-on-close
  >
    <template #header>
      <div v-if="caseItem" class="success-case-modal__header">
        <div>
          <p class="success-case-modal__eyebrow">乡村振兴成功案例</p>
          <h3>{{ caseItem.title }}</h3>
        </div>
        <el-tag type="success" effect="light">{{ caseItem.location }}</el-tag>
      </div>
    </template>

    <div v-if="caseItem" ref="dialogBodyRef" class="success-case-modal__body" @wheel="handleDialogWheel">
      <div class="success-case-modal__media">
        <img :src="caseItem.cover" :alt="caseItem.title" loading="lazy" />
      </div>

      <div class="success-case-modal__detail">
        <div class="success-case-modal__meta">
          <span><strong>地点</strong>{{ caseItem.location }}</span>
          <span><strong>时间</strong>{{ caseItem.time }}</span>
        </div>

        <p class="success-case-modal__summary">{{ caseItem.shortDesc }}</p>

        <div class="success-case-modal__content">
          <p>{{ caseItem.fullContent }}</p>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SuccessCase } from '@/data/successCases'

const props = defineProps<{
  modelValue: boolean
  caseItem: SuccessCase | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: value => {
    emit('update:modelValue', value)
  }
})

const dialogBodyRef = ref<HTMLElement | null>(null)

const dialogWidth = 'min(900px, calc(100vw - 24px))'

const handleDialogWheel = (event: WheelEvent) => {
  if (!dialogBodyRef.value) return

  event.preventDefault()
  dialogBodyRef.value.scrollTop += event.deltaY
}
</script>

<style scoped>
:deep(.success-case-modal) {
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.98);
}

:deep(.success-case-modal .el-dialog__header) {
  margin-right: 0;
  padding: 22px 24px 8px;
}

:deep(.success-case-modal .el-dialog__body) {
  padding: 0 24px 24px;
}

.success-case-modal__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.success-case-modal__eyebrow {
  margin: 0 0 6px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--xl-green);
  text-transform: uppercase;
}

.success-case-modal__header h3 {
  margin: 0;
  font-size: 1.32rem;
  line-height: 1.3;
  color: var(--xl-text);
}

.success-case-modal__body {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 20px;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  padding-right: 4px;
}

.success-case-modal__media {
  overflow: hidden;
  border-radius: 18px;
  background: #eef5ec;
  box-shadow: inset 0 0 0 1px rgba(46, 125, 50, 0.08);
}

.success-case-modal__media img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}

.success-case-modal__detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.success-case-modal__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  color: var(--xl-muted);
  font-size: 0.92rem;
}

.success-case-modal__meta strong {
  margin-right: 6px;
  color: var(--xl-text);
}

.success-case-modal__summary {
  margin: 0;
  line-height: 1.8;
  color: var(--xl-text);
  font-weight: 500;
}

.success-case-modal__content {
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(5, 150, 105, 0.06);
  border: 1px solid rgba(5, 150, 105, 0.12);
  color: var(--xl-text);
  line-height: 1.8;
}

.success-case-modal__content p {
  margin: 0;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .success-case-modal__body {
    grid-template-columns: 1fr;
  }
}
</style>