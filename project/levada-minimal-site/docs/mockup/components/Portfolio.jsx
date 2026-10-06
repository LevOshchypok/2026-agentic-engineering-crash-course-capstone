/**
 * Porting reference — NOT wired into the app.
 * Kept for design-history context. The live component now ships with real
 * per-job photo galleries (hero + tappable thumbnails) instead of the
 * placeholder blocks shown here — see `app/portfolio/page.tsx` and
 * `components/PortfolioItemCard.tsx` for the shipped implementation
 * (openspec/changes/add-portfolio-photography).
 */
const PORTFOLIO = [
  {
    title: "Обмінна карта · Щоденник вагітності",
    spec: "А5 · скоби · 150 крейда + 80 офсет (Pantone) · обкладинка 300 крейда",
    price: "60 грн/прим.",
  },
  {
    title: "English Construction 3 (with Kahoots!)",
    spec: "А5 · 200 стор. · біндер · обкладинка 250 крейда",
    price: "за запитом",
  },
  {
    title: "Василь Дутка · Графіка · Малярство · Скульптура",
    spec: "280 стор. 150 крейда, колір · тверда обкладинка · шиття",
    price: "1300 грн/прим.",
  },
];

export default function Portfolio() {
  return (
    <div className="px-5 py-4">
      {PORTFOLIO.map((item) => (
        <div key={item.title} className="mb-4">
          <div className="flex h-[220px] items-center justify-center rounded-2xl border border-line bg-paper p-3 text-center text-xs text-muted">
            [ hero photo + thumbnail strip ]
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <div>
              <div className="text-[15px] font-bold text-ink">{item.title}</div>
              <div className="text-[12.5px] text-muted">{item.spec}</div>
            </div>
            <div className="text-[13px] font-bold text-ink">{item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
