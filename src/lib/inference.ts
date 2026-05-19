import * as ort from "onnxruntime-web/webgpu";
import { CLASSES, NUM_CLASSES } from "./classes";

const INPUT_SIZE = 224;
const MEAN = 0.5;
const STD = 0.5;

let wasmPathsConfigured = false;

function configureRuntime(): void {
  if (wasmPathsConfigured) return;
  ort.env.wasm.wasmPaths = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ort.env.versions.web}/dist/`;
  wasmPathsConfigured = true;
}

export type Backend = "webgpu" | "wasm";

export type ClassificationResult = {
  className: string;
  code: string;
  confidence: number;
  malignant: boolean;
  probs: { code: string; label: string; malignant: boolean; probability: number }[];
};

export async function createSession(
  modelData: ArrayBuffer,
): Promise<{ session: ort.InferenceSession; backend: Backend }> {
  configureRuntime();

  const modelBytes = new Uint8Array(modelData);

  if (typeof navigator !== "undefined" && "gpu" in navigator) {
    try {
      const session = await ort.InferenceSession.create(modelBytes, {
        executionProviders: ["webgpu"],
        graphOptimizationLevel: "all",
      });
      return { session, backend: "webgpu" };
    } catch (err) {
      console.warn("WebGPU-Backend nicht verfügbar, fallback auf WASM:", err);
    }
  }

  const session = await ort.InferenceSession.create(modelBytes, {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
  });
  return { session, backend: "wasm" };
}

export function preprocess(img: HTMLImageElement): ort.Tensor {
  const canvas = document.createElement("canvas");
  canvas.width = INPUT_SIZE;
  canvas.height = INPUT_SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas-Kontext nicht verfügbar.");
  ctx.drawImage(img, 0, 0, INPUT_SIZE, INPUT_SIZE);
  const { data } = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);

  const planeSize = INPUT_SIZE * INPUT_SIZE;
  const out = new Float32Array(3 * planeSize);
  for (let i = 0; i < planeSize; i++) {
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;
    out[i] = (r - MEAN) / STD;
    out[planeSize + i] = (g - MEAN) / STD;
    out[2 * planeSize + i] = (b - MEAN) / STD;
  }

  return new ort.Tensor("float32", out, [1, 3, INPUT_SIZE, INPUT_SIZE]);
}

function softmax(logits: Float32Array | number[]): Float32Array {
  let max = -Infinity;
  for (const v of logits) if (v > max) max = v;
  const exps = new Float32Array(logits.length);
  let sum = 0;
  for (let i = 0; i < logits.length; i++) {
    const e = Math.exp(logits[i] - max);
    exps[i] = e;
    sum += e;
  }
  for (let i = 0; i < exps.length; i++) exps[i] /= sum;
  return exps;
}

export async function classify(
  session: ort.InferenceSession,
  img: HTMLImageElement,
): Promise<ClassificationResult> {
  const input = preprocess(img);
  const inputName = session.inputNames[0];
  const outputName = session.outputNames[0];

  const results = await session.run({ [inputName]: input });
  const output = results[outputName];
  const raw = output.data as Float32Array;

  if (raw.length !== NUM_CLASSES) {
    throw new Error(
      `Unerwartete Ausgabedimension: ${raw.length} (erwartet: ${NUM_CLASSES}).`,
    );
  }

  const probs = softmax(raw);

  let topIdx = 0;
  for (let i = 1; i < probs.length; i++) {
    if (probs[i] > probs[topIdx]) topIdx = i;
  }

  const top = CLASSES[topIdx];

  return {
    className: top.label,
    code: top.code,
    confidence: probs[topIdx],
    malignant: top.malignant,
    probs: CLASSES.map((c, i) => ({
      code: c.code,
      label: c.label,
      malignant: c.malignant,
      probability: probs[i],
    })),
  };
}
