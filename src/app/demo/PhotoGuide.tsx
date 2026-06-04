const PHOTO_TIPS = [
  "Tageslicht nutzen – kein Blitz, kein direktes Sonnenlicht",
  "5 bis 10 cm Abstand halten",
  "Nur die Hautveränderung fotografieren – kein störender Hintergrund",
  "Kamera fokussieren lassen bevor Sie auslösen",
  "Dermatoskopie-Aufnahmen liefern die besten Ergebnisse",
];

export function PhotoGuide() {
  return (
    <section
      aria-labelledby="photo-guide"
      className="flex flex-col gap-5"
    >
      <header className="flex flex-col gap-1">
        <h2
          id="photo-guide"
          className="font-heading text-2xl tracking-tight"
        >
          So machen Sie ein gutes Foto
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Drei Beispiele – ein gutes und zwei häufige Fehler.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PhotoCard
          tone="good"
          title="✓ So ist es richtig"
          subtitle="5–10 cm Abstand, nur die Hautveränderung im Bild"
          svg={<PhotoSvgGood />}
        />
        <PhotoCard
          tone="bad"
          title="✗ Zu weit weg"
          subtitle="Muttermal nicht erkennbar, zu viel Hintergrund"
          svg={<PhotoSvgFar />}
        />
        <PhotoCard
          tone="bad"
          title="✗ Schlechte Beleuchtung"
          subtitle="Kein Blitz, kein Gegenlicht, kein Schatten"
          svg={<PhotoSvgLight />}
        />
      </div>

      <ul className="border-border/60 bg-muted/30 flex flex-col gap-2 rounded-md border p-4 text-sm leading-relaxed">
        {PHOTO_TIPS.map((tip) => (
          <li key={tip} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="text-primary mt-0.5 shrink-0"
            >
              •
            </span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PhotoCard({
  tone,
  title,
  subtitle,
  svg,
}: {
  tone: "good" | "bad";
  title: string;
  subtitle: string;
  svg: React.ReactNode;
}) {
  const border =
    tone === "good"
      ? "border-emerald-500 dark:border-emerald-500/70"
      : "border-red-500 dark:border-red-500/70";
  const titleColor =
    tone === "good"
      ? "text-emerald-700 dark:text-emerald-400"
      : "text-red-700 dark:text-red-400";
  return (
    <div
      className={
        "bg-card flex flex-col gap-3 rounded-md border-2 p-4 " + border
      }
    >
      <div className="bg-muted/40 aspect-square w-full overflow-hidden rounded">
        {svg}
      </div>
      <div className="flex flex-col gap-1">
        <p className={"text-sm font-semibold " + titleColor}>{title}</p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function PhotoSvgGood() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Schematische Illustration: Hautausschnitt mit deutlich sichtbarer dunkler Hautveränderung, grün umrandet."
      className="h-full w-full"
    >
      <rect
        x="2"
        y="2"
        width="116"
        height="116"
        rx="6"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="52" rx="44" ry="32" fill="#f5d0a9" />
      <ellipse cx="60" cy="52" rx="16" ry="12" fill="#6b3a2a" />
      <ellipse cx="55" cy="48" rx="3" ry="2" fill="#3a2418" opacity="0.7" />
      <rect x="50" y="98" width="20" height="14" rx="2.5" fill="#1a4f8a" />
      <circle cx="60" cy="105" r="3.5" fill="#0f3060" />
    </svg>
  );
}

function PhotoSvgFar() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Schematische Illustration: Großer Hautausschnitt mit winziger Hautveränderung – zu weit entfernt, rot umrandet."
      className="h-full w-full"
    >
      <rect
        x="2"
        y="2"
        width="116"
        height="116"
        rx="6"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="50" rx="54" ry="40" fill="#f5d0a9" />
      <circle cx="60" cy="50" r="4" fill="#6b3a2a" />
      <rect x="52" y="104" width="16" height="11" rx="2" fill="#1a4f8a" />
      <circle cx="60" cy="109.5" r="2.5" fill="#0f3060" />
    </svg>
  );
}

function PhotoSvgLight() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Schematische Illustration: Unterbelichteter Hautausschnitt mit weißem Blitz-Reflex, rot umrandet."
      className="h-full w-full"
    >
      <rect
        x="2"
        y="2"
        width="116"
        height="116"
        rx="6"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
      />
      <ellipse cx="60" cy="52" rx="44" ry="32" fill="#8b6355" opacity="0.6" />
      <ellipse cx="60" cy="52" rx="14" ry="10" fill="#3a2418" opacity="0.75" />
      <ellipse cx="86" cy="36" rx="16" ry="9" fill="white" opacity="0.75" />
      <ellipse cx="86" cy="36" rx="8" ry="4" fill="white" opacity="0.9" />
      <rect x="50" y="98" width="20" height="14" rx="2.5" fill="#1a4f8a" />
      <circle cx="60" cy="105" r="3.5" fill="#0f3060" />
    </svg>
  );
}
