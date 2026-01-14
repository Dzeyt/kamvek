"use client";

import { useCallRequestModal } from "@/components/CallRequestModalContext";

export function FloatingContacts() {
  const { open } = useCallRequestModal();

  // Контакты подключим позже — сейчас это рабочие заглушки.
  // При клике открываем модалку звонка, чтобы UX уже был готов.
  return (
    <div className="fixed z-50 right-4 bottom-4 flex flex-col gap-3">
      <button
        onClick={open}
        className="w-12 h-12 rounded-full bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors"
        title="Telegram (подключим позже)"
        aria-label="Telegram"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        T
      </button>
      <button
        onClick={open}
        className="w-12 h-12 rounded-full bg-background-dark text-foreground-on-dark hover:bg-black transition-colors"
        title="WhatsApp (подключим позже)"
        aria-label="WhatsApp"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        W
      </button>
      <button
        onClick={open}
        className="w-14 h-14 rounded-full bg-gold text-background-dark hover:bg-gold-light transition-colors font-semibold"
        title="Позвонить"
        aria-label="Позвонить"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        ☎
      </button>
    </div>
  );
}

