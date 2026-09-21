"use client";
import Link from "next/link";
import { saveLesson, useLesson } from "@/lib/progress";
export default function LessonStatus({ topicId }: { topicId: string }) {
  const { progress, unavailable } = useLesson(topicId);
  return <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-white p-5">
    <label className="flex items-center gap-3"><input type="checkbox" checked={progress.reviewed} onChange={e => saveLesson(topicId, { reviewed: e.target.checked })} className="h-5 w-5" />我已阅读本节讲解</label>
    <Link className="font-semibold text-emerald-700 underline" href="/progress">学习记录与错题</Link>
    {unavailable && <p role="status">无法持久保存；当前记录仅保留在此页面会话。</p>}
  </div>;
}
