import type { PortfolioCategory } from "@/data/portfolio";

export const CATEGORY_PRIORITY_IDS: Partial<Record<PortfolioCategory, string[]>> = {
  "Столешницы": ["img_4756", "img_1434", "img_1451", "img_1454", "img_0319", "img_4164", "img_1685", "img_5280", "img_7328", "img_6280", "img_7392"],
  "Лестницы и ступени": ["img_9668", "img_9671", "img_9673", "img_9676", "img_5260", "img_6061", "5e027920-6d7c-4fbb-9813-cf5287bd7968", "img_4083", "img_9415", "img_9417"],
  "Социально значимые объекты": ["img_0143", "img_0144", "img_3506", "img_3507", "img_1116", "img_1097", "img_8070", "img_3669", "img_7338", "img_7340", "img_8047", "img_7330"],
  "Входные группы": ["5e027920-6d7c-4fbb-9813-cf5287bd7968", "img_4083", "img_8070", "img_3669"],
  "Ванные и санузлы": ["95ee9953-7a9c-42c7-9a8a-a341e7dfbea2", "12ddd795-6edc-443f-9de9-04769999ddd0", "fullsizerender", "img_1010", "img_0095", "img_7681", "img_7918", "img_5030", "img_8595", "img_1299", "img_8557", "img_1012"],
  "Камины и барбекю": ["img_6261", "img_2096", "img_2102", "img_1282", "img_7415", "img_1949", "img_5362", "img_8463", "302a1ac0-8a0c-485b-82d0-8ff8e9f44bc1", "img_7413", "img_9188", "img_5218"],
  "Все": ["img_6261", "img_2102", "fullsizerender", "img_1010", "img_9668", "img_9671", "img_9673", "img_9676", "img_4756", "img_1434", "5e027920-6d7c-4fbb-9813-cf5287bd7968", "img_4083", "img_0143", "img_0144", "img_3506", "img_3507", "img_0095", "img_7681", "img_7918", "img_5030"]
};

// Управляемый порядок превью "Наши работы" на главной (первые 12 карточек).
// Оптимизирован под сетку 4 в ряд (и 2 в ряд): пары по категориям.
export const HOME_PORTFOLIO_PREVIEW_IDS: string[] = [
  "img_6261",
  "img_2102",
  "fullsizerender",
  "img_1010",
  "img_7328",
  "img_0319",
  "img_9668",
  "img_9676",
  "img_0143",
  "img_0144",
  "img_7918",
  "img_5030",
];
// Оптимизирован под сетку 3 в ряд.
export const HOME_PORTFOLIO_PREVIEW_IDS_3COL: string[] = [
  "img_6261",
  "img_2102",
  "img_7328",
  "12ddd795-6edc-443f-9de9-04769999ddd0",
  "fullsizerender",
  "img_1010",
  "img_0143",
  "img_0144",
  "img_3506",
  "img_9668",
  "img_9676",
  "img_9671",
];

