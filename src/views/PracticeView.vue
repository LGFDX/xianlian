<template>
  <div class="container page-wrap">
    <section class="section-card page-card">
      <div class="page-head">
        <div>
          <h1>校地实践</h1>
          <p>实践基地、项目招募、成果展示、学分认定。</p>
        </div>
        <el-tag type="primary" effect="light">校地协同中心</el-tag>
      </div>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="实践基地" name="bases">
          <div class="grid-3">
            <article v-for="base in practiceBases" :key="base.name" class="base-card section-card">
              <img :src="base.image" :alt="base.name" />
              <div class="body">
                <h3>{{ base.name }}</h3>
                <p>{{ base.location }} · {{ base.feature }}</p>
              </div>
            </article>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目招募" name="projects">
          <el-table :data="recruitmentProjects" stripe>
            <el-table-column prop="title" label="项目名称" />
            <el-table-column prop="type" label="类型" />
            <el-table-column prop="duration" label="时长" />
            <el-table-column prop="applicants" label="报名人数" />
            <el-table-column label="报名">
              <template #default>
                <el-button size="small" type="success">在线报名</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="成果展示" name="achievements">
          <el-collapse accordion>
            <el-collapse-item v-for="item in achievements" :key="item.title" :title="item.title">
              <p>{{ item.type }}：{{ item.detail }}</p>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="学分认定" name="credit">
          <el-steps :active="4" finish-status="success" align-center>
            <el-step v-for="step in creditSteps" :key="step" :title="step" />
          </el-steps>
          <div class="form-box section-card">
            <h3>在线申请</h3>
            <el-form label-width="100px">
              <el-form-item label="学生姓名">
                <el-input placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="实践项目">
                <el-select placeholder="选择项目">
                  <el-option label="乡村直播助农项目" value="1" />
                  <el-option label="村务数字化调研" value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="材料上传">
                <el-upload action="#" :auto-upload="false">
                  <el-button>上传证明材料</el-button>
                </el-upload>
              </el-form-item>
              <el-button type="primary">提交申请</el-button>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { practiceBases, recruitmentProjects, achievements, creditSteps } from '@/data/mock'

const activeTab = ref('bases')
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
    url('../../图片/校地实践.png');
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

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.base-card {
  overflow: hidden;
}

.base-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.body,
.form-box {
  padding: 16px;
}

.body h3,
.form-box h3 {
  margin: 0 0 8px;
}

.body p {
  margin: 0;
  color: var(--xl-muted);
}

.form-box {
  margin-top: 18px;
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
