import { useMemo, useState } from "react";
import { TemplateCard } from "../components/TemplateCard.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { filters, templates } from "../data/templates.js";

function matchesFilter(template, filter) {
  if (filter === "Все") return true;
  return template.category === filter || template.tags.includes(filter);
}

export function Catalog() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const visibleTemplates = useMemo(
    () => templates.filter((template) => matchesFilter(template, activeFilter)),
    [activeFilter],
  );

  return (
    <section className="catalog-section" id="catalog">
      <div className="catalog-heading-row">
        <SectionHeading
          light
          title={
            <>
              Выберите
              <br />
              свой дизайн
            </>
          }
          text="Посмотрите приглашение именно так, как его увидят ваши гости на телефоне."
        />
      </div>

      <div className="filter-row" aria-label="Фильтры каталога">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={activeFilter === filter ? "is-active" : ""}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="template-grid">
        {visibleTemplates.map((template, index) => (
          <TemplateCard key={template.id} template={template} index={index} />
        ))}
      </div>
    </section>
  );
}
