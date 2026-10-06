"use client";

import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { useLeadCapture } from "@/lib/lead-capture-context";

const WHAT_WE_PRINT = [
  {
    title: "Книги",
    desc: "Тверда й м'яка обкладинка. Біндер, шиття, пружина. Будь-який формат.",
    from: "від 160 грн / прим.",
  },
  {
    title: "Журнали",
    desc: "A4, м'яка або тверда обкладинка, 100 сторінок і більше.",
    from: "від 180 грн / прим.",
  },
  {
    title: "ISBN",
    desc: "Оформлення ISBN.",
    from: "за запитом",
  },
  {
    title: "Малий наклад і друк на вимогу",
    desc: "Від одного примірника — для авторів і навчальних матеріалів.",
    from: "мін. наклад 1",
  },
];

export default function Home() {
  const { openLeadCapture } = useLeadCapture();

  return (
    <div>
      <div className="px-5 pb-7 pt-1">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted">
            Друкарня · від 1 примірника
          </div>

          <h1 className="mb-3 text-[34px] font-extrabold leading-[1.08] tracking-tight text-ink">
            Друкуємо книги та журнали
          </h1>
          <p className="mb-5 text-[15px] leading-relaxed text-muted">
            Тверді й м&apos;які обкладинки, біндер, шиття, пружина. Будь-який формат.
          </p>

          <button
            onClick={() => openLeadCapture()}
            className="mb-2.5 w-full rounded-2xl bg-brand py-[15px] text-sm font-bold text-white"
          >
            Замовити дзвінок
          </button>
          <Link
            href="/calculator"
            className="flex w-full items-center justify-center rounded-2xl border border-line bg-surface py-[15px] text-sm font-bold text-ink"
          >
            Розрахувати вартість
          </Link>
        </div>
      </div>

      <div className="border-y border-line px-5 py-5">
        <div className="mx-auto flex w-full max-w-2xl gap-4.5">
          
          <Stat num="1" label="мін. наклад" />
          <Stat num="від 100 грн/прим." label="стартова ціна" />
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-2 flex items-baseline justify-between">
            <h3 className="text-lg font-bold text-ink">Ціни</h3>
            <span className="text-[11px] font-bold uppercase tracking-wide text-muted">
              за примірник
            </span>
          </div>
          <PriceRow
            name="М'яка обкладинка, а4, біндер, 100 сторінок"
            oldPrice={180}
            newPrice={160}
          />
          <PriceRow
            name="Тверда обкладинка, а4, шиття, 100 сторінок"
            oldPrice={220}
            newPrice={200}
          />
          <PriceRow name="Індивідуальні навчальні матеріали" single="за запитом" />
        </div>
      </div>

      <div className="px-5 py-6">
        <div className="mx-auto w-full max-w-2xl">
          <h3 className="mb-3 text-lg font-bold text-ink">Що друкуємо</h3>
          <div className="flex flex-col gap-3">
            {WHAT_WE_PRINT.map((item) => (
              <ServiceCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-dark px-5 py-6.5 text-dark-foreground">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-white/60">
            Відгук
          </div>
          <p className="mb-3.5 text-lg font-semibold leading-snug">
            «Наклад 120 книг у твердій — зробили за тиждень, шиття рівне, колір на обкладинці саме
            той.»
          </p>
          <div className="text-[12.5px] text-white/60">
            — ім&apos;я клієнта, видавництво (заглушка)
          </div>
        </div>
      </div>

      <div className="bg-surface px-5 py-5">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3">
          <span className="text-[13.5px] text-muted">Надішліть макет — порахуємо сьогодні</span>
          <button
            onClick={() => openLeadCapture()}
            className="rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-white"
          >
            Дзвінок
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex-1">
      <div className="text-[20px] font-extrabold leading-tight text-ink">{num}</div>
      <div className="mt-1.5 text-xs leading-snug text-muted">{label}</div>
    </div>
  );
}

function PriceRow({
  name,
  oldPrice,
  newPrice,
  single,
}: {
  name: string;
  oldPrice?: number;
  newPrice?: number;
  single?: string;
}) {
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
