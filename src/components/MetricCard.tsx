interface MetricCardProps {
  label: string
  value: string
  detail: string
}

export default function MetricCard({ label, value, detail }: MetricCardProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)] backdrop-blur">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <p className="mt-4 font-display text-4xl text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </div>
  )
}
