import type {
  Achievement,
  AdminOverview,
  CommunityFeed,
  Course,
  LanguageOption,
  Lesson,
  LessonAttemptPayload,
  LessonModuleType,
  LessonRecommendation,
  LoginPayload,
  ProgressSummary,
  RegisterPayload,
  SupportedLanguage,
  UserProfile,
} from '../../shared/platform.js'

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T

export const supportedLanguages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', learners: '18.2k learners' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', learners: '14.4k learners' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', learners: '11.9k learners' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', learners: '9.7k learners' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', learners: '8.8k learners' },
  { code: 'fr', name: 'French', nativeName: 'Français', learners: '6.1k learners' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', learners: '4.9k learners' },
]

const lessonsFor = (
  prefix: string,
  languageLabel: string,
  shadowingPhrase: string,
  translation: string,
  listeningAnswer: string,
): Lesson[] => [
  {
    id: `${prefix}-lesson-1`,
    title: `${languageLabel} Foundations`,
    summary: 'Build your first survival phrases with guided practice.',
    focus: 'vocabulary',
    lengthMinutes: 18,
    vocabulary: [
      { term: 'hello', meaning: 'a greeting', example: `Use it to open a ${languageLabel} conversation.` },
      { term: 'thank you', meaning: 'a polite appreciation', example: 'Tap reveal, then recall without looking.' },
    ],
    grammar: {
      concept: 'Polite sentence order',
      prompt: 'Choose the sentence that sounds most natural for a beginner greeting.',
      options: ['I thanks you now.', 'Thank you for helping me.', 'Helpful you thank.'],
      answer: 'Thank you for helping me.',
      explanation: 'The target sentence follows a natural subject-verb-object pattern and polite phrasing.',
    },
    shadowing: {
      phrase: shadowingPhrase,
      translation,
      coachingTip: 'Match the sentence rhythm first, then copy the final intonation contour.',
    },
    listening: {
      transcript: 'A learner asks for a coffee and confirms the price after hearing the total.',
      question: 'What does the learner confirm at the end?',
      options: ['The table number', 'The total price', 'The opening time'],
      answer: listeningAnswer,
    },
  },
  {
    id: `${prefix}-lesson-2`,
    title: `${languageLabel} Pattern Lab`,
    summary: 'Strengthen sentence construction through pattern drills.',
    focus: 'grammar',
    lengthMinutes: 22,
    vocabulary: [
      { term: 'station', meaning: 'a travel hub', example: 'Use it in direction-based practice.' },
      { term: 'ticket', meaning: 'a pass for travel', example: 'Pair it with quantity and price phrases.' },
    ],
    grammar: {
      concept: 'Question formation',
      prompt: 'Which option correctly asks for location help?',
      options: ['Where is the station?', 'Where station is?', 'Station where is?'],
      answer: 'Where is the station?',
      explanation: 'The correct question in English places the verb before the subject.',
    },
    shadowing: {
      phrase: 'Could you show me the way to the station?',
      translation: 'A polite request for directions.',
      coachingTip: 'Reduce unstressed words slightly and keep the main stress on "station".',
    },
    listening: {
      transcript: 'A commuter says the train leaves in ten minutes from platform six.',
      question: 'When does the train leave?',
      options: ['In ten minutes', 'At six o’clock', 'Tomorrow morning'],
      answer: 'In ten minutes',
    },
  },
]

