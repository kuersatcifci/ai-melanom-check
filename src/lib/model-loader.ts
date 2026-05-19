const MODEL_URL =
  "https://huggingface.co/kmpsia/ai-melanom-check-model/resolve/main/skin_vit_int8.onnx";
const DB_NAME = "skin-demo";
const STORE = "models";
const KEY = "vit-int8-v1";
const DB_VERSION = 1;

export type ProgressCallback = (progress: number) => void;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function readFromCache(): Promise<ArrayBuffer | null> {
  let db: IDBDatabase;
  try {
    db = await openDb();
  } catch {
    return null;
  }
  try {
    return await new Promise<ArrayBuffer | null>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () => {
        const value = req.result;
        if (value instanceof ArrayBuffer) resolve(value);
        else if (value instanceof Uint8Array) resolve(value.buffer as ArrayBuffer);
        else resolve(null);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  } finally {
    db.close();
  }
}

async function writeToCache(buffer: ArrayBuffer): Promise<void> {
  let db: IDBDatabase;
  try {
    db = await openDb();
  } catch {
    return;
  }
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(buffer, KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  } catch {
    // cache write failure is non-fatal
  } finally {
    db.close();
  }
}

async function fetchWithProgress(
  url: string,
  onProgress?: ProgressCallback,
): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Modell-Download fehlgeschlagen: ${response.status} ${response.statusText}`);
  }
  const totalHeader = response.headers.get("content-length");
  const total = totalHeader ? Number(totalHeader) : 0;

  if (!response.body || !total || !onProgress) {
    const buffer = await response.arrayBuffer();
    onProgress?.(1);
    return buffer;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      received += value.byteLength;
      onProgress(Math.min(received / total, 0.999));
    }
  }

  const out = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  onProgress(1);
  return out.buffer;
}

export async function loadModel(onProgress?: ProgressCallback): Promise<ArrayBuffer> {
  const cached = await readFromCache();
  if (cached && cached.byteLength > 0) {
    onProgress?.(1);
    return cached;
  }

  const buffer = await fetchWithProgress(MODEL_URL, onProgress);
  await writeToCache(buffer);
  return buffer;
}

export async function clearModelCache(): Promise<void> {
  let db: IDBDatabase;
  try {
    db = await openDb();
  } catch {
    return;
  }
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
