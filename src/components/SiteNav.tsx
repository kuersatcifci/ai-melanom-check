"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

type NavChild = { href: string; label: string };

type NavItem =
  | { kind: "link"; href: string; label: string }
  | {
      kind: "linkWithMenu";
      href: string;
      label: string;
      children: readonly NavChild[];
    }
  | {
      kind: "menu";
      label: string;
      children: readonly NavChild[];
    };

const NAV: readonly NavItem[] = [
  { kind: "link", href: "/demo", label: "Ausprobieren" },
  {
    kind: "linkWithMenu",
    href: "/klassen",
    label: "Informationen",
    children: [
      { href: "/klassen", label: "Alle Klassen" },
      { href: "/muttermal", label: "Muttermale" },
    ],
  },
  {
    kind: "menu",
    label: "Modell & Compliance",
    children: [
      { href: "/methods", label: "Methoden" },
      { href: "/risk", label: "Risiken" },
    ],
  },
] as const;

type ActiveCheck = (href: string) => boolean;

function isItemActive(item: NavItem, isActive: ActiveCheck): boolean {
  if (item.kind === "link") return isActive(item.href);
  if (item.kind === "menu") return item.children.some((c) => isActive(c.href));
  return isActive(item.href) || item.children.some((c) => isActive(c.href));
}

