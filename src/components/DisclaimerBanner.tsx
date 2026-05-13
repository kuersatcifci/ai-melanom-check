import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DisclaimerBanner() {
  return (
    <Alert variant="destructive" role="alert" aria-live="polite">
      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
      <AlertTitle>Kein Medizinprodukt – keine Diagnose</AlertTitle>
      <AlertDescription>
        Diese Anwendung ist <strong>kein Medizinprodukt</strong> im Sinne der
        Verordnung (EU) 2017/745 (MDR) und dient ausschließlich als
        Compliance-Demonstrator und Studienprojekt. Die Ergebnisse sind{" "}
        <strong>nicht für die medizinische Diagnose, Behandlung oder
        Vorsorge</strong> geeignet. Wenden Sie sich bei Hautveränderungen
        ausschließlich an eine Ärztin oder einen Arzt.
      </AlertDescription>
    </Alert>
  );
}
