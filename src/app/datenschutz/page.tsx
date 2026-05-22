export const metadata = {
  title: "Datenschutz – AI Melanom Check",
  description:
    "Datenschutz nach DSGVO: lokale Browser-Inferenz, keine Tracking-Cookies, lokal eingebettete Schriftarten, Hosting in Frankfurt am Main.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

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
          Kürsat Cifci, Reviolstraße 16, 64546 Mörfelden-Walldorf, Deutschland,{" "}
          <a
            href="mailto:k_cifci@web.de"
            className="hover:text-primary underline underline-offset-4"
          >
            k_cifci@web.de
          </a>
          .
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Hosting
        </h2>
        <p className="text-base leading-relaxed">
          Vercel Inc., 340 Pine Street Suite 701, San Francisco, CA 94104, USA.
          Serverstandort: Frankfurt am Main (Region fra1). Rechtsgrundlage:
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an zuverlässigem
          Betrieb). Ein Auftragsverarbeitungsvertrag (AVV) mit Vercel ist
          abgeschlossen. Vercel nimmt am EU-US Data Privacy Framework teil.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Schriftarten
        </h2>
        <p className="text-base leading-relaxed">
          Diese Website verwendet DM Serif Display und DM Sans. Beide
          Schriftarten werden zur Build-Zeit lokal eingebettet via next/font.
          Es findet keine Verbindung zu Google-Servern oder anderen externen
          Servern zur Laufzeit statt.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Server-Logs
        </h2>
        <p className="text-base leading-relaxed">
          Bei jedem Seitenaufruf werden durch Vercel automatisch Server-Logs
          erstellt (IP-Adresse, Zeitstempel, aufgerufene URL, HTTP-Methode,
          Browser-Typ, Referrer). Speicherdauer: 14 Tage. Rechtsgrundlage:
          Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Hochgeladene Bilder
        </h2>
        <p className="text-base leading-relaxed">
          Bilder, die Sie in der Demo hochladen, werden ausschließlich lokal in
          Ihrem Browser verarbeitet. Es findet keine Übertragung an unsere
          Server oder Dritte statt. Die Verarbeitung erfolgt clientseitig via
          ONNX Runtime Web. Bilder werden nicht gespeichert. Nach dem Schließen
          des Tabs sind alle Daten unwiederbringlich gelöscht.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          KI-Modell
        </h2>
        <p className="text-base leading-relaxed">
          Das KI-Modell wird beim ersten Besuch der Demo-Seite von Hugging Face
          Hub geladen (Anbieter: Hugging Face Inc., 20 Jay St Suite 620,
          Brooklyn, NY 11201, USA). Nach dem ersten Download wird das Modell in
          Ihrem Browser-Cache (IndexedDB) gespeichert und bei späteren Besuchen
          lokal geladen, ohne erneute externe Anfrage. Für den initialen
          Download gilt die Datenschutzerklärung von Hugging Face:{" "}
          <a
            href="https://huggingface.co/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline underline-offset-4"
          >
            https://huggingface.co/privacy
          </a>
          .
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Cookies und lokaler Speicher
        </h2>
        <p className="text-base leading-relaxed">
          Diese Website verwendet keine Tracking-Cookies, keine
          Analyse-Cookies und keine Marketing-Cookies. Im Browser-Cache
          (IndexedDB) wird ausschließlich das KI-Modell gespeichert. Dies dient
          der Funktionalität und erfordert keine Einwilligung nach § 25 Abs. 2
          Nr. 2 TDDDG. Ein Cookie-Banner ist daher nicht erforderlich.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Keine Weitergabe an Dritte
        </h2>
        <p className="text-base leading-relaxed">
          Es findet keine Weitergabe personenbezogener Daten an Dritte statt,
          außer an Vercel als Auftragsverarbeiter (Art. 28 DSGVO) und Hugging
          Face für den initialen Modell-Download.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Ihre Rechte
        </h2>
        <p className="text-base leading-relaxed">
          Nach Art. 15–21 DSGVO haben Sie das Recht auf Auskunft,
          Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch. Anfragen richten Sie bitte
          an{" "}
          <a
            href="mailto:k_cifci@web.de"
            className="hover:text-primary underline underline-offset-4"
          >
            k_cifci@web.de
          </a>
. Ihnen steht zudem ein Beschwerderecht beim Hessischen Beauftragten
          für Datenschutz und Informationsfreiheit (HBDI), Postfach 3163,
          65021 Wiesbaden,{" "}
          <a
            href="mailto:poststelle@datenschutz.hessen.de"
            className="hover:text-primary underline underline-offset-4"
          >
            poststelle@datenschutz.hessen.de
          </a>
          ,{" "}
          <a
            href="https://datenschutz.hessen.de"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline underline-offset-4"
          >
            datenschutz.hessen.de
          </a>
          , zu.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Automatisierte Entscheidungsfindung
        </h2>
        <p className="text-base leading-relaxed">
          Eine automatisierte Entscheidungsfindung nach Art. 22 DSGVO findet
          nicht statt.
        </p>
      </section>

      <p className="text-muted-foreground text-sm leading-relaxed">
        Stand: Mai 2026. Diese Datenschutzerklärung wird bei wesentlichen
        Änderungen aktualisiert.
      </p>
    </main>
  );
}
