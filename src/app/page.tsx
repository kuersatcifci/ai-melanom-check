import Link from "next/link";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { CLASSES } from "@/lib/classes";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STEPS = [
  {
    icon: "📤",
    title: "Bild hochladen",
    text: "Laden Sie ein Foto einer Hautveränderung hoch. Die Verarbeitung erfolgt vollständig in Ihrem Browser – kein Bild wird übertragen.",
  },
  {
    icon: "🤖",
    title: "KI analysiert",
    text: "Ein vortrainiertes Vision-Transformer-Modell klassifiziert das Bild in eine von sieben dermatologischen Kategorien.",
  },
  {
    icon: "🚦",
    title: "Ergebnis lesen",
    text: "Sie erhalten eine farbige Einschätzung plus technische Details. Grün, Gelb oder Rot – mit klarer Erklärung was das bedeutet.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <DisclaimerBanner />

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          AI Melanom Check
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Browser-basierte Demo zur Hautläsionsklassifikation auf Basis des
          ISIC/HAM10000-Datensatzes. Die Inferenz erfolgt vollständig lokal im
          Browser über ONNX Runtime Web – es werden keine Bilder an einen Server
          übertragen.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Wie funktioniert die App?
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <Card key={step.title}>
              <CardHeader>
                <div
                  aria-hidden="true"
                  className="text-3xl leading-none"
                >
                  {step.icon}
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <Link
            href="/demo"
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            Demo starten
          </Link>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Erkannte Klassen</CardTitle>
          <CardDescription>
            Sieben dermatoskopische Kategorien gemäß HAM10000.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CLASSES.map((c) => (
              <li
                key={c.code}
                className="flex flex-col gap-1 rounded-md border p-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{c.label}</span>
                  <span
                    className={
                      "rounded px-2 py-0.5 text-xs font-medium " +
                      (c.malignant
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-muted-foreground")
                    }
                  >
                    {c.malignant ? "maligne" : "benigne"}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs">
                  {c.description}
                </span>
                <code className="text-muted-foreground text-[10px] uppercase tracking-wider">
                  {c.code}
                </code>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <footer className="text-muted-foreground text-xs">
        © Kürsat Cifci –{" "}
        <a
          href="https://kuersatcifci.de"
          className="underline underline-offset-2 hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          kuersatcifci.de
        </a>
      </footer>
    </main>
  );
}
