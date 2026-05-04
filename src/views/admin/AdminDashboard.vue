<template>
  <div class="admin-page">
    <el-row :gutter="16">
      <el-col v-for="metric in adminMetrics" :key="metric.label" :xs="24" :sm="12" :lg="6">
        <el-card shadow="never" class="metric-card">
          <p>{{ metric.label }}</p>
          <strong>{{ metric.value }}</strong>
          <span>{{ metric.change }}</span>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="charts-row">
      <el-col :xs="24" :lg="12">
        <el-card shadow="never" class="chart-card">
          <template #header>用户增长曲线</template>
          <div ref="lineRef" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12">
        <el-card shadow="never" class="chart-card">
          <template #header>订单统计饼图</template>
          <div ref="pieRef" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="charts-row">
      <el-col :xs="24">
        <el-card shadow="never" class="chart-card">
          <template #header>活跃度柱状图</template>
          <div ref="barRef" class="chart-box large"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { adminMetrics } from '@/data/mock'

const lineRef = ref<HTMLDivElement>()
const pieRef = ref<HTMLDivElement>()
const barRef = ref<HTMLDivElement>()
let lineChart: echarts.ECharts | undefined
let pieChart: echarts.ECharts | undefined
let barChart: echarts.ECharts | undefined

function renderCharts() {
  if (!lineRef.value || !pieRef.value || !barRef.value) return

  lineChart = echarts.init(lineRef.value)
  pieChart = echarts.init(pieRef.value)
  barChart = echarts.init(barRef.value)

  lineChart.setOption({
    grid: { left: 30, right: 20, top: 30, bottom: 20 },
    xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', smooth: true, data: [3200, 4100, 4800, 5600, 6900, 8264], areaStyle: { opacity: 0.15 }, lineStyle: { color: '#2e7d32' }, itemStyle: { color: '#1976D2' } }]
  })

  pieChart.setOption({
    legend: { bottom: 0 },
    series: [{ type: 'pie', radius: ['45%', '70%'], data: [{ value: 38, name: '农产品' }, { value: 24, name: '文旅' }, { value: 18, name: '课程' }, { value: 20, name: '服务' }] }]
  })

  barChart.setOption({
    grid: { left: 30, right: 20, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: ['美泉村', '均良村', '古生村', '双廊村', '白沙古镇', '海晏村'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [82, 74, 68, 77, 88, 91], itemStyle: { color: '#FFB300' } }]
  })
}

function resizeCharts() {
  lineChart?.resize()
  pieChart?.resize()
  barChart?.resize()
}

onMounted(() => {
  renderCharts()
  window.addEventListener('resize', resizeCharts)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCharts)
  lineChart?.dispose()
  pieChart?.dispose()
  barChart?.dispose()
})
</script>

<style scoped>
.admin-page {
  padding: 10px 0 0;
}

.metric-card,
.chart-card {
  margin-bottom: 16px;
}

.metric-card p {
  margin: 0 0 8px;
  color: var(--xl-muted);
}

.metric-card strong {
  display: block;
  font-size: 30px;
}

.metric-card span {
  color: var(--xl-green);
}

.chart-box {
  width: 100%;
  height: 320px;
}

.chart-box.large {
  height: 380px;
}
</style>
