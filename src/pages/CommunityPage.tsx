import { useState } from 'react'
import SectionHeading from '@/components/SectionHeading'
import { usePlatformStore } from '@/store/usePlatformStore'
import type { SupportedLanguage } from '../../shared/platform'

export default function CommunityPage() {
  const community = usePlatformStore((state) => state.community)
  const createPost = usePlatformStore((state) => state.createPost)
  const [draft, setDraft] = useState({
    title: 'Today’s study reflection',
    content: 'Shadowing felt smoother once I copied the sentence rhythm instead of every single syllable.',
    language: 'ja' as SupportedLanguage,
  })

  if (!community) {
    return null
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <section className="space-y-6">
        <SectionHeading
          eyebrow="community hub"
          title="Community interaction turns isolated study into visible progress."
          description="Publish reflections, join achievement-based challenges, and learn from peers working on the same target language."
        />
        <div className="glass-panel rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">post a reflection</p>
          <div className="mt-5 grid gap-4">
            <label className="field-shell">
              <span>Title</span>
              <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
            </label>
            <label className="field-shell">
              <span>Reflection</span>
              <textarea rows={5} value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} />
            </label>
            <label className="field-shell">
              <span>Language</span>
              <select
                value={draft.language}
                onChange={(event) => setDraft({ ...draft, language: event.target.value as SupportedLanguage })}
              >
                {['en', 'ja', 'ko', 'zh', 'es', 'fr', 'de'].map((language) => (
                  <option className="bg-slate-950" key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button className="pill-primary mt-6" onClick={() => createPost(draft)} type="button">
            Publish to community
          </button>
        </div>

        <div className="glass-panel rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">challenge board</p>
          <div className="mt-5 space-y-3">
            {community.challenges.map((challenge) => (
              <article className="rounded-[24px] border border-white/10 bg-white/5 p-5" key={challenge.id}>
                <p className="text-lg font-semibold text-white">{challenge.title}</p>
                <p className="mt-2 text-sm text-slate-300">{challenge.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cyan-200">
                  {challenge.reward} · {challenge.participants} joined
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="glass-panel rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">discussion feed</p>
          <div className="mt-5 space-y-3">
            {community.posts.map((post) => (
              <article className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5" key={post.id}>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                  <span>{post.author}</span>
                  <span>{post.minutesAgo} min ago</span>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-white">{post.title}</h2>
                <p className="mt-2 text-sm text-slate-300">{post.content}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cyan-200">
                  {post.language} · {post.likes} likes
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[32px] p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">leaderboard</p>
          <div className="mt-5 space-y-3">
            {community.leaderboard.map((entry, index) => (
              <div className="flex items-center justify-between rounded-[20px] border border-white/10 bg-white/5 px-4 py-4" key={entry.learner}>
                <div>
                  <p className="text-sm text-slate-400">#{index + 1}</p>
                  <p className="text-white">{entry.learner}</p>
                </div>
                <div className="text-right text-sm text-slate-300">
                  <p>{entry.score} pts</p>
                  <p>{entry.streak}-day streak</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
