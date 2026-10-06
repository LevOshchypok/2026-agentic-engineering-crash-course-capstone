/**
 * Porting reference — NOT wired into the app yet.
 * Tailwind classes here use the tokens already configured in app/globals.css
 * (see docs/design-system.md). This mirrors the plain-CSS `.card` used in
 * the runnable prototype at docs/mockup/index.html.
 */
export default function ServiceCard({ title, desc, from }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-[18px]">
      <h4 className="mb-1.5 text-base font-semibold text-ink">{title}</h4>
      <p className="mb-2.5 text-[13.5px] leading-snug text-muted">{desc}</p>
      <div className="text-xs font-bold uppercase tracking-wide text-brand">{from}</div>
    </div>
  );
}
