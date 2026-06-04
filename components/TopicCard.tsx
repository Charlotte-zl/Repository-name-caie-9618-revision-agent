import Link from "next/link";

type TopicCardProps = {
  topic: {
    title: string;
    titleChinese?: string;
    subtopic?: string;
    subtopicChinese?: string;
    status: string;
    statusChinese?: string;
    href?: string;
  };
};

export default function TopicCard({ topic }: TopicCardProps) {
  const isAvailable = topic.status === "Available" && topic.href;

  const content = (
    <article className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">
            {topic.titleChinese ?? topic.title}
          </h2>
          {topic.titleChinese ? (
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {topic.title}
            </p>
          ) : null}
          {topic.subtopicChinese ? (
            <p className="mt-3 text-sm leading-6 text-slate-700">
              {topic.subtopicChinese}
            </p>
          ) : null}
          {topic.subtopic ? (
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {topic.subtopic}
            </p>
          ) : null}
        </div>
        <span
          className={
            isAvailable
              ? "rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
              : "rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700"
          }
        >
          {topic.statusChinese ?? topic.status}
        </span>
      </div>
      <div className="mt-5 text-sm font-semibold text-emerald-700">
        {isAvailable ? "开始复习 / Open revision" : "内容规划中 / Planned"}
      </div>
    </article>
  );

  if (!isAvailable) {
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <Link className="block h-full" href={topic.href as string}>
      {content}
    </Link>
  );
}
