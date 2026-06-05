"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function BottomSheet({
  open,
  onClose,
  title,
  children,
  maxHeight = "85dvh",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: string;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-base/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="safe-b fixed inset-x-0 bottom-0 z-[90] flex flex-col overflow-hidden rounded-t-2xl border-t border-line bg-base-2 shadow-2xl"
            style={{ maxHeight }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 500) onClose();
            }}
          >
            <div className="shrink-0 cursor-grab px-5 pb-3 pt-3 active:cursor-grabbing">
              <div className="sheet-handle" />
              {title && (
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="font-display text-2xl uppercase leading-none text-text">{title}</h3>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-text-dim"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
