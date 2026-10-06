"use client";

import { useState } from "react";
import { submitLeadRequest } from "@/lib/lead-capture";
import { formatUAH, type CalculatorConfig, type PriceResult } from "@/lib/pricing";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

interface LeadCaptureModalProps {
  isOpen: boolean;
  calculatorConfig: CalculatorConfig | null;
  price: PriceResult | null;
  onClose: () => void;
}

export default function LeadCaptureModal({ isOpen, calculatorConfig, price, onClose }: LeadCaptureModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string }>({});

  // The parent remounts this component (via a changing `key`) each time it opens,
  // so state above always starts fresh — no reset effect needed.
  if (!isOpen) {
    return null;
  }

  const configLine =
    calculatorConfig && price
      ? `${calculatorConfig.edition}, ${calculatorConfig.cover.toLowerCase()}, ${calculatorConfig.binding.toLowerCase()}, ${calculatorConfig.format}, ${calculatorConfig.pages} с., ${calculatorConfig.qty} прим. — ${
          price.priced ? `${formatUAH(price.unit)} грн/прим.` : price.label
        }`
      : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const errors: { name?: string; phone?: string } = {};
    if (!trimmedName) {
      errors.name = "Вкажіть ім'я";
    }
    if (!trimmedPhone) {
      errors.phone = "Вкажіть телефон";
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setStatus("sending");
    submitLeadRequest({
      name: trimmedName,
      phone: trimmedPhone,
      note,
      calculatorConfig,
      price,
    }).then((result) => {
      if (result.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorMessage(result.message);
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45" onClick={onClose}>
      <div
        className="max-h-[88%] w-full max-w-md overflow-y-auto rounded-t-[22px] bg-surface px-5 pb-6 pt-[22px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1.5 flex justify-end">
          <button aria-label="Закрити" className="text-xl leading-none text-muted" onClick={onClose}>
            ×
          </button>
        </div>

        {status === "sent" ? (
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
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold text-ink">Замовити дзвінок</h3>
            <p className="mb-4 text-sm text-muted">
              Залиште контакт — передзвонимо і уточнимо всі деталі.
            </p>

            <label className="mb-1.5 mt-3.5 block text-xs font-bold text-ink" htmlFor="lead-name">
              Ім&apos;я
            </label>
            <input
              id="lead-name"
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-ink"
              placeholder="Ваше ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}

            <label className="mb-1.5 mt-3.5 block text-xs font-bold text-ink" htmlFor="lead-phone">
              Телефон
            </label>
            <input
              id="lead-phone"
              type="tel"
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-ink"
              placeholder="+380"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}

            <label className="mb-1.5 mt-3.5 block text-xs font-bold text-ink" htmlFor="lead-note">
              Коментар (необов&apos;язково)
            </label>
            <textarea
              id="lead-note"
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-3 text-sm text-ink"
              placeholder="Додаткові побажання"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {configLine && (
              <div className="mt-3.5 rounded-xl border border-line bg-paper px-3 py-2.5 text-xs leading-snug text-muted">
                Конфігурація з калькулятора буде додана до заявки:
                <br />
                {configLine}
              </div>
            )}

            {status === "error" && (
              <div className="mt-3.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-snug text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="mt-[18px]">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-2xl bg-brand py-3.5 font-bold text-white disabled:opacity-60"
              >
                {status === "sending" ? "Надсилаємо…" : "Надіслати заявку"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
