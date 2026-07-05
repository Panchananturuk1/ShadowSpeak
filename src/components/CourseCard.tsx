import { Link } from 'react-router-dom'
import type { Course } from '../../shared/platform'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/70">
      <div className={`h-32 bg-gradient-to-br ${course.accentColor}`} />
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{course.language}</p>
            <h3 className="mt-2 font-display text-3xl text-white">{course.title}</h3>
          </div>
          <span className="rounded-full border border-cyan-400/30 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-100">
            {course.level.replace('_', ' ')}
          </span>
        </div>
        <p className="text-sm text-slate-300">{course.headline}</p>
        <div className="grid grid-cols-3 gap-3 text-xs text-slate-400">
          <div>
            <p className="text-white">{course.duration}</p>
            <p>duration</p>
          </div>
          <div>
            <p className="text-white">{course.enrolledCount.toLocaleString()}</p>
            <p>learners</p>
          </div>
          <div>
            <p className="text-white">{course.completionRate}%</p>
            <p>completion</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {course.skillFocus.map((skill) => (
              <span key={skill} className="rounded-full bg-white/5 px-3 py-1 text-xs capitalize text-slate-300">
                {skill}
              </span>
            ))}
          </div>
          <Link
            className="rounded-full bg-cyan-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-200"
            to={`/learn/${course.lessons[0]?.id}`}
          >
            Enter
          </Link>
        </div>
      </div>
    </article>
  )
}
