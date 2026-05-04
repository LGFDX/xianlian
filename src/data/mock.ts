import type { UserRole } from '@/stores/app'

export interface HeroSlide {
  title: string
  description: string
  image: string
  badge: string
}

export interface StatCard {
  label: string
  value: string
  suffix?: string
  trend: string
  icon: string
}

export interface VillageCard {
  name: string
  tags: string[]
  achievement: string
  metric: string
  image: string
}

export interface NewsItem {
  title: string
  time: string
  summary: string
  source: string
}

export interface PartnerItem {
  name: string
  type: string
}

export interface ProductItem {
  name: string
  price: number
  origin: string
  tag: string
  image: string
}

export interface ServiceItem {
  title: string
  description: string
  status: string
  price: string
  image: string
}

export interface IndustryCase {
  title: string
  before: string
  after: string
  impact: string
  image: string
}

export interface SupplyDemandItem {
  title: string
  type: string
  area: string
  quantity: string
  status: string
}

export interface CourseItem {
  title: string
  teacher: string
  duration: string
  cover: string
}

export interface ResourceItem {
  title: string
  type: string
  fileSize: string
}

export interface FarmerStory {
  name: string
  role: string
  story: string
  image: string
}

export interface TrainingEvent {
  title: string
  time: string
  location: string
  seats: number
}

export interface LedgerItem {
  title: string
  category: string
  time: string
  status: string
}

export interface TopicItem {
  title: string
  author: string
  votes: number
  detail: string
}

