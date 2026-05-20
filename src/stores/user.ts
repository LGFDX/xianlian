import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type UserRole = '村民' | '高校' | '企业' | '管理员'

const DEFAULT_LOGIN_ACCOUNT = {
  phone: '13800138000',
  password: '123456'
} as const

export const INDUSTRY_OPTIONS = ['种植业', '养殖业', '文旅', '手工业', '其他'] as const

export type IndustryOption = (typeof INDUSTRY_OPTIONS)[number]

export interface PersonalInfo {
  avatar: string
  name: string
  phone: string
  contact: string
}

export interface VillageInfo {
  population: string
  area: string
  resources: string
  industries: IndustryOption[]
}

export interface ServiceChainOption {
  id: string
  name: string
  description: string
}

export interface UploadedFileItem {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: string
}

export interface ApplicationRecord {
  id: string
  status: '已提交'
  submittedAt: string
  chains: ServiceChainOption[]
  remark: string
  files: UploadedFileItem[]
  personalInfo: PersonalInfo
  villageInfo: VillageInfo
}

export interface ApplicationSubmissionPayload {
  chains: ServiceChainOption[]
  remark: string
  files: UploadedFileItem[]
}

interface PersistedUserState {
  isLoggedIn: boolean
  personalInfo: PersonalInfo
  villageInfo: VillageInfo
  applicationRecords: ApplicationRecord[]
  uploadedFiles: UploadedFileItem[]
}

const STORAGE_KEY = 'xianglian-user-state'

function isBrowser() {
  return typeof window !== 'undefined'
}

function createDefaultPersonalInfo(): PersonalInfo {
  return {
    avatar: '',
    name: '乡村代表',
    phone: DEFAULT_LOGIN_ACCOUNT.phone,
    contact: DEFAULT_LOGIN_ACCOUNT.phone
  }
}

function createDefaultVillageInfo(): VillageInfo {
  return {
    population: '',
    area: '',
    resources: '',
    industries: []
  }
}

function createDefaultState(): PersistedUserState {
  return {
    isLoggedIn: false,
    personalInfo: createDefaultPersonalInfo(),
    villageInfo: createDefaultVillageInfo(),
    applicationRecords: [],
    uploadedFiles: []
  }
}

function normalizeIndustries(value: unknown): IndustryOption[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((item): item is IndustryOption => {
    return typeof item === 'string' && (INDUSTRY_OPTIONS as readonly string[]).includes(item)
  })
}

function normalizePersonalInfo(value: unknown): PersonalInfo {
  if (!value || typeof value !== 'object') {
    return createDefaultPersonalInfo()
  }

  const candidate = value as Partial<PersonalInfo>

  return {
    avatar: typeof candidate.avatar === 'string' ? candidate.avatar : '',
    name: typeof candidate.name === 'string' && candidate.name.trim() ? candidate.name.trim() : '乡村代表',
    phone: DEFAULT_LOGIN_ACCOUNT.phone,
    contact: typeof candidate.contact === 'string' && candidate.contact.trim() ? candidate.contact.trim() : DEFAULT_LOGIN_ACCOUNT.phone
  }
}

function normalizeVillageInfo(value: unknown): VillageInfo {
  if (!value || typeof value !== 'object') {
    return createDefaultVillageInfo()
  }

  const candidate = value as Partial<VillageInfo>

  return {
    population: typeof candidate.population === 'string' ? candidate.population : '',
    area: typeof candidate.area === 'string' ? candidate.area : '',
    resources: typeof candidate.resources === 'string' ? candidate.resources : '',
    industries: normalizeIndustries(candidate.industries)
  }
}

function normalizeServiceChainOption(value: unknown): ServiceChainOption | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const candidate = value as Partial<ServiceChainOption>

  if (typeof candidate.id !== 'string' || typeof candidate.name !== 'string' || typeof candidate.description !== 'string') {
    return null
  }

  return {
    id: candidate.id,
    name: candidate.name,
    description: candidate.description
  }
}

