import DemoClient from "./DemoClient";

export const metadata = {
  title: "Muttermal-Check – KI-Demo (kein Medizinprodukt)",
  description:
    "KI-basierte Hautläsionsklassifikation im Browser. Kein Upload, keine Diagnose, vollständig lokal.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return <DemoClient />;
}
