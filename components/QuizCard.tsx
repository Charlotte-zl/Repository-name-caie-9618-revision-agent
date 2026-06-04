"use client";

import { useState } from "react";

type QuizQuestion = {
  questionChinese: string;
  question: string;
  options: string[];
  answer: string;
  explanationChinese: string;
  explanation?: string;
};

type QuizCardProps = {
  questions: QuizQuestion[];
};

export default function QuizCard({ questions }: QuizCardProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <div className="space-y-4">
      {questions.map((question, questionIndex) => {
        const selected = answers[questionIndex];
        const isAnswered = Boolean(selected);
        const isCorrect = selected === question.answer;

        return (
          <article
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            key={question.question}
          >
            <h3 className="font-semibold text-slate-950">
              第 {questionIndex + 1} 题 / Question {questionIndex + 1}
            </h3>
            <p className="mt-2 text-base leading-7 text-slate-800">
              {question.questionChinese}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {question.question}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {question.options.map((option) => (
                <button
                  className={
                    selected === option
                      ? "rounded-md border border-emerald-500 bg-emerald-50 px-3 py-2 text-left text-sm font-semibold text-emerald-800"
                      : "rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-white"
                  }
                  key={option}
                  onClick={() =>
                    setAnswers((current) => ({
                      ...current,
                      [questionIndex]: option,
                    }))
                  }
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
            {isAnswered ? (
              <div
                className={
                  isCorrect
                    ? "mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
                    : "mt-4 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"
                }
              >
                <p className="font-semibold">
                  {isCorrect ? "正确 / Correct" : "再想想 / Try again"}
                </p>
                <p className="mt-1">答案 / Answer: {question.answer}</p>
                <p className="mt-2">{question.explanationChinese}</p>
                {question.explanation ? (
                  <p className="mt-1 text-slate-600">{question.explanation}</p>
                ) : null}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
