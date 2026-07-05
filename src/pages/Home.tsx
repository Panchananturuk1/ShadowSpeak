import { Link } from 'react-router-dom'
import { ArrowRight, Languages, Mic2, Radar, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import CourseCard from '@/components/CourseCard'
import MetricCard from '@/components/MetricCard'
import SectionHeading from '@/components/SectionHeading'
import { usePlatformStore } from '@/store/usePlatformStore'

const featureCards = [
  {
    icon: Languages,
    title: 'Leveled learning paths',
    description: 'Beginner to advanced tracks keep learners moving through a coherent course ladder.',
  },
  {
    icon: Mic2,
    title: 'Shadowing and listening',
    description: 'Speaking rhythm coaching and comprehension loops create immersive repetition.',
  },
  {
    icon: Radar,
    title: 'Adaptive recommendations',
    description: 'Each next lesson is chosen from goals, weak skills, and recent attempts.',
  },
  {
    icon: Trophy,
    title: 'Community incentives',
    description: 'Challenges, streaks, and public wins turn consistency into a visible habit.',
  },
]

export default function Home() {
  const { t } = useTranslation()
  const courses = usePlatformStore((state) => state.courses)
  const progress = usePlatformStore((state) => state.progress)
  const community = usePlatformStore((state) => state.community)

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/60 p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">multilingual immersion</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-none text-white md:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="pill-primary" to="/auth/register">
              {t('hero.primary')}
            </Link>
            <Link className="pill-secondary" to={courses[0] ? `/learn/${courses[0].lessons[0].id}` : '/courses'}>
              {t('hero.secondary')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <MetricCard label="weekly goal" value={`${progress?.weeklyGoalProgress ?? 0}%`} detail="Progress synced across every practice module." />
            <MetricCard label="streak" value={`${progress?.completedLessons ?? 0}`} detail="Completed lessons fuel achievements and retention loops." />
            <MetricCard label="community" value={`${community?.leaderboard[0]?.score ?? 0}`} detail="Leaderboard momentum keeps learners visible and accountable." />
          </div>
        </div>

        <div className="grid gap-4">
          {featureCards.map((feature) => (
            <article key={feature.title} className="glass-panel rounded-[30px] p-6">
              <feature.icon className="h-8 w-8 text-cyan-300" />
              <h2 className="mt-4 font-display text-3xl text-white">{feature.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="course orbit"
          title="Leveled pathways for English, Japanese, Korean, and beyond."
          description="Each pathway blends vocabulary, grammar, shadowing, and listening in one unified daily workflow."
        />
        <div className="grid gap-6 xl:grid-cols-4 md:grid-cols-2">
          {courses.slice(0, 4).map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
      </section>
    </div>
  )
}
