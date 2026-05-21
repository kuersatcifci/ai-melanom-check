import { ShieldCheck, XCircle } from "lucide-react";

export const metadata = {
  title: "Wie die KI funktioniert – AI Melanom Check",
  description:
    "Wie die KI funktioniert: Trainingsdaten, Modellarchitektur, bekannte Limitationen und regulatorische Einordnung. In klarer Sprache für Laien und Fachpublikum.",
  alternates: { canonical: "/methods" },
};

const CANNOT_DO = [
  "Die KI stellt keine Diagnose. Sie erkennt Muster, keine Krankheiten.",
  "Die KI kennt Ihre Krankengeschichte nicht.",
  "Die KI sieht nur das Foto — kein Arzt kann nur ein Foto zur Diagnose nutzen.",
  "Die KI wurde hauptsächlich mit Bildern von heller Haut trainiert — bei dunklen Hauttönen ist sie weniger zuverlässig.",
  "Die Prozentzahlen sind keine medizinischen Wahrscheinlichkeiten.",
] as const;

const LIMITATIONS = [
  {
    label: "Hautton-Bias",
    text: "Daneshjou et al. (2022) zeigten in einer kuratierten klinischen Stichprobe einen ROC-AUC-Drop von 27–36 % bei Fitzpatrick V–VI gegenüber I–II.",
  },
  {
    label: "Klassenimbalanz",
    text: "Die Klasse NV (Muttermal) macht 67 % des HAM10000-Datensatzes aus — Accuracy als alleinige Metrik ist daher irreführend; Balanced Accuracy bzw. Macro-F1 sind nach Art. 15 EU AI Act zu bevorzugen.",
  },
  {
    label: "Nicht klinisch validiert",
    text: "Diese Anwendung ist ein Compliance-Demonstrator ohne medizinische Zweckbestimmung — keine CE-Kennzeichnung, keine klinische Bewertung nach Art. 61 MDR.",
  },
  {
    label: "Konfidenz ≠ Wahrscheinlichkeit",
    text: "Softmax-Outputs sind unkalibrierte Modell-Konfidenzen und damit keine medizinischen Wahrscheinlichkeiten — eine Kalibrierung (z. B. Temperature Scaling, isotonic regression) wäre für klinische Nutzung verpflichtend.",
  },
] as const;

const SOURCES = [
  {
    text: "Tschandl, P., Rosendahl, C., & Kittler, H. (2018). The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions. Scientific Data, 5, 180161.",
    url: "https://doi.org/10.1038/sdata.2018.161",
  },
  {
    text: "Daneshjou, R., Vodrahalli, K., Novoa, R. A., Jenkins, M., Liang, W., Rotemberg, V., Ko, J., Swetter, S. M., Bailey, E. E., Gevaert, O., Mukherjee, P., Phung, M., Yekrang, K., Fong, B., Sahasrabudhe, R., Allerup, J. A. C., Okata-Karigane, U., Zou, J., & Chiou, A. S. (2022). Disparities in dermatology AI performance on a diverse, curated clinical image set. Science Advances, 8(31), eabq6147.",
    url: "https://doi.org/10.1126/sciadv.abq6147",
  },
  {
    text: "Verordnung (EU) 2024/1689 des Europäischen Parlaments und des Rates vom 13. Juni 2024 zur Festlegung harmonisierter Vorschriften für künstliche Intelligenz (Verordnung über künstliche Intelligenz, KI-VO).",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
  },
  {
    text: "Verordnung (EU) 2017/745 über Medizinprodukte (Medizinprodukteverordnung, MDR).",
    url: "https://eur-lex.europa.eu/eli/reg/2017/745/oj",
  },
] as const;

