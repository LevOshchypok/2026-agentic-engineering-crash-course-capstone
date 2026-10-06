"use client";

import { useLeadCapture } from "@/lib/lead-capture-context";
import PortfolioItemCard, { type PortfolioPhoto } from "@/components/PortfolioItemCard";

interface PortfolioItem {
  slug: string;
  title: string;
  spec: string;
  price: string;
  photos: PortfolioPhoto[];
}

/**
 * Real client-job photography (see openspec/changes/add-portfolio-photography).
 * Client identity is intentionally not named in the copy for medicover-journal —
 * the printed logo visible in the photos is the product as delivered, not a
 * named endorsement in our own copy.
 */
const PORTFOLIO: PortfolioItem[] = [
  {
    slug: "jeanne-darc",
    title: "Жанна д'Арк на кострищі / Жанна д'Арк",
    spec: "А5 · 185 стор. · м'яка обкладинка · біндер",
    price: "180 грн/прим.",
    photos: [
      {
        src: "/portfolio/jeanne-darc/cover-front.jpg",
        width: 1024,
        height: 1280,
        alt: "Обкладинка книги «Жанна д'Арк на кострищі / Жанна д'Арк»",
      },
      {
        src: "/portfolio/jeanne-darc/stack-flatlay.jpg",
        width: 1024,
        height: 1280,
        alt: "Кілька примірників книги «Жанна д'Арк» на столі",
      },
      {
        src: "/portfolio/jeanne-darc/cover-angled.jpg",
        width: 1024,
        height: 1280,
        alt: "Книга «Жанна д'Арк» під кутом на тлі квітів",
      },
      {
        src: "/portfolio/jeanne-darc/spread-author-bio.jpg",
        width: 1024,
        height: 1280,
        alt: "Розворот книги зі світлиною та біографією автора",
      },
      {
        src: "/portfolio/jeanne-darc/spread-decorative.jpg",
        width: 1024,
        height: 1280,
        alt: "Розворот книги з декоративною ілюстрацією",
      },
    ],
  },
  {
    slug: "medicover-journal",
    title: "Обмінна карта · Щоденник вагітності",
    spec: "А5 · скоби · 150 крейда + 80 офсет (Pantone) · обкладинка 300 крейда",
    price: "60 грн/прим.",
    photos: [
      {
        src: "/portfolio/medicover-journal/cover-stack-lifestyle.jpg",
        width: 720,
        height: 1280,
        alt: "Стос надрукованих зошитів «Обмінна карта. Щоденник вагітності»",
      },
      {
        src: "/portfolio/medicover-journal/collage-details-1.jpg",
        width: 1024,
        height: 1280,
        alt: "Обкладинка, розворот і стос примірників «Обмінна карта»",
      },
      {
        src: "/portfolio/medicover-journal/collage-details-2.jpg",
        width: 853,
        height: 1280,
        alt: "Деталі друку та пакування тиражу «Обмінна карта»",
      },
    ],
  },
  {
    slug: "english-construction",
    title: "English Construction 3 (with Kahoots!)",
    spec: "А5 · 200 стор. · біндер · обкладинка 250 крейда",
    price: "за запитом",
    photos: [
      {
        src: "/portfolio/english-construction/cover-closeup.jpg",
        width: 960,
        height: 1280,
        alt: "Обкладинка підручника «English Construction 3» зблизька",
      },
      {
        src: "/portfolio/english-construction/stack-with-plant.jpg",
        width: 960,
        height: 1280,
        alt: "Стос і віяло примірників «English Construction 3»",
      },
      {
        src: "/portfolio/english-construction/two-stacks.jpg",
        width: 960,
        height: 1280,
        alt: "Два стоси надрукованих підручників «English Construction 3»",
      },
      {
        src: "/portfolio/english-construction/production-floor.jpg",
        width: 1280,
        height: 960,
        alt: "Тираж «English Construction 3» на виробництві",
      },
    ],
  },
  {
    slug: "vasyl-dutka-album",
    title: "Василь Дутка · Графіка · Малярство · Скульптура",
    spec: "280 стор. 150 крейда, колір · тверда обкладинка · шиття",
    price: "1300 грн/прим.",
    photos: [
      {
        src: "/portfolio/vasyl-dutka-album/cover-front.jpg",
        width: 1280,
        height: 960,
        alt: "Тверда обкладинка альбому «Василь Дутка»",
      },
      {
        src: "/portfolio/vasyl-dutka-album/spread-still-life.jpg",
        width: 1280,
        height: 960,
        alt: "Розворот альбому з натюрмортами",
      },
      {
        src: "/portfolio/vasyl-dutka-album/spread-hutsul-landscapes.jpg",
        width: 1280,
        height: 960,
        alt: "Розворот альбому з краєвидами Гуцульщини",
      },
      {
        src: "/portfolio/vasyl-dutka-album/spread-landscapes.jpg",
        width: 1280,
        height: 960,
        alt: "Розворот альбому з пейзажами",
      },
    ],
  },
];

export default function PortfolioPage() {
  const { openLeadCapture } = useLeadCapture();

  return (
    <div>
      <div className="px-5 pb-2 pt-1">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted">
            Портфоліо
          </div>
          <h1 className="mb-1 text-2xl font-extrabold leading-tight text-ink">
            Приклади робіт
          </h1>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="mx-auto w-full max-w-2xl">
          {PORTFOLIO.map((item) => (
            <PortfolioItemCard
              key={item.slug}
              title={item.title}
              spec={item.spec}
              price={item.price}
              photos={item.photos}
            />
          ))}
        </div>
      </div>

      <div className="bg-surface px-5 py-5">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3">
          <span className="text-[13.5px] text-muted">
            Хочете такий самий наклад? Розкажіть, що потрібно.
          </span>
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
