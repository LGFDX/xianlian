<template>
  <div class="container page-wrap">
    <section class="section-card page-card">
      <div class="page-head">
        <div>
          <h1>治理创新</h1>
          <p>数字台账、社区议事、环保积分、办事指南、问题反馈。</p>
        </div>
        <el-tag type="info" effect="light">村务治理中心</el-tag>
      </div>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="数字台账" name="ledger">
          <el-timeline>
            <el-timeline-item v-for="item in digitalLedgers" :key="item.title" :timestamp="item.time">
              <strong>{{ item.title }}</strong>
              <p>{{ item.category }} · {{ item.status }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
        <el-tab-pane label="社区议事" name="discussion">
          <div class="grid-2">
            <el-card v-for="topic in discussionTopics" :key="topic.title" shadow="never">
              <template #header>{{ topic.title }}</template>
              <p>{{ topic.detail }}</p>
              <p>发起方：{{ topic.author }}</p>
              <p>当前票数：{{ topic.votes }}</p>
              <el-button size="small" type="success">在线投票</el-button>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="环保积分" name="eco">
          <el-table :data="ecoPoints" stripe>
            <el-table-column prop="name" label="村民" />
            <el-table-column prop="score" label="积分" />
            <el-table-column prop="record" label="积分来源" />
            <el-table-column label="兑换">
              <template #default>
                <el-button size="small" plain>查看兑换记录</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="办事指南" name="guide">
          <el-steps :active="4" align-center finish-status="success">
            <el-step v-for="step in serviceSteps" :key="step.title" :title="step.title" :description="step.description" />
          </el-steps>
        </el-tab-pane>
        <el-tab-pane label="问题反馈" name="feedback">
          <el-row :gutter="16">
            <el-col :xs="24" :md="12">
              <el-form label-width="100px">
                <el-form-item label="问题类型">
                  <el-input placeholder="如：路灯维修" />
                </el-form-item>
                <el-form-item label="问题描述">
                  <el-input type="textarea" :rows="4" placeholder="请详细填写问题" />
                </el-form-item>
                <el-form-item label="上传图片">
                  <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <el-icon><Plus /></el-icon>
                  </el-upload>
                </el-form-item>
                <el-button type="success">提交反馈</el-button>
              </el-form>
            </el-col>
            <el-col :xs="24" :md="12">
              <el-card shadow="never">
                <template #header>反馈示例</template>
                <div v-for="item in feedbackExamples" :key="item.title" class="feedback-item">
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.status }} · {{ item.reply }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { digitalLedgers, discussionTopics, ecoPoints, serviceSteps, feedbackExamples } from '@/data/mock'

const activeTab = ref('ledger')
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
    url('../../图片/治理创新.png');
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

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.feedback-item {
  padding: 12px 0;
  border-bottom: 1px solid rgba(46, 125, 50, 0.08);
}

.feedback-item:last-child {
  border-bottom: none;
}

.feedback-item p {
  margin: 6px 0 0;
  color: var(--xl-muted);
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }

  .page-head {
    flex-direction: column;
  }
}
</style>
