import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CLASSES } from "@/lib/classes";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Params = { code: string };

export function generateStaticParams(): Params[] {
  return CLASSES.map((c) => ({ code: c.code }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const klass = CLASSES.find((c) => c.code === code);
  if (!klass) return {};
  return {
    title: `${klass.label} (${klass.code.toUpperCase()}) – Melanom.Check`,
    description: klass.description,
  };
}

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { code } = await params;
  const klass = CLASSES.find((c) => c.code === code);
  if (!klass) notFound();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12">
      <nav aria-label="Breadcrumb" className="text-muted-foreground text-xs">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-foreground">
              Startseite
            </Link>
          </li>
          <li aria-hidden="true">→</li>
          <li>Klassen</li>
          <li aria-hidden="true">→</li>
          <li className="text-foreground">{klass.label}</li>
        </ol>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <code className="text-muted-foreground font-mono text-xs uppercase tracking-[0.22em]">
            {klass.code}
          </code>
          <span
            className={
              "rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider " +
              (klass.malignant
                ? "bg-destructive/10 text-destructive"
                : "bg-muted text-muted-foreground")
            }
          >
            {klass.malignant ? "maligne" : "benigne"}
          </span>
        </div>
        <h1 className="font-heading text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          {klass.label}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          {klass.description}
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Was ist das?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed italic">
            Medizinische Informationen folgen.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typische Merkmale</CardTitle>
          <CardDescription>
            Platzhalter – Inhalte werden noch von einer Fachperson geprüft.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 text-sm leading-relaxed">
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-muted-foreground">
                •
              </span>
              <span className="text-muted-foreground italic">
                Merkmal 1 – Platzhalter
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-muted-foreground">
                •
              </span>
              <span className="text-muted-foreground italic">
                Merkmal 2 – Platzhalter
              </span>
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-muted-foreground">
                •
              </span>
              <span className="text-muted-foreground italic">
                Merkmal 3 – Platzhalter
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wann zum Arzt?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed italic">
            Medizinische Informationen folgen.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quellen</CardTitle>
          <CardDescription>
            Referenzen werden ergänzt, sobald die Fachprüfung abgeschlossen ist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm italic">
            Noch keine Quellen verfügbar.
          </p>
        </CardContent>
      </Card>

      <div className="pt-2">
        <Link
          href="/"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
