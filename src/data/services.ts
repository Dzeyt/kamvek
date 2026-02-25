export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  priority: boolean;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "countertops",
    title: "Столешницы",
    description:
      "Кухонные и ванные столешницы с точной геометрией, аккуратной кромкой и защитой от влаги.",
    duration: "от 3 рабочих дней",
    priority: true,
  },
  {
    id: "steps",
    title: "Лестницы и ступени",
    description:
      "Лестницы и ступени из натурального камня с противоскользящей обработкой и точной подгонкой.",
    duration: "от 3 рабочих дней",
    priority: true,
  },
  {
    id: "window-sills",
    title: "Подоконники",
    description:
      "Компактные и широкие подоконники под любой интерьер с устойчивостью к влаге и перепадам.",
    duration: "от 3 рабочих дней",
    priority: true,
  },
  {
    id: "fireplaces",
    title: "Камины",
    description:
      "Облицовка каминных порталов и зон отдыха в благородных текстурах камня.",
    duration: "от 3 рабочих дней",
    priority: false,
  },
  {
    id: "bathrooms",
    title: "Облицовка санузлов, хамамов, саун",
    description:
      "Влагостойкие решения для стен, ниш и полок, рассчитанные на интенсивную эксплуатацию.",
    duration: "от 3 рабочих дней",
    priority: false,
  },
  {
    id: "facades",
    title: "Фасады, цоколи, крыльцо",
    description:
      "Надёжная каменная отделка экстерьера с устойчивостью к погоде и механическим нагрузкам.",
    duration: "от 3 рабочих дней",
    priority: false,
  },
  {
    id: "bbq",
    title: "Барбекю-комплексы",
    description:
      "Уличные кухни и барбекю с термостойкими поверхностями и эффектной подачей.",
    duration: "от 3 рабочих дней",
    priority: false,
  },
  {
    id: "tables",
    title: "Столы, барные стойки, ресепшен",
    description:
      "Акцентные элементы интерьера с индивидуальной фактурой и премиальной отделкой.",
    duration: "от 3 рабочих дней",
    priority: false,
  },
  {
    id: "shower-trays",
    title: "Душевые поддоны, раковины",
    description:
      "Цельные изделия из камня для ванных комнат с идеальной геометрией и долговечностью.",
    duration: "от 3 рабочих дней",
    priority: false,
  },
  {
    id: "floors",
    title: "Полы и облицовка",
    description:
      "Плиты и облицовка для частных и общественных пространств, устойчивые к износу.",
    duration: "от 3 рабочих дней",
    priority: false,
  },
];
