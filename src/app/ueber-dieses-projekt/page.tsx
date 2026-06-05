import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Über dieses Projekt – Haltung & Manifest",
  description:
    "Warum diese KI-Demo lokal im Browser läuft: Souveränität by Design, Datensparsamkeit als Architektur, Patientenemanzipation durch Kommunikation – und die Schlüsselrolle der Ärztinnen und Ärzte.",
  alternates: { canonical: "/ueber-dieses-projekt" },
};

export default function UeberDiesesProjektPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-5">
        <div className="text-primary flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
          <span aria-hidden="true" className="bg-primary h-px w-8" />
          Über dieses Projekt
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
          Gesundheit braucht keine Cloud. Sie braucht{" "}
          <span className="text-primary italic">Klarheit</span>.
        </h1>
        <p className="text-foreground/85 text-lg leading-relaxed">
          Diese Demo ist klein. Ein Studienprojekt. Sieben Klassen, ein Modell,
          eine Browser-Seite. Aber sie zeigt etwas, das größer ist als sie
          selbst: dass digitale Gesundheit anders gebaut werden kann.
        </p>
      </header>

      <blockquote className="border-primary/40 border-l-2 pl-5 font-heading text-xl font-medium italic leading-snug text-foreground/90 sm:text-2xl">
        „Privacy by Design ist zu wenig. Souveränität by Design ist das Ziel.“
      </blockquote>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Die technische These
        </h2>
        <p className="text-base leading-relaxed">
          Die meiste Gesundheits-KI läuft in der Cloud, weil es bequem ist –
          nicht, weil es notwendig wäre. Vision Transformer lassen sich
          quantisieren. ONNX Runtime läuft im Browser. Inferenz auf dem
          Endgerät ist heute Standardtechnik, kein Forschungsthema. Die
          Werkzeuge sind da. Was fehlt, ist die Entscheidung, sie zu nutzen.
        </p>
        <p className="text-base leading-relaxed">
          Diese Demo ist diese Entscheidung, einmal vorgemacht.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Die politische These
        </h2>
        <p className="text-base leading-relaxed">
          Wer die Infrastruktur kontrolliert, kontrolliert die Versorgung. Wer
          die Daten besitzt, besitzt die Macht über sie. Das sind keine
          technischen Fragen. Das sind politische.
        </p>
        <p className="text-base leading-relaxed">
          Gesundheit gehört nicht in die Hände weniger Plattformen, deren
          Geschäftsmodell auf Datenakkumulation beruht. Sie gehört zu den
          Menschen, deren Körper und Krankengeschichten sie betrifft. Jedes
          Gesundheitsprojekt, das sich gegen den Reflex zur Cloud entscheidet,
          ist ein Schritt aus dieser Abhängigkeit heraus.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Daten gehören nicht auf fremde Server
        </h2>
        <p className="text-base leading-relaxed">
          Dieses Bild Ihrer Haut – wenn Sie eines hochladen würden – wäre auf
          einem typischen KI-Dienst irgendwo gespeichert. In einem Logfile. In
          einem Trainingsdatensatz. In einem Backup. Es würde Sie überdauern.
        </p>
        <p className="text-base leading-relaxed">
          Hier nicht. Was Sie auf Ihrem Gerät auswählen, bleibt auf Ihrem
          Gerät. Die Inferenz läuft im Browser, im Arbeitsspeicher, und ist
          nach dem Schließen der Seite weg. Nichts wird übertragen, weil es
          technisch nicht muss.
        </p>
        <p className="text-base leading-relaxed">
          <span className="text-foreground font-medium">
            Datensparsamkeit ist hier kein Compliance-Kostüm. Sie ist die
            Architektur.
          </span>
        </p>
      </section>

      <blockquote className="border-primary/40 border-l-2 pl-5 font-heading text-xl font-medium italic leading-snug text-foreground/90 sm:text-2xl">
        „Wer versteht, fragt besser. Wer besser fragt, wird besser behandelt.“
      </blockquote>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Patientenemanzipation durch Kommunikation
        </h2>
        <p className="text-base leading-relaxed">
          Ich glaube, dass Menschen ihre Gesundheit besser gestalten können,
          wenn sie verstehen, was mit ihnen geschieht. Das klingt
          selbstverständlich. Es ist es nicht – denn die heutige
          Gesundheitskommunikation ist häufig genau das nicht: verständlich.
        </p>
        <p className="text-base leading-relaxed">
          Die Klassen-Texte auf dieser Seite sind nicht für Suchmaschinen
          geschrieben. Sie sind für Menschen geschrieben, die etwas an ihrer
          Haut entdeckt haben und wissen wollen, was es bedeutet. Sie sind kein
          Ersatz für eine Ärztin oder einen Arzt – aber sie sollen Sie
          vorbereiten, gut informiert dorthin zu gehen.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
          Die Ärzte sind die Schlüsselrolle
        </h2>
        <p className="text-base leading-relaxed">
          Die Zukunft der Medizin gehört nicht den Informatikerinnen. Nicht den
          Data Analysts. Nicht den Plattformen.
        </p>
        <p className="text-base leading-relaxed">
          Sie gehört den Ärztinnen und Ärzten – vorausgesetzt, sie eignen sich
          die digitalen Kompetenzen an, die sie brauchen, um die Werkzeuge
          ihres Berufs selbst prüfen, verstehen und gestalten zu können. Ein
          KI-Modell, das eine Hautläsion klassifiziert, ist ein medizinisches
          Werkzeug. Es zu beurteilen ist eine medizinische Aufgabe, keine
          technische.
        </p>
        <p className="text-base leading-relaxed">
          Wenn diese Beurteilung dauerhaft an Tech-Konzerne ausgelagert wird,
          ändert sich nicht nur, wer behandelt – es ändert sich, was
          Behandlung überhaupt ist. Das wäre der falsche Weg.
        </p>
        <p className="text-base leading-relaxed">
          Was ich beitragen kann: die Brücke zwischen Technik und Heilberuf so
          bauen, dass beide einander auf Augenhöhe begegnen können. Diese Demo
          ist ein Bauteil davon.
        </p>
      </section>

      <section className="border-border/60 bg-muted/30 -mx-2 flex flex-col gap-4 rounded-lg border p-6 sm:-mx-4 sm:p-8">
        <p className="text-base leading-relaxed">
          Diese App ist nicht perfekt. Sie ist eine Demonstration, keine
          Lösung. Aber sie zeigt, dass es geht: KI im Gesundheitswesen – lokal,
          transparent, verständlich, ohne dass Daten Ihre Hand verlassen.
        </p>
        <p className="font-heading text-lg font-medium leading-snug text-foreground sm:text-xl">
          Wenn das hier der Standard wäre, sähe digitale Gesundheit anders aus.
        </p>
        <footer className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
          — Kürsat Cifci,{" "}
          <a
            href="https://kuersatcifci.de"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary underline-offset-4 hover:underline"
          >
            kuersatcifci.de
          </a>
        </footer>
      </section>

      <div className="border-border/60 flex flex-wrap gap-3 border-t pt-8">
        <Link
          href="/demo"
          className={
            buttonVariants({ variant: "default", size: "lg" }) +
            " group h-12 px-6 text-sm"
          }
        >
          Demo ausprobieren
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/"
          className={
            buttonVariants({ variant: "outline", size: "lg" }) +
            " h-12 px-6 text-sm"
          }
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
