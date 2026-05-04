<template>
  <div class="container page-wrap">
    <section class="section-card page-card">
      <div class="page-head">
        <div>
          <h1>人才培育</h1>
          <p>乡智夜校、耕读课堂、新农人风采、培训报名一体化管理。</p>
        </div>
        <el-tag type="warning" effect="light">人才成长中心</el-tag>
      </div>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="乡智夜校" name="night-school">
          <div class="grid-3">
            <article v-for="course in trainingCourses" :key="course.title" class="course-card section-card">
              <img :src="course.cover" :alt="course.title" />
              <div class="body">
                <h3>{{ course.title }}</h3>
                <p>{{ course.teacher }} · {{ course.duration }}</p>
                <el-button size="small" type="success">在线播放</el-button>
              </div>
            </article>
          </div>
        </el-tab-pane>
        <el-tab-pane label="耕读课堂" name="classroom">
          <div class="grid-2">
            <el-card v-for="item in classroomResources" :key="item.title" shadow="never">
              <template #header>{{ item.title }}</template>
              <p>{{ item.type }} · {{ item.fileSize }}</p>
              <el-button size="small" plain>下载课件</el-button>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新农人风采" name="stories">
          <div class="story-grid">
            <article v-for="item in farmerStories" :key="item.name" class="story-card section-card">
              <img :src="item.image" :alt="item.name" />
              <div class="body">
                <h3>{{ item.name }}</h3>
                <p>{{ item.role }}</p>
                <p>{{ item.story }}</p>
              </div>
            </article>
          </div>
        </el-tab-pane>
        <el-tab-pane label="培训报名" name="signup">
          <el-table :data="trainingEvents" stripe>
            <el-table-column prop="title" label="活动名称" />
            <el-table-column prop="time" label="时间" />
            <el-table-column prop="location" label="地点" />
            <el-table-column prop="seats" label="名额" />
            <el-table-column label="操作">
              <template #default>
                <el-button size="small" type="primary">在线报名</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { classroomResources, farmerStories, trainingCourses, trainingEvents } from '@/data/mock'

const activeTab = ref('night-school')
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
    url('../../图片/人才培育.png');
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

.grid-3,
.story-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.course-card,
.story-card {
  overflow: hidden;
}

.course-card img,
.story-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.body {
  padding: 16px;
}

.body h3,
.body p {
  margin: 0 0 8px;
}

.body p {
  color: var(--xl-muted);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .story-grid {
    grid-template-columns: 1fr;
  }

  .page-head {
    flex-direction: column;
  }
}
</style>
