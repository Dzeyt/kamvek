"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { CallRequestModal } from "@/components/CallRequestModal";

type CallRequestModalApi = {
  open: () => void;
  close: () => void;
};

const Ctx = createContext<CallRequestModalApi | null>(null);

export function CallRequestModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const api = useMemo<CallRequestModalApi>(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    []
  );

  return (
    <Ctx.Provider value={api}>
      {children}
      <CallRequestModal open={isOpen} onClose={api.close} />
    </Ctx.Provider>
  );
}

export function useCallRequestModal() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useCallRequestModal must be used within CallRequestModalProvider");
  }
  return ctx;
}

