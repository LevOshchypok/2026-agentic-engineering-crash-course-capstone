"use client";

import { useMemo, useState } from "react";
import { computePrice, formatUAH } from "./pricing";

const EDITIONS = ["Книга", "Журнал"];
const COVERS = ["М'яка", "Тверда"];
const BINDINGS = ["Біндер", "Шиття", "Пружина"];
const PAPERS = ["Офсет 80", "Офсет 100", "Крейда 130"];
const COLORS = ["Ч/б", "Колір"];
const FINISHES = ["Без", "Матова", "Глянець", "Фольга"];

function ToggleRow({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={
            "min-w-[84px] flex-1 rounded-xl border px-2.5 py-3 text-center text-sm font-semibold " +
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

function FieldLabel({ children }) {
  return (
    <span className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-muted">
      {children}
    </span>
  );
}

/**
 * Porting reference — NOT wired into the app yet (no route renders this
 * component today). Mirrors the runnable prototype at docs/mockup/index.html
 * and the field list captured from the design brief (docs/PRD.md §6.2):
 * Тип видання, Наклад, Формат, Сторінок, Обкладинка, Кріплення, Папір,
 * Колірність, Ламінація/оздоблення.
 *
 * `onOrderCall(config, price)` should open the callback/lead flow — see
 * CallbackModal.jsx — with the selected configuration attached.
 */
export default function Calculator({ onOrderCall }) {
  const [cfg, setCfg] = useState({
    edition: "Книга",
    qty: 150,
    format: "a4",
    pages: 100,
    cover: "Тверда",
    binding: "Шиття",
    paper: "Офсет 80",
    color: "Ч/б",
    finish: "Без",
  });

  const price = useMemo(() => computePrice(cfg), [cfg]);
  const set = (key) => (val) => setCfg((c) => ({ ...c, [key]: val }));

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 px-5 pb-4 pt-1">
        <div className="mb-5">
          <FieldLabel>Тип видання</FieldLabel>
          <ToggleRow options={EDITIONS} value={cfg.edition} onChange={set("edition")} />
        </div>

        <div className="mb-5">
          <div className="mb-1.5 flex items-baseline justify-between">
            <FieldLabel>Наклад</FieldLabel>
            <span className="text-lg font-extrabold text-ink">
              {cfg.qty >= 500 ? "500+" : cfg.qty} прим.
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={500}
            value={Math.min(cfg.qty, 500)}
            onChange={(e) => set("qty")(Number(e.target.value))}
            className="w-full accent-brand"
          />
          <div className="mt-0.5 flex justify-between text-[11px] text-muted">
            <span>1</span>
            <span>500+</span>
          </div>
        </div>

        <div className="mb-5 flex gap-3">
          <div className="flex-1">
            <FieldLabel>Формат</FieldLabel>
            <select
              value={cfg.format}
              onChange={(e) => set("format")(e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-ink"
            >
              <option value="a4">A4</option>
              <option value="a5">A5</option>
              <option value="a6">A6</option>
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
      </div>

      <p className="px-5 pb-2.5 text-[11px] leading-snug text-muted">
        Ціна — орієнтовна ілюстрація для макета, не реальний прайс-лист Левади
        (див. pricing.js).
      </p>

      <div className="sticky bottom-0 border-t border-line bg-surface px-5 pb-5 pt-4">
        <div className="mb-1 text-[12.5px] text-muted">
          {price.unit} грн × {cfg.qty >= 500 ? "500+" : cfg.qty} прим.
        </div>
        <div className="mb-3 text-2xl font-extrabold text-ink">
          {formatUAH(price.total)} грн
        </div>
        <button
          className="w-full rounded-2xl bg-brand py-3.5 text-center text-sm font-bold text-white"
          onClick={() => onOrderCall?.(cfg, price)}
        >
          Замовити дзвінок
        </button>
      </div>
    </div>
  );
}
