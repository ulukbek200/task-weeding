import { X } from "lucide-react";

const mobileLinks = [
  { label: "Дизайны", href: "#catalog" },
  { label: "Как это работает", href: "#process" },
  { label: "Что входит", href: "#included" },
  { label: "FAQ", href: "#faq" },
];

export function MobileMenu({ open, onClose }) {
  return (
    <div className={`mobile-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button
        className="drawer-backdrop"
        type="button"
        onClick={onClose}
        aria-label="Закрыть меню"
      />
      <aside className="drawer-panel" aria-label="Мобильное меню">
        <div className="drawer-top">
          <a className="brand-mark" href="/" onClick={onClose}>
            TOYLY
          </a>
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            title="Закрыть меню"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="drawer-nav">
          {mobileLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={onClose}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="button button-dark" href="#catalog" onClick={onClose}>
          Выбрать дизайн
        </a>
      </aside>
    </div>
  );
}
