"use client";

import { useMemo, useState } from "react";
import {
  computePrice,
  formatUAH,
  type CalculatorConfig,
  type Edition,
  type Cover,
  type Binding,
  type Paper,
  type ColorMode,
  type Finish,
} from "@/lib/pricing";
import { useLeadCapture } from "@/lib/lead-capture-context";

const EDITIONS: readonly Edition[] = ["Книга", "Журнал"];
const COVERS: readonly Cover[] = ["М'яка", "Тверда"];
const BINDINGS: readonly Binding[] = ["Біндер", "Шиття", "Пружина"];
const PAPERS: readonly Paper[] = ["Офсет 80", "Офсет 100", "Крейда 130"];
const COLORS: readonly ColorMode[] = ["Ч/б", "Колір"];
const FINISHES: readonly Finish[] = ["Без", "Матова", "Глянець", "Фольга"];
const FORMATS = ["a4", "a5", "a6"] as const;

const DEFAULT_CONFIG: CalculatorConfig = {
  edition: "Книга",
  qty: 150,
  format: "a4",
  pages: 100,
  cover: "М'яка",
  binding: "Біндер",
  paper: "Офсет 80",
  color: "Ч/б",
  finish: "Без",
};

const QTY_SLIDER_MAX = 500;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-muted">
      {children}
    </span>
  );
}

function ToggleRow<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (val: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={
            "min-w-[84px] flex-1 rounded-xl border px-2.5 py-3 text-center text-sm font-semibold transition-colors " +
            (value === opt
              ? "border-ink bg-ink text-white"
              : "border-line bg-surface text-ink")
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function CalculatorPage() {
  const [cfg, setCfg] = useState<CalculatorConfig>(DEFAULT_CONFIG);
  const { openLeadCapture } = useLeadCapture();

  const price = useMemo(() => computePrice(cfg), [cfg]);

  const set =
    <K extends keyof CalculatorConfig>(key: K) =>
    (val: CalculatorConfig[K]) =>
      setCfg((c) => ({ ...c, [key]: val }));

  const qtyDisplay = cfg.qty >= QTY_SLIDER_MAX ? "500+" : String(cfg.qty);

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto w-full max-w-2xl px-5 pb-48 pt-6">
        <div className="mb-6">
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-muted">
            Калькулятор
          </span>
          <h1 className="text-2xl font-extrabold text-ink">Розрахунок вартості друку</h1>
        </div>

        <div className="mb-5">
          <FieldLabel>Тип видання</FieldLabel>
          <ToggleRow options={EDITIONS} value={cfg.edition} onChange={set("edition")} />
        </div>

        <div className="mb-5">
          <div className="mb-1.5 flex items-baseline justify-between">
            <FieldLabel>Наклад</FieldLabel>
            <span className="text-lg font-extrabold text-ink">{qtyDisplay} прим.</span>
          </div>
          <input
            type="range"
            min={1}
            max={QTY_SLIDER_MAX}
            value={Math.min(cfg.qty, QTY_SLIDER_MAX)}
            onChange={(e) => set("qty")(Number(e.target.value))}
            className="w-full accent-brand"
            aria-label="Наклад (повзунок)"
          />
          <div className="mt-0.5 flex justify-between text-[11px] text-muted">
            <span>1</span>
            <span>500+</span>
          </div>
          <input
            type="number"
            min={1}
            value={cfg.qty}
            onChange={(e) => set("qty")(Math.max(0, Number(e.target.value) || 0))}
            className="mt-2 w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-ink"
            aria-label="Наклад (точна кількість)"
          />
        </div>

        <div className="mb-5 flex gap-3">
          <div className="flex-1">
            <FieldLabel>Формат</FieldLabel>
            <select
              value={cfg.format}
              onChange={(e) => set("format")(e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-ink"
            >
              {FORMATS.map((f) => (
                <option key={f} value={f}>
                  {f.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <FieldLabel>Сторінок</FieldLabel>
            <input
              type="number"
              min={1}
              value={cfg.pages}
              onChange={(e) => set("pages")(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-ink"
            />
          </div>
        </div>

        <div className="mb-5">
          <FieldLabel>Обкладинка</FieldLabel>
          <ToggleRow options={COVERS} value={cfg.cover} onChange={set("cover")} />
        </div>

        <div className="mb-5">
          <FieldLabel>Кріплення</FieldLabel>
          <ToggleRow options={BINDINGS} value={cfg.binding} onChange={set("binding")} />
        </div>

        <div className="mb-5">
          <FieldLabel>Папір</FieldLabel>
          <ToggleRow options={PAPERS} value={cfg.paper} onChange={set("paper")} />
        </div>

        <div className="mb-5">
          <FieldLabel>Колірність</FieldLabel>
          <ToggleRow options={COLORS} value={cfg.color} onChange={set("color")} />
        </div>

        <div className="mb-5">
          <FieldLabel>Ламінація / оздоблення</FieldLabel>
          <ToggleRow options={FINISHES} value={cfg.finish} onChange={set("finish")} />
        </div>

        <p className="text-[11px] leading-snug text-muted">
          Деякі поєднання (шиття/пружина, папір і оздоблення, відмінні від базових) ще не мають
          фіксованої ціни — для них ми покажемо «за запитом» і уточнимо вартість дзвінком.
        </p>
      </div>

      {/* Price bar pinned to the viewport (not a scroll container), so it stays visible
          regardless of page scroll position — see calculator spec's sticky-bar requirement. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface">
        <div className="mx-auto w-full max-w-2xl px-5 pb-5 pt-4">
          {price.priced ? (
            <>
              <div className="mb-1 text-[12.5px] text-muted">
                {formatUAH(price.unit)} грн × {qtyDisplay} прим.
              </div>
              <div className="mb-3 text-2xl font-extrabold text-ink">
                {formatUAH(price.total)} грн
              </div>
            </>
          ) : (
            <div className="mb-3 text-2xl font-extrabold text-ink">{price.label}</div>
          )}
          <button
            type="button"
            onClick={() => openLeadCapture(cfg, price)}
            className="w-full rounded-2xl bg-brand py-3.5 text-center text-sm font-bold text-white"
          >
            Замовити дзвінок
          </button>
        </div>
      </div>
    </div>
  );
}
