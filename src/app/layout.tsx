import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteNav />
        <div className="flex-1">{children}</div>
        <footer className="border-t mt-16">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs">
              © {new Date().getFullYear()} Kürsat Cifci — nicht-kommerzielles
              Studienprojekt.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/impressum"
                className="hover:text-foreground underline-offset-4 hover:underline"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="hover:text-foreground underline-offset-4 hover:underline"
              >
                Datenschutz
              </Link>
              <Link
                href="/methods"
                className="hover:text-foreground underline-offset-4 hover:underline"
              >
                Methoden
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
