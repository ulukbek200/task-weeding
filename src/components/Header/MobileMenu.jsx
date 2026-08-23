import { useEffect } from "react";

const mobileLinks = [
  { label: "Дизайны", href: "#catalog" },
  { label: "Как это работает", href: "#process" },
  { label: "Что входит", href: "#included" },
  { label: "FAQ", href: "#faq" },
];

export function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("mobile-menu-lock");

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("mobile-menu-lock");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" className={"mobile-drawer" + (open ? " is-open" : "")} aria-hidden={!open}>
      <button
        className="drawer-backdrop"
        type="button"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Закрыть меню"
      />

      <aside className="drawer-panel" role="dialog" aria-modal={open} aria-label="Мобильное меню">
        <div className="drawer-inner">
          <div className="drawer-top">
            <a className="brand-mark drawer-brand" href="/" onClick={onClose}>
              TOYLY
            </a>
            <button
              className="icon-button drawer-close-button"
              type="button"
              onClick={onClose}
              aria-label="Закрыть меню"
              title="Закрыть меню"
            >
              <span className="drawer-close-icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>

          <p className="drawer-label">PREMIUM DIGITAL INVITATIONS</p>

          <nav className="drawer-nav" aria-label="Навигация">
            {mobileLinks.map((link, index) => (
              <a
                className="drawer-nav-link"
                key={link.href}
                href={link.href}
                style={{ "--item-delay": (index * 55 + 110) + "ms" }}
                onClick={onClose}
              >
                <span className="drawer-nav-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="drawer-nav-title">{link.label}</span>
                <span className="drawer-nav-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </nav>

          <section className="drawer-featured" aria-label="Выбор дизайна">
            <p>
              Готовы выбрать
              <br />
              приглашение?
            </p>
            <span>PREMIUM · 2 800 СОМ</span>
            <a className="drawer-cta" href="#catalog" onClick={onClose}>
              <span>ВЫБРАТЬ ДИЗАЙН</span>
              <span aria-hidden="true">→</span>
            </a>
          </section>

          <div className="drawer-footer">
            <strong>TOYLY</strong>
            <span>Digital Invitations</span>
            <small>Бишкек · 2026</small>
          </div>
        </div>
      </aside>
    </div>
  );
}
