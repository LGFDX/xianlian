<template>
  <div class="container profile-page">
    <section class="profile-header">
      <div class="profile-header__body">
        <el-breadcrumb class="profile-breadcrumb" separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>

        <div>
          <h1>个人中心</h1>
          <p>完善个人信息、村里信息并提交服务链路申请。</p>
        </div>
      </div>

      <div class="toolbar-actions">
        <el-button plain type="success" @click="goBack">返回上一页</el-button>
        <el-button plain type="danger" @click="handleLogout">退出登录</el-button>
      </div>
    </section>

    <el-card class="profile-card" shadow="never">
      <template #header>
        <div class="section-header">
          <div>
            <h2>个人基本信息</h2>
            <p>头像、姓名和联系方式支持编辑，手机号保持只读。</p>
          </div>
        </div>
      </template>

      <el-row :gutter="24" align="middle" class="profile-basic-grid">
        <el-col :xs="24" :md="8">
          <div class="avatar-panel">
            <el-avatar class="profile-avatar" :size="112" :src="basicForm.avatar">
              {{ avatarFallback }}
            </el-avatar>
            <p class="avatar-name">{{ basicForm.name || '乡村代表' }}</p>

            <el-upload
              accept="image/*"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleAvatarChange"
            >
              <el-button plain type="success">更换头像</el-button>
            </el-upload>
          </div>
        </el-col>

        <el-col :xs="24" :md="16">
          <el-form class="profile-form" :model="basicForm" label-position="top">
            <el-form-item label="姓名">
              <el-input v-model="basicForm.name" placeholder="请输入姓名" />
            </el-form-item>

            <el-form-item label="手机号">
              <el-input v-model="basicForm.phone" disabled />
            </el-form-item>

            <el-form-item label="联系方式">
              <el-input v-model="basicForm.contact" placeholder="请输入联系方式" />
            </el-form-item>

            <div class="form-actions">
              <el-button type="success" @click="saveProfile">保存信息</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="profile-card" shadow="never">
      <template #header>
        <div class="section-header">
          <div>
            <h2>村里基本信息</h2>
            <p>填写村庄基础情况，便于后续服务链路匹配。</p>
          </div>
        </div>
      </template>

      <el-form class="profile-form" :model="villageForm" label-position="top">
        <el-row :gutter="20">
          <el-col :xs="24" :md="12">
            <el-form-item label="村里人口">
              <el-input v-model="villageForm.population" placeholder="例如：860" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="12">
            <el-form-item label="占地面积">
              <el-input v-model="villageForm.area" placeholder="例如：12.5 平方公里" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="主要资源">
          <el-input
            v-model="villageForm.resources"
            :rows="4"
            type="textarea"
            placeholder="请输入村里的特色资源、自然条件、文化资源等"
          />
        </el-form-item>

        <el-form-item label="主要产业">
          <el-checkbox-group v-model="villageForm.industries" class="industry-options">
            <el-checkbox v-for="option in industryOptions" :key="option" :label="option">
              {{ option }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <div class="form-actions">
          <el-button type="success" @click="saveVillageInfo">保存村里信息</el-button>
        </div>
      </el-form>
    </el-card>

    <el-card class="profile-card" shadow="never">
      <template #header>
        <div class="section-header">
          <div>
            <h2>服务链路申请提交</h2>
            <p>可选择一条或多条服务链路，提交后将记录到个人申请记录中。</p>
          </div>
        </div>
      </template>

      <el-checkbox-group v-model="selectedChainIds" class="chain-grid">
        <article
          v-for="chain in serviceChains"
          :key="chain.id"
          class="chain-card section-card"
          :class="{ active: selectedChainIds.includes(chain.id) }"
        >
          <el-checkbox :label="chain.id" class="chain-card__checkbox">
            <div>
              <strong>{{ chain.name }}</strong>
              <p>{{ chain.description }}</p>
            </div>
          </el-checkbox>
        </article>
      </el-checkbox-group>

      <el-row :gutter="20" class="application-extra">
        <el-col :xs="24" :md="12">
          <div class="field-panel">
            <div class="field-title">申请备注</div>
            <el-input
              v-model="applicationForm.remark"
              :rows="5"
              type="textarea"
              placeholder="请输入申请补充说明"
            />
          </div>
        </el-col>

        <el-col :xs="24" :md="12">
          <div class="field-panel">
            <div class="field-title">文件上传</div>
            <p class="field-hint">支持 JPG、PNG、PDF，单个文件不超过 5MB。</p>

            <el-upload
              v-model:file-list="uploadQueue"
              class="file-uploader"
              drag
              multiple
              action="#"
              accept=".jpg,.jpeg,.png,.pdf"
              :limit="6"
              :before-upload="beforeUpload"
              :http-request="simulateUploadRequest"
              :on-success="handleUploadSuccess"
              :on-remove="handleUploadRemove"
              :on-exceed="handleUploadExceed"
            >
              <div class="upload-area">
                <div class="upload-area__mark">+</div>
                <div>
                  <strong>拖拽或点击上传</strong>
                  <p>上传村里相关证明材料</p>
                </div>
              </div>

              <template #tip>
                <div class="upload-tip">上传进度会在列表中显示，完成后会同步到申请记录。</div>
              </template>
            </el-upload>
          </div>
        </el-col>
      </el-row>

      <div class="uploaded-files-panel">
        <div class="field-title">已上传文件列表</div>

        <el-empty v-if="!uploadedFiles.length" description="暂无已上传文件" />

        <div v-else class="uploaded-file-list">
          <article v-for="file in uploadedFiles" :key="file.id" class="uploaded-file-item">
            <div class="uploaded-file-item__body">
              <strong>{{ file.name }}</strong>
              <p>{{ formatFileType(file.type) }} · {{ formatFileSize(file.size) }} · {{ formatTime(file.uploadedAt) }}</p>
            </div>

            <el-button text type="danger" @click="deleteUploadedFile(file.id)">删除</el-button>
          </article>
        </div>
      </div>

      <div class="form-actions chain-action">
        <el-button type="success" :loading="isSubmitting" @click="submitApplication">提交申请</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import {
  ElMessage,
  ElMessageBox,
  type UploadFile,
  type UploadProps,
  type UploadRequestOptions,
  type UploadUserFile
} from 'element-plus'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { INDUSTRY_OPTIONS, type ServiceChainOption, useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const { personalInfo, villageInfo, uploadedFiles } = storeToRefs(userStore)

const serviceChains: ServiceChainOption[] = [
  {
    id: 'industry',
    name: '产业赋能',
    description: '对接农产品电商、文旅推广和产销链路，帮助乡村优质资源上行。'
  },
  {
    id: 'talent',
    name: '人才培育',
    description: '支持乡智夜校、劳动教育和新农人技能训练，提升村民综合能力。'
  },
  {
    id: 'governance',
    name: '治理创新',
    description: '围绕数字台账、村务协同和积分治理，提升基层治理效率。'
  },
  {
    id: 'practice',
    name: '校地实践',
    description: '提供实践基地、项目报名和成果转化入口，连接师生与乡村。'
  },
  {
    id: 'resources',
    name: '资源链接',
    description: '打通政策、资金和合作资源通道，推动更多外部支持落地。'
  }
]

const basicForm = reactive({
  avatar: personalInfo.value.avatar,
  name: personalInfo.value.name,
  phone: personalInfo.value.phone,
  contact: personalInfo.value.contact
})

const villageForm = reactive({
  population: villageInfo.value.population,
  area: villageInfo.value.area,
  resources: villageInfo.value.resources,
  industries: [...villageInfo.value.industries]
})

const applicationForm = reactive({
  remark: ''
})

const selectedChainIds = ref<string[]>([])
const uploadQueue = ref<UploadUserFile[]>([])
const isSubmitting = ref(false)

const uploadTimers = new Map<string, number>()
const maxUploadSize = 5 * 1024 * 1024

const avatarFallback = computed(() => {
  const name = basicForm.name.trim() || '乡村代表'
  return name.slice(0, 2) || '乡'
})

const industryOptions = INDUSTRY_OPTIONS

const selectedChains = computed(() => {
  return serviceChains.filter(chain => selectedChainIds.value.includes(chain.id))
})

function goBack() {
  router.back()
}

async function handleLogout() {
  try {
    await ElMessageBox.confirm('确认退出登录吗？', '退出登录', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    userStore.logout()
    ElMessage.success('已退出登录')
    await router.replace('/home/auth')
  } catch {
    // 用户取消退出，不做处理。
  }
}

const handleAvatarChange: UploadProps['onChange'] = uploadFile => {
  const rawFile = uploadFile.raw

  if (!rawFile) {
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    basicForm.avatar = typeof reader.result === 'string' ? reader.result : ''
  }

  reader.readAsDataURL(rawFile)
}

function saveProfile() {
  userStore.updateUserInfo({
    avatar: basicForm.avatar,
    name: basicForm.name.trim(),
    contact: basicForm.contact.trim()
  })

  ElMessage.success('个人信息保存成功')
}

function saveVillageInfo() {
  userStore.updateVillageInfo({
    population: villageForm.population.trim(),
    area: villageForm.area.trim(),
    resources: villageForm.resources.trim(),
    industries: [...villageForm.industries]
  })

  ElMessage.success('村里信息保存成功')
}

function beforeUpload(rawFile: File) {
  const isAllowedType = rawFile.type.startsWith('image/') || rawFile.type === 'application/pdf'

  if (!isAllowedType) {
    ElMessage.error('仅支持上传图片或 PDF 文件')
    return false
  }

  if (rawFile.size > maxUploadSize) {
    ElMessage.error('文件大小不能超过 5MB')
    return false
  }

  return true
}

function simulateUploadRequest(options: UploadRequestOptions) {
  const uploadFile = options.file as File & { uid?: string | number }
  const fileId = String(uploadFile.uid ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`)
  let percent = 0

  const timer = window.setInterval(() => {
    percent = Math.min(100, percent + 20)
    options.onProgress?.({ percent } as never)

    if (percent >= 100) {
      window.clearInterval(timer)
      uploadTimers.delete(fileId)
      options.onSuccess?.({ ok: true })
    }
  }, 120)

  uploadTimers.set(fileId, timer)
}

function handleUploadSuccess(_response: unknown, file: UploadFile) {
  const rawFile = file.raw

  if (!rawFile) {
    return
  }

  userStore.addUploadedFile({
    id: String(file.uid),
    name: rawFile.name,
    size: rawFile.size,
    type: rawFile.type,
    uploadedAt: new Date().toISOString()
  })

  ElMessage.success(`${rawFile.name} 上传成功`)
}

function handleUploadRemove(file: UploadFile) {
  const fileId = String(file.uid)
  const timer = uploadTimers.get(fileId)

  if (timer) {
    window.clearInterval(timer)
    uploadTimers.delete(fileId)
  }

  userStore.removeUploadedFile(fileId)
}

function handleUploadExceed() {
  ElMessage.warning('文件数量已达上限，请先删除已上传文件再继续上传')
}

function deleteUploadedFile(fileId: string) {
  userStore.removeUploadedFile(fileId)
  uploadQueue.value = uploadQueue.value.filter(file => String(file.uid) !== fileId)

  const timer = uploadTimers.get(fileId)

  if (timer) {
    window.clearInterval(timer)
    uploadTimers.delete(fileId)
  }

  ElMessage.success('文件已删除')
}

function formatFileType(type: string) {
  if (type === 'application/pdf') {
    return 'PDF'
  }

  if (type.startsWith('image/')) {
    return '图片'
  }

  return type || '其他'
}

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(1)}MB`
  }

  if (size >= 1024) {
    return `${(size / 1024).toFixed(1)}KB`
  }

  return `${size}B`
}

function formatTime(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString('zh-CN', {
    hour12: false
  })
}

async function submitApplication() {
  if (isSubmitting.value) {
    return
  }

  if (!selectedChainIds.value.length) {
    ElMessage.warning('请至少选择一条服务链路')
    return
  }

  isSubmitting.value = true

  try {
    const applicationPayload = {
      personalInfo: {
        ...basicForm
      },
      villageInfo: {
        ...villageForm,
        industries: [...villageForm.industries]
      },
      selectedChains: selectedChains.value.map(chain => ({ ...chain })),
      remark: applicationForm.remark.trim(),
      uploadedFiles: uploadedFiles.value.map(file => ({ ...file })),
      submittedAt: new Date().toISOString()
    }

    const record = userStore.submitApplication({
      chains: applicationPayload.selectedChains,
      remark: applicationPayload.remark,
      files: applicationPayload.uploadedFiles
    })

    console.log('服务链路申请提交数据：', {
      ...applicationPayload,
      record
    })

    ElMessage.success('申请提交成功！我们会尽快回复您，请留意消息通知')
  } finally {
    isSubmitting.value = false
  }
}

onBeforeUnmount(() => {
  uploadTimers.forEach(timer => window.clearInterval(timer))
  uploadTimers.clear()
})
</script>

<style scoped>
.profile-page {
  padding: 24px 0 40px;
  display: grid;
  gap: 20px;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.profile-header__body {
  display: grid;
  gap: 8px;
}

.profile-breadcrumb {
  font-size: 13px;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.profile-header h1 {
  margin: 0 0 8px;
}

.profile-header p {
  margin: 0;
  color: var(--xl-muted);
}

.profile-card {
  padding: 0;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.section-header h2 {
  margin: 0 0 6px;
  font-size: 20px;
}

.section-header p {
  margin: 0;
  color: var(--xl-muted);
}

.profile-basic-grid {
  padding: 4px 24px 24px;
}

.avatar-panel {
  display: grid;
  justify-items: center;
  gap: 12px;
  padding: 8px 0;
}

.profile-avatar {
  background: linear-gradient(135deg, rgba(46, 125, 50, 0.15), rgba(25, 118, 210, 0.14));
  color: var(--xl-green);
  font-weight: 700;
}

.avatar-name {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.profile-form {
  padding-top: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-start;
  padding-top: 8px;
}

.industry-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
}

.chain-grid {
  padding: 4px 24px 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.chain-card {
  padding: 18px 18px 16px;
  border-radius: 18px;
  cursor: default;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.chain-card.active {
  border-color: rgba(46, 125, 50, 0.32);
  box-shadow: 0 18px 34px rgba(46, 125, 50, 0.12);
  transform: translateY(-1px);
}

.chain-card__checkbox {
  align-items: flex-start;
}

.chain-card__checkbox strong {
  display: block;
  margin-bottom: 6px;
  font-size: 16px;
}

.chain-card__checkbox p {
  margin: 0;
  color: var(--xl-muted);
  line-height: 1.6;
}

.application-extra {
  padding: 0 24px 16px;
}

.field-panel {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(46, 125, 50, 0.1);
}

.field-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--xl-text);
}

.field-hint,
.upload-tip {
  margin: 0;
  color: var(--xl-muted);
  line-height: 1.6;
  font-size: 13px;
}

.file-uploader {
  width: 100%;
}

.file-uploader :deep(.el-upload) {
  width: 100%;
}

.upload-area {
  width: 100%;
  min-height: 146px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 20px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(46, 125, 50, 0.08), rgba(25, 118, 210, 0.06));
  border: 1px dashed rgba(46, 125, 50, 0.22);
  color: var(--xl-text);
}

.upload-area__mark {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: rgba(46, 125, 50, 0.12);
  color: var(--xl-green);
  font-size: 30px;
  font-weight: 700;
  flex-shrink: 0;
}

.upload-area strong {
  display: block;
  font-size: 16px;
}

.upload-area p {
  margin: 6px 0 0;
  color: var(--xl-muted);
}

.uploaded-files-panel {
  display: grid;
  gap: 12px;
  padding: 0 24px 16px;
}

.uploaded-file-list {
  display: grid;
  gap: 10px;
}

.uploaded-file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(46, 125, 50, 0.1);
}

.uploaded-file-item__body {
  min-width: 0;
}

.uploaded-file-item__body strong {
  display: block;
  margin-bottom: 6px;
  font-size: 15px;
}

.uploaded-file-item__body p {
  margin: 0;
  color: var(--xl-muted);
  line-height: 1.5;
  word-break: break-all;
}

.chain-action {
  padding: 0 24px 24px;
}

@media (max-width: 768px) {
  .profile-page {
    padding: 18px 0 28px;
  }

  .profile-header {
    flex-direction: column;
  }

  .toolbar-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .profile-basic-grid,
  .chain-grid,
  .application-extra,
  .uploaded-files-panel,
  .chain-action {
    padding-left: 16px;
    padding-right: 16px;
  }

  .chain-grid {
    grid-template-columns: 1fr;
  }

  .upload-area {
    flex-direction: column;
    text-align: center;
  }

  .uploaded-file-item {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>