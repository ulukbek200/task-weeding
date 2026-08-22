import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getTemplateById, formatPrice, includedItems } from "../data/templates.js";
import { PhonePreview } from "../components/PhonePreview.jsx";

export function Preview({ templateId }) {
  const template = getTemplateById(templateId);

  return (
    <section className="preview-page">
      <header className="preview-header">
        <a className="back-link" href="/#catalog">
          <ArrowLeft size={18} />
          Все дизайны
        </a>
        <span>Premium · {formatPrice(template.price)} сом</span>
      </header>

      <div className="preview-layout">
        <aside className="preview-info">
          <p className="eyebrow">{template.category}</p>
          <h1>{template.name}</h1>
          <p>{template.subtitle}</p>
          <strong>{formatPrice(template.price)} сом</strong>
          <a className="button button-dark" href={`/order?template=${template.id}`}>
            Выбрать этот дизайн
            <ArrowRight size={18} />
          </a>
          <a
            className="button button-ghost mobile-direct-demo"
            href={template.demoUrl}
            target="_blank"
            rel="noreferrer"
          >
            Открыть demo
            <ExternalLink size={17} />
          </a>
        </aside>

        <div className="live-phone-wrap">
          <PhonePreview
            iframeSrc={template.demoUrl}
            alt={`${template.name} live demo`}
            className="live-phone"
          />
          <a
            className="fallback-link"
            href={template.demoUrl}
            target="_blank"
            rel="noreferrer"
          >
            Открыть demo в новой вкладке
            <ExternalLink size={16} />
          </a>
        </div>

        <aside className="preview-included">
          <p className="eyebrow">Входит</p>
          {includedItems.slice(0, 8).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </aside>
      </div>
    </section>
  );
}
