export const metadata = {
  title: "Impressum – AI Melanom Check",
  description:
    "Impressum gemäß § 5 TMG: Kürsat Cifci, Mörfelden-Walldorf — Kontakt und Verantwortlicher für die KI-Demonstrator-Webanwendung AI Melanom Check.",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-3">
        <div className="text-primary flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
          <span aria-hidden="true" className="bg-primary h-px w-8" />
          Rechtliches
        </div>
        <h1 className="font-heading text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Impressum
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Angaben gemäß § 5 TMG.
        </p>
      </header>

      <section className="flex flex-col gap-1 text-base leading-relaxed">
        <p>Kürsat Cifci</p>
        <p>Reviolstraße 16</p>
        <p>64546 Mörfelden-Walldorf</p>
        <p>Deutschland</p>
      </section>

      <section className="flex flex-col gap-1 text-base leading-relaxed">
        <p>Telefon: 01621876305</p>
        <p>
          E-Mail:{" "}
          <a
            href="mailto:k_cifci@web.de"
            className="hover:text-primary underline underline-offset-4"
          >
            k_cifci@web.de
          </a>
        </p>
      </section>

      <p className="text-base leading-relaxed">
        Verantwortlich für den Inhalt: Kürsat Cifci
      </p>

      <p className="text-muted-foreground text-sm leading-relaxed">
        Diese Website ist ein nicht-kommerzielles Studienprojekt.
      </p>
    </main>
  );
}
