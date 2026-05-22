import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melanom.Check – KI-Demonstrator für Hautläsionsklassifikation",
  description:
    "Browser-basierte KI-Demo zur Hautläsionsklassifikation. Vollständig lokale Inferenz, kein Daten-Upload.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteNav />
        <div className="flex-1">{children}</div>
        <footer className="border-t mt-16">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
              <div className="flex flex-col gap-3">
                <p className="font-heading text-lg font-medium">
                  AI Melanom Check
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ein nicht-kommerzielles Studienprojekt von Kürsat Cifci –
                  Information Science M.Sc.
                </p>
                <a
                  href="https://kuersatcifci.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary group inline-flex w-fit items-center gap-1 text-sm underline-offset-4 hover:underline"
                >
                  kuersatcifci.de
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
                  Ausprobieren
                </p>
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <Link
                      href="/demo"
                      className="hover:text-primary text-foreground underline-offset-4 hover:underline"
                    >
                      Demo
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
                  Informationen
                </p>
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <Link
                      href="/klassen"
                      className="hover:text-primary text-foreground underline-offset-4 hover:underline"
                    >
                      Alle Klassen
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/muttermal"
                      className="hover:text-primary text-foreground underline-offset-4 hover:underline"
                    >
                      Muttermale
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
                  Modell &amp; Compliance
                </p>
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <Link
                      href="/methods"
                      className="hover:text-primary text-foreground underline-offset-4 hover:underline"
                    >
                      Methoden
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/risk"
                      className="hover:text-primary text-foreground underline-offset-4 hover:underline"
                    >
                      Risiken
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground text-xs uppercase tracking-[0.18em]">
                  Rechtliches
                </p>
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <Link
                      href="/impressum"
                      className="hover:text-primary text-foreground underline-offset-4 hover:underline"
                    >
                      Impressum
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/datenschutz"
                      className="hover:text-primary text-foreground underline-offset-4 hover:underline"
                    >
                      Datenschutz
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-border/60 text-muted-foreground mt-10 border-t pt-6 text-xs leading-relaxed">
              AI Melanom Check ist eine browserbasierte KI-Demonstration zu
              Bildungs- und Forschungszwecken. Kein Medizinprodukt nach MDR
              (EU 2017/745). Keine medizinische Diagnose. Ersetzt keine
              ärztliche Untersuchung. Bei verdächtigen Hautveränderungen suchen
              Sie bitte eine dermatologische Praxis auf.
            </div>

            <p className="text-muted-foreground/70 mt-4 text-xs tracking-wide">
              Keine Cookies · Kein Tracking · Privacy by Design
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
