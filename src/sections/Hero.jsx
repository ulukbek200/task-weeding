import { ArrowDown, ArrowRight } from "lucide-react";
import { templates } from "../data/templates.js";
import { PhonePreview } from "../components/PhonePreview.jsx";

const heroTemplates = [templates[1], templates[0], templates[4]];

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Premium Digital Invitations</p>
        <h1>
          Приглашение,
          <br />
          которое
          <br />
          хочется
          <br />
          <span>открыть</span>
        </h1>
        <p className="hero-subtitle">
          Персональные сайты-приглашения для свадьбы, кыз узатуу и других
          особенных событий.
        </p>
        <p className="hero-price">Premium · 2 800 сом</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#catalog">
            Выбрать дизайн
            <ArrowRight size={18} />
          </a>
          <a className="text-link" href="#catalog">
            Посмотреть примеры
            <ArrowDown size={17} />
          </a>
        </div>
      </div>

      <div className="hero-visual" aria-label="Превью шаблонов toyly.kg">
        {heroTemplates.map((template, index) => (
          <PhonePreview
            key={template.id}
            src={template.previewImage}
            alt={`${template.name} preview`}
            className={`hero-phone hero-phone-${index + 1}`}
            priority={index === 1}
          />
        ))}
      </div>

      <div className="proof-strip" aria-label="Возможности">
        <p>Свадьба · Кыз узатуу · Нике · Той · Юбилей</p>
        <p>Адаптировано для телефона · Музыка · RSVP · Карта · QR</p>
      </div>
    </section>
  );
}
