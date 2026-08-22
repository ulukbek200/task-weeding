import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { getTemplateById, formatPrice } from "../data/templates.js";

const initialForm = {
  customerName: "",
  phone: "",
  eventType: "Свадьба",
  names: "",
  date: "",
  time: "",
  restaurant: "",
  address: "",
  language: "KG + RU",
  photos: "",
  music: "",
  comment: "",
};

export function Order({ templateId }) {
  const template = getTemplateById(templateId);
  const [form, setForm] = useState(initialForm);

  const updateField = (event) => {
    const { name, value, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: files ? Array.from(files).map((file) => file.name).join(", ") : value,
    }));
  };

  const submitOrder = (event) => {
    event.preventDefault();
    const message = [
      "Здравствуйте!",
      "Хочу заказать приглашение TOY.",
      "",
      `Дизайн: ${template.name}`,
      `Цена: ${formatPrice(template.price)} сом`,
      `Заказчик: ${form.customerName}`,
      `WhatsApp / телефон: ${form.phone}`,
      `Мероприятие: ${form.eventType}`,
      `Имена: ${form.names}`,
      `Дата: ${form.date}`,
      `Время: ${form.time}`,
      `Ресторан: ${form.restaurant}`,
      `Адрес: ${form.address}`,
      `Язык: ${form.language}`,
      `Фотографии: ${form.photos || "отправлю отдельно"}`,
      `Музыка: ${form.music || "обсудим"}`,
      `Комментарий: ${form.comment || "-"}`,
    ].join("\n");

    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="order-page">
      <header className="order-header">
        <a className="back-link" href="/#catalog">
          <ArrowLeft size={18} />
          Все дизайны
        </a>
      </header>

      <div className="order-layout">
        <aside className="selected-template">
          <p className="eyebrow">Вы выбрали</p>
          <img src={template.previewImage} alt={`${template.name} preview`} />
          <h1>{template.name}</h1>
          <p>{template.subtitle}</p>
          <strong>{formatPrice(template.price)} сом</strong>
        </aside>

        <form className="order-form" onSubmit={submitOrder}>
          <label>
            Имя заказчика
            <input
              required
              name="customerName"
              value={form.customerName}
              onChange={updateField}
              autoComplete="name"
            />
          </label>

          <label>
            WhatsApp / телефон
            <input
              required
              name="phone"
              value={form.phone}
              onChange={updateField}
              inputMode="tel"
              autoComplete="tel"
            />
          </label>

          <label>
            Тип мероприятия
            <input
              required
              name="eventType"
              value={form.eventType}
              onChange={updateField}
            />
          </label>

          <label>
            Имена
            <input required name="names" value={form.names} onChange={updateField} />
          </label>

          <div className="form-row">
            <label>
              Дата
              <input required type="date" name="date" value={form.date} onChange={updateField} />
            </label>
            <label>
              Время
              <input type="time" name="time" value={form.time} onChange={updateField} />
            </label>
          </div>

          <label>
            Ресторан
            <input name="restaurant" value={form.restaurant} onChange={updateField} />
          </label>

          <label>
            Адрес
            <input name="address" value={form.address} onChange={updateField} />
          </label>

          <fieldset>
            <legend>Язык</legend>
            {["KG", "RU", "KG + RU"].map((language) => (
              <label key={language}>
                <input
                  type="radio"
                  name="language"
                  value={language}
                  checked={form.language === language}
                  onChange={updateField}
                />
                <span>{language}</span>
              </label>
            ))}
          </fieldset>

          <label>
            Фотографии
            <input type="file" name="photos" accept="image/*" multiple onChange={updateField} />
          </label>

          <label>
            Музыка
            <input name="music" value={form.music} onChange={updateField} />
          </label>

          <label>
            Комментарий
            <textarea name="comment" value={form.comment} onChange={updateField} rows="4" />
          </label>

          <button className="button button-dark submit-button" type="submit">
            Оформить заказ · {formatPrice(template.price)} сом
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
