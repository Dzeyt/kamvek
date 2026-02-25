"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PrivacyPageClient() {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5 },
      };

  return (
    <main className="min-h-screen bg-background">
      <motion.section className="py-16 md:py-20" {...reveal}>
        <div className="container max-w-3xl">
          <h1
            className="text-4xl md:text-5xl font-semibold text-foreground mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Политика конфиденциальности
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground-muted space-y-6 text-sm md:text-base">
            <p className="text-foreground/90">
              Настоящая политика конфиденциальности определяет порядок обработки и защиты
              персональных данных пользователей сайта (далее — Сайт), принадлежащего Обществу
              с ограниченной ответственностью «Камвек» (далее — Оператор).
            </p>

            <div className="bg-marble-light/60 rounded-lg p-5 text-sm space-y-1 border border-marble-vein/40">
              <p className="font-medium text-foreground">Реквизиты Оператора</p>
              <p>ООО «Камвек»</p>
              <p>ИНН: 5005045558 / КПП: 500501001</p>
              <p>ОГРН: 1075005002148</p>
              <p>Юридический адрес: 140200, Московская область, г. Воскресенск, ул. Гаражная, д. 1-А, этаж 1</p>
              <p>Почтовый адрес: 140207, Московская область, г. Воскресенск, ПГТ Белоозерский, ул. Коммунальная, д. 21-А</p>
              <p>E-mail: <a href="mailto:kamenveka@yandex.ru" className="text-accent hover:underline">kamenveka@yandex.ru</a></p>
              <p>Телефон: <a href="tel:+79163588579" className="text-accent hover:underline">+7 (916) 358-85-79</a></p>
            </div>

            <h2
              className="text-xl font-semibold text-foreground mt-8 mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              1. Общие положения
            </h2>
            <p>
              Использование Сайта означает согласие пользователя с настоящей политикой. Оператор
              обрабатывает персональные данные в соответствии с Федеральным законом от 27.07.2006
              № 152-ФЗ «О персональных данных».
            </p>

            <h2
              className="text-xl font-semibold text-foreground mt-8 mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              2. Какие данные мы собираем
            </h2>
            <p>
              При заполнении формы «Заказать звонок» и иных форм на Сайте мы можем запрашивать:
              имя, номер телефона, адрес электронной почты и иные сведения, необходимые для связи
              и оказания услуг.
            </p>

            <h2
              className="text-xl font-semibold text-foreground mt-8 mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              3. Цели обработки
            </h2>
            <p>
              Персональные данные используются для связи с пользователем, обработки заявок,
              консультаций и заключения договоров. Данные не передаются третьим лицам без
              согласия пользователя, за исключением случаев, предусмотренных законодательством РФ.
            </p>

            <h2
              className="text-xl font-semibold text-foreground mt-8 mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              4. Защита данных
            </h2>
            <p>
              Оператор принимает необходимые организационные и технические меры для защиты
              персональных данных от неправомерного доступа, уничтожения, изменения или
              блокирования.
            </p>

            <h2
              className="text-xl font-semibold text-foreground mt-8 mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              5. Права пользователя
            </h2>
            <p>
              Пользователь вправе запросить доступ к своим персональным данным, их уточнение,
              блокирование или уничтожение, направив письменный запрос по адресу:{" "}
              <a href="mailto:kamenveka@yandex.ru" className="text-accent hover:underline">
                kamenveka@yandex.ru
              </a>
              .
            </p>

            <h2
              className="text-xl font-semibold text-foreground mt-8 mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              6. Изменения
            </h2>
            <p>
              Оператор вправе вносить изменения в настоящую политику. Актуальная версия всегда
              доступна на данной странице. Продолжая использовать Сайт после публикации изменений,
              вы соглашаетесь с обновлённой политикой.
            </p>

            <p className="mt-8 text-foreground/60 text-xs">
              ООО «Камвек» — ОГРН 1075005002148, ИНН 5005045558
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

