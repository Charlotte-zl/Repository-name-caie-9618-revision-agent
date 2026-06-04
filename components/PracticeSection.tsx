"use client";

import { useState } from "react";
import MarkingPanel from "@/components/MarkingPanel";

type PracticeSectionProps = {
  practice: {
    hintChinese: string;
    question: string;
    markSchemeChinese: string[];
    markScheme: string[];
    mockResult: {
      markAwarded: string;
      awarded: string[];
      notAwarded: string[];
      commonMistake: string;
      modelAnswerChinese: string;
      modelAnswer: string;
    };
  };
};

export default function PracticeSection({ practice }: PracticeSectionProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          考试风格练习 / Exam-style practice
        </p>
        <h3 className="mt-2 text-lg font-semibold text-slate-950">
          中文题目理解提示
        </h3>
        <p className="mt-2 rounded-md border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
          {practice.hintChinese}
        </p>
        <h4 className="mt-5 text-sm font-semibold text-slate-700">英文原题</h4>
        <p className="mt-2 text-base leading-7 text-slate-900">
          {practice.question}
        </p>

        <label
          className="mt-5 block text-sm font-semibold text-slate-700"
          htmlFor="student-answer"
        >
          学生答案 / Student answer
        </label>
        <textarea
          className="mt-2 min-h-40 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          id="student-answer"
          onChange={(event) => {
            setAnswer(event.target.value);
            setSubmitted(false);
          }}
          placeholder="在这里写英文答案。提示：说明 address 从哪里来，以及 fetched instruction 下一步进入哪个寄存器。"
          value={answer}
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:bg-slate-300"
            disabled={!answer.trim()}
            onClick={() => setSubmitted(true)}
            type="button"
          >
            提交答案 / Submit answer
          </button>
          <p className="text-sm text-slate-500">
            原型模式：批改结果暂时使用固定 mock feedback。
          </p>
        </div>
      </div>

      <details className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800">
          查看中文评分点说明 / View mark scheme
        </summary>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
          {practice.markSchemeChinese.map((mark) => (
            <li key={mark}>{mark}</li>
          ))}
        </ul>
        <div className="mt-4 rounded-md bg-white p-3">
          <p className="text-sm font-semibold text-slate-800">
            English mark scheme
          </p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
            {practice.markScheme.map((mark) => (
              <li key={mark}>{mark}</li>
            ))}
          </ul>
        </div>
      </details>

      {submitted ? <MarkingPanel result={practice.mockResult} /> : null}
    </div>
  );
}
