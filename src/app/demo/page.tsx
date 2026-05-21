import DemoClient from "./DemoClient";

export const metadata = {
  title: "Muttermal-Check – AI Melanom Check",
  description:
    "KI-basierte Hautläsionsklassifikation im Browser. Kein Upload, keine Diagnose, vollständig lokal.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return <DemoClient />;
}
