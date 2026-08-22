import { Check } from "lucide-react";
import { includedItems } from "../data/templates.js";
import { SectionHeading } from "../components/SectionHeading.jsx";

export function Included() {
  return (
    <section className="included-section" id="included">
      <div className="included-layout">
        <SectionHeading
          eyebrow="Один продукт"
          title={
            <>
              Всё уже
              <br />
              включено
            </>
          }
          text="Без тарифов и доплат за базовые функции. Вы выбираете дизайн, а мы собираем персональное приглашение под событие."
        />

        <div className="included-list">
          {includedItems.map((item) => (
            <div key={item}>
              <Check size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="price-block">
          <span>2 800</span>
          <small>сом</small>
        </div>
      </div>
    </section>
  );
}
