interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>
      <h2 className="font-display text-4xl text-white md:text-5xl">{title}</h2>
      <p className="text-sm text-slate-300 md:text-base">{description}</p>
    </div>
  )
}