function normalizeUploadedFileItem(value: unknown): UploadedFileItem | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const candidate = value as Partial<UploadedFileItem>

  if (typeof candidate.id !== 'string' || typeof candidate.name !== 'string') {
    return null
  }

  return {
    id: candidate.id,
    name: candidate.name,
    size: Number(candidate.size) > 0 ? Number(candidate.size) : 0,
    type: typeof candidate.type === 'string' ? candidate.type : '',
    uploadedAt: typeof candidate.uploadedAt === 'string' ? candidate.uploadedAt : new Date().toISOString()
  }
}

function normalizeUploadedFiles(value: unknown): UploadedFileItem[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map(item => normalizeUploadedFileItem(item))
    .filter((file): file is UploadedFileItem => Boolean(file))
}

function normalizeApplicationRecords(value: unknown): ApplicationRecord[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map(item => {
      if (!item || typeof item !== 'object') {
        return null
      }

      const candidate = item as Partial<ApplicationRecord>
      const chains = Array.isArray(candidate.chains)
        ? candidate.chains.map(chain => normalizeServiceChainOption(chain)).filter((chain): chain is ServiceChainOption => Boolean(chain))
        : []

      if (typeof candidate.id !== 'string' || typeof candidate.submittedAt !== 'string') {
        return null
      }

      return {
        id: candidate.id,
        status: candidate.status === '已提交' ? candidate.status : '已提交',
        submittedAt: candidate.submittedAt,
        chains,
        remark: typeof candidate.remark === 'string' ? candidate.remark : '',
        files: normalizeUploadedFiles(candidate.files),
        personalInfo: normalizePersonalInfo(candidate.personalInfo),
        villageInfo: normalizeVillageInfo(candidate.villageInfo)
      }
    })
    .filter((record): record is ApplicationRecord => Boolean(record))
}

function readPersistedState(): PersistedUserState {
  if (!isBrowser()) {
    return createDefaultState()
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)

    if (!rawValue) {
      return createDefaultState()
    }

    const parsedValue = JSON.parse(rawValue) as Partial<PersistedUserState>

    return {
      isLoggedIn: typeof parsedValue.isLoggedIn === 'boolean' ? parsedValue.isLoggedIn : false,
      personalInfo: normalizePersonalInfo(parsedValue.personalInfo),
      villageInfo: normalizeVillageInfo(parsedValue.villageInfo),
      applicationRecords: normalizeApplicationRecords(parsedValue.applicationRecords),
      uploadedFiles: normalizeUploadedFiles(parsedValue.uploadedFiles)
    }
  } catch {
    return createDefaultState()
  }
}