export default function MethodsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-3">
        <div className="text-primary flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
          <span aria-hidden="true" className="bg-primary h-px w-8" />
          Transparenz
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Wie funktioniert die KI?
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Diese Seite erklärt in einfacher Sprache, was die KI tut, was sie
          nicht kann, woher ihre Lernbilder kommen — und liefert am Ende die
          technischen Details für Fachpublikum.
        </p>
      </header>

      {/* Sektion 1 — Was macht die KI? */}
      <section
        aria-labelledby="was-macht"
        className="flex flex-col gap-4"
      >
        <h2
          id="was-macht"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was macht die KI genau?
        </h2>
        <p className="leading-relaxed">
          Das Programm hat über{" "}
          <strong className="font-semibold">10.000 Bilder</strong> von
          Hautveränderungen angeschaut, die von Hautärzten beschriftet wurden.
          Es hat dabei gelernt, welche Bildmuster zu welcher Kategorie
          gehören.
        </p>
        <p className="leading-relaxed">
          Wenn Sie ein neues Bild hochladen, vergleicht das Programm es mit
          allem, was es gelernt hat, und sagt:{" "}
          <em>
            „Dieses Bild ähnelt am stärksten den Bildern der Kategorie X.“
          </em>
        </p>
        <p className="leading-relaxed">
          Das Ergebnis ist also keine Diagnose, sondern eine{" "}
          <strong className="font-semibold">Ähnlichkeits-Einschätzung</strong>{" "}
          — ein Vorschlag, der ärztlich überprüft werden muss.
        </p>
      </section>

      {/* Sektion 2 — Was die KI nicht kann */}
      <section
        aria-labelledby="kann-nicht"
        className="flex flex-col gap-5"
      >
        <h2
          id="kann-nicht"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Was die KI nicht kann — und warum das wichtig ist
        </h2>
        <ul className="flex flex-col gap-3" role="list">
          {CANNOT_DO.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <XCircle
                aria-hidden="true"
                className="text-destructive mt-0.5 h-5 w-5 shrink-0"
              />
              <span className="text-base leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Sektion 3 — Woher stammen die Lernbilder? */}
      <section aria-labelledby="lernbilder" className="flex flex-col gap-4">
        <h2
          id="lernbilder"
          className="font-heading text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Woher stammen die Lernbilder?
        </h2>
        <p className="leading-relaxed">
          Die KI wurde mit dem{" "}
          <strong className="font-semibold">HAM10000-Datensatz</strong>{" "}
          trainiert — einer Sammlung von über 10.000 dermatoskopischen
          Aufnahmen aus Hautkliniken in Wien und Queensland, Australien. Die
          Bilder wurden von Hautärzten klassifiziert und sind öffentlich
          zugänglich für Forschungszwecke.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Quelle: Tschandl, P., Rosendahl, C., &amp; Kittler, H. (2018). The
          HAM10000 dataset. <em>Scientific Data, 5</em>, 180161.{" "}
          <a
            href="https://doi.org/10.1038/sdata.2018.161"
            rel="noreferrer"
            className="text-primary underline underline-offset-2 hover:text-foreground"
          >
            doi.org/10.1038/sdata.2018.161
          </a>
        </p>
      </section>

      {/* Sektion 4 — Für Fachpublikum */}
      <section
        aria-labelledby="fachpublikum"
        className="bg-muted/30 border-border/60 -mx-2 flex flex-col gap-6 rounded-lg border p-6 text-sm sm:-mx-4 sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
            <ShieldCheck aria-hidden="true" className="h-3 w-3" />
            Für Fachpublikum
          </span>
        </div>
        <h2
          id="fachpublikum"
          className="font-heading text-xl font-medium leading-tight tracking-tight sm:text-2xl"
        >
          Technische Details für Fachpublikum
        </h2>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-base font-medium leading-tight">
            Modellarchitektur
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Vision Transformer (ViT-Base), fine-tuned auf HAM10000,
            INT8-quantisiert via ONNX Runtime für vollständige Browser-
            Inferenz ohne Server-Roundtrip. Basismodell:{" "}
            <span className="font-mono">
              Anwarkh1/Skin_Cancer-Image_Classification
            </span>{" "}
            (Apache-2.0). Hosting der Gewichte:{" "}
            <span className="font-mono">kmpsia/ai-melanom-check-model</span>{" "}
            auf Hugging Face.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-base font-medium leading-tight">
            Bekannte Limitationen
          </h3>
          <ul className="flex flex-col gap-2.5" role="list">
            {LIMITATIONS.map((item) => (
              <li
                key={item.label}
                className="text-muted-foreground leading-relaxed"
              >
                <strong className="text-foreground font-semibold">
                  {item.label}:
                </strong>{" "}
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading text-base font-medium leading-tight">
            Regulatorische Einordnung
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Wäre die App ein Medizinprodukt im Sinne der MDR, würde sie
            automatisch als{" "}
            <strong className="text-foreground font-semibold">
              Hochrisiko-KI
            </strong>{" "}
            nach EU AI Act Art. 6 Abs. 1 in Verbindung mit Anhang I gelten —
            mit Pflichten zu Risikomanagement (Art. 9), Daten-Governance
            (Art. 10), Transparenz (Art. 13), menschlicher Aufsicht (Art. 14)
            und Genauigkeit/Robustheit (Art. 15). Als Compliance-Demonstrator
            ohne medizinische Zweckbestimmung fällt diese App nicht darunter
            und wird ausdrücklich nicht als Medizinprodukt in Verkehr
            gebracht.
          </p>
        </div>
      </section>

      {/* Quellen */}
      <section aria-labelledby="quellen" className="flex flex-col gap-4">
        <h2
          id="quellen"
          className="font-heading text-2xl font-medium leading-tight tracking-tight"
        >
          Quellen
        </h2>
        <ol
          role="list"
          className="flex list-decimal flex-col gap-3 pl-5 text-sm leading-relaxed"
        >
          {SOURCES.map((source) => (
            <li key={source.url} className="pl-1">
              <span>{source.text} </span>
              <a
                href={source.url}
                rel="noreferrer"
                className="text-primary break-all underline underline-offset-2 hover:text-foreground"
              >
                {source.url}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
