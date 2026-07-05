import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePlatformStore } from '@/store/usePlatformStore'
import type { SupportedLanguage } from '../../shared/platform'

const languageOptions: SupportedLanguage[] = ['en', 'ja', 'ko', 'zh', 'es', 'fr', 'de']

export default function AuthPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const register = usePlatformStore((state) => state.register)
  const login = usePlatformStore((state) => state.login)
  const error = usePlatformStore((state) => state.error)
  const [mode, setMode] = useState<'register' | 'login'>('register')
  const [form, setForm] = useState({
    displayName: 'Aiko Rivera',
    email: 'learner@example.com',
    password: 'demo-pass',
    interfaceLanguage: 'en' as SupportedLanguage,
    targetLanguage: 'ja' as SupportedLanguage,
  })

  useEffect(() => {
    setMode(location.pathname.endsWith('/login') ? 'login' : 'register')
  }, [location.pathname])

  const submit = async () => {
    if (mode === 'register') {
      await register(form)
      navigate('/onboarding')
      return
    }

    await login({ email: form.email, password: form.password })
    navigate('/dashboard')
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="glass-panel rounded-[36px] p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">account orbit</p>
        <h1 className="mt-4 font-display text-5xl text-white">Join a language path that adapts as you grow.</h1>
        <p className="mt-4 text-sm text-slate-300">
          Create an account, choose your interface language, and start with a target language matched to your goals.
        </p>
        <div className="mt-8 grid gap-4">
          <div className="rounded-[28px] border border-white/10 bg-slate-950/50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">What unlocks next</p>
            <p className="mt-3 text-sm text-slate-200">Placement guidance, tailored recommendations, achievement tracking, and community challenges.</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-slate-950/50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Supported interface languages</p>
            <p className="mt-3 text-sm text-slate-200">English, Japanese, Korean, Chinese, and extensible support for other mainstream locales.</p>
          </div>
        </div>
      </div>

      <div className="rounded-[36px] border border-white/10 bg-slate-950/70 p-8">
        <div className="flex gap-3">
          {(['register', 'login'] as const).map((entry) => (
            <button
              className={`rounded-full px-5 py-3 text-xs uppercase tracking-[0.22em] ${
                mode === entry ? 'bg-cyan-300 text-slate-950' : 'bg-white/5 text-slate-300'
              }`}
              key={entry}
              onClick={() => setMode(entry)}
              type="button"
            >
              {entry}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4">
          {mode === 'register' && (
            <label className="field-shell">
              <span>Display name</span>
              <input value={form.displayName} onChange={(event) => setForm({ ...form, displayName: event.target.value })} />
            </label>
          )}
          <label className="field-shell">
            <span>Email</span>
            <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </label>
          <label className="field-shell">
            <span>Password</span>
            <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          </label>
          {mode === 'register' && (
            <>
              <label className="field-shell">
                <span>Interface language</span>
                <select
                  value={form.interfaceLanguage}
                  onChange={(event) => setForm({ ...form, interfaceLanguage: event.target.value as SupportedLanguage })}
                >
                  {languageOptions.map((language) => (
                    <option className="bg-slate-950" key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-shell">
                <span>Target language</span>
                <select
                  value={form.targetLanguage}
                  onChange={(event) => setForm({ ...form, targetLanguage: event.target.value as SupportedLanguage })}
                >
                  {languageOptions.map((language) => (
                    <option className="bg-slate-950" key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>

        {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

        <button className="pill-primary mt-8 w-full justify-center" onClick={submit} type="button">
          {mode === 'register' ? 'Create account' : 'Continue learning'}
        </button>
      </div>
    </section>
  )
}
