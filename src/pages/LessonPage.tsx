import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Headphones, Mic2, Sparkles, SpellCheck2 } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import { useSpeechCoach } from '@/hooks/useSpeechCoach'
import { usePlatformStore } from '@/store/usePlatformStore'
import type { LessonModuleType } from '../../shared/platform'

const moduleMeta = {
  vocabulary: { icon: Sparkles, title: 'Vocabulary memorization' },
  grammar: { icon: SpellCheck2, title: 'Grammar exercise' },
  shadowing: { icon: Mic2, title: 'Oral shadowing' },
  listening: { icon: Headphones, title: 'Listening training' },
} as const

export default function LessonPage() {
  const { lessonId } = useParams()
  const courses = usePlatformStore((state) => state.courses)
  const submitAttempt = usePlatformStore((state) => state.submitAttempt)
  const lesson = useMemo(
    () => courses.flatMap((course) => course.lessons).find((entry) => entry.id === lessonId),
    [courses, lessonId],
  )
  const [grammarAnswer, setGrammarAnswer] = useState('')
  const [listeningAnswer, setListeningAnswer] = useState('')
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const speechCoach = useSpeechCoach(lesson?.shadowing.phrase ?? '')

  if (!lesson) {
    return (
      <div className="glass-panel rounded-[32px] p-8">
        <p className="text-sm text-slate-300">Lesson not found. Browse the course library to choose another entry point.</p>
        <Link className="pill-primary mt-6 inline-flex" to="/courses">
          Open courses
        </Link>
      </div>
    )
  }

  const saveModule = async (moduleType: LessonModuleType, score: number) => {
    await submitAttempt({
      lessonId: lesson.id,
      moduleType,
      score,
      durationSeconds: lesson.lengthMinutes * 60,
      answers: [{ itemId: `${moduleType}-1`, isCorrect: score >= 80, responseText: score.toString() }],
    })
    setCompletedModules((current) => [...new Set([...current, moduleType])])
  }

  const vocabularyCards = (
    <div className="grid gap-3 md:grid-cols-2">
      {lesson.vocabulary.map((item) => (
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5" key={item.term}>
          <p className="text-lg font-semibold text-white">{item.term}</p>
          <p className="mt-2 text-sm text-cyan-200">{item.meaning}</p>
          <p className="mt-4 text-sm text-slate-300">{item.example}</p>
        </div>
      ))}
    </div>
  )

  const moduleBlocks = [
    {
      key: 'vocabulary' as const,
      content: vocabularyCards,
      footer: <button className="pill-primary" onClick={() => saveModule('vocabulary', 92)} type="button">Mark as recalled</button>,
    },
    {
      key: 'grammar' as const,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-300">{lesson.grammar.prompt}</p>
          <div className="grid gap-3">
            {lesson.grammar.options.map((option) => (
              <button
                className={`rounded-[20px] border px-4 py-3 text-left text-sm ${
                  grammarAnswer === option ? 'border-cyan-300 bg-cyan-300/15 text-white' : 'border-white/10 bg-white/5 text-slate-300'
                }`}
                key={option}
                onClick={() => setGrammarAnswer(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          {grammarAnswer && <p className="text-sm text-slate-300">{lesson.grammar.explanation}</p>}
        </div>
      ),
      footer: <button className="pill-primary" onClick={() => saveModule('grammar', grammarAnswer === lesson.grammar.answer ? 94 : 62)} type="button">Submit grammar drill</button>,
    },
    {
      key: 'shadowing' as const,
      content: (
        <div className="space-y-4">
          <p className="font-display text-3xl text-white">{lesson.shadowing.phrase}</p>
          <p className="text-sm text-slate-300">{lesson.shadowing.translation}</p>
          <p className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-sm text-cyan-100">{lesson.shadowing.coachingTip}</p>
        </div>
      ),
      footer: (
        <div className="flex flex-wrap gap-3">
          <button className="pill-secondary" onClick={speechCoach.speak} type="button">
            {speechCoach.supported ? (speechCoach.speaking ? 'Playing...' : 'Play model audio') : 'Speech unavailable'}
          </button>
          <button className="pill-primary" onClick={() => saveModule('shadowing', 88)} type="button">Save shadowing practice</button>
        </div>
      ),
    },
    {
      key: 'listening' as const,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-300">{lesson.listening.transcript}</p>
          <p className="font-medium text-white">{lesson.listening.question}</p>
          <div className="grid gap-3">
            {lesson.listening.options.map((option) => (
              <button
                className={`rounded-[20px] border px-4 py-3 text-left text-sm ${
                  listeningAnswer === option ? 'border-rose-300 bg-rose-300/15 text-white' : 'border-white/10 bg-white/5 text-slate-300'
                }`}
                key={option}
                onClick={() => setListeningAnswer(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ),
      footer: <button className="pill-primary" onClick={() => saveModule('listening', listeningAnswer === lesson.listening.answer ? 96 : 64)} type="button">Lock listening score</button>,
    },
  ]

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow={lesson.focus} title={lesson.title} description={lesson.summary} />
      <div className="rounded-[30px] border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
        Module completion: {completedModules.length}/4 · Estimated time {lesson.lengthMinutes} minutes
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {moduleBlocks.map((module) => {
          const Icon = moduleMeta[module.key].icon
          return (
            <article className="glass-panel rounded-[30px] p-6" key={module.key}>
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-cyan-300" />
                <h2 className="font-display text-3xl text-white">{moduleMeta[module.key].title}</h2>
              </div>
              <div className="mt-5">{module.content}</div>
              <div className="mt-6">{module.footer}</div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
