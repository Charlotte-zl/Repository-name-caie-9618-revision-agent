"use client";

import { useEffect, useMemo, useState } from "react";

const items = [4, 11, 7, 19, 3];
const target = 19;

const steps = [
  {
    index: 0,
    title: "Step 1 / 从第一项开始",
    chinese: "Linear search 从 index 0 的 4 开始。4 ≠ 19，继续下一项。",
    english: "Start at the first item. 4 is not equal to 19, so move on.",
    found: false,
  },
  {
    index: 1,
    title: "Step 2 / 比较第二项",
    chinese: "当前项是 11。11 ≠ 19，还没有找到，继续向右。",
    english: "Compare the next item. 11 is not the search item.",
    found: false,
  },
  {
    index: 2,
    title: "Step 3 / 比较第三项",
    chinese: "当前项是 7。7 ≠ 19。Linear search 不会跳过中间项。",
    english: "7 is not 19. Linear search checks every item in turn.",
    found: false,
  },
  {
    index: 3,
    title: "Step 4 / 找到 19",
    chinese: "当前项是 19，与 search item 相同。查找停止并返回这个位置。",
    english: "19 matches the search item, so the search stops and the position is returned.",
    found: true,
  },
];

export default function LinearSearchDemo() {
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

  return (
    <section className="overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Linear search
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-950">
                在 [{items.join(", ")}] 中查找 {target}
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

          <div className="mt-6 grid grid-cols-5 gap-3">
            {items.map((item, index) => {
              const isActive = activeStep.index === index;
              const isPast = index < activeStep.index;
              return (
                <div
                  className={`rounded-lg border p-4 text-center transition-all duration-300 ${
                    isActive
                      ? activeStep.found
                        ? "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                        : "border-amber-400 bg-amber-500 text-white shadow-lg shadow-amber-200"
                      : isPast
                        ? "border-slate-200 bg-slate-100 text-slate-500"
                        : "border-slate-200 bg-white text-slate-800"
                  }`}
                  key={`${item}-${index}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                    index {index}
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{item}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 disabled:text-slate-300"
              disabled={activeIndex === 0}
              onClick={() => {
                setIsPlaying(false);
                setActiveIndex((current) => Math.max(0, current - 1));
              }}
              type="button"
            >
              Previous / 上一步
            </button>
            <button
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 disabled:text-slate-300"
              disabled={activeIndex === steps.length - 1}
              onClick={() => {
                setIsPlaying(false);
                setActiveIndex((current) =>
                  Math.min(steps.length - 1, current + 1),
                );
              }}
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
              onClick={() => {
                setIsPlaying(false);
                setActiveIndex(0);
              }}
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