export interface EcoPoint {
  name: string
  score: number
  record: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface PracticeBase {
  name: string
  location: string
  feature: string
  image: string
}

export interface RecruitmentProject {
  title: string
  type: string
  duration: string
  applicants: number
}

export interface AchievementItem {
  title: string
  type: string
  detail: string
}

export interface PolicyDoc {
  title: string
  level: string
  keywords: string[]
}

export interface FundingGuide {
  title: string
  amount: string
  deadline: string
}

export interface DockingMeeting {
  title: string
  form: string
  time: string
}

export interface AdminMetric {
  label: string
  value: string
  change: string
}

export const roles: UserRole[] = ['村民', '高校', '企业', '管理员']

export const heroSlides: HeroSlide[] = [
  {
    title: '耕读教育赋能乡村振兴',
    description: '把课堂搬到田埂，把劳动教育落到实处，推动高校师生与乡村发展双向奔赴。',
    image: 'linear-gradient(135deg, rgba(46,125,50,.82), rgba(25,118,210,.65)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80)',
    badge: '乡链主会场'
  },
  {
    title: '美泉村试点成效',
    description: '村务办理流程简化60%，村民人均增收超1000元，数字台账和共治机制同步见效。',
    image: 'linear-gradient(135deg, rgba(25,118,210,.75), rgba(141,110,99,.55)), url(https://images.unsplash.com/photo-1506935638516-9897255d1274?auto=format&fit=crop&w=1400&q=80)',
    badge: '试点成效'
  },
  {
    title: '大学生实践风采',
    description: '以项目制实践推动课程、基地、产品、传播联动，形成可复制的乡村实践样板。',
    image: 'linear-gradient(135deg, rgba(255,179,0,.6), rgba(46,125,50,.7)), url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80)',
    badge: '实践成果'
  }
]

export const coreStats: StatCard[] = [
  { label: '覆盖村落', value: '18', suffix: '个', trend: '较上月 +4', icon: '🏡' },
  { label: '服务村民', value: '2000', suffix: '+人', trend: '持续增长', icon: '👥' },
  { label: '带动增收', value: '300', suffix: '万元+', trend: '产业联动', icon: '💰' },
  { label: '实践学生', value: '500', suffix: '+人次', trend: '校地共建', icon: '🎓' }
]

export const chainEntries = [
  { title: '产业赋能', description: '农产品、文旅产品、产销对接一体化服务', to: '/home/industry', icon: '🌿' },
  { title: '人才培育', description: '乡智夜校、耕读课堂、新农人培训', to: '/home/talent', icon: '📚' },
  { title: '治理创新', description: '数字台账、社区议事、环保积分', to: '/home/governance', icon: '🧭' },
  { title: '校地实践', description: '实践基地、项目招募、成果展示', to: '/home/practice', icon: '🤝' },
  { title: '资源链接', description: '政策查询、资金申请、合作入驻', to: '/home/resources', icon: '🔗' }
]

export const pilotVillages: VillageCard[] = [
  { name: '美泉村', tags: ['流程优化', '数字台账', '村民增收'], achievement: '村务办理流程简化60%', metric: '村民人均增收超1000元', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80' },
  { name: '均良村', tags: ['耕读实践', '直播助农'], achievement: '实践团队常态化驻点', metric: '农产品线上曝光提升180%', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80' },
  { name: '古生村', tags: ['文旅融合', '非遗体验'], achievement: '打造村史与文化研学线路', metric: '游客停留时长提升45%', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=80' },
  { name: '双廊村', tags: ['旅居服务', '平台招商'], achievement: '合作商户共建共治', metric: '商旅联动订单增长120%', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80' },
  { name: '白沙古镇', tags: ['非遗工坊', '文创孵化'], achievement: '开发东巴文化文创产品', metric: '文创销售额月均增长28%', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80' },
  { name: '海晏村', tags: ['生态积分', '环保共治'], achievement: '垃圾分类与积分兑换联动', metric: '环保参与率达92%', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80' }
]

export const newsList: NewsItem[] = [
  { title: '美泉村乡智夜校第一期开班，50名村民参加数字技能培训', time: '2026-04-26', summary: '课程围绕手机拍摄、直播带货与村务小程序使用展开，进一步提升村民数字参与能力。', source: '乡链快讯' },
  { title: '大学生实践团队助力雪桃销售，打通校地联动产销链路', time: '2026-04-22', summary: '实践团队联合合作企业上线产销对接页，推动美泉雪桃进入高校消费场景。', source: '产业动态' },
  { title: '村务公开数字台账升级，议事、反馈、积分联动上线', time: '2026-04-18', summary: '平台将村务公开、问题反馈与积分激励合并到统一治理模块，提升办事透明度。', source: '治理简报' }
]

export const partners: PartnerItem[] = [
  { name: '云南农业大学', type: '高校' },
  { name: '昆明学院', type: '高校' },
  { name: '地方农业农村局', type: '政府' },
  { name: '乡村振兴基金', type: '机构' },
  { name: '雪桃优选', type: '企业' },
  { name: '滇云文旅', type: '企业' }
]

export const products: ProductItem[] = [
  { name: '美泉雪桃', price: 29.9, origin: '美泉村', tag: '当季热销', image: new URL('../../图片/美泉雪桃.jpg', import.meta.url).href },
  { name: '拉市三文鱼', price: 89.0, origin: '拉市乡', tag: '冷链直发', image: new URL('../../图片/拉市三文鱼.jpg', import.meta.url).href },
  { name: '东巴纸文创礼盒', price: 58.0, origin: '白沙古镇', tag: '非遗文创', image: new URL('../../图片/东巴纸文创礼盒.jpg', import.meta.url).href },
  { name: '纳西刺绣香包', price: 39.0, origin: '古城片区', tag: '手工精品', image: new URL('../../图片/纳西刺绣香包.jpg', import.meta.url).href }
]

export const tourismProducts: ServiceItem[] = [
  { title: '耕读研学 1 日体验', description: '田间课程 + 村史讲解 + 劳动实践', status: '可预约', price: '￥99/人', image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&w=900&q=80' },
  { title: '骑马体验线路', description: '乡村轻户外体验，适合亲子与研学团体', status: '热门项目', price: '￥128/人', image: 'https://images.unsplash.com/photo-1454557278752-fc16a8a3d38d?auto=format&fit=crop&w=900&q=80' },
  { title: '东巴非遗工坊', description: '体验造纸、拓印、纹样创作', status: '支持团建', price: '￥168/人', image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80' }
]

export const industryCases: IndustryCase[] = [
  { title: '雪桃品牌升级案例', before: '主要依赖线下批发，价格波动明显', after: '通过高校电商团队与平台导流，建立稳定订单池', impact: '销售周期缩短40%，客单价提升22%', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80' },
  { title: '东巴文创孵化案例', before: '传统手工艺品缺少标准包装与线上渠道', after: '完成礼盒化设计和节庆场景营销', impact: '文创复购率提升35%', image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=900&q=80' }
]

export const supplyDemand: SupplyDemandItem[] = [
  { title: '企业采购：高校食堂雪桃礼盒', type: '采购需求', area: '昆明市', quantity: '500箱', status: '对接中' },
  { title: '农户供应：拉市三文鱼冷链批量供货', type: '供应信息', area: '丽江市', quantity: '300斤/周', status: '已发布' },
  { title: '企业采购：非遗伴手礼文创套装', type: '采购需求', area: '大理州', quantity: '1000套', status: '洽谈中' }
]

export const trainingCourses: CourseItem[] = [
  { title: '手机短视频助农实操', teacher: '李云峰', duration: '24分钟', cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' },
  { title: '村务小程序使用指南', teacher: '王晓梅', duration: '18分钟', cover: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80' },
  { title: '乡村直播间搭建课', teacher: '张海涛', duration: '31分钟', cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80' }
]

export const classroomResources: ResourceItem[] = [
  { title: '劳动教育实践教学大纲', type: 'PDF', fileSize: '2.4MB' },
  { title: '耕读课堂项目策划模板', type: 'PPT', fileSize: '8.6MB' },
  { title: '乡村调研记录表', type: 'Excel', fileSize: '1.1MB' }
]

export const farmerStories: FarmerStory[] = [
  { name: '和阿姨', role: '美泉村村民', story: '参加乡智夜校后，她学会了用手机下单、拍视频和查看村务，家里雪桃通过平台卖到了更多城市。', image: 'https://images.unsplash.com/photo-1510214885331-72216e01a88b?auto=format&fit=crop&w=900&q=80' },
  { name: '小杨', role: '返乡青年', story: '借助平台入驻合作会，他把纳西刺绣做成了标准化文创产品，完成从个人手作到小型品牌的升级。', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80' }
]

export const trainingEvents: TrainingEvent[] = [
  { title: '美泉村乡智夜校第二期', time: '2026-05-05 19:00', location: '美泉村党群服务中心', seats: 30 },
  { title: '高校耕读实践报名说明会', time: '2026-05-08 14:30', location: '线上会议', seats: 80 },
  { title: '新农人创业辅导班', time: '2026-05-12 09:00', location: '乡链展示中心', seats: 40 }
]

export const digitalLedgers: LedgerItem[] = [
  { title: '2026年3月村级财务公开', category: '财务公开', time: '2026-04-01', status: '已公示' },
  { title: '美泉村停车点整治进展', category: '项目进展', time: '2026-04-12', status: '推进中' },
  { title: '村民议事会纪要', category: '村务公开', time: '2026-04-20', status: '已发布' }
]

export const discussionTopics: TopicItem[] = [
  { title: '村口农产品集散点是否增加夜间照明', author: '村委会', votes: 86, detail: '涉及夜间安全和物流便捷度，欢迎投票。' },
  { title: '是否引入共享电动车服务', author: '村民代表', votes: 42, detail: '提升短途出行效率，需评估管理成本。' }
]

export const ecoPoints: EcoPoint[] = [
  { name: '张大哥', score: 128, record: '参与垃圾分类、河道巡护、植绿三次' },
  { name: '李阿姨', score: 94, record: '完成环保宣传和院落整治两次' }
]

export const serviceSteps: ProcessStep[] = [
  { title: '提交材料', description: '根据事项清单准备身份证明、申请表等资料。' },
  { title: '村级受理', description: '村务窗口审核后进入线上流转。' },
  { title: '部门办理', description: '对接乡镇或上级部门完成审批。' },
  { title: '结果反馈', description: '办理结果同步到平台并可在线查询。' }
]

export const feedbackExamples = [
  { title: '路灯维修', status: '已处理', reply: '48小时内完成抢修并回访。' },
  { title: '灌溉沟渠清理', status: '处理中', reply: '已进入村级协同任务单。' }
]

export const practiceBases: PracticeBase[] = [
  { name: '美泉村实践基地', location: '丽江', feature: '数字治理与雪桃助农', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=900&q=80' },
  { name: '白沙古镇非遗基地', location: '丽江', feature: '东巴文化与文创转化', image: 'https://images.unsplash.com/photo-1516306580123-e6e52b1b4bdb?auto=format&fit=crop&w=900&q=80' },
  { name: '双廊旅居基地', location: '大理', feature: '文旅体验与社区共建', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80' }
]

export const recruitmentProjects: RecruitmentProject[] = [
  { title: '乡村直播助农项目', type: '三下乡', duration: '7天', applicants: 32 },
  { title: '村务数字化调研', type: '社会实践', duration: '14天', applicants: 18 },
  { title: '非遗品牌设计计划', type: '创新创业', duration: '21天', applicants: 26 }
]

export const achievements: AchievementItem[] = [
  { title: '雪桃品牌短视频传播计划', type: '项目报告', detail: '完成 3 条爆款短视频和 1 套销售物料。' },
  { title: '美泉村村务可视化看板', type: '落地项目', detail: '实现公开事项、进度与反馈统一展示。' },
  { title: '乡村数字素养课程包', type: '竞赛获奖', detail: '在校级社会实践竞赛中获得一等奖。' }
]

export const creditSteps = [
  '学生提交实践申请',
  '指导老师确认实践内容',
  '基地负责人完成签到与评价',
  '教务系统审核并认定学分'
]

export const policyDocs: PolicyDoc[] = [
  { title: '乡村振兴促进法', level: '国家级', keywords: ['产业', '人才', '文化'] },
  { title: '新时代劳动教育实施纲要', level: '国家级', keywords: ['课程', '实践', '评价'] },
  { title: '数字乡村建设行动方案', level: '省级', keywords: ['治理', '数字化', '平台'] }
]

export const fundingGuides: FundingGuide[] = [
  { title: '农产品冷链补贴申请', amount: '最高30万元', deadline: '2026-06-30' },
  { title: '文旅融合项目扶持', amount: '最高50万元', deadline: '2026-07-15' },
  { title: '返乡创业贷款贴息', amount: '按政策执行', deadline: '长期开放' }
]

export const dockingMeetings: DockingMeeting[] = [
  { title: '乡村订单农业对接会', form: '线上+线下', time: '2026-05-20 10:00' },
  { title: '高校实践基地签约会', form: '线下', time: '2026-05-28 14:00' }
]

export const adminMetrics: AdminMetric[] = [
  { label: '平台注册用户', value: '8,264', change: '+12.3%' },
  { label: '本月新增订单', value: '1,248', change: '+18.8%' },
  { label: '活跃村落', value: '18', change: '稳定' },
  { label: '累计反馈处理率', value: '96.4%', change: '+1.2%' }
]

export const userRows = [
  { name: '杨建国', role: '村民', phone: '138****2211', status: '正常', permissions: '村务查看/产品购买' },
  { name: '刘老师', role: '高校', phone: '139****8823', status: '正常', permissions: '课程发布/项目管理' },
  { name: '赵经理', role: '企业', phone: '137****0099', status: '已禁用', permissions: '采购对接/合作入驻' },
  { name: '管理员', role: '管理员', phone: '136****0001', status: '正常', permissions: '全量权限' }
]

export const contentRows = [
  { title: '美泉村乡智夜校第一期开班', type: '新闻', status: '已发布' },
  { title: '耕读课堂：乡村直播助农课程', type: '课程', status: '已发布' },
  { title: '美泉雪桃', type: '产品', status: '上架中' },
  { title: '乡村直播助农项目', type: '项目', status: '招募中' }
]

export const orderRows = [
  { id: 'XL20260426001', item: '美泉雪桃礼盒', amount: '￥299.00', status: '待发货' },
  { id: 'XL20260426002', item: '东巴纸文创礼盒', amount: '￥168.00', status: '已完成' },
  { id: 'XL20260426003', item: '耕读研学体验', amount: '￥396.00', status: '待退款审核' }
]

export const villageRows = [
  { title: '数字台账公开', author: '村委会', time: '2026-04-29', status: '已发布' },
  { title: '环保积分兑换活动', author: '海晏村', time: '2026-04-27', status: '进行中' },
  { title: '村民议事会纪要', author: '美泉村', time: '2026-04-20', status: '已归档' }
]

export const settingsRows = [
  { title: '轮播图管理', desc: '配置首页三张轮播图与跳转地址' },
  { title: '数据备份', desc: '支持按天备份平台核心数据' },
  { title: '基础信息', desc: '维护平台名称、备案号、联系方式' }
]
