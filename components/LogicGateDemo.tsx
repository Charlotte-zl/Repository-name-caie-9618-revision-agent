"use client";

import { useMemo, useState } from "react";

type GateId = "AND" | "OR" | "NOT" | "XOR" | "NAND" | "NOR";

const gates: Array<{
  id: GateId;
  expression: string;
  chinese: string;
  english: string;
}> = [
  {
    id: "AND",
    expression: "A · B",
    chinese: "AND 只有两个输入都是 1 时才输出 1。",
    english: "AND outputs 1 only if all inputs are 1.",
  },
  {
    id: "OR",
    expression: "A + B",
    chinese: "OR 只要有一个输入是 1 就输出 1。",
    english: "OR outputs 1 if one or more inputs are 1.",
  },
  {
    id: "NOT",
    expression: "NOT A",
    chinese: "NOT 只有一个输入，输出是输入的反。",
    english: "NOT inverts its single input.",
  },
  {
    id: "XOR",
    expression: "A XOR B",
    chinese: "XOR 只在两个输入不同时输出 1。1 和 1 时输出 0。",
    english: "XOR outputs 1 only if the inputs are different.",
  },
  {
    id: "NAND",
    expression: "NOT (A · B)",
    chinese: "NAND 是 AND 后再取反。两个输入都是 1 时输出 0。",
    english: "NAND outputs 0 only if all inputs are 1.",
  },
  {
    id: "NOR",
    expression: "NOT (A + B)",
    chinese: "NOR 是 OR 后再取反。只有两个输入都是 0 时才输出 1。",
    english: "NOR outputs 1 only if all inputs are 0.",
  },
];

function outputFor(gate: GateId, a: boolean, b: boolean): boolean {
  switch (gate) {
    case "AND":
      return a && b;
    case "OR":
      return a || b;
    case "NOT":
      return !a;
    case "XOR":
      return a !== b;
    case "NAND":
      return !(a && b);
    case "NOR":
      return !(a || b);
  }
}

function bit(value: boolean): "0" | "1" {
  return value ? "1" : "0";
}

export default function LogicGateDemo() {
  const [gateId, setGateId] = useState<GateId>("AND");
  const [inputA, setInputA] = useState(true);
  const [inputB, setInputB] = useState(false);
  const gate = gates.find((item) => item.id === gateId) ?? gates[0];
  const output = outputFor(gateId, inputA, inputB);
  const rows = useMemo(() => {
    if (gateId === "NOT") {
      return [false, true].map((a) => ({
        a,
        b: false,
        out: outputFor("NOT", a, false),
      }));
    }
    return [false, true].flatMap((a) =>
      [false, true].map((b) => ({ a, b, out: outputFor(gateId, a, b) })),
    );
  }, [gateId]);

  return (
    <section className="overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Logic gates
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-950">
                输入变化，输出对照 truth table
              </h3>
            </div>
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              {gate.expression}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {gates.map((item) => (
              <button
                className={
                  item.id === gateId
                    ? "rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white"
                    : "rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300"
                }
                key={item.id}
                onClick={() => setGateId(item.id)}
                type="button"
              >
                {item.id}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <button
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left"
              onClick={() => setInputA((current) => !current)}
              type="button"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Input A
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">
                {bit(inputA)}
              </p>
              <p className="mt-2 text-sm text-emerald-700">点击切换 / Toggle</p>
            </button>
            {gateId === "NOT" ? (
              <div className="rounded-lg border border-dashed border-slate-200 p-4 text-slate-400">
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Input B
                </p>
                <p className="mt-2 text-3xl font-semibold">—</p>
                <p className="mt-2 text-sm">NOT 只有一个输入</p>
              </div>
            ) : (
              <button
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left"
                onClick={() => setInputB((current) => !current)}
                type="button"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Input B
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">
                  {bit(inputB)}
                </p>
                <p className="mt-2 text-sm text-emerald-700">
                  点击切换 / Toggle
                </p>
              </button>
            )}
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Output
              </p>
              <p className="mt-2 text-3xl font-semibold text-emerald-950">
                {bit(output)}
              </p>
              <p className="mt-2 text-sm text-emerald-800">{gate.id} result</p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">A</th>
                  {gateId !== "NOT" ? (
                    <th className="px-4 py-3 font-semibold">B</th>
                  ) : null}
                  <th className="px-4 py-3 font-semibold">Output</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const isCurrent =
                    row.a === inputA && (gateId === "NOT" || row.b === inputB);
                  return (
                    <tr
                      className={
                        isCurrent
                          ? "bg-emerald-50 font-semibold text-emerald-900"
                          : "text-slate-700"
                      }
                      key={`${bit(row.a)}-${bit(row.b)}`}
                    >
                      <td className="px-4 py-3">{bit(row.a)}</td>
                      {gateId !== "NOT" ? (
                        <td className="px-4 py-3">{bit(row.b)}</td>
                      ) : null}
                      <td className="px-4 py-3">{bit(row.out)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="border-t border-emerald-100 bg-emerald-50 p-5 sm:p-6 lg:border-l lg:border-t-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            当前逻辑门 / Current gate
          </p>
          <h4 className="mt-2 text-xl font-semibold text-slate-950">
            {gate.id} / {gate.expression}
          </h4>
          <p className="mt-4 text-base leading-8 text-slate-800">
            {gate.chinese}
          </p>
          <div className="mt-5 rounded-lg border border-emerald-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              English exam wording
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {gate.english}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
