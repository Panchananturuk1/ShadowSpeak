import { Router, type Request, type Response } from 'express'
import {
  createCommunityPost,
  getAchievements,
  getAdminOverview,
  getCommunityFeed,
  getCourseById,
  getCourses,
  getLanguages,
  getLessonById,
  getProgress,
  getRecommendations,
  submitLessonAttempt,
} from '../data/platformData.js'
import type {
  LessonAttemptPayload,
  SupportedLanguage,
} from '../../shared/platform.js'

const router = Router()

router.get('/languages', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, languages: getLanguages() })
})

router.get('/courses', (req: Request, res: Response) => {
  const language = req.query.language as SupportedLanguage | undefined
  const level = req.query.level as string | undefined
  res.status(200).json({ success: true, courses: getCourses(language, level) })
})

router.get('/courses/:courseId', (req: Request, res: Response) => {
  const course = getCourseById(req.params.courseId)
  if (!course) {
    res.status(404).json({ success: false, error: 'Course not found' })
    return
  }

  res.status(200).json({ success: true, course })
})

router.get('/lessons/:lessonId', (req: Request, res: Response) => {
  const lesson = getLessonById(req.params.lessonId)
  if (!lesson) {
    res.status(404).json({ success: false, error: 'Lesson not found' })
    return
  }

  res.status(200).json({ success: true, lesson })
})

router.post('/lessons/:lessonId/attempts', (req: Request, res: Response) => {
  const payload = req.body as LessonAttemptPayload
  if (!payload.lessonId || !payload.moduleType) {
    res.status(400).json({ success: false, error: 'Invalid lesson attempt payload' })
    return
  }

  res.status(200).json({
    success: true,
    ...submitLessonAttempt(payload),
  })
})

router.get('/progress/me', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, progress: getProgress(), achievements: getAchievements() })
})

router.get('/recommendations/me', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, recommendations: getRecommendations() })
})

router.get('/community/feed', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, community: getCommunityFeed() })
})

router.post('/community/posts', (req: Request, res: Response) => {
  const { title, content, language } = req.body as {
    title?: string
    content?: string
    language?: SupportedLanguage
  }

  if (!title || !content || !language) {
    res.status(400).json({ success: false, error: 'Title, content, and language are required' })
    return
  }

  res.status(201).json({
    success: true,
    community: createCommunityPost(title, content, language),
  })
})

router.post('/achievements/evaluate', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, achievements: getAchievements() })
})

router.get('/admin/overview', (_req: Request, res: Response) => {
  res.status(200).json({ success: true, adminOverview: getAdminOverview() })
})

export default router
