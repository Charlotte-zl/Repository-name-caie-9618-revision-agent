import Link from "next/link";
import TopicBrowser from "@/components/TopicBrowser";


export default function TopicsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              主题列表 / Topic list
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">
              选择一个复习主题
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              按教材 20 章组织核心复习主题：中文讲解、英文术语、交互演示、测验与简答自评。每个主题标明实际覆盖的小节。
            </p>
          </div>
          <Link
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
            href="/"
          >
            返回首页 / Back home
          </Link>
        </div>

        <Link href="/progress" className="mt-6 inline-block font-semibold text-emerald-700 underline">查看学习记录与错题 →</Link>
        <TopicBrowser />
      </section>
    </main>
  );
}
