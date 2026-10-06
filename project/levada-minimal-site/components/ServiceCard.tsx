interface ServiceCardProps {
  title: string;
  desc: string;
  from: string;
}

export default function ServiceCard({ title, desc, from }: ServiceCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-[18px]">
      <h4 className="mb-1.5 text-base font-semibold text-ink">{title}</h4>
      <p className="mb-2.5 text-[13.5px] leading-snug text-muted">{desc}</p>
      <div className="text-xs font-bold uppercase tracking-wide text-brand">{from}</div>
    </div>
  );
}
