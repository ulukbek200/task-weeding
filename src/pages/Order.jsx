import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { getTemplateById, formatPrice } from "../data/templates.js";

const COPY = {
  defaultEventType: "\u0421\u0432\u0430\u0434\u044c\u0431\u0430",
  and: " \u0438 ",
  requiredError: "\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0438\u043c\u044f \u043a\u043b\u0438\u0435\u043d\u0442\u0430, \u0442\u0435\u043b\u0435\u0444\u043e\u043d \u0438 \u0434\u0430\u0442\u0443 \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f.",
  phoneError: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430.",
  sendError: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443.\n\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.",
  back: "\u0412\u0441\u0435 \u0434\u0438\u0437\u0430\u0439\u043d\u044b",
  selected: "\u0412\u044b \u0432\u044b\u0431\u0440\u0430\u043b\u0438",
  currency: "\u0441\u043e\u043c",
  successMark: "\u2713",
  successEyebrow: "\u0417\u0430\u044f\u0432\u043a\u0430 \u043f\u0440\u0438\u043d\u044f\u0442\u0430",
  thanks: "\u0421\u043f\u0430\u0441\u0438\u0431\u043e!",
  successBody: "\u041c\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0434\u0430\u043d\u043d\u044b\u0435 \u0432\u0430\u0448\u0435\u0433\u043e \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f. \u0421\u043a\u043e\u0440\u043e \u0441\u0432\u044f\u0436\u0435\u043c\u0441\u044f \u0441 \u0432\u0430\u043c\u0438 \u0434\u043b\u044f \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u0430.",
  selectedDesign: "\u0412\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0439 \u0434\u0438\u0437\u0430\u0439\u043d:",
  price: "\u0421\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c:",
  returnDesigns: "\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043a \u0434\u0438\u0437\u0430\u0439\u043d\u0430\u043c",
  customerName: "\u0418\u043c\u044f \u0437\u0430\u043a\u0430\u0437\u0447\u0438\u043a\u0430",
  phone: "WhatsApp / \u0442\u0435\u043b\u0435\u0444\u043e\u043d",
  eventType: "\u0422\u0438\u043f \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f",
  names: "\u0418\u043c\u0435\u043d\u0430",
  date: "\u0414\u0430\u0442\u0430",
  time: "\u0412\u0440\u0435\u043c\u044f",
  venue: "\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d",
  address: "\u0410\u0434\u0440\u0435\u0441",
  language: "\u042f\u0437\u044b\u043a",
  photos: "\u0424\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438",
  music: "\u041c\u0443\u0437\u044b\u043a\u0430",
  comment: "\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",
  sending: "\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c...",
  submitPrefix: "\u041e\u0444\u043e\u0440\u043c\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437",
};

const initialForm = {
  customerName: "",
  phone: "",
  eventType: COPY.defaultEventType,
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

function splitNames(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return ["", ""];
  }

  const names = trimmed
    .split(/\s*(?:\+|&|,|\/|\n|\s\u0438\s)\s*/i)
    .map((name) => name.trim())
    .filter(Boolean);

  return [names[0] ?? trimmed, names.slice(1).join(COPY.and)];
}

function isValidPhone(value) {
  const phone = value.trim();
  const digits = phone.replace(/\D/g, "");
  return /^\+?[\d\s().-]{9,24}$/.test(phone) && digits.length >= 9 && digits.length <= 15;
}

export function Order({ templateId }) {
  const template = getTemplateById(templateId);
  const [form, setForm] = useState(() => ({
    ...initialForm,
    eventType: template.category,
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const updateField = (event) => {
    const { name, value, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: files ? Array.from(files).map((file) => file.name).join(", ") : value,
    }));
  };

  const submitOrder = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const clientName = form.customerName.trim();
    const phone = form.phone.trim();

    setSubmitError("");

    if (!clientName || !phone || !form.date) {
      setSubmitError(COPY.requiredError);
      return;
    }

    if (!isValidPhone(phone)) {
      setSubmitError(COPY.phoneError);
      return;
    }

    const [person1, person2] = splitNames(form.names);

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template: template.name,
          eventType: form.eventType.trim(),
          clientName,
          phone,
          person1,
          person2,
          date: form.date,
          time: form.time,
          venue: form.restaurant.trim(),
          address: form.address.trim(),
          language: form.language,
          comment: form.comment.trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Order request failed");
      }

      setSuccess(true);
    } catch {
      setSubmitError(COPY.sendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="order-page">
      <header className="order-header">
        <a className="back-link" href="/#catalog">
          <ArrowLeft size={18} />
          {COPY.back}
        </a>
      </header>

      <div className="order-layout">
        <aside className="selected-template">
          <p className="eyebrow">{COPY.selected}</p>
          <img src={template.previewImage} alt={`${template.name} preview`} />
          <h1>{template.name}</h1>
          <p>{template.subtitle}</p>
          <strong>
            {formatPrice(template.price)} {COPY.currency}
          </strong>
        </aside>

        {success ? (
          <div className="order-success" role="status" aria-live="polite">
            <div className="success-mark">{COPY.successMark}</div>
            <p className="eyebrow">{COPY.successEyebrow}</p>
            <h2>{COPY.thanks}</h2>
            <p>{COPY.successBody}</p>
            <dl>
              <div>
                <dt>{COPY.selectedDesign}</dt>
                <dd>{template.name}</dd>
              </div>
              <div>
                <dt>{COPY.price}</dt>
                <dd>
                  {formatPrice(template.price)} {COPY.currency}
                </dd>
              </div>
            </dl>
            <a className="button button-dark" href="/#catalog">
              {COPY.returnDesigns}
            </a>
          </div>
        ) : (
          <form className="order-form" onSubmit={submitOrder} noValidate>
            <label>
              {COPY.customerName}
              <input
                required
                name="customerName"
                value={form.customerName}
                onChange={updateField}
                autoComplete="name"
              />
            </label>

            <label>
              {COPY.phone}
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
              {COPY.eventType}
              <input name="eventType" value={form.eventType} onChange={updateField} />
            </label>

            <label>
              {COPY.names}
              <input name="names" value={form.names} onChange={updateField} />
            </label>

            <div className="form-row">
              <label>
                {COPY.date}
                <input required type="date" name="date" value={form.date} onChange={updateField} />
              </label>
              <label>
                {COPY.time}
                <input type="time" name="time" value={form.time} onChange={updateField} />
              </label>
            </div>

            <label>
              {COPY.venue}
              <input name="restaurant" value={form.restaurant} onChange={updateField} />
            </label>

            <label>
              {COPY.address}
              <input name="address" value={form.address} onChange={updateField} />
            </label>

            <fieldset>
              <legend>{COPY.language}</legend>
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
              {COPY.photos}
              <input type="file" name="photos" accept="image/*" multiple onChange={updateField} />
            </label>

            <label>
              {COPY.music}
              <input name="music" value={form.music} onChange={updateField} />
            </label>

            <label>
              {COPY.comment}
              <textarea name="comment" value={form.comment} onChange={updateField} rows="4" />
            </label>

            {submitError ? (
              <p className="form-error" role="alert">
                {submitError}
              </p>
            ) : null}

            <button
              className="button button-dark submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? COPY.sending
                : `${COPY.submitPrefix} · ${formatPrice(template.price)} ${COPY.currency}`}
              {isSubmitting ? null : <Send size={18} />}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}