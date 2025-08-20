"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, Logo, MenuIcon, NavItem } from "@components";
import { PAGES } from "@constants";

const Menu: FC = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // Lock scroll while open and avoid layout shift

  return (
    <>
      {/* Mobile-only menu toggle */}
      <div className="md:hidden">
        <button
          onClick={toggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          className="relative z-[60] p-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <CloseIcon />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <MenuIcon />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Overlay & Panel */}
      <AnimatePresence initial={false}>
        {open && (
          <>
            {/* Backdrop closes on click; prevents need for useOutsideAlerter */}
            <motion.button
              key="backdrop"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/40"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.aside
              key="panel"
              id="site-menu"
              ref={panelRef}
              className="fixed top-0 right-0 z-50 bg-gray-900 h-screen w-[min(600px,100dvw)] shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 sm:px-6 lg:px-10 py-6 h-full relative overflow-y-auto">
                <nav className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 text-4xl sm:text-6xl">
                  {PAGES.map((page) => (
                    <NavItem
                      key={page.path}
                      href={page.path}
                      onClick={() => close()}
                    >
                      {page.name}
                    </NavItem>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
