// Kleiner externer Store: hält die Freischaltung über die Sitzung (sessionStorage)
// und benachrichtigt React-Komponenten, ohne setState im Effect aufzurufen.
const UNLOCK_STORAGE_KEY = "demo-unlocked";

const unlockListeners = new Set<() => void>();

export function subscribeUnlock(cb: () => void) {
  unlockListeners.add(cb);
  return () => unlockListeners.delete(cb);
}

export function getUnlockSnapshot() {
  try {
    return sessionStorage.getItem(UNLOCK_STORAGE_KEY) === "1" ? "1" : "0";
  } catch {
    return "0";
  }
}

export function getUnlockServerSnapshot() {
  return "0";
}

export function persistUnlock() {
  try {
    sessionStorage.setItem(UNLOCK_STORAGE_KEY, "1");
  } catch {
    // sessionStorage nicht verfügbar – Freischaltung gilt dann nur im Speicher
  }
  unlockListeners.forEach((listener) => listener());
}
