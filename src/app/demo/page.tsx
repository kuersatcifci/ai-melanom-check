import DemoClient from "./DemoClient";

export const metadata = {
  title: "Live-Demo – AI Melanom Check",
  description:
    "Live-Demo zur Hautläsionsklassifikation: Bild in den Browser laden, Vision-Transformer-Modell läuft lokal ohne Server-Upload, Ergebnis als Ampel-Lesart.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return <DemoClient />;
}
