"use client";

import { useMemo, useSyncExternalStore } from "react";

export type LessonProgress = {
  answers: Record<string, string>;
  mistakes: Record<string, boolean>;
  draft: string;
  checks: boolean[];
  reviewed: boolean;
  selfAssessed: boolean;
};
type Progress = Record<string, LessonProgress>;
const KEY = "caie9618-progress-v1";
const EVENT = "caie-progress-change";
let memory = "{}";
let unavailable = false;
export const emptyLesson: LessonProgress = {
  answers: {}, mistakes: {}, draft: "", checks: [], reviewed: false, selfAssessed: false,
};
function read() {
  if (typeof window === "undefined") return "{}";
  if (unavailable) return memory;
  try { return window.localStorage.getItem(KEY) ?? "{}"; }
  catch { unavailable = true; return memory; }
}
function decode(raw: string): Progress {
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const result: Progress = {};
    for (const [id, value] of Object.entries(parsed)) {
      if (!/^[a-z0-9-]+$/.test(id) || !value || typeof value !== "object") continue;
      const v = value as Partial<LessonProgress>;
      const answers = Object.fromEntries(Object.entries(v.answers ?? {}).filter(([, x]) => typeof x === "string"));
      const mistakes = Object.fromEntries(Object.entries(v.mistakes ?? {}).filter(([, x]) => typeof x === "boolean"));
      result[id] = {
        answers, mistakes, draft: typeof v.draft === "string" ? v.draft : "",
        checks: Array.isArray(v.checks) ? v.checks.map(x => x === true) : [],
        reviewed: v.reviewed === true, selfAssessed: v.selfAssessed === true,
      };
    }
    return result;
  } catch { return {}; }
}
function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(EVENT, callback); window.removeEventListener("storage", callback); };
}
export function saveLesson(id: string, update: Partial<LessonProgress>) {
  const data = decode(read());
  const next = { ...data, [id]: { ...(data[id] ?? emptyLesson), ...update } };
  memory = JSON.stringify(next);
  try { window.localStorage.setItem(KEY, memory); unavailable = false; }
  catch { unavailable = true; }
  window.dispatchEvent(new Event(EVENT));
}
export function useProgress() {
  const raw = useSyncExternalStore(subscribe, read, () => "{}");
  const data = useMemo(() => decode(raw), [raw]);
  return { data, unavailable };
}
export function useLesson(id: string) {
  const { data, unavailable } = useProgress();
  return { progress: data[id] ?? emptyLesson, unavailable };
}
