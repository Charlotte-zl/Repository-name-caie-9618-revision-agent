"use client";

import { useState } from "react";
import { saveLesson, useLesson } from "@/lib/progress";

type Question = { questionChinese: string; question: string; options: string[]; answer: string; explanationChinese: string; explanation?: string };
export default function QuizCard({ questions, topicId }: { questions: Question[]; topicId: string }) {
  const { progress, unavailable } = useLesson(topicId);
  const [retry, setRetry] = useState<Record<string, boolean>>({});
  return <div className="space-y-4">
    {unavailable && <p role="status">浏览器存储不可用，测验记录仅在当前页面会话中保留。</p>}
    {questions.map((q, i) => {
      const selected = retry[q.question] ? undefined : progress.answers[q.question];
      const correct = selected === q.answer;
      return <article className="rounded-lg border border-slate-200 bg-white p-5" key={q.question}>
        <h3 className="font-semibold">第 {i + 1} 题 · {q.questionChinese}</h3>
        <p className="mt-2 text-sm text-slate-600">{q.question}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">{q.options.map(option => <button type="button" key={option}
          disabled={!!selected} aria-pressed={selected === option}
          className={`rounded-md border px-3 py-3 text-left text-sm disabled:cursor-default ${selected === option ? (correct ? "border-emerald-600 bg-emerald-50" : "border-rose-600 bg-rose-50") : "border-slate-200 hover:border-emerald-500"}`}
          onClick={() => {
            saveLesson(topicId, { answers: { ...progress.answers, [q.question]: option }, mistakes: { ...progress.mistakes, [q.question]: option !== q.answer } });
            setRetry(current => ({ ...current, [q.question]: false }));
          }}>{option}</button>)}</div>
        {selected && <div aria-live="polite" className={`mt-4 rounded-md p-4 ${correct ? "bg-emerald-50" : "bg-rose-50"}`}>
          <p className="font-semibold">{correct ? "正确 / Correct" : "已加入待复习 / Review needed"}</p>
          <p className="mt-2">答案：{q.answer}</p><p className="mt-2">{q.explanationChinese}</p>
          {q.explanation && <p className="mt-2 text-sm">{q.explanation}</p>}
          <button type="button" className="mt-3 font-semibold underline" onClick={() => setRetry(current => ({ ...current, [q.question]: true }))}>重新作答</button>
        </div>}
      </article>;
    })}
  </div>;
}
