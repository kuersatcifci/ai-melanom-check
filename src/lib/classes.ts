export type LesionClass = {
  code: string;
  label: string;
  description: string;
  malignant: boolean;
};

export const CLASSES: readonly LesionClass[] = [
  {
    code: "akiec",
    label: "Aktinische Keratose / M. Bowen",
    description: "Aktinische Keratosen und intraepitheliales Karzinom",
    malignant: true,
  },
  {
    code: "bcc",
    label: "Basalzellkarzinom",
    description: "Basalzellkarzinom (heller Hautkrebs)",
    malignant: true,
  },
  {
    code: "bkl",
    label: "Benigne Keratose",
    description: "Gutartige keratoseartige Läsionen (z. B. seborrhoische Keratose)",
    malignant: false,
  },
  {
    code: "df",
    label: "Dermatofibrom",
    description: "Gutartiges fibröses Hautknötchen",
    malignant: false,
  },
  {
    code: "mel",
    label: "Melanom",
    description: "Malignes Melanom (schwarzer Hautkrebs)",
    malignant: true,
  },
  {
    code: "nv",
    label: "Melanozytärer Nävus",
    description: "Gutartiges Pigmentmal / Muttermal",
    malignant: false,
  },
  {
    code: "vasc",
    label: "Vaskuläre Läsion",
    description: "Gefäßveränderungen (z. B. Angiom, Hämangiom)",
    malignant: false,
  },
] as const;

export const CLASS_CODES = CLASSES.map((c) => c.code);

export const NUM_CLASSES = CLASSES.length;
