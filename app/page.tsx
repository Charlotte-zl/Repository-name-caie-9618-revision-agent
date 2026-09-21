import Link from "next/link";
import Image from "next/image";
import { getAvailableTopics } from "@/lib/course";
import course from "@/data/caie9618.json";

export default function Home() {
  const topics = getAvailableTopics();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            CAIE 9618 / A-Level Computer Science 中文复习助手
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            {course.app.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            {course.app.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            从中文理解出发，保留英文技术术语和考场表达，帮助你把概念转化成
            mark scheme 能给分的答案。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-md bg-emerald-400 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              href="/topics"
            >
              开始复习 / Start Revision
            </Link>
            <Link
              className="rounded-md border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200"
              href="/progress"
            >
              学习记录 / My progress
            </Link>
          </div>
          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            {topics.slice(0, 4).map((topic) => (
              <Link
                className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-emerald-300"
                href={topic.href ?? `/revision/${topic.id}`}
                key={topic.id}
              >
                <p className="font-semibold text-white">{topic.titleChinese}</p>
                <p className="mt-1 text-xs text-slate-400">{topic.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/30">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            <Image
              alt="Computer science revision desk with notes and exam preparation materials"
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              src="/caie-revision-workspace.png"
            />
          </div>
          <div className="grid gap-3 p-4">
            <div className="rounded-md border border-white/10 bg-slate-900/80 p-4">
              <p className="text-sm font-semibold text-emerald-200">
                {topics.length} 个核心复习主题
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                参考教材 20 章：双语讲解、交互学习、测验、自评与本地学习记录。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-slate-300">
              <span className="rounded-md bg-white/10 px-2 py-2">Registers</span>
              <span className="rounded-md bg-white/10 px-2 py-2">Binary</span>
              <span className="rounded-md bg-white/10 px-2 py-2">
                Logic gates
              </span>
              <span className="rounded-md bg-white/10 px-2 py-2">Search</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
