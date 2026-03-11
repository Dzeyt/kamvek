/**
 * Контактные данные КАМВЕК — единый источник для страницы контактов, футера и плавающих кнопок.
 */
export const CONTACTS = {
  address: {
    line: "г. Воскресенск, ул. Гаражная, д. 1-А",
    /** Поисковая строка для встроенной карты (виджет) */
    yandexMapCoords: { lat: 55.248758, lon: 38.750667 },
  },
  phones: [
    { display: "+7 (916) 358-85-79", href: "tel:+79163588579" },
    { display: "+7 (926) 684-48-20", href: "tel:+79266844820" },
  ],
  email: {
    display: "kamenveka@yandex.ru",
    href: "mailto:kamenveka@yandex.ru",
  },
  messengers: [
    { name: "Telegram", href: "https://t.me/RUSKamVek", label: "Написать в Telegram" },
    { name: "MAX", href: "https://max.ru/join/NJK6TmxmGIaBY-l1ueA9-mT-MH0YuF3LDz_rX_fDL8A", label: "Написать в MAX" },
    { name: "VK", href: "https://vk.ru/kamenveka", label: "Написать ВКонтакте" },
  ],
  workingHours: "Пн–Вс: 9:00 – 21:00",
  responseNote: "Мы свяжемся с вами в течение рабочего дня.",
} as const;
