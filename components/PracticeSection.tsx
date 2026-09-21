"use client";

import { useState } from "react";
import { saveLesson, useLesson } from "@/lib/progress";

type Practice = {
  answerPlaceholder?: string;
  hintChinese: string;
  question: string;
  markSchemeChinese: string[];
  markScheme: string[];
  modelAnswerChinese: string;
  modelAnswer: string;
};
export default function PracticeSection({ practice, topicId }: { practice: Practice; topicId: string }) {
  const { progress, unavailable } = useLesson(topicId);
  const [revealed, setRevealed] = useState(false);
  const show = revealed || progress.selfAssessed;
  const score = practice.markScheme.filter((_, i) => progress.checks[i]).length;
  return <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-5">
    <p className="text-sm font-semibold text-emerald-700">原创考试风格练习 · 对照评分点自评</p>
    <h3 className="text-lg font-semibold">{practice.question}</h3>
    <p className="rounded-md bg-emerald-50 p-4 text-sm leading-7">{practice.hintChinese}</p>
    <label className="block font-semibold" htmlFor="student-answer">英文作答 / Your answer</label>
    <textarea id="student-answer" className="min-h-40 w-full rounded-md border p-4" maxLength={10000}
      placeholder={practice.answerPlaceholder ?? "Write your answer in English."} value={progress.draft}
      onChange={e => { saveLesson(topicId, { draft: e.target.value, checks: [], selfAssessed: false }); setRevealed(false); }} />
    <p className="text-sm text-slate-500">{unavailable ? "浏览器存储不可用：本次作答仅在当前页面会话中保留。" : "草稿自动保存在此浏览器。"}</p>
    <button type="button" className="rounded-md bg-emerald-700 px-5 py-3 font-semibold text-white disabled:bg-slate-300"
      disabled={!progress.draft.trim()} onClick={() => setRevealed(true)}>查看评分点并自评</button>
    {show && <div className="space-y-4 border-t pt-5">
      <p className="text-sm text-slate-600">逐项核对自己的答案，仅勾选明确写出的内容。这是学习自评，不是 AI 或官方判分。</p>
      {practice.markScheme.map((point, i) => <label key={point} className="flex items-start gap-3 rounded-md bg-slate-50 p-3">
        <input className="mt-1 h-5 w-5" type="checkbox" checked={progress.checks[i] ?? false} onChange={e => {
          const checks = practice.markScheme.map((_, j) => j === i ? e.target.checked : !!progress.checks[j]);
          saveLesson(topicId, { checks, selfAssessed: false });
        }} />
        <span><span className="block">{practice.markSchemeChinese[i]}</span><span className="block text-sm text-slate-600">{point}</span></span>
      </label>)}
      <p aria-live="polite" className="font-semibold text-emerald-800">自评：{score} / {practice.markScheme.length}</p>
      <button type="button" className="rounded-md bg-emerald-700 px-4 py-2 text-white" onClick={() => saveLesson(topicId, { selfAssessed: true })}>保存自评结果</button>
      {progress.selfAssessed && <p role="status">已保存。未勾选的评分点可在学习记录中继续复习。</p>}
      <details className="rounded-md border p-4"><summary className="cursor-pointer font-semibold">参考答案 / Model answer</summary>
        <p className="mt-3 leading-7">{practice.modelAnswerChinese}</p><p className="mt-3 leading-7 text-slate-600">{practice.modelAnswer}</p>
      </details>
    </div>}
  </div>;
}
