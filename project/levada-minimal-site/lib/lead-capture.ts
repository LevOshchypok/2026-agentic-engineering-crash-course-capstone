import { config } from "./config";
import { formatConfigSummary, type CalculatorConfig, type PriceResult } from "./pricing";

export interface LeadSubmissionInput {
  name: string;
  phone: string;
  note: string;
  calculatorConfig: CalculatorConfig | null;
  price: PriceResult | null;
}

export type LeadSubmissionResult = { ok: true } | { ok: false; message: string };

const FALLBACK_REQUEST_TEXT = "Заявка з сайту Левада (без коментаря)";

export async function submitLeadRequest(input: LeadSubmissionInput): Promise<LeadSubmissionResult> {
  const categoryId = Number(config.levadaCategoryId);
  if (!config.levadaCategoryId || Number.isNaN(categoryId) || categoryId <= 0) {
    return {
      ok: false,
      message: "Заявки тимчасово недоступні: категорію сайту ще не налаштовано.",
    };
  }

  const noteText = input.note.trim();
  const parts: string[] = [];
  if (noteText) {
    parts.push(noteText);
  }
  if (input.calculatorConfig && input.price) {
    parts.push(formatConfigSummary(input.calculatorConfig, input.price));
  }
  const requestText = parts.length > 0 ? parts.join("\n\n") : FALLBACK_REQUEST_TEXT;

  const formData = new FormData();
  formData.append("categoryId", String(categoryId));
  formData.append("name", input.name.trim());
  formData.append("phone", input.phone.trim());
  formData.append("requestText", requestText);

  try {
    const response = await fetch(`${config.apiBaseUrl}/client/customer-request`, {
      method: "POST",
      body: formData,
    });

    let data: { isSuccess?: boolean; message?: string } | null = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (response.ok && data?.isSuccess) {
      return { ok: true };
    }

    return {
      ok: false,
      message: data?.message || "Не вдалося надіслати заявку. Спробуйте ще раз.",
    };
  } catch {
    return {
      ok: false,
      message: "Не вдалося надіслати заявку. Перевірте з'єднання і спробуйте ще раз.",
    };
  }
}
