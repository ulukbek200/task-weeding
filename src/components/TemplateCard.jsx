import { ArrowRight, Eye } from "lucide-react";
import { formatPrice } from "../data/templates.js";
import { PhonePreview } from "./PhonePreview.jsx";

export function TemplateCard({ template, index }) {
  const previewHref = `/preview/${template.id}`;
  const orderHref = `/order?template=${template.id}`;

  const openPreview = (event) => {
    if (window.matchMedia("(max-width: 760px)").matches) {
      event.preventDefault();
      window.open(template.demoUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      className="template-card"
      style={{
        "--card-surface": template.surface,
        "--card-accent": template.accent,
      }}
    >
      <div className="template-card-top">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{template.category}</span>
      </div>

      <div className="template-visual">
        <PhonePreview
          src={template.previewImage}
          alt={`${template.name} preview`}
          className="template-phone"
        />
      </div>

      <div className="template-card-bottom">
        <div>
          <h3>{template.name}</h3>
          <p>{template.subtitle}</p>
        </div>
        <strong>{formatPrice(template.price)} сом</strong>
      </div>

      <div className="template-tags" aria-label="Теги">
        {template.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="template-actions">
        <a className="button button-ghost" href={previewHref} onClick={openPreview}>
          <Eye size={17} />
          Просмотреть
        </a>
        <a className="button button-dark" href={orderHref}>
          Выбрать дизайн
          <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}
