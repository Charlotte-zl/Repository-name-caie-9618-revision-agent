"use client";

import { useEffect, useMemo, useState } from "react";

const denary = 13;
const places = [8, 4, 2, 1];

const steps = [
  {
    title: "Step 1 / 从 denary 13 开始",
    chinese: "要把 13 转成 4-bit binary。权值从左到右是 8、4、2、1。先看最大权值 8。",
    english: "Convert denary 13 using place values 8, 4, 2 and 1. Start with the largest place value.",
    remaining: 13,
    bits: ["?", "?", "?", "?"],
    activeIndex: 0,
  },
  {
    title: "Step 2 / 8 可以放入 13",
    chinese: "8 ≤ 13，这一位写 1，剩余值变成 13 − 8 = 5。",
    english: "8 fits into 13, so write 1 and subtract: remaining value = 5.",
    remaining: 5,
    bits: ["1", "?", "?", "?"],
    activeIndex: 0,
  },
  {
    title: "Step 3 / 4 可以放入 5",
    chinese: "4 ≤ 5，这一位写 1，剩余值变成 5 − 4 = 1。",
    english: "4 fits into 5, so write 1 and subtract: remaining value = 1.",
    remaining: 1,
    bits: ["1", "1", "?", "?"],
    activeIndex: 1,
  },
  {
    title: "Step 4 / 2 放不进 1",
    chinese: "2 > 1，这一位写 0，剩余值仍是 1。放不下就写 0，不要强行减。",
    english: "2 does not fit into 1, so write 0 and keep the remaining value.",
    remaining: 1,
    bits: ["1", "1", "0", "?"],
    activeIndex: 2,
  },
  {
    title: "Step 5 / 得到 binary 1101",
    chinese: "1 ≤ 1，最低位写 1。最终 binary 是 1101，因为 8 + 4 + 1 = 13。",
    english: "1 fits, so the least significant bit is 1. Denary 13 is binary 1101.",
    remaining: 0,
    bits: ["1", "1", "0", "1"],
    activeIndex: 3,
  },
];

export default function BinaryConversionDemo() {
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
                Denary to binary
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-950">
                权值比较：{denary} → 1101
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

          <p className="mt-6 text-sm font-semibold text-slate-600">
            Remaining value / 剩余值：
            <span className="ml-2 text-lg text-slate-950">
              {activeStep.remaining}
            </span>
          </p>

          <div className="mt-4 grid grid-cols-4 gap-3">
            {places.map((place, index) => {
              const isActive = activeStep.activeIndex === index;
              const bit = activeStep.bits[index];
              return (
                <div
                  className={`rounded-lg border p-4 text-center transition-all duration-300 ${
                    isActive
                      ? "border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : bit !== "?"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border-slate-200 bg-white text-slate-700"
                  }`}
                  key={place}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                    place value
                  </p>
                  <p className="mt-1 text-2xl font-semibold">{place}</p>
                  <p className="mt-3 text-sm">bit = {bit}</p>
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
