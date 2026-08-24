export const templates = [
  {
    id: "amore",
    name: "AMORE",
    category: "Свадьба",
    subtitle: "Italian Romantic Wedding",
    price: 2800,
    demoUrl: "https://toy-amore.vercel.app/",
    previewImage: "/previews/amore.webp",
    accent: "#722936",
    surface: "#efe7dc",
    tags: ["Romantic", "Cinema", "Modern", "Романтичные", "Современные"],
  },
  {
    id: "ak-niyet",
    name: "AK NIYET",
    category: "Свадьба",
    subtitle: "Modern Kyrgyz Wedding",
    price: 2800,
    demoUrl: "https://ak-niyet.vercel.app/",
    previewImage: "/previews/ak-niyet.webp",
    accent: "#812d3b",
    surface: "#e8d8bf",
    tags: ["Kyrgyz", "Premium", "Traditional", "Традиционные", "Современные"],
  },
  {
    id: "ak-niyet-classic",
    name: "AK NIYET CLASSIC",
    category: "Свадьба",
    subtitle: "Traditional Editorial Wedding",
    price: 2800,
    demoUrl: "https://ak-niyet-wcug.vercel.app/",
    previewImage: "/previews/ak-niyet-classic.webp",
    accent: "#9a5740",
    surface: "#f1e6d5",
    tags: ["Classic", "Kyrgyz", "Elegant", "Традиционные"],
  },
  {
    id: "wedding-classic",
    name: "WEDDING CLASSIC",
    category: "Свадьба",
    subtitle: "Elegant Wedding Invitation",
    price: 2800,
    demoUrl: "https://weeding2-two.vercel.app/",
    previewImage: "/previews/wedding-classic.webp",
    accent: "#171612",
    surface: "#f4efe6",
    tags: ["Wedding", "Elegant", "Classic", "Традиционные"],
  },
  {
    id: "ak-jol",
    name: "AK JOL",
    category: "Кыз узатуу",
    subtitle: "Modern Кыз Узатуу",
    price: 2800,
    demoUrl: "https://ak-jol-five.vercel.app/",
    previewImage: "/previews/ak-jol.webp",
    accent: "#9b203e",
    surface: "#ead2d1",
    tags: ["Кыз узатуу", "Family", "Kyrgyz", "Современные"],
  },
  {
    id: "velora",
    name: "VELORA 3D",
    category: "\u0421\u0432\u0430\u0434\u044c\u0431\u0430",
    subtitle: "Premium 3D Wedding Invitation",
    price: 2800,
    demoUrl: "https://velora-peach-ten.vercel.app/",
    previewImage: "/previews/velora.webp",
    accent: "#17110f",
    surface: "#efe2cf",
    tags: ["Wedding", "3D", "Premium", "\u0421\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0435"],
  },
];

export const filters = [
  "Все",
  "Свадьба",
  "Кыз узатуу",
  "Традиционные",
  "Современные",
  "Романтичные",
];

export const includedItems = [
  "Персональный сайт-приглашение",
  "Ваши фотографии",
  "Фоновая музыка",
  "Обратный отсчёт",
  "Программа мероприятия",
  "Карта и маршрут",
  "RSVP",
  "Пожелания гостей",
  "QR-код",
  "KG / RU",
  "Полная мобильная адаптация",
  "Персональная ссылка",
];

export function getTemplateById(id) {
  return templates.find((template) => template.id === id) ?? templates[0];
}

export function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(price);
}
