import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { getTemplateById, formatPrice } from "../data/templates.js";

const initialForm = {
  customerName: "",
  phone: "",
  eventType: "РЎРІР°РґСЊР±Р°",
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
    .split(/\s*(?:\+|&|,|\/|\n|\sРё\s)\s*/i)
    .map((name) => name.trim())
    .filter(Boolean);

  return [names[0] ?? trimmed, names.slice(1).join(" Рё ")];
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
      setSubmitError("Р—Р°РїРѕР»РЅРёС‚Рµ РёРјСЏ РєР»РёРµРЅС‚Р°, С‚РµР»РµС„РѕРЅ Рё РґР°С‚Сѓ РјРµСЂРѕРїСЂРёСЏС‚РёСЏ.");
      return;
    }

    if (!isValidPhone(phone)) {
      setSubmitError("Р’РІРµРґРёС‚Рµ РєРѕСЂСЂРµРєС‚РЅС‹Р№ РЅРѕРјРµСЂ С‚РµР»РµС„РѕРЅР°.");
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
      setSubmitError(
        "РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РїСЂР°РІРёС‚СЊ Р·Р°СЏРІРєСѓ.\nРџСЂРѕРІРµСЂСЊС‚Рµ СЃРѕРµРґРёРЅРµРЅРёРµ Рё РїРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰С‘ СЂР°Р·.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="order-page">
      <header className="order-header">
        <a className="back-link" href="/#catalog">
          <ArrowLeft size={18} />
          Р’СЃРµ РґРёР·Р°Р№РЅС‹
        </a>
      </header>

      <div className="order-layout">
        <aside className="selected-template">
          <p className="eyebrow">Р’С‹ РІС‹Р±СЂР°Р»Рё</p>
          <img src={template.previewImage} alt={`${template.name} preview`} />
          <h1>{template.name}</h1>
          <p>{template.subtitle}</p>
          <strong>{formatPrice(template.price)} СЃРѕРј</strong>
        </aside>

        {success ? (
          <div className="order-success" role="status" aria-live="polite">
            <div className="success-mark">вњ“</div>
            <p className="eyebrow">Р—Р°СЏРІРєР° РїСЂРёРЅСЏС‚Р°</p>
            <h2>РЎРїР°СЃРёР±Рѕ!</h2>
            <p>
              РњС‹ РїРѕР»СѓС‡РёР»Рё РґР°РЅРЅС‹Рµ РІР°С€РµРіРѕ РјРµСЂРѕРїСЂРёСЏС‚РёСЏ. РЎРєРѕСЂРѕ СЃРІСЏР¶РµРјСЃСЏ СЃ РІР°РјРё РґР»СЏ
              РїРѕРґС‚РІРµСЂР¶РґРµРЅРёСЏ Р·Р°РєР°Р·Р°.
            </p>
            <dl>
              <div>
                <dt>Р’С‹Р±СЂР°РЅРЅС‹Р№ РґРёР·Р°Р№РЅ:</dt>
                <dd>{template.name}</dd>
              </div>
              <div>
                <dt>РЎС‚РѕРёРјРѕСЃС‚СЊ:</dt>
                <dd>{formatPrice(template.price)} СЃРѕРј</dd>
              </div>
            </dl>
            <a className="button button-dark" href="/#catalog">
              Р’РµСЂРЅСѓС‚СЊСЃСЏ Рє РґРёР·Р°Р№РЅР°Рј
            </a>
          </div>
        ) : (
          <form className="order-form" onSubmit={submitOrder} noValidate>
            <label>
              РРјСЏ Р·Р°РєР°Р·С‡РёРєР°
              <input
                required
                name="customerName"
                value={form.customerName}
                onChange={updateField}
                autoComplete="name"
              />
            </label>

            <label>
              WhatsApp / С‚РµР»РµС„РѕРЅ
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
              РўРёРї РјРµСЂРѕРїСЂРёСЏС‚РёСЏ
              <input name="eventType" value={form.eventType} onChange={updateField} />
            </label>

            <label>
              РРјРµРЅР°
              <input name="names" value={form.names} onChange={updateField} />
            </label>

            <div className="form-row">
              <label>
                Р”Р°С‚Р°
                <input required type="date" name="date" value={form.date} onChange={updateField} />
              </label>
              <label>
                Р’СЂРµРјСЏ
                <input type="time" name="time" value={form.time} onChange={updateField} />
              </label>
            </div>

            <label>
              Р РµСЃС‚РѕСЂР°РЅ
              <input name="restaurant" value={form.restaurant} onChange={updateField} />
            </label>

            <label>
              РђРґСЂРµСЃ
              <input name="address" value={form.address} onChange={updateField} />
            </label>

            <fieldset>
              <legend>РЇР·С‹Рє</legend>
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
              Р¤РѕС‚РѕРіСЂР°С„РёРё
              <input type="file" name="photos" accept="image/*" multiple onChange={updateField} />
            </label>

            <label>
              РњСѓР·С‹РєР°
              <input name="music" value={form.music} onChange={updateField} />
            </label>

            <label>
              РљРѕРјРјРµРЅС‚Р°СЂРёР№
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
                ? "РћС‚РїСЂР°РІР»СЏРµРј..."
                : `РћС„РѕСЂРјРёС‚СЊ Р·Р°РєР°Р· В· ${formatPrice(template.price)} СЃРѕРј`}
              {isSubmitting ? null : <Send size={18} />}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
