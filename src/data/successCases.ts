export interface SuccessCase {
  id: number
  title: string
  cover: string
  location: string
  time: string
  shortDesc: string
  fullContent: string
}

const villageAsset = (fileName: string) => encodeURI(`${import.meta.env.BASE_URL}images/village/${fileName}`)

export const successCases: SuccessCase[] = [
  {
    id: 1,
    title: '美泉雪桃品牌升级示范',
    cover: villageAsset('美泉雪桃.jpg'),
    location: '云南·丽江美泉村',
    time: '2026-04',
    shortDesc: '围绕包装升级、直播推广与冷链协作完成品牌重塑，形成稳定订单池。',
    fullContent:
      '该案例以高校实践团队与本地合作社联动为主线，先完成雪桃品牌识别系统与统一包装，再将果园采摘、短视频传播和冷链履约串成完整链路。\n\n' +
      '项目落地后，产品形象更统一，线上咨询量明显提升，乡村经营主体也建立起可复用的产销协同机制。'
  },
  {
    id: 2,
    title: '东巴非遗礼盒文创转化',
    cover: villageAsset('东巴纸文创礼盒.jpg'),
    location: '云南·白沙古镇',
    time: '2026-03',
    shortDesc: '将东巴纸工艺与节庆伴手礼结合，完成从手工制品到标准化礼盒的转化。',
    fullContent:
      '该项目聚焦非遗内容的现代包装和消费场景重构，通过文案、视觉与结构设计的统一，完成礼盒化、标准化与礼品化升级。\n\n' +
      '在校地共创支持下，工坊建立了批量制作与小批量定制双模式，兼顾文化表达和市场销售。'
  },
  {
    id: 3,
    title: '拉市三文鱼冷链直供样板',
    cover: villageAsset('拉市三文鱼.jpg'),
    location: '云南·丽江拉市乡',
    time: '2026-03',
    shortDesc: '以产地分级、冷链打包和订单跟踪为核心，缩短从池塘到餐桌的交付链路。',
    fullContent:
      '案例通过产地分级、规范包装与冷链协同实现高频次稳定供货，解决了传统水产在运输和时效上的波动问题。\n\n' +
      '平台同步接入采购对接与履约反馈，帮助养殖户及时掌握订单节奏，提升了供给稳定性和议价能力。'
  },
  {
    id: 4,
    title: '纳西刺绣香包合作社共创',
    cover: villageAsset('纳西刺绣香包.jpg'),
    location: '云南·古城片区',
    time: '2026-02',
    shortDesc: '以传统刺绣为基础，完成图样优化、包装统一与电商上新。',
    fullContent:
      '该案例围绕刺绣图样、香料配比和包装体验三部分进行协作优化，让传统手工艺更适合电商展示与节庆传播。\n\n' +
      '通过合作社集体采购材料和统一质检，产品稳定性提升，返乡妇女也获得了更灵活的增收渠道。'
  },
  {
    id: 5,
    title: '产业赋能数字协作中心',
    cover: villageAsset('产业赋能.png'),
    location: '云南·乡链示范片区',
    time: '2026-05',
    shortDesc: '整合产销数据、合作资源与项目进展，形成村级产业协作中枢。',
    fullContent:
      '该案例以产业信息整合为目标，把产品上新、订单跟踪、合作洽谈和活动宣传收束到统一的数字工作台。\n\n' +
      '村集体、企业和高校实践团队在同一页面中协作，减少了重复沟通与信息滞后问题。'
  },
  {
    id: 6,
    title: '校地实践成果转化联动',
    cover: villageAsset('校地实践.png'),
    location: '云南·校地共建基地',
    time: '2026-05',
    shortDesc: '将课程作业、调研成果和实践项目转化为可复用的乡村服务模块。',
    fullContent:
      '该案例聚焦高校实践团队在乡村中的长期服务能力建设，围绕调研、制作、传播与回访四个环节形成标准化流程。\n\n' +
      '实践成果不仅服务于单次活动，还被整理成可复制的知识包和案例库，方便后续团队持续沿用。'
  }
]