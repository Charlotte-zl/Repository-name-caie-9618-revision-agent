import Link from "next/link";
import AnimatedFetchCycle from "@/components/AnimatedFetchCycle";
import Flowchart from "@/components/Flowchart";
import KeyTermCard from "@/components/KeyTermCard";
import PracticeSection from "@/components/PracticeSection";
import QuizCard from "@/components/QuizCard";
import course from "@/data/caie9618.json";

type RevisionTopic = {
  id: string;
  title: string;
  titleChinese: string;
  subtopic: string;
  subtopicChinese: string;
  summary: {
    chinese: string;
    english: string;
  };
  keyTerms: Array<{
    term: string;
    abbreviation?: string;
    chineseTerm: string;
    chineseExplanation: string;
    examWording: string;
  }>;
  flowchart: Array<{
    label: string;
    description: string;
  }>;
  commonMistakes: string[];
  quiz: Array<{
    questionChinese: string;
    question: string;
    options: string[];
    answer: string;
    explanationChinese: string;
    explanation?: string;
  }>;
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

const topic = course.topics.find(
  (item) => item.id === "processor-fundamentals",
) as RevisionTopic;

export default function ProcessorFundamentalsPage() {
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
                <li>2. 记住寄存器的英文 exam wording</li>
                <li>3. 跟随动态过程图逐步 trace</li>
                <li>4. 用 mark scheme 检查英文答案</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8">
        <section>
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              动态过程图解 / Animated Step-by-Step Explanation
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              跟着 CPU 的数据流一步一步看 fetch-execute cycle
            </h2>
          </div>
          <AnimatedFetchCycle />
        </section>

        <section>
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              核心术语 / Key terms
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              先记中文含义，再背英文得分句
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
              静态流程：PC 到 Execute
            </h2>
          </div>
          <Flowchart steps={topic.flowchart} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
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
                检查寄存器角色是否分清
              </h2>
            </div>
            <QuizCard questions={topic.quiz} />
          </div>
        </section>

        <section>
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              练习与批改 / Practice and marking
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">
              用中文拆题，再写英文得分句
            </h2>
          </div>
          <PracticeSection practice={topic.practice} />
        </section>
      </div>
    </main>
  );
}
