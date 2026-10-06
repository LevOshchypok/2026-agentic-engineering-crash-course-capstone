"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Головна" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/portfolio", label: "Роботи" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-surface px-5 py-3">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
        <Link href="/" className="text-sm font-bold tracking-wide text-ink">
          ЛЕВАДА
        </Link>
        <nav className="flex gap-4 text-[13px] font-semibold">
          {LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={isActive ? "text-ink" : "text-muted"}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
