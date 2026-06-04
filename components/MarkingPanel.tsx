type MarkingPanelProps = {
  result: {
    markAwarded: string;
    awarded: string[];
    notAwarded: string[];
    commonMistake: string;
    modelAnswerChinese: string;
    modelAnswer: string;
  };
};

export default function MarkingPanel({ result }: MarkingPanelProps) {
  return (
    <section className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-slate-950">
          模拟 AI 批改结果 / Mock AI Marking Result
        </h3>
        <span className="rounded-md bg-emerald-700 px-3 py-1.5 text-sm font-semibold text-white">
          得分：{result.markAwarded}
        </span>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-emerald-100 bg-emerald-50 p-4">
          <h4 className="font-semibold text-emerald-900">已得分点</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-800">
            {result.awarded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-md border border-amber-100 bg-amber-50 p-4">
          <h4 className="font-semibold text-amber-900">未得分点</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-800">
            {result.notAwarded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-md border border-rose-100 bg-rose-50 p-4">
        <h4 className="font-semibold text-rose-900">常见误区</h4>
        <p className="mt-2 text-sm leading-6 text-rose-800">
          {result.commonMistake}
        </p>
      </div>

      <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
        <h4 className="font-semibold text-slate-950">改进版答案</h4>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          {result.modelAnswerChinese}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          <span className="font-semibold text-slate-900">
            English exam wording:{" "}
          </span>
          {result.modelAnswer}
        </p>
      </div>
    </section>
  );
}
