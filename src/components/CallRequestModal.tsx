"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CallRequestModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const canSubmit = useMemo(() => {
    return name.trim().length > 0 && phone.trim().length > 0;
  }, [name, phone]);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  function resetForm() {
    setName("");
    setPhone("");
    setComment("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    // Пока без реальной отправки — подключим в конце проекта.
    // Здесь будет API call на /api/lead
    setStatus("success");
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="w-full max-w-lg rounded-lg bg-surface text-foreground border border-marble-vein overflow-hidden"
            style={{ boxShadow: "var(--shadow-lg)" }}
            initial={{ y: 8, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-marble-vein flex items-center justify-between gap-4">
              <div>
                <h3
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Заказать звонок
                </h3>
                <p className="text-sm text-foreground-muted mt-1">
                  Мы свяжемся с вами в течение рабочего дня.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-marble-vein hover:border-accent transition-colors"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-6">
              {status === "success" ? (
                <div className="text-center py-6">
                  <p
                    className="text-3xl font-semibold text-gradient mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Спасибо!
                  </p>
                  <p className="text-foreground-muted">
                    Заявка отправлена. Мы свяжемся с вами в течение рабочего дня.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      className="px-5 py-3 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors"
                      onClick={() => {
                        resetForm();
                        onClose();
                      }}
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm text-foreground-muted">Имя</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-marble-vein bg-background focus:border-accent transition-colors"
                      placeholder="Ваше имя"
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-foreground-muted">Телефон</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-marble-vein bg-background focus:border-accent transition-colors"
                      placeholder="+7 (___) ___-__-__"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-foreground-muted">Комментарий</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-marble-vein bg-background focus:border-accent transition-colors min-h-[110px] resize-none"
                      placeholder="Коротко опишите задачу (необязательно)"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full px-6 py-4 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover disabled:opacity-60 disabled:hover:bg-accent transition-colors"
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

