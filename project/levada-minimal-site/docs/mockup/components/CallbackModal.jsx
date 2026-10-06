"use client";

import { useState } from "react";
import { formatUAH } from "./pricing";

/**
 * Porting reference — NOT wired into the app yet.
 * Structure/behavior mirrors the runnable prototype at docs/mockup/index.html.
 * `onSubmit` is left for the real implementation to wire into the backend —
 * see docs/PRD.md §9 (recommendation: extend the `storefront-customer-requests`
 * capability rather than a new pipeline). This component only manages its own
 * open/closed + submitted UI state.
 */
export default function CallbackModal({ config, price, onClose, onSubmit }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const configLine = config
    ? `${config.edition}, ${config.cover.toLowerCase()}, ${config.binding.toLowerCase()}, ${config.format}, ${config.pages} с., ${config.qty} прим. — ${formatUAH(price.total)} грн`
    : null;

  function handleSubmit() {
    onSubmit?.({ name, phone, config, price });
    setSent(true);
  }

  return (
    <div className="absolute inset-0 z-10 flex items-end bg-black/45" onClick={onClose}>
      <div
        className="max-h-[88%] w-full overflow-y-auto rounded-t-[22px] bg-surface px-5 pb-6 pt-[22px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1.5 flex justify-end">
          <button aria-label="Закрити" className="text-xl leading-none text-muted" onClick={onClose}>
            ×
          </button>
        </div>

        {sent ? (
          <div className="px-1 pb-1.5 pt-5 text-center">
            <div className="mx-auto mb-3.5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-brand text-2xl text-white">
              ✓
            </div>
            <h3 className="text-lg font-bold text-ink">Дякуємо!</h3>
            <p className="mb-4 text-sm text-muted">
              Ми зателефонуємо найближчим часом, щоб підтвердити деталі й ціну.
            </p>
            <button
              className="w-full rounded-2xl border border-line bg-surface py-3.5 font-bold text-ink"
              onClick={onClose}
            >
              Закрити
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-ink">Замовити дзвінок</h3>
            <p className="mb-4 text-sm text-muted">
              Залиште контакт — передзвонимо і уточнимо всі деталі.
            </p>

            <label className="mb-1.5 mt-3.5 block text-xs font-bold text-ink">Ім'я</label>
            <input
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-ink"
              placeholder="Ваше ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="mb-1.5 mt-3.5 block text-xs font-bold text-ink">Телефон</label>
            <input
              type="tel"
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-ink"
              placeholder="+380"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {configLine && (
              <div className="mt-3.5 rounded-xl border border-line bg-paper px-3 py-2.5 text-xs leading-snug text-muted">
                Конфігурація з калькулятора буде додана до заявки:
                <br />
                {configLine}
              </div>
            )}

            <div className="mt-[18px]">
              <button
                className="w-full rounded-2xl bg-brand py-3.5 font-bold text-white"
                onClick={handleSubmit}
              >
                Надіслати заявку
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
