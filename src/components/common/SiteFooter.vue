<template>
  <footer class="site-footer">
    <div class="container footer-inner section-card">
      <div>
        <h3>乡链数字平台</h3>
        <p>连接高校劳动教育与乡村振兴的数字化枢纽。</p>
      </div>
      <div class="footer-links">
        <a href="#">隐私政策</a>
        <a href="#">联系方式：support@xianglian.cn</a>
        <span>备案号：滇ICP备20260001号</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 24px 0 36px;
}

.footer-inner {
  padding: 22px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

h3 {
  margin: 0 0 6px;
}

p {
  margin: 0;
  color: var(--xl-muted);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  color: var(--xl-muted);
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-links {
    justify-content: flex-start;
  }
}
</style>