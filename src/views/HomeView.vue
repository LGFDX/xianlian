<template>
  <div class="home-page">
    <section class="hero container">
      <el-carousel height="440px" :interval="5000" indicator-position="outside" arrow="always">
        <el-carousel-item v-for="slide in heroSlides" :key="slide.title">
          <div class="hero-slide" :style="{ background: slide.image }">
            <div class="hero-content section-card">
              <el-tag type="success" effect="light">{{ slide.badge }}</el-tag>
              <h1>{{ slide.title }}</h1>
              <p>{{ slide.description }}</p>
              <div class="hero-actions">
                <el-button type="success" size="large" @click="$router.push('/home/industry')">开始探索</el-button>
                <el-button size="large" plain @click="$router.push('/home/auth')">立即登录</el-button>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section class="container stats-grid">
      <article v-for="stat in coreStats" :key="stat.label" class="stat-card section-card">
        <div class="icon">{{ stat.icon }}</div>
        <strong>{{ stat.value }}<span>{{ stat.suffix }}</span></strong>
        <p>{{ stat.label }}</p>
        <small>{{ stat.trend }}</small>
      </article>
    </section>

    <section class="container blocks-grid">
      <div class="section-head">
        <h2>五大链路入口</h2>
        <p>围绕产业、人才、治理、实践和资源形成统一入口。</p>
      </div>
      <div class="chain-grid">
        <router-link v-for="item in chainEntries" :key="item.title" :to="item.to" class="chain-card section-card">
          <div class="chain-icon">{{ item.icon }}</div>
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
        </router-link>
      </div>
    </section>

    <section class="container blocks-grid">
      <div class="section-head">
        <h2>试点村展示</h2>
        <p>真实成效与场景化表达结合，呈现各村特色发展路径。</p>
      </div>
      <div class="village-grid">
        <article v-for="village in pilotVillages" :key="village.name" class="village-card section-card">
          <img :src="village.image" :alt="village.name" />
          <div class="village-body">
            <div class="tag-row">
              <el-tag v-for="tag in village.tags" :key="tag" size="small" effect="light">{{ tag }}</el-tag>
            </div>
            <h3>{{ village.name }}</h3>
            <p>{{ village.achievement }}</p>
            <strong>{{ village.metric }}</strong>
          </div>
        </article>
      </div>
    </section>

    <section class="container blocks-grid split-layout">
      <div class="news-panel section-card">
        <div class="section-head compact">
          <h2>新闻动态</h2>
          <el-button text @click="$router.push('/home/resources')">查看更多</el-button>
        </div>
        <article v-for="news in newsList" :key="news.title" class="news-item">
          <span>{{ news.source }}</span>
          <h3>{{ news.title }}</h3>
          <p>{{ news.summary }}</p>
          <small>{{ news.time }}</small>
        </article>
      </div>
      <div class="partner-panel section-card">
        <div class="section-head compact">
          <h2>合作单位</h2>
          <p>高校、政府、企业共建共享。</p>
        </div>
        <div class="partner-strip">
          <div v-for="partner in partners" :key="partner.name" class="partner-item">
            <strong>{{ partner.name }}</strong>
            <span>{{ partner.type }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { coreStats, heroSlides, newsList, partners, pilotVillages, chainEntries } from '@/data/mock'
</script>

<style scoped>
.home-page {
  position: relative;
  z-index: 0;
  isolation: isolate;
  padding-bottom: 24px;
}

.home-page::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),
    url('../../图片/首页.png');
  background-position: center center, center center;
  background-size: cover, cover;
  background-repeat: no-repeat, no-repeat;
}

.hero {
  padding-top: 18px;
}

.hero-slide {
  height: 100%;
  border-radius: 28px;
  overflow: hidden;
  background-size: cover !important;
  background-position: center !important;
  display: flex;
  align-items: center;
  padding: 24px;
}

.hero-content {
  max-width: 520px;
  padding: 28px;
}

.hero-content h1 {
  font-size: clamp(30px, 4vw, 54px);
  line-height: 1.08;
  margin: 14px 0 12px;
}

.hero-content p {
  margin: 0;
  color: var(--xl-muted);
  line-height: 1.8;
}

.hero-actions {
  margin-top: 22px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 22px;
}

.stat-card {
  padding: 22px;
}

.stat-card .icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(46, 125, 50, 0.12);
  margin-bottom: 14px;
  font-size: 22px;
}

.stat-card strong {
  display: block;
  font-size: 34px;
}

.stat-card strong span {
  font-size: 16px;
  margin-left: 4px;
}

.stat-card p,
.stat-card small {
  display: block;
  margin: 4px 0 0;
  color: var(--xl-muted);
}

.blocks-grid {
  margin-top: 30px;
}

.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.section-head h2 {
  margin: 0;
  font-size: 26px;
}

.section-head p {
  margin: 0;
  color: var(--xl-muted);
}

.section-head.compact h2 {
  font-size: 22px;
}

.chain-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.chain-card {
  padding: 22px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.chain-card:hover,
.village-card:hover,
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 44px rgba(23, 48, 36, 0.14);
}

.chain-icon {
  font-size: 28px;
  margin-bottom: 10px;
}

.chain-card strong {
  display: block;
  margin-bottom: 8px;
}

.chain-card p {
  margin: 0;
  color: var(--xl-muted);
  line-height: 1.7;
}

.village-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.village-card {
  overflow: hidden;
}

.village-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.village-body {
  padding: 18px;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.village-body h3,
.news-item h3 {
  margin: 0 0 8px;
}

.village-body p,
.news-item p {
  margin: 0 0 12px;
  color: var(--xl-muted);
  line-height: 1.7;
}

.village-body strong {
  color: var(--xl-green);
}

.split-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;
  align-items: start;
}

.news-panel,
.partner-panel {
  padding: 22px;
  align-self: start;
}

.news-item {
  padding: 16px 0;
  border-top: 1px solid rgba(46, 125, 50, 0.08);
}

.news-item:first-of-type {
  border-top: none;
  padding-top: 0;
}

.news-item span {
  color: var(--xl-blue);
  font-size: 12px;
}

.partner-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.partner-item {
  min-height: 132px;
  border-radius: 20px;
  border: 1px solid rgba(46, 125, 50, 0.08);
  background: linear-gradient(180deg, rgba(46, 125, 50, 0.08), rgba(25, 118, 210, 0.05));
  display: grid;
  place-items: center;
  text-align: center;
  padding: 20px 18px;
}

.partner-item strong {
  display: block;
}

.partner-item span {
  color: var(--xl-muted);
  font-size: 12px;
}

@media (max-width: 1100px) {
  .stats-grid,
  .chain-grid,
  .village-grid,
  .split-layout {
    grid-template-columns: 1fr 1fr;
  }

  .partner-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-slide {
    padding: 12px;
  }

  .hero-content {
    padding: 18px;
  }

  .stats-grid,
  .chain-grid,
  .village-grid,
  .split-layout {
    grid-template-columns: 1fr;
  }

  .partner-strip {
    grid-template-columns: 1fr;
  }

  .section-head {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
