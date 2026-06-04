"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { persistUnlock } from "./demo-unlock";

const DEMO_PASSWORD = "jaichdarf";
const LINKEDIN_URL = "https://www.linkedin.com/in/kuersatcifci/";

export function PasswordGate({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  const onSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput.trim() === DEMO_PASSWORD) {
      track("demo_freigeschaltet");
      persistUnlock();
      onOpenChange(false);
      setPwInput("");
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setPwError(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-4 w-4" aria-hidden="true" />
            Zugang geschützt
          </DialogTitle>
          <DialogDescription>
            Diese Demo darf aus rechtlichen Gründen – Medizinprodukte-Verordnung
            (MDR, EU 2017/745) – nicht frei öffentlich zugänglich sein. Wenn Sie
            sie nutzen möchten, kontaktieren Sie mich gerne über{" "}
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            . Sie erhalten dann das Zugangspasswort.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitPassword} className="flex flex-col gap-3">
          <Input
            type="password"
            value={pwInput}
            onChange={(e) => {
              setPwInput(e.target.value);
              setPwError(false);
            }}
            placeholder="Passwort"
            autoFocus
            aria-invalid={pwError}
            aria-label="Zugangspasswort"
          />
          {pwError && (
            <p className="text-destructive text-sm" role="alert">
              Falsches Passwort. Bitte erneut versuchen.
            </p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center justify-center text-sm underline underline-offset-4"
            >
              Auf LinkedIn kontaktieren
            </a>
            <Button type="submit">Freischalten</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
