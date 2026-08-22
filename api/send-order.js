const PRICE = "2 800 сом";

function readString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function valueOrFallback(value) {
  return readString(value) || "Не указано";
}

function isValidPhone(value) {
  const phone = readString(value);
  const digits = phone.replace(/\D/g, "");
  return /^\+?[\d\s().-]{9,24}$/.test(phone) && digits.length >= 9 && digits.length <= 15;
}

function formatNames(person1, person2) {
  const names = [readString(person1), readString(person2)].filter(Boolean);
  return names.length > 0 ? names.join(" и ") : "Не указано";
}

function buildTelegramMessage(order) {
  return [
    "🔔 НОВЫЙ ЗАКАЗ",
    "",
    `🎨 Шаблон: ${valueOrFallback(order.template)}`,
    `💰 Цена: ${PRICE}`,
    "",
    `🎉 Мероприятие: ${valueOrFallback(order.eventType)}`,
    "",
    `👤 Клиент: ${valueOrFallback(order.clientName)}`,
    `📞 Телефон: ${valueOrFallback(order.phone)}`,
    "",
    `💍 Имена: ${formatNames(order.person1, order.person2)}`,
    "",
    `📅 Дата: ${valueOrFallback(order.date)}`,
    `🕐 Время: ${valueOrFallback(order.time)}`,
    "",
    `🏛 Ресторан: ${valueOrFallback(order.venue)}`,
    `📍 Адрес: ${valueOrFallback(order.address)}`,
    "",
    `🌐 Язык: ${valueOrFallback(order.language)}`,
    "",
    "💬 Комментарий:",
    valueOrFallback(order.comment),
  ].join("\n");
}

function parseBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    return JSON.parse(body);
  }

  return body;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram environment variables are not configured.");
      return res.status(500).json({
        success: false,
        message: "Telegram is not configured",
      });
    }

    const order = parseBody(req.body);
    const clientName = readString(order.clientName);
    const phone = readString(order.phone);
    const date = readString(order.date);

    if (!clientName || !phone || !date) {
      return res.status(400).json({
        success: false,
        message: "Заполните имя клиента, телефон и дату мероприятия.",
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Введите корректный номер телефона.",
      });
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildTelegramMessage(order),
          disable_web_page_preview: true,
        }),
      },
    );

    if (!telegramResponse.ok) {
      console.error("Telegram API request failed:", telegramResponse.status);
      return res.status(502).json({
        success: false,
        message: "Не удалось отправить заявку.",
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      "send-order failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return res.status(500).json({
      success: false,
      message: "Не удалось отправить заявку.",
    });
  }
}
