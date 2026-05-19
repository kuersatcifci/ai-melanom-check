export default function ImpressumPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Impressum</h1>

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
            className="underline underline-offset-2 hover:text-foreground"
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
