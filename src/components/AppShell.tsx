import { Link, NavLink, Outlet } from 'react-router-dom'
import { Globe2, ShieldCheck, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePlatformBootstrap } from '@/hooks/usePlatformBootstrap'
import { usePlatformStore } from '@/store/usePlatformStore'

const localeOptions = [
  { value: 'en', label: 'EN' },
  { value: 'ja', label: 'JA' },
  { value: 'ko', label: 'KO' },
  { value: 'zh', label: 'ZH' },
] as const

export default function AppShell() {
  const { t } = useTranslation()
  const locale = usePlatformStore((state) => state.locale)
  const loading = usePlatformStore((state) => state.loading)
  const activeUser = usePlatformStore((state) => state.activeUser)
  const setLocale = usePlatformStore((state) => state.setLocale)
  usePlatformBootstrap()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#081122_100%)] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-8">
        <header className="glass-panel sticky top-4 z-20 mb-8 flex flex-col gap-5 rounded-[32px] px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-3" to="/">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/90 text-slate-950">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display text-2xl text-white">{t('brand')}</p>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">immersive language orbit</p>
              </div>
            </Link>
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200 md:flex">
              <ShieldCheck className="h-4 w-4" />
              Full-stack demo
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {['home', 'courses', 'dashboard', 'community', 'profile', 'admin'].map((key) => (
              <NavLink
                key={key}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                    isActive ? 'bg-white text-slate-950' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`
                }
                to={
                  key === 'home'
                    ? '/'
                    : key === 'courses'
                      ? '/courses'
                      : `/${key}`
                }
              >
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Globe2 className="h-4 w-4 text-cyan-300" />
              <select
                aria-label="Interface language"
                className="bg-transparent text-xs uppercase tracking-[0.18em] text-slate-100 outline-none"
                onChange={(event) => setLocale(event.target.value as typeof locale)}
                value={locale}
              >
                {localeOptions.map((option) => (
                  <option className="bg-slate-950" key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {loading ? t('common.loading') : activeUser?.targetLanguage ?? 'ja'}
              </p>
              <p className="text-sm font-semibold text-white">{activeUser?.displayName ?? 'Guest learner'}</p>
            </div>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  )
}
