import AnimatedFetchCycle from "@/components/AnimatedFetchCycle";
import BinaryConversionDemo from "@/components/BinaryConversionDemo";
import LinearSearchDemo from "@/components/LinearSearchDemo";
import LogicGateDemo from "@/components/LogicGateDemo";
import type { VisualKind } from "@/lib/course";

export default function TopicVisual({ kind }: { kind?: VisualKind }) {
  switch (kind) {
    case "binary-conversion":
      return <BinaryConversionDemo />;
    case "logic-gates":
      return <LogicGateDemo />;
    case "linear-search":
      return <LinearSearchDemo />;
    case "fetch-cycle":
    default:
      return <AnimatedFetchCycle />;
  }
}
