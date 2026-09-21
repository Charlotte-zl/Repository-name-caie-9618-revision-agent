import Link from "next/link";
import ConceptSteps from "@/components/ConceptSteps";
import LessonStatus from "@/components/LessonStatus";
import course from "@/data/caie9618.json";
import { notFound } from "next/navigation";
import Flowchart from "@/components/Flowchart";
import KeyTermCard from "@/components/KeyTermCard";
import PracticeSection from "@/components/PracticeSection";
import QuizCard from "@/components/QuizCard";
import TopicVisual from "@/components/TopicVisual";
import { getAvailableTopics, getRevisionTopic } from "@/lib/course";

type RevisionPageProps = {
  params: Promise<{ topicId: string }>;
};

export function generateStaticParams() {
  return getAvailableTopics().map((topic) => ({ topicId: topic.id }));
}

export default async function RevisionPage({ params }: RevisionPageProps) {
  const { topicId } = await params;
  const topic = getRevisionTopic(topicId);

  if (!topic) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Link
            className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
            href="/topics"
          >
            返回主题列表 / Back to topics
          </Link>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                {topic.titleChinese} / {topic.title}
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
                {topic.subtopicChinese}
              </h1>
              <p className="mt-2 text-lg font-semibold text-slate-500">
                {topic.subtopic}
              </p>
              <div className="mt-5 grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-lg leading-8 text-slate-800">
                  <span className="font-semibold text-slate-950">中文: </span>
                  {topic.summary.chinese}
                </p>
                <p className="text-sm leading-6 text-slate-600">
                  <span className="font-semibold text-slate-800">
                    English exam wording:{" "}
                  </span>
                  {topic.summary.english}
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-900">
                复习路线 / Revision route
              </p>
              <ol className="mt-3 space-y-2 text-sm leading-6 text-emerald-800">
                <li>1. 先用中文理解核心过程</li>
                <li>2. 记住英文 exam wording</li>
                <li>3. 跟随交互讲解核对概念</li>
                <li>4. 用评分点自评英文答案</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8">
        <aside className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600">
          <p className="font-semibold text-slate-900">教材参考 · {topic.level} · 第 {topic.source.chapter} 章</p>
          <p>{course.textbook.title} — {course.textbook.authors} ({course.textbook.year})</p>
          <p>小节 {topic.source.section} · 起始印刷页 {topic.source.printedPage} / PDF 页 {topic.source.pdfPage}</p>
          <p>{topic.coverage}。{course.textbook.note}</p>
        </aside>
        <LessonStatus topicId={topic.id} />
        <section>
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              交互讲解 / Interactive explanation
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              {topic.sectionTitles?.visual ?? "跟着过程一步一步看"}
            </h2>
          </div>
          {topic.visual === "concept-steps" ? <ConceptSteps key={topic.id} steps={topic.flowchart} /> : <TopicVisual kind={topic.visual} />}
        </section>

        <section>
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              核心术语 / Key terms
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              {topic.sectionTitles?.terms ?? "先记中文含义，再背英文得分句"}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {topic.keyTerms.map((term) => (
              <KeyTermCard key={term.term} term={term} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              快速总览 / Quick overview
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              {topic.sectionTitles?.overview ?? "静态流程总览"}
            </h2>
          </div>
          <Flowchart steps={topic.flowchart} connected={topic.visual !== "concept-steps"} />
        </section>

        <section id="quiz" className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="rounded-lg border border-rose-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-rose-700">
              常见误区 / Common mistakes
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              中文先理解，英文别写反
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {topic.commonMistakes.map((mistake) => (
                <li
                  className="rounded-md border border-rose-100 bg-rose-50 p-3"
                  key={mistake}
                >
                  {mistake}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                快速测验 / Quick quiz
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                {topic.sectionTitles?.quiz ?? "检查核心概念是否分清"}
              </h2>
            </div>
            <QuizCard key={topic.id} topicId={topic.id} questions={topic.quiz} />
          </div>
        </section>

        <section id="practice">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              练习与自评 / Practice and self-assessment
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              {topic.sectionTitles?.practice ?? "用中文拆题，再写英文得分句"}
            </h2>
          </div>
          <PracticeSection key={topic.id} topicId={topic.id} practice={topic.practice} />
        </section>
      </div>
    </main>
  );
}
