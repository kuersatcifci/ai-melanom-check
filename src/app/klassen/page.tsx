import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CLASSES } from "@/lib/classes";
import { DermatoscopeBg } from "@/components/DermatoscopeBg";

export const metadata = {
  title: "Hautläsionen im Überblick – AI Melanom Check",
  description:
    "Sieben dermatoskopische Kategorien erklärt: von Muttermal bis Melanom. Medizinisch fundiert, verständlich für alle.",
  alternates: { canonical: "/klassen" },
};

const CLASS_BLURBS: Record<string, string> = {
  akiec:
    "Frühform des Plattenepithelkarzinoms — raue, schuppige Hautveränderungen auf chronisch sonnenexponierter Haut.",
  bcc: "Häufigste Krebserkrankung in Mitteleuropa — wächst meist langsam und bildet äußerst selten Metastasen.",
  bkl: "Gutartige Alterswarzen und Altersflecken — harmlos, werden aber optisch oft mit einem Melanom verwechselt.",
  df: "Gutartiger derber Knoten im Bindegewebe — entsteht oft als Narbenreaktion nach kleinen Hautverletzungen.",
  mel: "Gefährlichste Form von Hautkrebs — bei früher Erkennung jedoch sehr gut heilbar.",
  nv: "Gutartiges Muttermal — extrem häufig, regelmäßige Selbstbeobachtung auf Veränderungen ist wichtig.",
  vasc: "Gutartige Veränderungen der Blutgefäße — rot bis violett, durch Druck wegdrückbar.",
};

export default function KlassenIndexPage() {
  return (
    <main className="relative isolate mx-auto flex w-full max-w-5xl flex-col gap-10 overflow-hidden px-6 py-16">
      <DermatoscopeBg className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-[250px] w-[250px] opacity-15 lg:block" />
      <nav aria-label="Breadcrumb" className="text-muted-foreground text-xs">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Startseite
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li className="text-foreground">Klassen</li>
        </ol>
      </nav>

      <header className="flex max-w-3xl flex-col gap-4">
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Hautläsionen
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
          Sieben dermatoskopische Kategorien aus dem HAM10000-Datensatz — von
          gutartig bis bösartig. Klicken Sie auf eine Kategorie für
          ausführliche Informationen zu Merkmalen, Häufigkeit und
          regulatorischer Einordnung.
        </p>
      </header>

      <section aria-labelledby="klassen-grid">
        <h2 id="klassen-grid" className="sr-only">
          Liste der Hautläsionsklassen
        </h2>
        <ul
          role="list"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CLASSES.map((klass) => {
            const blurb = CLASS_BLURBS[klass.code] ?? klass.description;
            const isMalignant = klass.malignant;
            return (
              <li key={klass.code} className="flex">
                <Link
                  href={`/klassen/${klass.code}`}
                  aria-label={`Mehr über ${klass.label} (${klass.code.toUpperCase()}) — ${
                    isMalignant ? "maligne" : "benigne"
                  }`}
                  className={
                    "group/card bg-card text-card-foreground hover:ring-foreground/30 motion-reduce:transition-none focus-visible:outline-ring/60 flex w-full flex-col gap-4 rounded-xl px-5 py-5 ring-1 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 " +
                    (isMalignant
                      ? "ring-destructive/40 border-l-4 border-destructive pl-4"
                      : "ring-foreground/10")
                  }
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <code className="text-muted-foreground font-mono text-[11px] uppercase tracking-[0.22em]">
                      {klass.code}
                    </code>
                    <span
                      className={
                        "rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider " +
                        (isMalignant
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground")
                      }
                    >
                      {isMalignant ? "maligne" : "benigne"}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-medium leading-tight tracking-tight">
                    {klass.label}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {blurb}
                  </p>
                  <span className="text-primary mt-auto inline-flex items-center gap-1 text-xs font-medium">
                    Details ansehen
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-label="Legende"
        className="border-border/60 text-muted-foreground flex flex-wrap items-center gap-4 rounded-md border px-5 py-4 text-xs leading-relaxed"
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="border-destructive h-4 w-1 rounded-sm border-l-4"
          />
          <span>
            <strong className="text-foreground font-semibold">maligne</strong>{" "}
            — bösartig, ärztliche Abklärung erforderlich
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="bg-muted h-3 w-3 rounded-full"
          />
          <span>
            <strong className="text-foreground font-semibold">benigne</strong>{" "}
            — gutartig, in der Regel harmlos
          </span>
        </div>
      </section>

      <p className="bg-muted text-muted-foreground rounded-md p-5 text-xs leading-relaxed">
        Stand: Mai 2026. Die hier dargestellten Informationen dienen
        ausschließlich der allgemeinen Aufklärung und ersetzen keine ärztliche
        Untersuchung. Bei Hautveränderungen suchen Sie bitte eine
        dermatologische Praxis auf.
      </p>
    </main>
  );
}
