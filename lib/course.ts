import course from "@/data/caie9618.json";

export type VisualKind =
  | "fetch-cycle"
  | "binary-conversion"
  | "logic-gates"
  | "linear-search"
  | "concept-steps";

export type RevisionTopic = (typeof course.topics)[number] & {
  visual?: VisualKind;
};

export function getAvailableTopics(): RevisionTopic[] {
  return course.topics.filter(
    (topic) => topic.status === "Available",
  ) as RevisionTopic[];
}

export function getRevisionTopic(topicId: string): RevisionTopic | undefined {
  return getAvailableTopics().find((topic) => topic.id === topicId);
}
