"use client";

import { useState } from "react";
import Image from "next/image";

export interface PortfolioPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface PortfolioItemCardProps {
  title: string;
  spec: string;
  price: string;
  photos: PortfolioPhoto[];
}

export default function PortfolioItemCard({ title, spec, price, photos }: PortfolioItemCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hero = photos[selectedIndex];

  return (
    <div className="mb-4">
      <div className="overflow-hidden rounded-2xl border border-line bg-paper">
        <div className="relative h-[380px] w-full">
          <Image
            key={hero.src}
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="(min-width: 672px) 672px, 100vw"
            className="object-contain"
            priority={false}
          />
        </div>
        {photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-line bg-surface p-2">
            {photos.map((photo, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={photo.alt}
                  aria-pressed={isSelected}
                  className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                    isSelected ? "border-brand" : "border-transparent"
                  }`}
                >
                  <Image src={photo.src} alt="" fill sizes="56px" className="object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-2.5 flex items-baseline justify-between">
        <div>
          <div className="text-[15px] font-bold text-ink">{title}</div>
          <div className="text-[12.5px] text-muted">{spec}</div>
        </div>
        <div className="text-[13px] font-bold text-ink">{price}</div>
      </div>
    </div>
  );
}
