import Link from "next/link";
import TopicCard from "@/components/TopicCard";
import course from "@/data/caie9618.json";

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
              先从已开放的 Processor Fundamentals 开始。其他 CAIE 9618
              主题暂时显示为即将推出。
            </p>
          </div>
          <Link
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
            href="/"
          >
            返回首页 / Back home
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {course.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>
    </main>
  );
}
