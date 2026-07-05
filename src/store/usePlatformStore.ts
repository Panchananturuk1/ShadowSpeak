import { create } from 'zustand'
import i18n from '@/i18n'
import { request } from '@/utils/api'
import type {
  Achievement,
  AdminOverview,
  CommunityFeed,
  Course,
  LessonAttemptPayload,
  LessonRecommendation,
  LoginPayload,
  ProgressSummary,
  RegisterPayload,
  SupportedLanguage,
  UserProfile,
} from '../../shared/platform'

interface PlatformState {
  locale: SupportedLanguage
  loading: boolean
  bootstrapped: boolean
  activeUser: UserProfile | null
  courses: Course[]
  progress: ProgressSummary | null
  recommendations: LessonRecommendation[]
  community: CommunityFeed | null
  adminOverview: AdminOverview | null
  achievements: Achievement[]
  error: string | null
  bootstrap: () => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  login: (payload: LoginPayload) => Promise<void>
  setLocale: (locale: SupportedLanguage) => void
  updateWeeklyGoal: (minutes: number) => void
  submitAttempt: (payload: LessonAttemptPayload) => Promise<void>
  createPost: (payload: {
    title: string
    content: string
    language: SupportedLanguage
  }) => Promise<void>
}

export const usePlatformStore = create<PlatformState>((set, get) => ({
  locale: 'en',
  loading: false,
  bootstrapped: false,
  activeUser: null,
  courses: [],
  progress: null,
  recommendations: [],
  community: null,
  adminOverview: null,
  achievements: [],
  error: null,

  bootstrap: async () => {
    if (get().loading) return

    set({ loading: true, error: null })

    try {
      const [meData, coursesData, progressData, recommendationData, communityData, adminData] = await Promise.all([
        request<{ user: UserProfile }>('/api/auth/me'),
        request<{ courses: Course[] }>('/api/courses'),
        request<{ progress: ProgressSummary; achievements: Achievement[] }>('/api/progress/me'),
        request<{ recommendations: LessonRecommendation[] }>('/api/recommendations/me'),
        request<{ community: CommunityFeed }>('/api/community/feed'),
        request<{ adminOverview: AdminOverview }>('/api/admin/overview'),
      ])

      i18n.changeLanguage(meData.user.interfaceLanguage)
      set({
        loading: false,
        bootstrapped: true,
        locale: meData.user.interfaceLanguage,
        activeUser: meData.user,
        courses: coursesData.courses,
        progress: progressData.progress,
        achievements: progressData.achievements,
        recommendations: recommendationData.recommendations,
        community: communityData.community,
        adminOverview: adminData.adminOverview,
      })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Unable to load the platform',
      })
    }
  },

  register: async (payload) => {
    set({ loading: true, error: null })
    try {
      const response = await request<{ user: UserProfile }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      i18n.changeLanguage(response.user.interfaceLanguage)
      set({
        loading: false,
        activeUser: response.user,
        locale: response.user.interfaceLanguage,
      })
      await get().bootstrap()
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      })
    }
  },

  login: async (payload) => {
    set({ loading: true, error: null })
    try {
      const response = await request<{ user: UserProfile }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      i18n.changeLanguage(response.user.interfaceLanguage)
      set({
        loading: false,
        activeUser: response.user,
        locale: response.user.interfaceLanguage,
      })
      await get().bootstrap()
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      })
    }
  },

  setLocale: (locale) => {
    i18n.changeLanguage(locale)
    set((state) => ({
      locale,
      activeUser: state.activeUser ? { ...state.activeUser, interfaceLanguage: locale } : state.activeUser,
    }))
  },

  updateWeeklyGoal: (minutes) => {
    set((state) => ({
      activeUser: state.activeUser ? { ...state.activeUser, weeklyGoalMinutes: minutes } : state.activeUser,
    }))
  },

  submitAttempt: async (payload) => {
    try {
      const response = await request<{
        progress: ProgressSummary
        recommendations: LessonRecommendation[]
        achievements: Achievement[]
      }>(`/api/lessons/${payload.lessonId}/attempts`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      set({
        progress: response.progress,
        recommendations: response.recommendations,
        achievements: response.achievements,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unable to save lesson attempt',
      })
    }
  },

  createPost: async (payload) => {
    try {
      const response = await request<{ community: CommunityFeed }>('/api/community/posts', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      set({
        community: response.community,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Unable to create post',
      })
    }
  },
}))
