/**
 * Illustrative pricing engine for the Levada calculator.
 *
 * NOT the real Levada price list. Only two flagship packages are confirmed
 * today (see docs/PRD.md §7 — soft cover 180/160 грн, hard cover 220/~200 грн).
 * Every other modifier below (paper, color, finish, binding, extra pages,
 * magazine surcharge) is a placeholder invented purely so the clickable
 * mockup has *something* to react to. Replace with the real formula (or a
 * call to the backend) before this logic goes anywhere near production —
 * see the corresponding open question in docs/PRD.md §11.
 *
 * @param {{
 *   edition: "Книга" | "Журнал",
 *   qty: number,
 *   pages: number,
 *   cover: "М'яка" | "Тверда",
 *   binding: "Біндер" | "Шиття" | "Пружина",
 *   paper: "Офсет 80" | "Офсет 100" | "Крейда 130",
 *   color: "Ч/б" | "Колір",
 *   finish: "Без" | "Матова" | "Глянець" | "Фольга",
 * }} cfg
 * @returns {{ unit: number, total: number }}
 */
export function computePrice(cfg) {
  const isHard = cfg.cover === "Тверда";
  const base = isHard
    ? cfg.qty > 100 ? 200 : 220 // hard cover 100+ price is unconfirmed, see PRD open question
    : cfg.qty > 100 ? 160 : 180; // soft cover: confirmed anchor prices

  let unit = base;
  if (cfg.edition === "Журнал") unit += 10;
  if (cfg.paper === "Офсет 100") unit += 5;
  if (cfg.paper === "Крейда 130") unit += 15;
  if (cfg.color === "Колір") unit += 40;
  if (cfg.binding === "Шиття") unit += 10;
  if (cfg.binding === "Пружина") unit += 6;
  if (cfg.finish === "Матова") unit += 8;
  if (cfg.finish === "Глянець") unit += 8;
  if (cfg.finish === "Фольга") unit += 25;

  const extraPages = Math.max(0, cfg.pages - 100);
  unit += extraPages * 0.5;
  unit = Math.round(unit);

  return { unit, total: unit * cfg.qty };
}

export function formatUAH(n) {
  return n.toLocaleString("uk-UA");
}
