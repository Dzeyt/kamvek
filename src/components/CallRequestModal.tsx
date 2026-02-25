"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, "");

  // Нормализуем: убираем ведущую 7 или 8, берём максимум 10 цифр
  let local = digits;
  if (local.startsWith("7") || local.startsWith("8")) {
    local = local.slice(1);
  }
  local = local.slice(0, 10);

  if (local.length === 0) return digits.length > 0 ? "+7" : "";
  if (local.length <= 3) return `+7 (${local}`;
  if (local.length <= 6) return `+7 (${local.slice(0, 3)}) ${local.slice(3)}`;
  if (local.length <= 8) return `+7 (${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
  return `+7 (${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 8)}-${local.slice(8, 10)}`;
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  let local = digits;
  if (local.startsWith("7") || local.startsWith("8")) local = local.slice(1);
  return local.length === 10;
}

export function CallRequestModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const canSubmit = useMemo(() => {
    return name.trim().length > 0 && isValidPhone(phone) && status !== "loading";
  }, [name, phone, status]);

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setName(val.length > 0 ? val.charAt(0).toUpperCase() + val.slice(1) : val);
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
  }

  // Reset status on open
  useEffect(() => {
    if (!open) return;
    setStatus("idle");
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
    document.body.style.overflow = "";
  }, [open]);

  // Escape key
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
          aria-labelledby="modal-title"
        >
          <motion.div
            className="w-full max-w-lg rounded-xl overflow-hidden border border-marble-vein/40"
            style={{ boxShadow: "var(--shadow-lg)" }}
            initial={{ y: 8, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Тёмная шапка */}
            <div className="bg-background-dark px-6 py-5 flex items-center justify-between gap-4">
              <div>
                <h3
                  id="modal-title"
                  className="text-2xl font-semibold text-foreground-on-dark"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Заказать звонок
                </h3>
                <p className="text-sm text-foreground-on-dark/60 mt-1">
                  Мы свяжемся с вами в течение рабочего дня.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-marble-vein/40 hover:border-white/40 text-foreground-on-dark/60 hover:text-foreground-on-dark transition-colors flex items-center justify-center shrink-0"
                aria-label="Закрыть"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Светлое тело с формой */}
            <div className="bg-surface text-foreground border-x border-b border-marble-vein/60 rounded-b-xl px-6 py-6">
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
                  <div className="mt-6 flex justify-center">
                    <button
                      className="px-5 py-3 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover transition-colors"
                      onClick={() => { resetForm(); onClose(); }}
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div className="space-y-1.5">
                    <label htmlFor="modal-name" className="text-sm text-foreground-muted">
                      Имя
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="w-full px-4 py-3 rounded-lg border border-marble-vein bg-background focus:outline-none focus:border-accent transition-colors"
                      placeholder="Ваше имя"
                      autoComplete="name"
                      autoCapitalize="words"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-phone" className="text-sm text-foreground-muted">
                      Телефон
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 rounded-lg border border-marble-vein bg-background focus:outline-none focus:border-accent transition-colors"
                      placeholder="+7 (___) ___-__-__"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="modal-comment" className="text-sm text-foreground-muted">
                      Комментарий
                    </label>
                    <textarea
                      id="modal-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-marble-vein bg-background focus:outline-none focus:border-accent transition-colors min-h-[110px] resize-none"
                      placeholder="Коротко опишите задачу (необязательно)"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500 text-center -mt-1">
                      Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full px-6 py-4 rounded-md bg-accent text-foreground-on-dark hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent transition-colors"
                  >
                    {status === "loading" ? "Отправляем…" : "Отправить заявку"}
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
