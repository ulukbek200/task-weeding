import { useEffect } from "react";

const mobileLinks = [
  { label: "\u0414\u0438\u0437\u0430\u0439\u043d\u044b", href: "#catalog" },
  { label: "\u041a\u0430\u043a \u044d\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442", href: "#process" },
  { label: "\u0427\u0442\u043e \u0432\u0445\u043e\u0434\u0438\u0442", href: "#included" },
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
        aria-label="\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e"
      />

      <aside className="drawer-panel" role="dialog" aria-modal={open} aria-label="\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u043e\u0435 \u043c\u0435\u043d\u044e">
        <div className="drawer-ornament" aria-hidden="true">
          T
        </div>

        <div className="drawer-inner">
          <div className="drawer-top">
            <a className="brand-mark drawer-brand" href="/" onClick={onClose}>
              TOYLY
            </a>
            <button
              className="icon-button drawer-close-button"
              type="button"
              onClick={onClose}
              aria-label="\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e"
              title="\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e"
            >
              <span className="drawer-close-icon" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>

          <p className="drawer-label">PREMIUM DIGITAL INVITATIONS</p>

          <nav className="drawer-nav" aria-label="\u041d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f">
            {mobileLinks.map((link, index) => (
              <a
                className="drawer-nav-link"
                key={link.href}
                href={link.href}
                style={{ "--item-delay": (index * 60 + 120) + "ms" }}
                onClick={onClose}
              >
                <span className="drawer-nav-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="drawer-nav-title">{link.label}</span>
                <span className="drawer-nav-arrow" aria-hidden="true">\u2192</span>
              </a>
            ))}
          </nav>

          <div className="drawer-spacer" />

          <section className="drawer-featured" aria-label="\u0412\u044b\u0431\u043e\u0440 \u0434\u0438\u0437\u0430\u0439\u043d\u0430">
            <p>{"\u0413\u043e\u0442\u043e\u0432\u044b \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u0435?"}</p>
            <span>{"Premium \u00b7 2 800 \u0441\u043e\u043c"}</span>
            <a className="drawer-cta" href="#catalog" onClick={onClose}>
              <span>{"\u0412\u042b\u0411\u0420\u0410\u0422\u042c \u0414\u0418\u0417\u0410\u0419\u041d"}</span>
              <span aria-hidden="true">\u2192</span>
            </a>
          </section>

          <div className="drawer-footer">
            <strong>TOYLY</strong>
            <span>Digital Invitations</span>
            <small>{"\u0411\u0438\u0448\u043a\u0435\u043a \u00b7 2026"}</small>
          </div>
        </div>
      </aside>
    </div>
  );
}
