"use client";

import { useState } from "react";
import { CONTACTS } from "@/data/contacts";

// Иконка основного FAB (чат)
const ChatIcon = (
  <svg className="w-6 h-6" viewBox="0 0 35 32" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" role="presentation">
    <g transform="translate(35, 0) scale(-1, 1)">
      <path d="M11.2667 12.6981H23.3667M11.2667 16.4717H23.3667M4.8104 23.5777C2.4311 21.1909 1 18.1215 1 14.7736C1 7.16679 8.38723 1 17.5 1C26.6128 1 34 7.16679 34 14.7736C34 22.3804 26.6128 28.5472 17.5 28.5472C15.6278 28.5472 13.8286 28.2868 12.1511 27.8072L12 27.7925L5.03333 31V23.8219L4.8104 23.5777Z" />
    </g>
  </svg>
);

const TelegramIcon = (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Zm21.977-68.056c.386-4.38-4.24-2.576-4.24-2.576-3.415 1.414-6.937 2.85-10.497 4.302-11.04 4.503-22.444 9.155-32.159 13.734-5.268 1.932-2.184 3.864-2.184 3.864l8.351 2.577c3.855 1.16 5.91-.129 5.91-.129l17.988-12.238c6.424-4.38 4.882-.773 3.34.773l-13.49 12.882c-2.056 1.804-1.028 3.35-.129 4.123 2.55 2.249 8.82 6.364 11.557 8.16.712.467 1.185.778 1.292.858.642.515 4.111 2.834 6.424 2.319 2.313-.516 2.57-3.479 2.57-3.479l3.083-20.226c.462-3.511.993-6.886 1.417-9.582.4-2.546.705-4.485.767-5.362Z"
      fill="#1A1614"
    />
  </svg>
);

const MaxIcon = (
  <svg className="w-full h-full" viewBox="0 0 1000 1000" aria-hidden="true">
    <rect width="1000" height="1000" fill="#1A1614" ry="249.681" />
    <g transform="translate(500 500) scale(0.75) translate(-500 -500)">
      <path fill="#fff" fillRule="evenodd" clipRule="evenodd" d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z" />
    </g>
  </svg>
);

const PhoneIcon = (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.82.37 1.6.72 2.33a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.73-1.28a2 2 0 0 1 2.11-.45c.73.35 1.51.6 2.33.72A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TELEGRAM_URL = CONTACTS.messengers[0].href;
const MAX_URL = CONTACTS.messengers[1].href;
const PHONE_HREF = CONTACTS.phone.href;

export function FloatingContacts() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed z-50 right-6 bottom-6 flex flex-col items-center gap-3">
      <div
        className={`flex flex-col gap-3 items-center transition-all duration-200 ease-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full bg-white border border-marble-vein/70 overflow-hidden transition-transform flex items-center justify-center ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          title="Telegram"
          aria-label="Написать в Telegram"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          {TelegramIcon}
        </a>
        <a
          href={MAX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full overflow-hidden bg-white text-foreground border border-marble-vein/70 hover:text-accent transition-colors flex items-center justify-center ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          title="MAX"
          aria-label="Написать в MAX"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          {MaxIcon}
        </a>
        <a
          href={PHONE_HREF}
          className={`w-10 h-10 rounded-full bg-foreground text-background border border-white/80 hover:bg-foreground/90 transition-colors font-semibold flex items-center justify-center ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          title="Позвонить"
          aria-label="Позвонить"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          {PhoneIcon}
        </a>
      </div>

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-14 h-14 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--focus-color,theme(colors.blue.800))]"
        title={isOpen ? "Скрыть контакты" : "Показать контакты"}
        aria-label={isOpen ? "Скрыть контакты" : "Показать контакты"}
        style={{
          border: "1px solid var(--color-outer-border, #171717)",
          boxShadow: "var(--shadow-lg), inset 0 0 0 1px var(--color-inner-border, hsla(0,0%,100%,0.50))",
          transition: "border-color 250ms cubic-bezier(0.23,0.88,0.26,0.92), box-shadow 250ms cubic-bezier(0.23,0.88,0.26,0.92), background-color 250ms cubic-bezier(0.23,0.88,0.26,0.92)",
        }}
      >
        {isOpen ? "✕" : ChatIcon}
      </button>
    </div>
  );
}
