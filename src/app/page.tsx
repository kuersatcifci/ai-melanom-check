import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { CLASSES } from "@/lib/classes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
