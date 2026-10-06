import { describe, expect, it } from "vitest";
import { computePrice, type CalculatorConfig } from "./pricing";

const baseConfig: CalculatorConfig = {
  edition: "Книга",
  qty: 50,
  format: "a4",
  pages: 100,
  cover: "М'яка",
  binding: "Біндер",
  paper: "Офсет 80",
  color: "Ч/б",
  finish: "Без",
};

describe("computePrice", () => {
  it("computes the confirmed soft-cover/binder anchor for <=100 copies", () => {
    const result = computePrice(baseConfig);
    expect(result.priced).toBe(true);
    if (result.priced) {
      // 100 pages * 1 UAH + 20 (soft cover) + 30 (біндер) = 150
      expect(result.unit).toBe(150);
      expect(result.total).toBe(150 * baseConfig.qty);
    }
  });

  it("computes the confirmed hard-cover/binder anchor for <=100 copies", () => {
    const result = computePrice({ ...baseConfig, cover: "Тверда" });
    expect(result.priced).toBe(true);
    if (result.priced) {
      // 100 pages * 1 UAH + 100 (hard cover) + 30 (біндер) = 230
      expect(result.unit).toBe(230);
    }
  });

  it("applies the ~10% volume discount when quantity exceeds 100 copies", () => {
    const result = computePrice({ ...baseConfig, qty: 150 });
    expect(result.priced).toBe(true);
    if (result.priced) {
      // 150 raw unit * 0.9 = 135
      expect(result.unit).toBe(135);
      expect(result.total).toBe(135 * 150);
    }
  });

  it("does not apply the discount at exactly 100 copies", () => {
    const result = computePrice({ ...baseConfig, qty: 100 });
    expect(result.priced).toBe(true);
    if (result.priced) {
      expect(result.unit).toBe(150);
    }
  });

  it.each([
    ["шиття binding", { binding: "Шиття" as const }],
    ["пружина binding", { binding: "Пружина" as const }],
    ["офсет 100 paper", { paper: "Офсет 100" as const }],
    ["крейда 130 paper", { paper: "Крейда 130" as const }],
    ["матова finish", { finish: "Матова" as const }],
    ["глянець finish", { finish: "Глянець" as const }],
    ["фольга finish", { finish: "Фольга" as const }],
  ])("returns за запитом for %s", (_label, override) => {
    const result = computePrice({ ...baseConfig, ...override });
    expect(result.priced).toBe(false);
    if (!result.priced) {
      expect(result.label).toBe("за запитом");
    }
  });

  it("does not silently price a hard-cover job with шиття binding", () => {
    // шиття has no confirmed cost even for the historically "flagship" hard-cover combo.
    const result = computePrice({ ...baseConfig, cover: "Тверда", binding: "Шиття", qty: 150 });
    expect(result.priced).toBe(false);
  });

  it("colors the per-page rate for color print jobs", () => {
    const result = computePrice({ ...baseConfig, color: "Колір" });
    expect(result.priced).toBe(true);
    if (result.priced) {
      // 100 pages * 3.5 UAH + 20 + 30 = 400
      expect(result.unit).toBe(400);
    }
  });
});
