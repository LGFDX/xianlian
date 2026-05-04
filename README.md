# 乡链数字平台

基于 Vue 3 + Vite + Element Plus + Pinia + ECharts 构建的“乡链”数字平台前端示例项目。

## 目录结构

```text
乡村/
├─ index.html                # 应用入口 HTML
├─ package.json              # 依赖与脚本
├─ package-lock.json          # 锁定依赖版本
├─ vite.config.ts            # Vite 构建配置与别名
├─ tsconfig.json             # 前端 TypeScript 配置
├─ tsconfig.node.json        # Vite 配置的 Node 类型支持
├─ src/
│  ├─ main.ts                # 应用入口，挂载 Vue、Pinia、Element Plus
│  ├─ App.vue                # 根组件
│  ├─ vite-env.d.ts          # Vite 类型声明
│  ├─ styles/
│  │  └─ global.css          # 全局主题样式
│  ├─ router/
│  │  └─ index.ts            # 路由配置
│  ├─ stores/
│  │  └─ app.ts              # 全局状态管理
│  ├─ data/
│  │  └─ mock.ts             # 平台模拟数据
│  ├─ layouts/
│  │  ├─ PublicLayout.vue    # 公共前台布局
│  │  └─ AdminLayout.vue     # 后台管理布局
│  ├─ components/common/
│  │  ├─ TopNav.vue          # 顶部导航
│  │  ├─ SiteFooter.vue      # 页脚
│  │  └─ BreadcrumbBar.vue   # 面包屑
│  └─ views/
│     ├─ HomeView.vue        # 首页
│     ├─ IndustryView.vue    # 产业赋能页
│     ├─ TalentView.vue      # 人才培育页
│     ├─ GovernanceView.vue  # 治理创新页
│     ├─ PracticeView.vue    # 校地实践页
│     ├─ ResourcesView.vue   # 资源链接页
│     ├─ AuthView.vue        # 登录/注册页
│     ├─ NotFoundView.vue    # 404 页面
│     └─ admin/
│        ├─ AdminDashboard.vue # 后台数据总览
│        ├─ AdminUsers.vue     # 用户管理
│        ├─ AdminContent.vue   # 内容管理
│        ├─ AdminOrders.vue    # 订单管理
│        ├─ AdminVillage.vue   # 村务管理
│        └─ AdminSettings.vue  # 系统设置
```

## 功能说明

- 前台提供首页、产业赋能、人才培育、治理创新、校地实践、资源链接和登录注册页面。
- 后台提供数据总览、用户管理、内容管理、订单管理、村务管理、系统设置。
- 首页包含轮播图、核心数据看板、五大链路入口、试点村展示、新闻动态和合作单位展示。
- 全站使用 Element Plus 统一组件风格，ECharts 用于后台看板图表展示。
- 数据来自 `src/data/mock.ts`，方便后续替换为真实接口。

## 启动步骤

1. 安装依赖。

```bash
npm install
```

2. 启动开发服务。

```bash
npm run dev
```

3. 打开浏览器访问 `http://localhost:5173`。

4. 打包生产版本。

```bash
npm run build
```

5. 本地预览构建结果。

```bash
npm run preview
```

## 备注

- 项目根目录使用 `@` 作为 `src` 别名。
- 首页与各业务页均为响应式布局，适配 PC、平板和手机。
- 当前为前端完整模拟版，后续可直接把 `mock.ts` 替换成接口层。
