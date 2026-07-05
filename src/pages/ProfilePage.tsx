import SectionHeading from '@/components/SectionHeading'
import { usePlatformStore } from '@/store/usePlatformStore'

export default function ProfilePage() {
  const activeUser = usePlatformStore((state) => state.activeUser)
  const achievements = usePlatformStore((state) => state.achievements)
  const updateWeeklyGoal = usePlatformStore((state) => state.updateWeeklyGoal)

  if (!activeUser) {
    return null
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="profile settings"
        title="Adjust your language goals, study cadence, and achievement identity."
        description="The profile page keeps the learning path personal while preserving a consistent progression framework."
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="glass-panel rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">learner card</p>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p className="text-2xl font-semibold text-white">{activeUser.displayName}</p>
            <p>{activeUser.email}</p>
            <p>Target language: {activeUser.targetLanguage}</p>
            <p>Interface locale: {activeUser.interfaceLanguage}</p>
            <p>Current level: {activeUser.currentLevel}</p>
            <p>Streak: {activeUser.streakDays} days</p>
          </div>
        </section>

        <section className="glass-panel rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">goal tuning</p>
          <label className="field-shell mt-5">
            <span>Weekly goal minutes</span>
            <input
              max={420}
              min={60}
              onChange={(event) => updateWeeklyGoal(Number(event.target.value))}
              type="range"
              value={activeUser.weeklyGoalMinutes}
            />
            <p className="text-sm text-white">{activeUser.weeklyGoalMinutes} minutes</p>
          </label>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <article className="rounded-[24px] border border-white/10 bg-white/5 p-5" key={achievement.id}>
                <p className="text-sm font-semibold text-white">{achievement.title}</p>
                <p className="mt-2 text-sm text-slate-300">{achievement.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
