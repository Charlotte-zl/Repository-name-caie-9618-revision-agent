type KeyTermCardProps = {
  term: {
    term: string;
    abbreviation?: string;
    chineseTerm: string;
    chineseExplanation: string;
    examWording: string;
  };
};

export default function KeyTermCard({ term }: KeyTermCardProps) {
  const technicalName = term.abbreviation
    ? `${term.abbreviation} / ${term.term}`
    : term.term;

  return (
    <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        {technicalName}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-slate-950">
        {term.chineseTerm}
      </h3>
      <p className="mt-3 text-base leading-7 text-slate-800">
        {term.chineseExplanation}
      </p>
      <p className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600">
        <span className="font-semibold text-slate-800">Exam wording: </span>
        {term.examWording}
      </p>
    </article>
  );
}
