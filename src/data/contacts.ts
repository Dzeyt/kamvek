/**
 * Контактные данные КАМВЕК — единый источник для страницы контактов, футера и плавающих кнопок.
 */
export const CONTACTS = {
  address: {
    line: "г. Воскресенск, ул. Гаражная, д. 1-А",
    /** Поисковая строка для встроенной карты (виджет) */
    yandexMapCoords: { lat: 55.248758, lon: 38.750667 },
  },
  phone: {
    display: "+7 (916) 358-85-79",
    href: "tel:+79163588579",
  },
  email: {
    display: "kamenveka@yandex.ru",
    href: "mailto:kamenveka@yandex.ru",
  },
  messengers: [
    { name: "Telegram", href: "https://t.me/ruskamvekolga", label: "Написать в Telegram" },
    { name: "MAX", href: "https://max.ru/kamvek", label: "Написать в MAX" },
  ],
  workingHours: "Пн–Пт: 9:00 – 18:00",
  responseNote: "Мы свяжемся с вами в течение рабочего дня.",
} as const;
