import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Methoden – AI Melanom Check",
  description:
    "Modellkarte: Architektur, Trainingsdaten, Bias-Risiken, Limitationen und regulatorische Einordnung.",
};

type DetailRow = { label: string; value: React.ReactNode };

function DetailList({ items }: { items: DetailRow[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-[max-content_1fr]">
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="text-muted-foreground font-medium">{item.label}</dt>
          <dd className="leading-relaxed">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 text-sm leading-relaxed">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span aria-hidden="true" className="text-muted-foreground">
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MethodsPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Modellkarte</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Transparenzdokument zu Modell, Trainingsdaten, Grenzen und Risiken.
          Diese Demo ist kein Medizinprodukt und nicht klinisch validiert.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>1. Modell-Details</CardTitle>
          <CardDescription>
            Identifikation, Herkunft und Hosting des verwendeten Modells.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DetailList
            items={[
              {
                label: "Name",
                value: "Skin Lesion Classifier (Demo) v0.1.0",
              },
              {
                label: "Basis",
                value: (
                  <>
                    <span className="font-mono">
                      Anwarkh1/Skin_Cancer-Image_Classification
                    </span>{" "}
                    (ViT-Base, fine-tuned auf HAM10000)
                  </>
                ),
              },
              {
                label: "Quantisierung",
                value: "INT8 (dynamic quantization via ONNX Runtime)",
              },
              {
                label: "Lizenz",
                value:
                  "Apache-2.0 (Modell), CC BY-NC 4.0 (Trainingsdaten HAM10000)",
              },
              {
                label: "Hosting",
                value: (
                  <span className="font-mono">
                    kmpsia/ai-melanom-check-model
                  </span>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Zweckbestimmung</CardTitle>
          <CardDescription>
            Wofür dieses Modell gedacht ist – und wofür ausdrücklich nicht.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Vorgesehen für:</p>
            <BulletList
              items={[
                "Technische Demonstration",
                "Bildungskontext",
                "Nicht-kommerzielle Nutzung",
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-destructive text-sm font-medium">
              Ausdrücklich NICHT vorgesehen für:
            </p>
            <BulletList
              items={[
                "Klinische Diagnose",
                "Screening",
                "Triage",
                "Medizinische Entscheidungen",
                "Selbstdiagnose",
                "Pädiatrische Patienten",
                "Akrale oder mukosale Läsionen",
              ]}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Trainingsdaten</CardTitle>
          <CardDescription>
            Datensatz, Verteilung und bekannte Repräsentationslücken.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <DetailList
            items={[
              {
                label: "Datensatz",
                value: (
                  <>
                    HAM10000 (Tschandl et al. 2018,{" "}
                    <span className="font-mono">
                      doi:10.1038/sdata.2018.161
                    </span>
                    )
                  </>
                ),
              },
              {
                label: "Umfang",
                value: "10.015 dermatoskopische Bilder, 7 Klassen",
              },
              {
                label: "Herkunft",
                value: "ViDIR Group Wien + Queensland, Australien",
              },
            ]}
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Klassenverteilung:</p>
            <BulletList
              items={[
                <>
                  <span className="font-mono">NV</span> 67 %
                </>,
                <>
                  <span className="font-mono">MEL</span> 11 %
                </>,
                <>
                  <span className="font-mono">BKL</span> 11 %
                </>,
                <>
                  <span className="font-mono">BCC</span> 5 %
                </>,
                <>
                  <span className="font-mono">AKIEC</span> 3 %
                </>,
                <>
                  <span className="font-mono">VASC</span> 1,4 %
                </>,
                <>
                  <span className="font-mono">DF</span> 1,1 %
                </>,
              ]}
            />
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <span className="text-foreground font-medium">Limitation:</span>{" "}
            Population überwiegend Fitzpatrick Hauttyp I–III.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Bekannte Bias-Risiken</CardTitle>
          <CardDescription>
            Systematische Verzerrungen, die die Vorhersagequalität beeinflussen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BulletList
            items={[
              <>
                <span className="font-medium">Hautton-Bias:</span> Daneshjou et
                al. 2022 (Science Advances) zeigten einen ROC-AUC-Drop von
                27–36 % bei Fitzpatrick V–VI.
              </>,
              <>
                <span className="font-medium">Geografischer Bias:</span>{" "}
                Trainingsdaten aus Wien und Queensland, keine globale
                Repräsentation.
              </>,
              <>
                <span className="font-medium">Bildqualität:</span> Modell
                trainiert auf Dermatoskopie-Aufnahmen – Smartphone-Fotos können
                stark abweichen.
              </>,
              <>
                <span className="font-medium">Klassenimbalanz:</span>{" "}
                <span className="font-mono">NV</span> überrepräsentiert (67 %),
                kann zu Fehlzuordnungen führen.
              </>,
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Technische Limitationen</CardTitle>
          <CardDescription>
            Bekannte Schwächen der Implementierung.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BulletList
            items={[
              "INT8-Quantisierung kann Genauigkeit gegenüber FP32 reduzieren.",
              "Softmax-Outputs sind keine kalibrierten medizinischen Wahrscheinlichkeiten.",
              "Kein Pre-Processing-Schritt vor Quantisierung (ONNX-Runtime-Empfehlung nicht umgesetzt).",
              "Nicht klinisch validiert.",
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>6. Ethische Erwägungen</CardTitle>
          <CardDescription>
            Mögliche Schäden bei Fehleinsatz und sicherer Umgang.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BulletList
            items={[
              "Falsche Sicherheit bei gefährlicher Läsion kann lebensbedrohlich sein.",
              "Falschalarm kann unnötige Angst verursachen.",
              "Keine Nutzung für echte medizinische Entscheidungen.",
              "Bei Hautveränderungen immer Dermatologin oder Dermatologen aufsuchen.",
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7. Vergleich mit zugelassenen Produkten</CardTitle>
          <CardDescription>
            Abgrenzung zu zertifizierten Medizinprodukten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BulletList
            items={[
              <>
                <span className="font-medium">SkinVision:</span> CE-Zertifikat
                MDR Klasse IIa seit August 2025, klinisch validiert.
              </>,
              <>
                <span className="font-medium">DermaSensor:</span> FDA 510(k)
                zugelassen Januar 2024.
              </>,
              <>
                <span className="font-medium">Diese Demo:</span> kein
                Medizinprodukt, keine Zulassung, kein klinischer Nachweis.
              </>,
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>8. EU AI Act Einordnung</CardTitle>
          <CardDescription>
            Regulatorische Bewertung nach der KI-Verordnung (Verordnung (EU)
            2024/1689).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <BulletList
            items={[
              "Wäre die App ein Medizinprodukt (MDR), würde sie automatisch als Hochrisiko-KI nach Art. 6(1) i. V. m. Anhang I KI-VO gelten.",
              "Als nicht-kommerzieller Demonstrator ohne medizinische Zweckbestimmung fällt sie nicht unter die Hochrisiko-Kategorien.",
            ]}
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">
              Relevante Pflichten bei echter Nutzung wären:
            </p>
            <BulletList
              items={[
                "Art. 9 – Risikomanagement",
                "Art. 10 – Datenqualität",
                "Art. 13 – Transparenz",
                "Art. 14 – Menschliche Aufsicht",
                "Art. 15 – Robustheit",
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
