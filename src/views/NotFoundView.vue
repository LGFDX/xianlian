<template>
  <div class="notfound-page container">
    <div class="section-card notfound-card">
      <h1>404</h1>
      <p>页面没有找到，可能已被移动或删除。</p>
      <el-button type="success" @click="$router.push('/home')">返回首页</el-button>
    </div>
  </div>
</template>

<style scoped>
.notfound-page {
  min-height: calc(100vh - 180px);
  display: grid;
  place-items: center;
  padding: 24px 0;
}

.notfound-card {
  width: min(520px, 100%);
  padding: 36px 28px;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 78px;
  color: var(--xl-green);
}

p {
  margin: 10px 0 22px;
  color: var(--xl-muted);
}
</style>
