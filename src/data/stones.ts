export type StoneGroup = "Мрамор" | "Гранит" | "Кварцит" | "Оникс" | "Травертин";

export type StoneItem = {
  id: string;
  name: string;
  group: StoneGroup;
  imageSrc?: string;
};

type StoneSeed = Omit<StoneItem, "id">;

const RU_TO_LAT: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[а-яё]/g, (ch) => RU_TO_LAT[ch] ?? ch)
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeId(group: StoneGroup, name: string) {
  return slugify(`${group}-${name}`);
}

// ВАЖНО: список ниже предоставлен клиентом. Фото в /images/stones/{group}/
const STONE_SEEDS: StoneSeed[] = [
  // ===== МРАМОР =====
  { name: "Крема Нова", group: "Мрамор", imageSrc: "/images/stones/marble/crema-nova.jpg" },
  { name: "Волокас", group: "Мрамор", imageSrc: "/images/stones/marble/volokas.jpg" },
  { name: "Пиргон Алас", group: "Мрамор", imageSrc: "/images/stones/marble/pirgon-alas.jpg" },
  { name: "Тундра Грей", group: "Мрамор", imageSrc: "/images/stones/marble/tundra-grey.jpg" },
  { name: "Бидасар Грин", group: "Мрамор", imageSrc: "/images/stones/marble/bidasar-green.jpg" },
  { name: "Бидасар Браун", group: "Мрамор", imageSrc: "/images/stones/marble/bidasar-brown.jpg" },
  { name: "Бьянко Ибица", group: "Мрамор", imageSrc: "/images/stones/marble/bianco-ibiza.jpg" },
  { name: "Палисандро Классико", group: "Мрамор", imageSrc: "/images/stones/marble/palissandro-klassiko.jpg" },
  { name: "Неро Маркина", group: "Мрамор", imageSrc: "/images/stones/marble/nero-markina.jpg" },
  { name: "Каррара Бьянко", group: "Мрамор", imageSrc: "/images/stones/marble/carrara-bianco.jpg" },
  { name: "Статуаретто", group: "Мрамор", imageSrc: "/images/stones/marble/statuaretto.jpg" },
  { name: "Поларис", group: "Мрамор", imageSrc: "/images/stones/marble/polaris.jpg" },
  { name: "Крема Марфил", group: "Мрамор", imageSrc: "/images/stones/marble/crema-marfil.jpg" },
  { name: "Антрацит Браун", group: "Мрамор", imageSrc: "/images/stones/marble/antracit-brown.jpg" },
  { name: "Имперадор Лайт", group: "Мрамор", imageSrc: "/images/stones/marble/emperador-light.jpg" },
  { name: "Имперадор Дарк", group: "Мрамор", imageSrc: "/images/stones/marble/emperador-dark.jpg" },
  { name: "Бронзе Армани", group: "Мрамор", imageSrc: "/images/stones/marble/bronze-armani.jpg" },
  { name: "Индиан Грин", group: "Мрамор", imageSrc: "/images/stones/marble/indian-green.jpg" },
  { name: "Пьетра Грей", group: "Мрамор", imageSrc: "/images/stones/marble/pietra-grey.jpg" },
  { name: "Арабескато Оробико Сильвер", group: "Мрамор", imageSrc: "/images/stones/marble/arabeskato-orobiko-silver.jpg" },
  { name: "Чиполлино Ондулато", group: "Мрамор", imageSrc: "/images/stones/marble/cipollino-onduato.jpg" },
  { name: "Россо Леванто Бордо", group: "Мрамор", imageSrc: "/images/stones/marble/rosso-levanto-bordo.jpg" },
  { name: "Олив Марон", group: "Мрамор", imageSrc: "/images/stones/marble/oliv-maron.jpg" },
  { name: "Мэджик Браун", group: "Мрамор", imageSrc: "/images/stones/marble/magic-brown.jpg" },

  // ===== ГРАНИТ =====
  { name: "Мадура Голд", group: "Гранит", imageSrc: "/images/stones/granite/madura-gold.jpg" },
  { name: "Колониал Голд", group: "Гранит" },
  { name: "Голден Найт", group: "Гранит" },
  { name: "Колониал Вайт", group: "Гранит", imageSrc: "/images/stones/granite/kolonial-vayt.jpg" },
  { name: "Висконт Вайт", group: "Гранит", imageSrc: "/images/stones/granite/viskont-vayt.jpg" },
  { name: "Айвори Браун", group: "Гранит", imageSrc: "/images/stones/granite/ayvori-braun.jpg" },
  { name: "Айсберг Вайт", group: "Гранит", imageSrc: "/images/stones/granite/aysberg-vayt.jpg" },
  { name: "Айвори Фэнтези", group: "Гранит", imageSrc: "/images/stones/granite/ayvori-fentezi.jpg" },
  { name: "Блю Джинс", group: "Гранит" },
  { name: "Абсолют Блэк Экстра", group: "Гранит", imageSrc: "/images/stones/granite/absolyut-blek-ekstra.jpg" },
  { name: "Волга Блю", group: "Гранит", imageSrc: "/images/stones/granite/volga-blyu.jpg" },
  { name: "Титаниум Экстра", group: "Гранит", imageSrc: "/images/stones/granite/titanium-ekstra.jpg" },
  { name: "Блэк Космик", group: "Гранит", imageSrc: "/images/stones/granite/blek-kosmik.jpg" },
  { name: "Виа Латтеа", group: "Гранит", imageSrc: "/images/stones/granite/via-lattea.jpg" },
  { name: "Браун Антик", group: "Гранит", imageSrc: "/images/stones/granite/braun-antik.jpg" },
  { name: "Тан Браун", group: "Гранит", imageSrc: "/images/stones/granite/tan-braun.jpg" },

  // ===== КВАРЦИТ =====
  { name: "Патагония Голд", group: "Кварцит", imageSrc: "/images/stones/quartzite/patagoniya-gold.jpg" },
  { name: "Тадж Махал", group: "Кварцит", imageSrc: "/images/stones/quartzite/tadzh-mahal.jpg" },
  { name: "Браун Макаубас", group: "Кварцит", imageSrc: "/images/stones/quartzite/braun-makaubas.jpg" },
  { name: "Мон Блан", group: "Кварцит", imageSrc: "/images/stones/quartzite/mon-blan.jpg" },
  { name: "Фьюжн Элегант", group: "Кварцит", imageSrc: "/images/stones/quartzite/fyuzhn-elegant.jpg" },
  { name: "Дольче Вита", group: "Кварцит" },
  { name: "Бьянко Кристалло", group: "Кварцит", imageSrc: "/images/stones/quartzite/byanko-kristallo.jpg" },
  { name: "Турмалин Айс", group: "Кварцит", imageSrc: "/images/stones/quartzite/turmalin-ays.jpg" },

  // ===== ОНИКС =====
  { name: "Оранж", group: "Оникс" },
  { name: "Верде Нуволато", group: "Оникс", imageSrc: "/images/stones/onyx/oniks-verde-nuvolato.jpg" },
  { name: "Грин Экстра", group: "Оникс", imageSrc: "/images/stones/onyx/oniks-grin-ekstra.jpg" },
  { name: "Пинк Экстра", group: "Оникс", imageSrc: "/images/stones/onyx/oniks-pink-ekstra.jpg" },
  { name: "Айвори Экстра", group: "Оникс", imageSrc: "/images/stones/onyx/oniks-ayvori-ekstra.jpg" },
  { name: "Миеле Экстра", group: "Оникс", imageSrc: "/images/stones/onyx/oniks-miele-ekstra.jpg" },
  { name: "Алабастро Экстра", group: "Оникс", imageSrc: "/images/stones/onyx/oniks-alabastro-ekstra.jpg" },
  { name: "Инфинити", group: "Оникс", imageSrc: "/images/stones/onyx/oniks-infiniti.jpg" },
  { name: "Верде Персиано", group: "Оникс", imageSrc: "/images/stones/onyx/oniks-verde-persiano.jpg" },

  // ===== ТРАВЕРТИН =====
  { name: "Лайт", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-light.jpg" },
  { name: "Классико", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-klassiko.jpg" },
  { name: "Траоникс", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-traoniks.jpg" },
  { name: "Бьянко", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-byanko.jpg" },
  { name: "Титаниум", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-titanium.jpg" },
  { name: "Навона", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-navona.jpg" },
  { name: "Сильвер", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-silver.jpg" },
  { name: "Ноче", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-noche.jpg" },
  { name: "Карамель", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-karamel.jpg" },
  { name: "Алабастрино", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-alabastrino.jpg" },
  { name: "Валнут", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-valnut.jpg" },
  { name: "Голд", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-gold.jpg" },
  { name: "Романо", group: "Травертин" },
  { name: "Грей", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-grey.jpg" },
  { name: "Персиан Ред", group: "Травертин", imageSrc: "/images/stones/travertine/travertin-persian-red.jpg" },
  { name: "Айвори", group: "Травертин" },
];

export const STONES: StoneItem[] = STONE_SEEDS.map((seed) => ({
  ...seed,
  id: makeId(seed.group, seed.name),
}));

export const STONE_GROUPS: StoneGroup[] = [
  "Мрамор",
  "Гранит",
  "Кварцит",
  "Оникс",
  "Травертин",
];
