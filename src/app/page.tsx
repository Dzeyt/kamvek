/*
  ========================================
  📄 ГЛАВНАЯ СТРАНИЦА (/)
  ========================================
  
  Это временная версия для проверки дизайн-системы.
  Позже заменим на полноценную главную с блоками:
  - Hero (первый экран)
  - Направления работ
  - Преимущества
  - Этапы работы
  - Портфолио
  - CTA
*/

export default function Home() {
  return (
    <main>
      {/* Hero секция — временная */}
      <section className="min-h-screen flex items-center justify-center bg-background-dark text-foreground-on-dark">
        <div className="container text-center">
          {/* Логотип — пока текстом */}
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            КАМВЕК
          </h1>
          
          {/* Подзаголовок */}
          <p 
            className="text-xl md:text-2xl text-gold-light mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Мрамор • Гранит • Кварцит • Оникс
          </p>
          
          {/* Описание */}
          <p className="text-lg text-foreground-on-dark/80 max-w-2xl mx-auto mb-8">
            Изготовление изделий из натурального камня. 
            Собственное производство с 2007 года. 
            От замера до монтажа — от 3 дней.
          </p>
          
          {/* Кнопки — временные */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-accent text-foreground-on-dark rounded-md hover:bg-accent-hover transition-colors">
              Заказать звонок
            </button>
            <button className="px-8 py-4 border border-gold text-gold rounded-md hover:bg-gold hover:text-background-dark transition-colors">
              Смотреть работы
            </button>
          </div>
        </div>
      </section>
      
      {/* Тестовые цвета — для проверки */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 
            className="text-4xl md:text-5xl font-semibold text-foreground mb-8 text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Наши направления
          </h2>
          
          {/* Карточки — превью */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Столешницы", "Лестницы", "Камины"].map((title) => (
              <div 
                key={title}
                className="bg-surface p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                <h3 
                  className="text-2xl font-semibold text-accent mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {title}
                </h3>
                <p className="text-foreground-muted">
                  Изготовление из мрамора, гранита и других пород натурального камня.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Тёмная секция — для контраста */}
      <section className="py-20 bg-background-dark text-foreground-on-dark">
        <div className="container text-center">
          <h2 
            className="text-4xl md:text-5xl font-semibold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Проверка дизайн-системы
          </h2>
          <p className="text-foreground-on-dark/70 mb-8">
            Если ты видишь эту страницу — всё работает! 🎉
          </p>
          
          {/* Палитра цветов */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-20 h-20 bg-accent rounded-lg" title="accent" />
            <div className="w-20 h-20 bg-gold rounded-lg" title="gold" />
            <div className="w-20 h-20 bg-marble-light rounded-lg" title="marble-light" />
            <div className="w-20 h-20 bg-surface rounded-lg" title="surface" />
          </div>
        </div>
      </section>
    </main>
  );
}
