export default function DatenschutzPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        Datenschutzerklärung
      </h1>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Verantwortlicher</h2>
        <p className="text-base leading-relaxed">
          Kürsat Cifci, Reviolstraße 16, 64546 Mörfelden-Walldorf,{" "}
          <a
            href="mailto:k_cifci@web.de"
            className="underline underline-offset-2 hover:text-foreground"
          >
            k_cifci@web.de
          </a>
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Hosting</h2>
        <p className="text-base leading-relaxed">
          Vercel Inc., Frankfurt-Region fra1, EU-US Data Privacy Framework.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Verarbeitete Daten</h2>
        <p className="text-base leading-relaxed">
          Nur Server-Logs (IP-Adresse, Zeitstempel) – keine Gesundheitsdaten.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Hochgeladene Bilder</h2>
        <p className="text-base leading-relaxed">
          Werden ausschließlich lokal im Browser verarbeitet. Keine Übertragung
          an Server. Keine Speicherung.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Ihre Rechte</h2>
        <p className="text-base leading-relaxed">
          Auskunft, Löschung, Widerspruch nach Art. 15–21 DSGVO, Beschwerde beim
          BfDI.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p className="text-base leading-relaxed">
          Keine Tracking-Cookies, kein Cookie-Banner erforderlich.
        </p>
      </section>
    </main>
  );
}