function persistState(state: PersistedUserState) {
  if (!isBrowser()) {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // 本地存储异常时静默失败，避免影响页面可用性。
  }
}

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const personalInfo = ref<PersonalInfo>(createDefaultPersonalInfo())
  const villageInfo = ref<VillageInfo>(createDefaultVillageInfo())
  const applicationRecords = ref<ApplicationRecord[]>([])
  const uploadedFiles = ref<UploadedFileItem[]>([])

  const currentUserName = computed(() => personalInfo.value.name || '乡村代表')

  function serializeState(): PersistedUserState {
    return {
      isLoggedIn: isLoggedIn.value,
      personalInfo: {
        ...personalInfo.value,
        phone: DEFAULT_LOGIN_ACCOUNT.phone
      },
      villageInfo: {
        ...villageInfo.value,
        industries: [...villageInfo.value.industries]
      },
      uploadedFiles: uploadedFiles.value.map(file => ({ ...file })),
      applicationRecords: applicationRecords.value.map(record => ({
        ...record,
        chains: record.chains.map(chain => ({ ...chain })),
        files: record.files.map(file => ({ ...file })),
        personalInfo: {
          ...record.personalInfo
        },
        villageInfo: {
          ...record.villageInfo,
          industries: [...record.villageInfo.industries]
        }
      }))
    }
  }

  function initializeState() {
    const state = readPersistedState()

    isLoggedIn.value = state.isLoggedIn
    personalInfo.value = state.personalInfo
    villageInfo.value = state.villageInfo
    applicationRecords.value = state.applicationRecords
    uploadedFiles.value = state.uploadedFiles

    persistState(serializeState())
  }

  function login(phone: string, password: string) {
    if (phone.trim() !== DEFAULT_LOGIN_ACCOUNT.phone || password !== DEFAULT_LOGIN_ACCOUNT.password) {
      return false
    }

    isLoggedIn.value = true
    personalInfo.value = {
      ...personalInfo.value,
      name: personalInfo.value.name || '乡村代表',
      phone: DEFAULT_LOGIN_ACCOUNT.phone,
      contact: personalInfo.value.contact || DEFAULT_LOGIN_ACCOUNT.phone
    }

    persistState(serializeState())
    return true
  }

  function logout() {
    isLoggedIn.value = false
    personalInfo.value = createDefaultPersonalInfo()
    villageInfo.value = createDefaultVillageInfo()
    applicationRecords.value = []
    uploadedFiles.value = []

    if (isBrowser()) {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  function updateUserInfo(patch: Partial<Omit<PersonalInfo, 'phone'>> & { phone?: string }) {
    personalInfo.value = {
      ...personalInfo.value,
      avatar: typeof patch.avatar === 'string' ? patch.avatar : personalInfo.value.avatar,
      name: typeof patch.name === 'string' ? patch.name.trim() : personalInfo.value.name,
      contact: typeof patch.contact === 'string' ? patch.contact.trim() : personalInfo.value.contact,
      phone: DEFAULT_LOGIN_ACCOUNT.phone
    }

    persistState(serializeState())
    return personalInfo.value
  }

  function updateVillageInfo(patch: Partial<VillageInfo>) {
    villageInfo.value = {
      ...villageInfo.value,
      population: typeof patch.population === 'string' ? patch.population.trim() : villageInfo.value.population,
      area: typeof patch.area === 'string' ? patch.area.trim() : villageInfo.value.area,
      resources: typeof patch.resources === 'string' ? patch.resources.trim() : villageInfo.value.resources,
      industries: normalizeIndustries(patch.industries ?? villageInfo.value.industries)
    }

    persistState(serializeState())
    return villageInfo.value
  }

  function addUploadedFile(file: UploadedFileItem) {
    const normalizedFile: UploadedFileItem = {
      id: file.id,
      name: file.name,
      size: Number(file.size) > 0 ? Number(file.size) : 0,
      type: file.type,
      uploadedAt: file.uploadedAt
    }

    const existingIndex = uploadedFiles.value.findIndex(item => item.id === normalizedFile.id)

    if (existingIndex >= 0) {
      uploadedFiles.value.splice(existingIndex, 1, normalizedFile)
    } else {
      uploadedFiles.value = [...uploadedFiles.value, normalizedFile]
    }

    persistState(serializeState())
    return normalizedFile
  }

  function removeUploadedFile(fileId: string) {
    uploadedFiles.value = uploadedFiles.value.filter(file => file.id !== fileId)
    persistState(serializeState())
  }

  function submitApplication(payload: ApplicationSubmissionPayload) {
    const sourceFiles = payload.files.length ? payload.files : uploadedFiles.value
    const record: ApplicationRecord = {
      id: `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      status: '已提交',
      submittedAt: new Date().toISOString(),
      chains: payload.chains.map(chain => ({ ...chain })),
      remark: payload.remark.trim(),
      files: sourceFiles.map(file => ({ ...file })),
      personalInfo: {
        ...personalInfo.value
      },
      villageInfo: {
        ...villageInfo.value,
        industries: [...villageInfo.value.industries]
      }
    }

    applicationRecords.value = [record, ...applicationRecords.value]
    persistState(serializeState())

    return record
  }

  initializeState()

  return {
    isLoggedIn,
    personalInfo,
    villageInfo,
    applicationRecords,
    uploadedFiles,
    currentUserName,
    login,
    logout,
    updateUserInfo,
    updateVillageInfo,
    addUploadedFile,
    removeUploadedFile,
    submitApplication,
    initializeState
  }
})