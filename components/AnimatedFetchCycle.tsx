"use client";

import { useEffect, useMemo, useState } from "react";

const blocks = ["PC", "MAR", "Memory", "MDR", "CIR", "Control Unit", "Execute"];

const steps = [
  {
    activeBlock: "PC",
    title: "Step 1 / PC 保存下一条指令地址",
    english: "PC stores the address of the next instruction.",
    chinese: "PC 中保存下一条将要被取出的指令地址。",
  },
  {
    activeBlock: "MAR",
    title: "Step 2 / PC 到 MAR",
    english: "The address is copied from PC to MAR.",
    chinese:
      "CPU 将 PC 中的地址复制到 MAR。注意：MAR 存储的是地址，不是数据。",
  },
  {
    activeBlock: "Memory",
    title: "Step 3 / 访问主存",
    english: "Memory is accessed using the address in MAR.",
    chinese: "主存根据 MAR 中的地址找到对应的内存位置。",
  },
  {
    activeBlock: "MDR",
    title: "Step 4 / Memory 到 MDR",
    english: "The instruction or data is fetched from Memory into MDR.",
    chinese:
      "从主存中取出的指令或数据被送入 MDR。注意：MDR 存储的是数据或指令，不是地址。",
  },
  {
    activeBlock: "CIR",
    title: "Step 5 / MDR 到 CIR",
    english: "The contents of MDR are copied to CIR.",
    chinese:
      "MDR 中的指令被复制到 CIR，CIR 保存当前正在被解码和执行的指令。",
  },
  {
    activeBlock: "Control Unit",
    title: "Step 6 / Control Unit 解码",
    english: "The Control Unit decodes the instruction.",
    chinese:
      "Control Unit 对指令进行解码。不要写成 ALU 解码，ALU 主要负责算术和逻辑运算。",
  },
  {
    activeBlock: "Execute",
    title: "Step 7 / PC 自增并执行",
    english:
      "The Program Counter is incremented and the instruction is executed.",
    chinese: "PC 自增，准备下一条指令；当前指令随后被执行。",
  },
];

function getBlockTone(isActive: boolean, isPast: boolean): string {
  if (isActive) {
    return "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-[1.02]";
  }

  if (isPast) {
    return "border-emerald-200 bg-emerald-50 text-emerald-900";
  }

  return "border-slate-200 bg-white text-slate-700";
}

export default function AnimatedFetchCycle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeStep = steps[activeIndex];

  const progressWidth = useMemo(
    () => `${((activeIndex + 1) / steps.length) * 100}%`,
    [activeIndex],
  );

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current === steps.length - 1) {
          setIsPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, 1800);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  function goPrevious() {
    setIsPlaying(false);
    setActiveIndex((current) => Math.max(0, current - 1));
  }

  function goNext() {
    setIsPlaying(false);
    setActiveIndex((current) => Math.min(steps.length - 1, current + 1));
  }

  function reset() {
    setIsPlaying(false);
    setActiveIndex(0);
  }

  return (
    <section className="overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Fetch-Execute Cycle
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-950">
                动态寄存器流向
              </h3>
            </div>
            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800">
              {activeIndex + 1} / {steps.length}
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: progressWidth }}
            />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
            {blocks.map((block, index) => {
              const blockStepIndex = steps.findIndex(
                (step) => step.activeBlock === block,
              );
              const isActive = activeStep.activeBlock === block;
              const isPast = blockStepIndex < activeIndex;

              return (
                <div className="relative" key={block}>
                  <div
                    className={`relative min-h-28 rounded-lg border p-4 text-center transition-all duration-300 ${getBlockTone(
                      isActive,
                      isPast,
                    )}`}
                  >
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute right-3 top-3 h-3 w-3 rounded-full bg-white/90 shadow ring-4 ring-white/30"
                      />
                    ) : null}
                    <p className="text-lg font-semibold">{block}</p>
                    <p className="mt-2 text-xs leading-5 opacity-80">
                      {block === "PC" && "next address"}
                      {block === "MAR" && "memory address"}
                      {block === "Memory" && "stored instruction"}
                      {block === "MDR" && "data / instruction"}
                      {block === "CIR" && "current instruction"}
                      {block === "Control Unit" && "decode"}
                      {block === "Execute" && "run instruction"}
                    </p>
                  </div>
                  {index < blocks.length - 1 ? (
                    <div
                      aria-hidden="true"
                      className={`mx-auto h-7 w-px transition-colors duration-300 xl:absolute xl:-right-2 xl:top-12 xl:h-px xl:w-4 ${
                        index < activeIndex ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 disabled:text-slate-300"
              disabled={activeIndex === 0}
              onClick={goPrevious}
              type="button"
            >
              Previous / 上一步
            </button>
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 disabled:text-slate-300"
              disabled={activeIndex === steps.length - 1}
              onClick={goNext}
              type="button"
            >
              Next / 下一步
            </button>
            <button
              className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              onClick={() => setIsPlaying((current) => !current)}
              type="button"
            >
              {isPlaying ? "Pause / 暂停" : "Auto Play / 自动播放"}
            </button>
            <button
              className="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              onClick={reset}
              type="button"
            >
              Reset / 重置
            </button>
          </div>
        </div>

        <aside className="border-t border-emerald-100 bg-emerald-50 p-5 sm:p-6 lg:border-l lg:border-t-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            当前步骤 / Current step
          </p>
          <h4 className="mt-2 text-xl font-semibold text-slate-950">
            {activeStep.title}
          </h4>
          <p className="mt-4 text-base leading-8 text-slate-800">
            {activeStep.chinese}
          </p>
          <div className="mt-5 rounded-lg border border-emerald-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              English exam wording
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {activeStep.english}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
