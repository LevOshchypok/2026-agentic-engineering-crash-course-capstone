const PHONE_NUMBER = "+380630681215";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface px-5 py-6 text-[13px] text-muted">
      <div className="mx-auto flex max-w-2xl flex-col gap-3">
        <div className="text-sm font-bold text-ink">ЛЕВАДА</div>

        <a href={`tel:${PHONE_NUMBER}`} className="text-ink">
          {PHONE_NUMBER}
        </a>

        {/* Placeholder slots — fill in once the business supplies final values. */}
        <div className="flex flex-col gap-1 text-muted">
          <span>Email: незабаром</span>
          <span>Telegram / Instagram / Facebook: незабаром</span>
        </div>

        <div className="text-xs text-muted/80">© {new Date().getFullYear()} Левада</div>
      </div>
    </footer>
  );
}
