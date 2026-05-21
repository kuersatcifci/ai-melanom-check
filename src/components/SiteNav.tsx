"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/demo", label: "Demo" },
  { href: "/klassen", label: "Klassen" },
  { href: "/methods", label: "Methoden" },
  { href: "/risk", label: "Risiken" },
];

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-border/60 bg-background/85 supports-[backdrop-filter]:bg-background/65 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          aria-label="Zur Startseite"
          className="group flex items-center gap-2.5"
        >
          <LogoMark className="text-primary h-6 w-6 transition-transform group-hover:rotate-45" />
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
          {LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  "relative text-sm transition-colors " +
                  (active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={
                    "bg-primary absolute -bottom-1 left-0 h-px transition-all duration-300 " +
                    (active ? "w-full" : "w-0 group-hover:w-full")
                  }
                />
              </Link>
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
          "bg-background fixed inset-x-0 top-[65px] bottom-0 z-30 origin-top transition-all duration-300 md:hidden " +
          (open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0")
        }
      >
        <nav
          aria-label="Mobile Navigation"
          className="mx-auto flex w-full max-w-3xl flex-col gap-1 px-6 py-8"
        >
          {LINKS.map((link, i) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={
                  "flex items-baseline justify-between border-b py-4 transition-opacity " +
                  (active
                    ? "border-primary/40 text-foreground"
                    : "border-border/60 text-muted-foreground hover:text-foreground") +
                  (open ? " animate-in fade-in slide-in-from-top-2" : "")
                }
                style={{ animationDelay: open ? `${i * 50}ms` : undefined }}
              >
                <span className="font-heading text-2xl">{link.label}</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  0{i + 1}
                </span>
              </Link>
            );
          })}
          <p className="text-muted-foreground mt-8 text-xs leading-relaxed">
            Diese Anwendung ist kein Medizinprodukt. Sie ersetzt keine
            ärztliche Untersuchung.
          </p>
        </nav>
      </div>
    </header>
  );
}
