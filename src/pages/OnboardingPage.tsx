import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlatformStore } from '@/store/usePlatformStore'
import type { LessonModuleType, ProficiencyLevel } from '../../shared/platform'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const activeUser = usePlatformStore((state) => state.activeUser)
  const updateWeeklyGoal = usePlatformStore((state) => state.updateWeeklyGoal)
  const [level, setLevel] = useState<ProficiencyLevel>(activeUser?.currentLevel ?? 'beginner')
  const [goal, setGoal] = useState(activeUser?.weeklyGoalMinutes ?? 180)
  const [focus, setFocus] = useState<LessonModuleType | 'balanced'>('balanced')

  const finishOnboarding = () => {
    updateWeeklyGoal(goal)
    navigate('/courses', {
      state: {
        level,
        focus,
      },
    })
  }

  return (
    <section className="mx-auto max-w-4xl rounded-[36px] border border-white/10 bg-slate-950/70 p-8">
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">onboarding</p>
      <h1 className="mt-4 font-display text-5xl text-white">Tune your learning orbit before the first lesson.</h1>
      <p className="mt-4 max-w-2xl text-sm text-slate-300">
        Choose a current level, weekly study goal, and focus area so the platform can surface the right lessons and challenge loops.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <label className="field-shell">
          <span>Current level</span>
          <select value={level} onChange={(event) => setLevel(event.target.value as ProficiencyLevel)}>
            {['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'].map((entry) => (
              <option className="bg-slate-950" key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </label>
        <label className="field-shell">
          <span>Weekly goal minutes</span>
          <input max={420} min={60} onChange={(event) => setGoal(Number(event.target.value))} type="range" value={goal} />
          <p className="text-sm text-white">{goal} min/week</p>
        </label>
        <label className="field-shell">
          <span>Primary focus</span>
          <select value={focus} onChange={(event) => setFocus(event.target.value as LessonModuleType | 'balanced')}>
            {['balanced', 'vocabulary', 'grammar', 'shadowing', 'listening'].map((entry) => (
              <option className="bg-slate-950" key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-10 rounded-[32px] border border-cyan-400/20 bg-cyan-400/10 p-6 text-sm text-cyan-50">
        Recommended path: Start with short vocabulary + shadowing blocks, then widen grammar volume as confidence stabilizes.
      </div>

      <button className="pill-primary mt-8" onClick={finishOnboarding} type="button">
        Build my plan
      </button>
    </section>
  )
}
