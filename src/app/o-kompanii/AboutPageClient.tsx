"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallRequestModal } from "@/components/CallRequestModalContext";

const STATS = [
  { value: "с 1995", label: "года опыт работы с камнем" },
  { value: "2007", label: "год основания компании" },
  { value: "500+", label: "реализованных проектов" },
  { value: "от 3", label: "рабочих дней — срок изготовления" },
];

const VALUES = [
  {
    title: "Точность",
    description:
      "Каждое изделие изготавливается по точным замерам, снятым нашим специалистом на объекте. Никаких допусков «на глаз».",
  },
  {
    title: "Долговечность",
    description:
      "Мы работаем только с натуральным камнем — материалом, который переживает поколения. Не экономим на качестве обработки.",
  },
  {
    title: "Ответственность",
    description:
      "Полный цикл в одних руках: от замера до монтажа. Вам не нужно искать подрядчиков — мы берём на себя весь процесс.",
  },
];

const CLIENTS = [
  {
    title: "Частные заказчики",
    description:
      "Работаем с владельцами квартир и домов. Помогаем выбрать камень, рассчитать стоимость и реализовать любую идею.",
  },
  {
    title: "Архитекторы и дизайнеры",
    description:
      "Сотрудничаем с проектировщиками на специальных условиях. Изготавливаем по готовым чертежам и 3D-моделям.",
  },
  {
    title: "Строительные компании",
    description:
      "Выполняем крупные объёмы для застройщиков и подрядчиков. Соблюдаем сроки, закреплённые договором.",
  },
];

export function AboutPageClient() {
  const { open } = useCallRequestModal();
  const shouldReduceMotion = useReducedMotion();

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
        transition: { duration: 0.5 },
      };

  const stagger = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.1 },
        variants: {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        },
      };

  const staggerChild = shouldReduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
        },
      };

  return (
    <main className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-background-dark py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_0%,rgba(201,169,98,0.22),transparent_55%),radial-gradient(700px_circle_at_85%_80%,rgba(92,74,61,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-10 bg-marble" />
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/10 via-background-dark/50 to-background-dark/80" />

        <div className="container relative z-10">
          <motion.div
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.65 },
                })}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground-on-dark leading-tight tracking-tight max-w-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              О компании
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground-on-dark/70 leading-relaxed">
              Камнеобрабатывающее предприятие с многолетним опытом.<br className="hidden sm:block" /> Мы делаем изделия, которые остаются навсегда.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ИСТОРИЯ ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div className="space-y-6" {...reveal}>
              <h2
                className="text-2xl md:text-3xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Наша история
              </h2>
              <div className="space-y-4 text-foreground-muted leading-relaxed">
                <p>
                  Наши специалисты работают с натуральным камнем с 1995 года. За это время сформировались не просто навыки — выработалось понимание материала: как он ведёт себя под инструментом, как реагирует на температуру, как будет выглядеть через десять лет после укладки.
                </p>
                <p>
                  В 2007 году в Воскресенске Московской области было создано ООО «Камвек» — предприятие с собственным производством, где многовековая прочность гранита, изысканность мрамора, глубина кварцита и магия оникса обретают новую жизнь.
                </p>
                <p>
                  Сегодня «Камвек» — это полный производственный цикл: проектирование, точный замер на объекте, изготовление в цехе и профессиональный монтаж силами наших мастеров.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-marble-vein/50 shadow-[var(--shadow-lg)]"
              {...reveal}
            >
              <Image
                src="/images/about/img_12377.jpg"
                alt="КАМВЕК — знак из камня"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ЦИФРЫ ── */}
      <section className="py-14 md:py-20 bg-background-dark">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
            {...stagger}
          >
            {STATS.map((stat) => (
              <motion.div key={stat.value} className="text-center" {...staggerChild}>
                <div
                  className="text-3xl md:text-4xl font-semibold text-gold mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-on-dark/60 leading-snug max-w-[140px] mx-auto">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ПРОИЗВОДСТВО ── */}
      <section className="py-16 md:py-24 bg-marble-light/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-marble-vein/50 shadow-[var(--shadow-lg)] order-2 lg:order-1"
              {...reveal}
            >
              <Image
                src="/images/about/e92bbcdf-952c-4e45-8d33-ba9f0ec3a01d.jpg"
                alt="Производство КАМВЕК"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div className="space-y-6 order-1 lg:order-2" {...reveal}>
              <h2
                className="text-2xl md:text-3xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Собственное производство
              </h2>
              <div className="space-y-4 text-foreground-muted leading-relaxed">
                <p>
                  Мы не перекупщики и не посредники. У нас собственный цех камнеобработки, где выполняется весь спектр работ: раскрой плит, фрезерование, торцевание, полировка и нанесение финишных покрытий.
                </p>
                <p>
                  Контроль качества — на каждом этапе. Это значит, что итоговое изделие соответствует проекту точно, а не «в целом».
                </p>
                <p>
                  Изготавливаем столешницы, подоконники, ступени, порталы каминов, столы, а также выполняем облицовку санузлов, хамамов, саун, фасадов, цоколей, крылец и барбекю-комплексов.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ЦЕННОСТИ ── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div className="text-center mb-12 md:mb-14" {...reveal}>
            <h2
              className="text-2xl md:text-3xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Наш подход
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 min-[850px]:grid-cols-3 gap-6 md:gap-8"
            {...stagger}
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                className="rounded-xl border border-marble-vein/40 bg-surface p-7 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-gold/40 transition-[box-shadow,border-color]"
                {...staggerChild}
              >
                <div className="h-px w-10 bg-gold/60 mb-5" />
                <h3
                  className="text-lg font-semibold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {v.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── С КЕМ РАБОТАЕМ ── */}
      <section className="py-16 md:py-24 bg-marble-light/40">
        <div className="container">
          <motion.div className="mb-12 md:mb-14" {...reveal}>
            <h2
              className="text-2xl md:text-3xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              С кем мы работаем
            </h2>
            <p className="mt-4 text-foreground-muted max-w-xl leading-relaxed">
              Для каждой категории заказчиков — свои условия и формат работы.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 min-[850px]:grid-cols-3 gap-6 md:gap-8"
            {...stagger}
          >
            {CLIENTS.map((c, i) => (
              <motion.div
                key={c.title}
                className="relative rounded-xl border border-marble-vein/40 bg-surface p-7 shadow-[var(--shadow-sm)]"
                {...staggerChild}
              >
                <div className="text-4xl font-semibold text-gold/20 mb-4 leading-none" style={{ fontFamily: "var(--font-heading)" }}>
                  0{i + 1}
                </div>
                <h3
                  className="text-lg font-semibold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {c.title}
                </h3>
                <p className="text-foreground-muted leading-relaxed">{c.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto rounded-2xl border border-marble-vein/30 bg-background-dark text-foreground-on-dark px-6 py-10 md:px-12 md:py-14 shadow-[var(--shadow-lg)] text-center"
            {...reveal}
          >
            <p
              className="text-xl md:text-2xl font-semibold mb-8 leading-snug"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Доверьте создание вашего пространства профессионалам «Камвек» — мы строим вечность.
            </p>
            <button
              onClick={open}
              className="px-10 py-4 bg-accent text-foreground-on-dark rounded-md hover:bg-accent-hover transition-colors font-medium text-lg max-[440px]:w-full"
            >
              Заказать звонок
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
