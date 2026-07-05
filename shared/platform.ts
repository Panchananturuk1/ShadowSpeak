export type SupportedLanguage = 'en' | 'ja' | 'ko' | 'zh' | 'es' | 'fr' | 'de'

export type ProficiencyLevel =
  | 'beginner'
  | 'elementary'
  | 'intermediate'
  | 'upper_intermediate'
  | 'advanced'

export type LessonModuleType =
  | 'vocabulary'
  | 'grammar'
  | 'shadowing'
  | 'listening'

export interface LanguageOption {
  code: SupportedLanguage
  name: string
  nativeName: string
  learners: string
}

export interface UserProfile {
  id: string
  email: string
  displayName: string
  interfaceLanguage: SupportedLanguage
  targetLanguage: SupportedLanguage
  currentLevel: ProficiencyLevel
  weeklyGoalMinutes: number
  streakDays: number
  focusArea: LessonModuleType | 'balanced'
}

export interface VocabularyCard {
  term: string
  meaning: string
  example: string
}

export interface GrammarExercise {
  concept: string
  prompt: string
  options: string[]
  answer: string
  explanation: string
}

export interface ShadowingExercise {
  phrase: string
  translation: string
  coachingTip: string
}

export interface ListeningExercise {
  transcript: string
  question: string
  options: string[]
  answer: string
}

export interface Lesson {
  id: string
  title: string
  summary: string
  focus: string
  lengthMinutes: number
  vocabulary: VocabularyCard[]
  grammar: GrammarExercise
  shadowing: ShadowingExercise
  listening: ListeningExercise
}

export interface Course {
  id: string
  language: SupportedLanguage
  title: string
  level: ProficiencyLevel
  accentColor: string
  duration: string
  enrolledCount: number
  completionRate: number
  headline: string
  description: string
  skillFocus: LessonModuleType[]
  lessons: Lesson[]
}

export interface LessonRecommendation {
  lessonId: string
  reason: string
  targetSkill: LessonModuleType
  estimatedMinutes: number
}

export interface ProgressSummary {
  totalStudyMinutes: number
  completedLessons: number
  currentLevel: ProficiencyLevel
  weeklyGoalProgress: number
  skillAccuracy: Record<LessonModuleType, number>
  unlockedAchievements: string[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  points: number
  unlocked: boolean
}

export interface CommunityPost {
  id: string
  author: string
  language: SupportedLanguage
  minutesAgo: number
  title: string
  content: string
  likes: number
}

export interface CommunityChallenge {
  id: string
  title: string
  description: string
  reward: string
  participants: number
}

export interface LeaderboardEntry {
  learner: string
  streak: number
  score: number
}

export interface CommunityFeed {
  posts: CommunityPost[]
  challenges: CommunityChallenge[]
  leaderboard: LeaderboardEntry[]
}

export interface AdminOverview {
  activeLearners: number
  completionRate: number
  moderationQueue: number
  liveCourses: number
  reportedPosts: number
  topLanguages: Array<{
    language: string
    learners: number
  }>
}

export interface RegisterPayload {
  email: string
  password: string
  displayName: string
  interfaceLanguage: SupportedLanguage
  targetLanguage: SupportedLanguage
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LessonAttemptPayload {
  lessonId: string
  moduleType: LessonModuleType
  score: number
  durationSeconds: number
  answers: Array<{
    itemId: string
    isCorrect: boolean
    responseText?: string
  }>
  audioSampleUrl?: string
}
