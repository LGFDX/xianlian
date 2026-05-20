<template>
  <div class="container page-wrap resource-link-page" :style="pageStyle">
    <Village3DParallax />
    <SuccessCaseList />
    <VillageGallery />

    <section class="section-card page-card">
      <div class="page-head">
        <div>
          <h1>资源链接</h1>
          <p>政策查询、资金申请、对接会、合作入驻。</p>
        </div>
        <el-tag type="danger" effect="light">资源中心</el-tag>
      </div>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="政策查询" name="policy">
          <el-input v-model="keyword" placeholder="搜索政策文件" class="search-input">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <div class="grid-3">
            <el-card v-for="doc in filteredPolicies" :key="doc.title" shadow="never">
              <template #header>{{ doc.title }}</template>
              <p>级别：{{ doc.level }}</p>
              <div class="tag-row">
                <el-tag v-for="tag in doc.keywords" :key="tag" size="small" effect="light">{{ tag }}</el-tag>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="资金申请" name="funding">
          <el-table :data="fundingGuides" stripe>
            <el-table-column prop="title" label="项目名称" />
            <el-table-column prop="amount" label="支持额度" />
            <el-table-column prop="deadline" label="截止时间" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="对接会" name="meeting">
          <el-timeline>
            <el-timeline-item v-for="meeting in dockingMeetings" :key="meeting.title" :timestamp="meeting.time">
              <strong>{{ meeting.title }}</strong>
              <p>{{ meeting.form }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
        <el-tab-pane label="合作入驻" name="join">
          <el-row :gutter="16">
            <el-col :xs="24" :md="12">
              <el-form label-width="100px">
                <el-form-item label="合作方类型">
                  <el-radio-group v-model="joinForm.type">
                    <el-radio-button label="企业" />
                    <el-radio-button label="高校" />
                    <el-radio-button label="乡村" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="名称">
                  <el-input v-model="joinForm.name" />
                </el-form-item>
                <el-form-item label="需求描述">
                  <el-input v-model="joinForm.desc" type="textarea" :rows="4" />
                </el-form-item>
                <el-button type="success">提交入驻申请</el-button>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import Village3DParallax from '@/components/ResourceLink/Village3DParallax.vue'
import SuccessCaseList from '@/components/ResourceLink/SuccessCaseList.vue'
import VillageGallery from '@/components/ResourceLink/VillageGallery.vue'
import { dockingMeetings, fundingGuides, policyDocs } from '@/data/mock'

const activeTab = ref('policy')
const keyword = ref('')
const joinForm = ref({ type: '企业', name: '', desc: '' })

const pageBackgroundUrl = encodeURI(`${import.meta.env.BASE_URL}images/village/资源链接.png`)

const pageStyle = computed<Record<string, string>>(() => ({
  '--resource-link-bg': `url(${pageBackgroundUrl})`
}))

const filteredPolicies = computed(() => {
  const normalizedKeyword = keyword.value.trim()

  if (!normalizedKeyword) return policyDocs

  return policyDocs.filter(item =>
    item.title.includes(normalizedKeyword) || item.keywords.some(key => key.includes(normalizedKeyword))
  )
})
</script>

<style scoped>
.page-wrap {
  position: relative;
  z-index: 0;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: 30px;
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
    var(--resource-link-bg);
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

.page-head h1 {
  margin: 0 0 8px;
}

.page-head p {
  margin: 0;
  color: var(--xl-muted);
}

.search-input {
  margin-bottom: 14px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 768px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }

  .page-head {
    flex-direction: column;
  }
}
</style>