import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="final-cta" id="faq">
      <p className="eyebrow">TOY Digital Invitations</p>
      <h2>Выберите дизайн, который гости захотят открыть сразу.</h2>
      <a className="button button-dark" href="#catalog">
        Выбрать дизайн
        <ArrowRight size={18} />
      </a>
    </section>
  );
}
