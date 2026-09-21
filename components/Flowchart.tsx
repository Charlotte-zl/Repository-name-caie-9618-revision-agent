type FlowchartProps = {
  connected?: boolean;
  steps: Array<{
    label: string;
    description: string;
  }>;
};

export default function Flowchart({ steps, connected = true }: FlowchartProps) {
  return (
    <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap">
        {steps.map((step, index) => (
          <div className="relative min-w-0 flex-1 lg:min-w-40" key={step.label}>
            <div className="h-full rounded-lg border border-emerald-200 bg-white p-4 text-center shadow-sm">
              <p className="text-base font-semibold text-emerald-950">
                {step.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-emerald-800">
                {step.description}
              </p>
            </div>
            {connected && index < steps.length - 1 ? (
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
