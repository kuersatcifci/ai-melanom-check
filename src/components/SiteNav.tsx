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

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
  const menuId = useId();
  const active = isItemActive(item, isActive);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
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
      setOpen(false);
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
    setOpen(false);
    onNavigate();
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
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

      <div
        id={menuId}
        role="menu"
        aria-label={item.label}
        className={
          "border-border/60 bg-background absolute top-full right-0 z-50 mt-2 min-w-[12rem] overflow-hidden rounded-md border shadow-lg transition-all duration-150 " +
          (open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0")
        }
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
          <LogoMark className="text-primary h-6 w-6 transition-transform group-hover:rotate-45 motion-reduce:transition-none motion-reduce:group-hover:rotate-0" />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-base font-medium tracking-tight">
              Melanom<span className="text-primary">.</span>Check
            </span>
            <span className="text-muted-foreground mt-0.5 text-[10px] uppercase tracking-[0.18em]">
              Demonstrator
            </span>
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

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={
          "bg-background fixed inset-x-0 top-[65px] bottom-0 z-30 origin-top overflow-y-auto transition-all duration-300 md:hidden " +
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