function DesktopDropdownItem({
  item,
  isActive,
  onNavigate,
}: {
  item: Extract<NavItem, { kind: "linkWithMenu" | "menu" }>;
  isActive: ActiveCheck;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const menuId = useId();
  const active = isItemActive(item, isActive);

  const cancelCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openImmediately = () => {
    cancelCloseTimer();
    setOpen(true);
  };

  const closeImmediately = () => {
    cancelCloseTimer();
    setOpen(false);
  };

  const scheduleClose = () => {
    cancelCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 140);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const onBlurContainer = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node | null)) {
      closeImmediately();
    }
  };

  const triggerClassName =
    "relative inline-flex items-center gap-1 text-sm transition-colors " +
    (active
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground");

  const underlineClassName =
    "bg-primary absolute -bottom-1 left-0 h-px transition-all duration-300 " +
    (active ? "w-full" : "w-0");

  const handleNavigate = () => {
    closeImmediately();
    onNavigate();
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openImmediately}
      onMouseLeave={scheduleClose}
      onFocus={openImmediately}
      onBlur={onBlurContainer}
    >
      {item.kind === "linkWithMenu" ? (
        <Link
          href={item.href}
          aria-current={isActive(item.href) ? "page" : undefined}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={handleNavigate}
          className={triggerClassName}
        >
          {item.label}
          <ChevronDown
            aria-hidden="true"
            className={
              "h-3.5 w-3.5 transition-transform " +
              (open ? "rotate-180" : "rotate-0")
            }
          />
          <span aria-hidden="true" className={underlineClassName} />
        </Link>
      ) : (
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
          className={triggerClassName}
        >
          {item.label}
          <ChevronDown
            aria-hidden="true"
            className={
              "h-3.5 w-3.5 transition-transform " +
              (open ? "rotate-180" : "rotate-0")
            }
          />
          <span aria-hidden="true" className={underlineClassName} />
        </button>
      )}

      {/* Wrapper has pt-2 so the visual gap between trigger and panel
          is INSIDE the hover/focus container — moving the mouse from
          trigger to panel never leaves the dropdown root. */}
      <div
        className={
          "absolute top-full right-0 z-50 pt-2 transition-all duration-150 " +
          (open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0")
        }
      >
        <div
          id={menuId}
          role="menu"
          aria-label={item.label}
          className="border-border/60 bg-popover text-popover-foreground min-w-[12rem] overflow-hidden rounded-md border shadow-lg"
        >
          <ul className="flex flex-col py-1">
            {item.children.map((child) => {
              const childActive = isActive(child.href);
              return (
                <li key={child.href} role="none">
                  <Link
                    role="menuitem"
                    href={child.href}
                    aria-current={childActive ? "page" : undefined}
                    onClick={handleNavigate}
                    className={
                      "hover:bg-muted block px-4 py-2 text-sm transition-colors " +
                      (childActive
                        ? "text-foreground bg-muted/60"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive: ActiveCheck = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-border/60 bg-background/85 supports-[backdrop-filter]:bg-background/65 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label="Zur Startseite"
          className="group flex items-center gap-2.5"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="13" stroke="#1a4f8a" strokeWidth="0.8" opacity="0.3" />
            <circle cx="16" cy="16" r="9" stroke="#1a4f8a" strokeWidth="0.9" opacity="0.5" />
            <circle cx="16" cy="16" r="5" stroke="#1a4f8a" strokeWidth="1.1" opacity="0.7" />
            <circle cx="16" cy="16" r="2" fill="#1a4f8a" opacity="0.9" />
            <circle cx="20.5" cy="16" r="1.5" fill="#27ae60" />
            <circle cx="11.5" cy="16" r="1.5" fill="#e67e22" />
            <circle cx="16" cy="11.5" r="1.5" fill="#c0392b" />
          </svg>
          <span className="font-heading text-foreground group-hover:text-primary text-lg font-medium tracking-tight transition-colors">
            Melanom<span className="text-primary">.</span>Check
          </span>
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV.map((item) => {
            if (item.kind === "link") {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    "relative text-sm transition-colors " +
                    (active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={
                      "bg-primary absolute -bottom-1 left-0 h-px transition-all duration-300 " +
                      (active ? "w-full" : "w-0")
                    }
                  />
                </Link>
              );
            }
            return (
              <DesktopDropdownItem
                key={item.label}
                item={item}
                isActive={isActive}
                onNavigate={() => setOpen(false)}
              />
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="hover:bg-muted text-foreground -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Backdrop: dim + blur the page behind so the menu is clearly the
          active surface. Sits below the menu (z-20) and is non-interactive. */}
      <div
        aria-hidden="true"
        className={
          "fixed inset-0 z-20 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 md:hidden " +
          (open
            ? "opacity-100"
            : "pointer-events-none opacity-0")
        }
      />

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={
          "border-border/60 bg-popover text-popover-foreground fixed inset-x-0 top-[65px] bottom-0 z-30 origin-top overflow-y-auto border-t shadow-2xl transition-all duration-300 md:hidden " +
          (open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0")
        }
      >
        <nav
          aria-label="Mobile Navigation"
          className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-8"
        >
          {NAV.map((item) => {
            if (item.kind === "link") {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={
                    "flex items-baseline justify-between border-b py-4 transition-opacity " +
                    (active
                      ? "border-primary/40 text-foreground"
                      : "border-border/60 text-muted-foreground hover:text-foreground")
                  }
                >
                  <span className="font-heading text-2xl">{item.label}</span>
                </Link>
              );
            }

            return (
              <div key={item.label} className="flex flex-col gap-1">
                {item.kind === "linkWithMenu" ? (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={
                      "flex items-baseline justify-between border-b py-4 transition-opacity " +
                      (isActive(item.href)
                        ? "border-primary/40 text-foreground"
                        : "border-border/60 text-muted-foreground hover:text-foreground")
                    }
                  >
                    <span className="font-heading text-2xl">{item.label}</span>
                  </Link>
                ) : (
                  <div className="border-border/60 flex items-baseline justify-between border-b py-4">
                    <span className="font-heading text-foreground text-2xl">
                      {item.label}
                    </span>
                  </div>
                )}
                <ul
                  className="flex flex-col"
                  aria-label={`Untermenü ${item.label}`}
                >
                  {item.children.map((child) => {
                    const childActive = isActive(child.href);
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          aria-current={childActive ? "page" : undefined}
                          className={
                            "block py-2.5 pl-4 text-base transition-opacity " +
                            (childActive
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground")
                          }
                        >
                          <span className="mr-2 text-xs" aria-hidden="true">
                            ↳
                          </span>
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
            Diese Anwendung ist kein Medizinprodukt. Sie ersetzt keine
            ärztliche Untersuchung.
          </p>
        </nav>
      </div>
    </header>
  );
}