export const courses: Course[] = [
  {
    id: 'ja-foundations',
    language: 'ja',
    title: 'Japanese City Launchpad',
    level: 'beginner',
    accentColor: 'from-cyan-400/70 to-sky-500/60',
    duration: '6 weeks',
    enrolledCount: 18240,
    completionRate: 84,
    headline: 'Kana confidence, travel phrases, and sharp listening habits.',
    description: 'A starter track for learners who want immersive routines with speaking confidence from day one.',
    skillFocus: ['vocabulary', 'shadowing', 'listening'],
    lessons: lessonsFor('ja', 'Japanese', 'Sumimasen, eki wa doko desu ka?', 'Excuse me, where is the station?', 'The total price'),
  },
  {
    id: 'ko-momentum',
    language: 'ko',
    title: 'Korean Momentum Studio',
    level: 'elementary',
    accentColor: 'from-fuchsia-400/70 to-rose-500/60',
    duration: '8 weeks',
    enrolledCount: 14910,
    completionRate: 79,
    headline: 'Build conversational stamina for daily routines and social life.',
    description: 'Designed for learners who want polished pronunciation and useful grammar patterns.',
    skillFocus: ['grammar', 'shadowing', 'listening'],
    lessons: lessonsFor('ko', 'Korean', 'Annyeonghaseyo, oneul iljeong-i eotteoke doeseyo?', 'Hello, how does your schedule look today?', 'The total price'),
  },
  {
    id: 'en-fluency',
    language: 'en',
    title: 'English Fluency Sprint',
    level: 'intermediate',
    accentColor: 'from-emerald-400/70 to-teal-500/60',
    duration: '5 weeks',
    enrolledCount: 20112,
    completionRate: 88,
    headline: 'Upgrade accuracy, speed, and self-expression through scenario drills.',
    description: 'A momentum-based track for learners targeting workplace and travel fluency.',
    skillFocus: ['vocabulary', 'grammar', 'listening'],
    lessons: lessonsFor('en', 'English', 'I would like to confirm the meeting time once again.', 'A polite confirmation statement.', 'The total price'),
  },
  {
    id: 'es-explorer',
    language: 'es',
    title: 'Spanish Explorer Route',
    level: 'beginner',
    accentColor: 'from-amber-400/70 to-orange-500/60',
    duration: '7 weeks',
    enrolledCount: 9730,
    completionRate: 76,
    headline: 'Learn high-frequency Spanish for travel, introductions, and culture.',
    description: 'A flexible pathway for beginners who prefer interactive practice over rote repetition.',
    skillFocus: ['vocabulary', 'grammar', 'shadowing'],
    lessons: lessonsFor('es', 'Spanish', 'Hola, me gustaria practicar esta conversacion contigo.', 'Hello, I would like to practice this conversation with you.', 'The total price'),
  },
]

let activeUser: UserProfile = {
  id: 'learner-001',
  email: 'learner@example.com',
  displayName: 'Mina Chen',
  interfaceLanguage: 'en',
  targetLanguage: 'ja',
  currentLevel: 'elementary',
  weeklyGoalMinutes: 180,
  streakDays: 12,
  focusArea: 'balanced',
}

let progressSummary: ProgressSummary = {
  totalStudyMinutes: 426,
  completedLessons: 9,
  currentLevel: 'elementary',
  weeklyGoalProgress: 72,
  skillAccuracy: {
    vocabulary: 89,
    grammar: 81,
    shadowing: 76,
    listening: 84,
  },
  unlockedAchievements: ['first-week', 'shadowing-spark', 'community-guide'],
}

let achievements: Achievement[] = [
  { id: 'first-week', title: 'First Week Locked In', description: 'Maintain a 7-day learning streak.', points: 150, unlocked: true },
  { id: 'shadowing-spark', title: 'Shadowing Spark', description: 'Complete 5 oral shadowing sessions.', points: 180, unlocked: true },
  { id: 'community-guide', title: 'Community Guide', description: 'Help 3 learners in the discussion feed.', points: 220, unlocked: true },
  { id: 'deep-listener', title: 'Deep Listener', description: 'Reach 90% listening accuracy.', points: 260, unlocked: false },
]

let communityFeed: CommunityFeed = {
  posts: [
    { id: 'post-1', author: 'Sora', language: 'ja', minutesAgo: 18, title: 'Shadowing breakthrough', content: 'Using slower playback first made native rhythm much easier to keep.', likes: 28 },
    { id: 'post-2', author: 'Jisoo', language: 'ko', minutesAgo: 45, title: 'Grammar shortcut', content: 'I grouped honorific patterns by real-life context and my recall jumped immediately.', likes: 19 },
    { id: 'post-3', author: 'Eva', language: 'en', minutesAgo: 72, title: 'Listening habit', content: 'I replayed one short clip three times with different focus goals and finally understood every detail.', likes: 34 },
  ],
  challenges: [
    { id: 'challenge-1', title: '7-Day Listening Loop', description: 'Finish one listening drill daily for a week.', reward: '240 points + Echo badge', participants: 1240 },
    { id: 'challenge-2', title: 'Shadowing Duo Sprint', description: 'Post two speaking reflections and cheer on three peers.', reward: '180 points + Spotlight card', participants: 860 },
  ],
  leaderboard: [
    { learner: 'Mina', streak: 12, score: 1420 },
    { learner: 'Noa', streak: 18, score: 1510 },
    { learner: 'Daniel', streak: 10, score: 1320 },
  ],
}

