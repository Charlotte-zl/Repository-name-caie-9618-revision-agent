type FlowchartProps = {
  steps: Array<{
    label: string;
    description: string;
  }>;
};

export default function Flowchart({ steps }: FlowchartProps) {
  return (
    <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
      <div className="grid gap-3 lg:grid-cols-7">
        {steps.map((step, index) => (
          <div className="relative" key={step.label}>
            <div className="h-full rounded-lg border border-emerald-200 bg-white p-4 text-center shadow-sm">
              <p className="text-base font-semibold text-emerald-950">
                {step.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-emerald-800">
                {step.description}
              </p>
            </div>
            {index < steps.length - 1 ? (
              <div
                aria-hidden="true"
                className="mx-auto h-6 w-px bg-emerald-300 lg:absolute lg:-right-2 lg:top-1/2 lg:h-px lg:w-4"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
