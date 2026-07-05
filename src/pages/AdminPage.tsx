import MetricCard from '@/components/MetricCard'
import SectionHeading from '@/components/SectionHeading'
import { usePlatformStore } from '@/store/usePlatformStore'

export default function AdminPage() {
  const adminOverview = usePlatformStore((state) => state.adminOverview)

  if (!adminOverview) {
    return null
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="admin console"
        title="Monitor learners, content, moderation, and language demand in one workspace."
        description="The admin surface keeps the platform scalable by showing engagement and operational pressure at a glance."
      />
      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard label="active learners" value={adminOverview.activeLearners.toLocaleString()} detail="Last 30-day active audience." />
        <MetricCard label="completion" value={`${adminOverview.completionRate}%`} detail="Cross-course completion rate." />
        <MetricCard label="queue" value={`${adminOverview.moderationQueue}`} detail="Posts awaiting review." />
        <MetricCard label="courses" value={`${adminOverview.liveCourses}`} detail="Published learning tracks." />
        <MetricCard label="reports" value={`${adminOverview.reportedPosts}`} detail="Flagged community posts." />
      </div>

      <div className="glass-panel rounded-[32px] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">top languages</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {adminOverview.topLanguages.map((entry) => (
            <article className="rounded-[24px] border border-white/10 bg-white/5 p-5" key={entry.language}>
              <p className="text-lg font-semibold text-white">{entry.language}</p>
              <p className="mt-2 text-sm text-slate-300">{entry.learners.toLocaleString()} active learners</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
