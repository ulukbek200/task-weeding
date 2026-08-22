export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand-mark brand-mark-light" href="/">
          TOYLY
        </a>
        <p>Digital Invitations</p>
      </div>

      <nav aria-label="Разделы событий">
        <a href="#catalog">Свадьба</a>
        <a href="#catalog">Кыз узатуу</a>
        <a href="#catalog">Нике</a>
        <a href="#catalog">Той</a>
      </nav>

      <nav aria-label="Навигация">
        <a href="#catalog">Дизайны</a>
        <a href="#process">Как это работает</a>
        <a href="#included">Что входит</a>
      </nav>

      <div className="footer-cta">
        <a className="button button-light" href="#catalog">
          Выбрать дизайн
        </a>
        <span>TOYLY © 2026</span>
      </div>
    </footer>
  );
}
