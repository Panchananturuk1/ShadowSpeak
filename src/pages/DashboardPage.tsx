import MetricCard from '@/components/MetricCard'
import SectionHeading from '@/components/SectionHeading'
import { usePlatformStore } from '@/store/usePlatformStore'

export default function DashboardPage() {
  const progress = usePlatformStore((state) => state.progress)
  const recommendations = usePlatformStore((state) => state.recommendations)
  const achievements = usePlatformStore((state) => state.achievements)

  if (!progress) {
    return null
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="progress dashboard"
        title="Measure growth across vocabulary, grammar, shadowing, and listening."
        description="The dashboard turns every lesson attempt into a visible momentum system with recommendations and incentive milestones."
      />
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="study time" value={`${progress.totalStudyMinutes}m`} detail="Accumulated focused practice." />
        <MetricCard label="completed" value={`${progress.completedLessons}`} detail="Lessons that feed your proficiency ladder." />
        <MetricCard label="level" value={progress.currentLevel.replace('_', ' ')} detail="Current placement estimate." />
        <MetricCard label="goal" value={`${progress.weeklyGoalProgress}%`} detail="Weekly target completion." />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="glass-panel rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">skill radar</p>
          <div className="mt-5 space-y-4">
            {Object.entries(progress.skillAccuracy).map(([skill, value]) => (
              <div key={skill}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span className="capitalize">{skill}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/5">
                  <div className="h-3 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="glass-panel rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">next best lessons</p>
          <div className="mt-5 space-y-3">
            {recommendations.map((item) => (
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4" key={item.lessonId}>
                <p className="text-sm font-semibold text-white">{item.lessonId}</p>
                <p className="mt-2 text-sm text-slate-300">{item.reason}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="glass-panel rounded-[32px] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">achievement incentives</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {achievements.map((achievement) => (
            <article
              className={`rounded-[24px] border p-5 ${
                achievement.unlocked ? 'border-cyan-400/30 bg-cyan-400/10' : 'border-white/10 bg-white/5'
              }`}
              key={achievement.id}
            >
              <p className="text-sm font-semibold text-white">{achievement.title}</p>
              <p className="mt-2 text-sm text-slate-300">{achievement.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cyan-200">{achievement.points} points</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
