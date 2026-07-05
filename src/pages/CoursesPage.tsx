import { useMemo, useState } from 'react'
import CourseCard from '@/components/CourseCard'
import SectionHeading from '@/components/SectionHeading'
import { usePlatformStore } from '@/store/usePlatformStore'

export default function CoursesPage() {
  const courses = usePlatformStore((state) => state.courses)
  const recommendations = usePlatformStore((state) => state.recommendations)
  const [language, setLanguage] = useState('all')
  const [level, setLevel] = useState('all')

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (course) =>
          (language === 'all' || course.language === language) &&
          (level === 'all' || course.level === level),
      ),
    [courses, language, level],
  )

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <section className="space-y-6">
        <SectionHeading
          eyebrow="course library"
          title="Explore every language path by level, skill mix, and momentum."
          description="Level-aware filters help learners find the right next step without losing the structure of the wider curriculum."
        />
        <div className="glass-panel grid gap-4 rounded-[30px] p-5 md:grid-cols-2">
          <label className="field-shell">
            <span>Language</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value)}>
              {['all', 'en', 'ja', 'ko', 'zh', 'es', 'fr', 'de'].map((entry) => (
                <option className="bg-slate-950" key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>
          <label className="field-shell">
            <span>Level</span>
            <select value={level} onChange={(event) => setLevel(event.target.value)}>
              {['all', 'beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'].map((entry) => (
                <option className="bg-slate-950" key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCourses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass-panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">recommended next</p>
          <div className="mt-5 space-y-3">
            {recommendations.map((item) => (
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4" key={item.lessonId}>
                <p className="text-sm font-semibold text-white">{item.lessonId}</p>
                <p className="mt-2 text-sm text-slate-300">{item.reason}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-cyan-300">
                  {item.targetSkill} · {item.estimatedMinutes} min
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
