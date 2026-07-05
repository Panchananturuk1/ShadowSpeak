import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import '@/i18n'
import Home from '@/pages/Home'
import { usePlatformStore } from '@/store/usePlatformStore'

describe('Home', () => {
  it('renders the hero and seeded courses', () => {
    usePlatformStore.setState({
      courses: [
        {
          id: 'ja-foundations',
          language: 'ja',
          title: 'Japanese City Launchpad',
          level: 'beginner',
          accentColor: 'from-cyan-400 to-sky-500',
          duration: '6 weeks',
          enrolledCount: 10,
          completionRate: 80,
          headline: 'Kana confidence',
          description: 'desc',
          skillFocus: ['vocabulary', 'shadowing', 'listening'],
          lessons: [
            {
              id: 'lesson-1',
              title: 'Japanese Foundations',
              summary: 'summary',
              focus: 'vocabulary',
              lengthMinutes: 18,
              vocabulary: [],
              grammar: {
                concept: 'concept',
                prompt: 'prompt',
                options: ['a'],
                answer: 'a',
                explanation: 'explanation',
              },
              shadowing: {
                phrase: 'phrase',
                translation: 'translation',
                coachingTip: 'tip',
              },
              listening: {
                transcript: 'transcript',
                question: 'question',
                options: ['a'],
                answer: 'a',
              },
            },
          ],
        },
      ],
      progress: {
        totalStudyMinutes: 100,
        completedLessons: 7,
        currentLevel: 'beginner',
        weeklyGoalProgress: 50,
        skillAccuracy: {
          vocabulary: 90,
          grammar: 80,
          shadowing: 70,
          listening: 85,
        },
        unlockedAchievements: [],
      },
      community: {
        posts: [],
        challenges: [],
        leaderboard: [{ learner: 'Mina', score: 1200, streak: 10 }],
      },
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByText(/cinematic language studio/i)).toBeTruthy()
    expect(screen.getByText(/Japanese City Launchpad/)).toBeTruthy()
  })
})
