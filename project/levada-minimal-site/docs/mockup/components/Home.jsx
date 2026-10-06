"use client";

import { useState } from "react";
import ServiceCard from "./ServiceCard";

const WHAT_WE_PRINT = [
  { title: "Книги", desc: "Тверда й м'яка обкладинка. Біндер, шиття, пружина. Будь-який формат.", from: "від 160 грн / прим." },
  { title: "Журнали", desc: "A4, м'яка або тверда обкладинка, 100 сторінок і більше.", from: "від 180 грн / прим." },
  { title: "ISBN і розповсюдження", desc: "Оформлення ISBN, підготовка до продажу.", from: "за запитом" },
  { title: "Малий наклад і друк на вимогу", desc: "Від одного примірника — для авторів і навчальних матеріалів.", from: "мін. наклад 1" },
];

/**
 * Porting reference — NOT wired into the app yet.
 * Includes both explored hero directions (see docs/design-system.md §2 note
 * on §5, and docs/PRD.md §6.1) behind a switcher, so the two can be compared
 * side by side before picking one for the real homepage (open question #1).
 * `onOrderCall` / `onOpenCalculator` should be wired to the callback flow and
 * the calculator route respectively.
 */
export default function Home({ onOrderCall, onOpenCalculator }) {
  const [variant, setVariant] = useState("A");
  const dark = variant === "B";

  return (
    <div>
      <div className={dark ? "bg-dark text-dark-foreground" : ""}>
        <div className="px-5 pb-7 pt-1">
          <div className="mb-4.5 inline-flex rounded-full border border-line bg-surface p-[3px]">
            <button
              onClick={() => setVariant("A")}
              className={
                "rounded-full px-3.5 py-1.5 text-xs font-bold " +
                (variant === "A" ? "bg-ink text-white" : "text-muted")
              }
            >
              Варіант А
            </button>
            <button
              onClick={() => setVariant("B")}
              className={
                "rounded-full px-3.5 py-1.5 text-xs font-bold " +
                (variant === "B" ? "bg-ink text-white" : "text-muted")
              }
            >
              Варіант Б
            </button>
          </div>

          {variant === "A" && (
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted">
              Друкарня · від 1 примірника
            </div>
          )}

          <h1 className="mb-3 text-[34px] font-extrabold leading-[1.08] tracking-tight">
            Друкуємо книги та журнали
          </h1>
          <p className={"mb-5 text-[15px] leading-relaxed " + (dark ? "text-white/75" : "text-muted")}>
            Тверді й м'які обкладинки, біндер, шиття, пружина. Будь-який формат.
          </p>

          {dark && (
            <div className="mb-5 h-[220px] rounded-2xl border border-white/15 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_10px,rgba(255,255,255,0.02)_10px_20px)]" />
          )}

          <button
            onClick={() => onOrderCall?.()}
            className={
              "mb-2.5 w-full rounded-2xl py-[15px] text-sm font-bold " +
              (dark ? "bg-white text-ink" : "bg-brand text-white")
            }
          >
            Замовити дзвінок
          </button>
          <button
            onClick={onOpenCalculator}
            className={
              "w-full rounded-2xl border py-[15px] text-sm font-bold " +
              (dark ? "border-white/35 bg-dark text-white" : "border-line bg-surface text-ink")
            }
          >
            Розрахувати вартість
          </button>
        </div>

        {variant === "A" && (
          <>
            <div className="flex gap-4.5 border-y border-line px-5 py-5">
              <Stat num="18" label="років досвіду" />
              <Stat num="1" label="мін. наклад" />
              <Stat num="5" label="днів на тираж" />
            </div>

            <div className="px-5 py-5">
              <div className="mb-2 flex items-baseline justify-between">
                <h3 className="text-lg font-bold text-ink">Ціни</h3>
                <span className="text-[11px] font-bold uppercase tracking-wide text-muted">за примірник</span>
              </div>
              <PriceRow name="М'яка обкладинка, а4, біндер, 100 сторінок" oldPrice={180} newPrice={160} />
              <PriceRow name="Тверда обкладинка, а4, шиття, 100 сторінок" oldPrice={220} newPrice={200} />
              <PriceRow name="Індивідуальні навчальні матеріали" single="за запитом" />
            </div>
          </>
        )}
      </div>

      <div className="px-5 py-6">
        <h3 className="mb-3 text-lg font-bold text-ink">Що друкуємо</h3>
        <div className="flex flex-col gap-3">
          {WHAT_WE_PRINT.map((item) => (
            <ServiceCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className="bg-dark px-5 py-6.5 text-dark-foreground">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-white/60">Відгук</div>
        <p className="mb-3.5 text-lg font-semibold leading-snug">
          «Наклад 120 книг у твердій — зробили за тиждень, шиття рівне, колір на обкладинці саме той.»
        </p>
        <div className="text-[12.5px] text-white/60">— ім'я клієнта, видавництво (заглушка)</div>
      </div>

      <div className="flex items-center justify-between gap-3 bg-surface px-5 py-5">
        <span className="text-[13.5px] text-muted">Надішліть макет — порахуємо сьогодні</span>
        <button
          onClick={() => onOrderCall?.()}
          className="rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-white"
        >
          Дзвінок
        </button>
      </div>
    </div>
  );
}

function Stat({ num, label }) {
  return (
    <div className="flex-1">
      <div className="text-[26px] font-extrabold leading-none text-ink">{num}</div>
      <div className="mt-1.5 text-xs leading-snug text-muted">{label}</div>
    </div>
  );
}

function PriceRow({ name, oldPrice, newPrice, single }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line py-3.5">
      <div className="text-sm text-ink">{name}</div>
      {single ? (
        <div className="text-[15px] font-extrabold text-ink">{single}</div>
      ) : (
        <div className="whitespace-nowrap text-right">
          <span className="mr-2 text-[13px] text-muted line-through">{oldPrice} грн</span>
          <span className="text-[15px] font-extrabold text-brand">{newPrice} грн</span>
        </div>
      )}
    </div>
  );
}
