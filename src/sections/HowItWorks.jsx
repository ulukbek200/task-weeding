const steps = [
  {
    title: "Выберите дизайн",
    details: "Откройте live demo и сравните стиль на реальном телефоне.",
  },
  {
    title: "Отправьте данные",
    details: "Имена, дата, ресторан, фото, музыка и пожелания по языку.",
  },
  {
    title: "Мы подготовим приглашение",
    details: "Адаптируем выбранный premium шаблон под ваше событие.",
  },
  {
    title: "Получите ссылку и QR",
    details: "Готовое приглашение удобно отправлять в WhatsApp и Instagram.",
  },
];

export function HowItWorks() {
  return (
    <section className="process-section" id="process">
      <div className="process-title">
        <p className="eyebrow">Процесс</p>
        <h2>
          Как это
          <br />
          работает
        </h2>
      </div>

      <div className="process-steps">
        {steps.map((step, index) => (
          <article key={step.title} className="process-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.details}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
