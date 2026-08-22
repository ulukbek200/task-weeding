import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu.jsx";

const navItems = [
  { label: "Дизайны", href: "#catalog" },
  { label: "Как это работает", href: "#process" },
  { label: "Что входит", href: "#included" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <a className="brand-mark" href="/" aria-label="TOY на главную">
        TOY
      </a>

      <nav className="desktop-nav" aria-label="Основная навигация">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <span>2 800 сом</span>
        <a className="button button-dark button-small" href="#catalog">
          Выбрать дизайн
        </a>
      </div>

      <button
        className="icon-button mobile-menu-button"
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Открыть меню"
        title="Открыть меню"
      >
        <Menu size={22} />
      </button>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
