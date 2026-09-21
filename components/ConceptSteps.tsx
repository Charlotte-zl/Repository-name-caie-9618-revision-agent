"use client";
import { useState } from "react";
export default function ConceptSteps({ steps }: { steps: { label: string; description: string }[] }) {
  const [index, setIndex] = useState(0);
  return <div className="rounded-lg border border-emerald-200 bg-white p-6">
    <div className="flex flex-wrap gap-2">{steps.map((step, i) => <button type="button" key={step.label} aria-pressed={index === i}
      onClick={() => setIndex(i)} className={`rounded-md border px-4 py-2 ${index === i ? "bg-emerald-700 text-white" : "bg-slate-50"}`}>{i + 1}. {step.label}</button>)}</div>
    <div aria-live="polite" className="mt-6 min-h-24 rounded-md bg-emerald-50 p-5"><h3 className="text-xl font-semibold">{steps[index].label}</h3><p className="mt-3 leading-7">{steps[index].description}</p></div>
    <div className="mt-4 flex justify-between"><button type="button" disabled={index === 0} className="rounded border px-4 py-2 disabled:opacity-40" onClick={() => setIndex(index - 1)}>上一个概念</button><button type="button" disabled={index === steps.length - 1} className="rounded border px-4 py-2 disabled:opacity-40" onClick={() => setIndex(index + 1)}>下一个概念</button></div>
  </div>;
}
