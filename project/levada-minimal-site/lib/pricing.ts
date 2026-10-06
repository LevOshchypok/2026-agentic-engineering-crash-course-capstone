/**
 * Real Levada pricing formula for the calculator.
 *
 * Per-unit components (pages × rate, cover, binding) were supplied directly
 * by the business owner. Everything without a confirmed price (шиття and
 * пружина binding, any paper other than Офсет 80, any lamination/finish
 * other than Без) is marked "за запитом" rather than computed — see
 * `specs/levada-site/calculator/spec.md`.
 */

export type Edition = "Книга" | "Журнал";
export type Cover = "М'яка" | "Тверда";
export type Binding = "Біндер" | "Шиття" | "Пружина";
export type Paper = "Офсет 80" | "Офсет 100" | "Крейда 130";
export type ColorMode = "Ч/б" | "Колір";
export type Finish = "Без" | "Матова" | "Глянець" | "Фольга";

export interface CalculatorConfig {
  edition: Edition;
  qty: number;
  format: string;
  pages: number;
  cover: Cover;
  binding: Binding;
  paper: Paper;
  color: ColorMode;
  finish: Finish;
}

export const ON_REQUEST_LABEL = "за запитом";

export type PriceResult =
  | { priced: true; unit: number; total: number }
  | { priced: false; label: typeof ON_REQUEST_LABEL };

const PER_PAGE_RATE: Record<ColorMode, number> = {
  "Ч/б": 1,
  Колір: 3.5,
};

const COVER_COST: Record<Cover, number> = {
  "М'яка": 20,
  Тверда: 100,
};

// Only Біндер has a confirmed cost; Шиття/Пружина are "за запитом".
const PRICED_BINDING_COST: Partial<Record<Binding, number>> = {
  Біндер: 30,
};

const PRICED_PAPER: Paper = "Офсет 80";
const PRICED_FINISH: Finish = "Без";

const VOLUME_DISCOUNT_QTY_THRESHOLD = 100;
const VOLUME_DISCOUNT_RATE = 0.1;

export function computePrice(cfg: CalculatorConfig): PriceResult {
  const bindingCost = PRICED_BINDING_COST[cfg.binding];
  const isPriced =
    bindingCost !== undefined &&
    cfg.paper === PRICED_PAPER &&
    cfg.finish === PRICED_FINISH &&
    cfg.pages > 0 &&
    cfg.qty > 0;

  if (!isPriced) {
    return { priced: false, label: ON_REQUEST_LABEL };
  }

  const rawUnit = cfg.pages * PER_PAGE_RATE[cfg.color] + COVER_COST[cfg.cover] + bindingCost;
  const discountedUnit =
    cfg.qty > VOLUME_DISCOUNT_QTY_THRESHOLD ? rawUnit * (1 - VOLUME_DISCOUNT_RATE) : rawUnit;
  const unit = Math.round(discountedUnit);

  return { priced: true, unit, total: unit * cfg.qty };
}

export function formatUAH(n: number): string {
  return n.toLocaleString("uk-UA");
}

/** Summary of the calculator config + computed price, attached to a lead-capture submission. */
export function formatConfigSummary(cfg: CalculatorConfig, price: PriceResult): string {
  const priceText = price.priced
    ? `${formatUAH(price.unit)} грн/прим. × ${cfg.qty} прим. = ${formatUAH(price.total)} грн`
    : price.label;

  return [
    `Тип видання: ${cfg.edition}`,
    `Наклад: ${cfg.qty} прим.`,
    `Формат: ${cfg.format}`,
    `Сторінок: ${cfg.pages}`,
    `Обкладинка: ${cfg.cover}`,
    `Кріплення: ${cfg.binding}`,
    `Папір: ${cfg.paper}`,
    `Колірність: ${cfg.color}`,
    `Оздоблення: ${cfg.finish}`,
    `Ціна: ${priceText}`,
  ].join("\n");
}
