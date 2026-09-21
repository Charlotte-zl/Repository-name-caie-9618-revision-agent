"use client";
import { useState } from "react";
import TopicCard from "@/components/TopicCard";
import { getAvailableTopics } from "@/lib/course";
export default function TopicBrowser() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");
  const topics = getAvailableTopics().filter(t => (level === "All" || t.level === level) && `${t.title} ${t.titleChinese} ${t.subtopicChinese} ${t.keyTerms.map(k => k.term + k.chineseTerm).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="mt-8">
    <div className="flex flex-col gap-3 sm:flex-row"><label className="flex-1"><span className="mb-2 block text-sm font-semibold">搜索主题或术语</span><input className="w-full rounded border bg-white p-3" placeholder="例如：递归、RAM、database" value={query} onChange={e => setQuery(e.target.value)} /></label>
      <label><span className="mb-2 block text-sm font-semibold">学习阶段</span><select className="rounded border bg-white p-3" value={level} onChange={e => setLevel(e.target.value)}><option value="All">全部</option><option>AS</option><option>A Level</option></select></label></div>
    <p role="status" className="mt-4 text-sm text-slate-600">找到 {topics.length} 个核心复习主题</p>
    <div className="mt-4 grid gap-4 md:grid-cols-2">{topics.map(t => <TopicCard key={t.id} topic={t} />)}</div>
    {!topics.length && <p className="mt-6 rounded border bg-white p-6">没有匹配主题，请更换关键词或学习阶段。</p>}
  </div>;
}