const adminOverview: AdminOverview = {
  activeLearners: 48291,
  completionRate: 83,
  moderationQueue: 14,
  liveCourses: 24,
  reportedPosts: 5,
  topLanguages: [
    { language: 'English', learners: 18200 },
    { language: 'Japanese', learners: 14400 },
    { language: 'Korean', learners: 11900 },
  ],
}

export const getActiveUser = (): UserProfile => clone(activeUser)
export const getLanguages = (): LanguageOption[] => clone(supportedLanguages)
export const getCourses = (language?: SupportedLanguage, level?: string): Course[] =>
  clone(courses.filter((course) => (!language || course.language === language) && (!level || course.level === level)))
export const getCourseById = (courseId: string): Course | undefined => clone(courses.find((course) => course.id === courseId))
export const getLessonById = (lessonId: string): Lesson | undefined => clone(courses.flatMap((course) => course.lessons).find((lesson) => lesson.id === lessonId))
export const getProgress = (): ProgressSummary => clone(progressSummary)
export const getAchievements = (): Achievement[] => clone(achievements)
export const getCommunityFeed = (): CommunityFeed => clone(communityFeed)
export const getAdminOverview = (): AdminOverview => clone(adminOverview)

export const getRecommendations = (): LessonRecommendation[] => {
  const weakestSkill = (Object.entries(progressSummary.skillAccuracy).sort((a, b) => a[1] - b[1])[0]?.[0] || 'shadowing') as LessonModuleType
  const matchingLessons = courses
    .flatMap((course) => course.lessons.map((lesson) => ({ lesson, course })))
    .filter(({ lesson }) => lesson.focus === weakestSkill || weakestSkill === 'shadowing')
    .slice(0, 3)

  return clone(
    matchingLessons.map(({ lesson }) => ({
      lessonId: lesson.id,
      reason: `Strengthen your ${weakestSkill} performance with a short guided drill.`,
      targetSkill: weakestSkill,
      estimatedMinutes: lesson.lengthMinutes,
    })),
  )
}

export const registerUser = (payload: RegisterPayload): UserProfile => {
  activeUser = {
    ...activeUser,
    id: `learner-${Date.now()}`,
    email: payload.email,
    displayName: payload.displayName,
    interfaceLanguage: payload.interfaceLanguage,
    targetLanguage: payload.targetLanguage,
  }
  return getActiveUser()
}

export const loginUser = (payload: LoginPayload): UserProfile => {
  activeUser = {
    ...activeUser,
    email: payload.email,
  }
  return getActiveUser()
}

export const submitLessonAttempt = (payload: LessonAttemptPayload) => {
  const nextAccuracy = Math.min(99, Math.round((progressSummary.skillAccuracy[payload.moduleType] + payload.score) / 2))
  progressSummary = {
    ...progressSummary,
    totalStudyMinutes: progressSummary.totalStudyMinutes + Math.round(payload.durationSeconds / 60),
    completedLessons: progressSummary.completedLessons + 1,
    weeklyGoalProgress: Math.min(100, progressSummary.weeklyGoalProgress + 6),
    skillAccuracy: {
      ...progressSummary.skillAccuracy,
      [payload.moduleType]: nextAccuracy,
    },
  }

  if (payload.moduleType === 'listening' && nextAccuracy >= 90) {
    achievements = achievements.map((item) => (item.id === 'deep-listener' ? { ...item, unlocked: true } : item))
    if (!progressSummary.unlockedAchievements.includes('deep-listener')) {
      progressSummary.unlockedAchievements = [...progressSummary.unlockedAchievements, 'deep-listener']
    }
  }

  return {
    progress: getProgress(),
    recommendations: getRecommendations(),
    achievements: getAchievements(),
  }
}

export const createCommunityPost = (title: string, content: string, language: SupportedLanguage) => {
  communityFeed = {
    ...communityFeed,
    posts: [
      {
        id: `post-${Date.now()}`,
        author: activeUser.displayName,
        language,
        minutesAgo: 0,
        title,
        content,
        likes: 0,
      },
      ...communityFeed.posts,
    ],
  }
  return getCommunityFeed()
}
