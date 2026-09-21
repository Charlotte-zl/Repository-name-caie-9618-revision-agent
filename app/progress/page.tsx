"use client";
import Link from "next/link";
import { getAvailableTopics } from "@/lib/course";
import { emptyLesson, useProgress } from "@/lib/progress";
export default function ProgressPage() {
  const { data, unavailable } = useProgress();
  const topics = getAvailableTopics();
  const complete = topics.filter(t => { const p = data[t.id] ?? emptyLesson; return p.reviewed && p.selfAssessed && t.quiz.every(q => p.answers[q.question]); }).length;
  const wrong = topics.flatMap(t => t.quiz.filter(q => data[t.id]?.mistakes[q.question]).map(q => ({ topic: t, question: q })));
  return <main className="min-h-screen bg-slate-50"><div className="mx-auto max-w-6xl px-6 py-10">
    <Link href="/topics" className="font-semibold text-emerald-700">返回主题列表</Link>
    <h1 className="mt-6 text-3xl font-semibold">学习记录与错题</h1>
    <p className="mt-3 text-slate-600">记录仅保存在此浏览器，不会同步到其他设备。完成表示阅读、测验与自评都已做过，不表示掌握全部考点。</p>
    {unavailable && <p role="alert" className="mt-4 rounded bg-amber-100 p-4">浏览器存储不可用，刷新后可能丢失本次记录。</p>}
    <div className="my-6 grid gap-4 sm:grid-cols-3">{[["已完成复习流程", `${complete} / ${topics.length}`], ["待复习测验", String(wrong.length)], ["已阅读", String(topics.filter(t => data[t.id]?.reviewed).length)]].map(([label, value]) => <div className="rounded-lg border bg-white p-5" key={label}><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-semibold">{value}</p></div>)}</div>
    <h2 className="text-xl font-semibold">待复习测验</h2>
    {wrong.length === 0 && <p className="mt-3 rounded border bg-white p-5">当前没有待复习错题。到主题页作答后，这里会显示答错的题目。</p>}
    <div className="mt-3 grid gap-3">{wrong.map(({ topic, question }) => <Link key={question.question} href={`/revision/${topic.id}#quiz`} className="rounded border border-rose-200 bg-white p-4"><p className="text-sm text-slate-500">{topic.titleChinese}</p><p className="mt-1 font-semibold">{question.questionChinese}</p><p className="mt-2 text-emerald-700">重新作答 →</p></Link>)}</div>
    <h2 className="mb-4 mt-8 text-xl font-semibold">各主题进度</h2>
    <div className="grid gap-4 md:grid-cols-2">{topics.map(t => {
      const p = data[t.id] ?? emptyLesson;
      const answered = t.quiz.filter(q => p.answers[q.question]).length;
      const correct = t.quiz.filter(q => p.answers[q.question] === q.answer).length;
      const gaps = p.selfAssessed ? t.practice.markSchemeChinese.filter((_, i) => !p.checks[i]) : [];
      return <article className="rounded-lg border bg-white p-5" key={t.id}><h3 className="font-semibold"><Link className="text-emerald-800 underline" href={`/revision/${t.id}`}>{t.titleChinese}</Link></h3>
        <p className="mt-3 text-sm">阅读：{p.reviewed ? "已读" : "未标记"} · 测验：{answered}/{t.quiz.length} 已答，{correct} 正确</p>
        <p className="mt-2 text-sm">简答自评：{p.selfAssessed ? `${t.practice.markScheme.filter((_, i) => p.checks[i]).length}/${t.practice.markScheme.length}` : p.draft ? "草稿已保存，尚未完成自评" : "尚未作答"}</p>
        {!!gaps.length && <details className="mt-3 text-sm"><summary className="cursor-pointer text-amber-800">待补充评分点（{gaps.length}）</summary><ul className="mt-2 list-disc space-y-2 pl-5">{gaps.map(g => <li key={g}>{g}</li>)}</ul><Link href={`/revision/${t.id}#practice`} className="mt-3 block text-emerald-700 underline">改进答案</Link></details>}
      </article>;
    })}</div>
  </div></main>;
}
