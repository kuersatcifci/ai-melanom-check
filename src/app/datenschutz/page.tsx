export default function DatenschutzPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-3">
        <div className="text-primary flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
          <span aria-hidden="true" className="bg-primary h-px w-8" />
          Rechtliches
        </div>
        <h1 className="font-heading text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
          Datenschutzerklärung
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Informationen zur Verarbeitung Ihrer Daten gemäß DSGVO.
        </p>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Verantwortlicher
        </h2>
        <p className="text-base leading-relaxed">
          Kürsat Cifci, Reviolstraße 16, 64546 Mörfelden-Walldorf,{" "}
          <a
            href="mailto:k_cifci@web.de"
            className="hover:text-primary underline underline-offset-4"
          >
            k_cifci@web.de
          </a>
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Hosting
        </h2>
        <p className="text-base leading-relaxed">
          Vercel Inc., Frankfurt-Region fra1, EU-US Data Privacy Framework.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Verarbeitete Daten
        </h2>
        <p className="text-base leading-relaxed">
          Nur Server-Logs (IP-Adresse, Zeitstempel) – keine Gesundheitsdaten.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Hochgeladene Bilder
        </h2>
        <p className="text-base leading-relaxed">
          Werden ausschließlich lokal im Browser verarbeitet. Keine Übertragung
          an Server. Keine Speicherung.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Ihre Rechte
        </h2>
        <p className="text-base leading-relaxed">
          Auskunft, Löschung, Widerspruch nach Art. 15–21 DSGVO, Beschwerde
          beim BfDI.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Cookies
        </h2>
        <p className="text-base leading-relaxed">
          Keine Tracking-Cookies, kein Cookie-Banner erforderlich.
        </p>
      </section>
    </main>
  );
}
