export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "tags" | "json" | "image" | "video";
  options?: string[];
};

export const FIELD_CONFIG: Record<string, FieldConfig[]> = {
  posts: [
    { name: "title", label: "Title", type: "text" },
    { name: "slug", label: "Slug", type: "text" },
    { name: "summary", label: "Summary", type: "textarea" },
    { name: "contentMarkdown", label: "Content (Markdown)", type: "textarea" },
    { name: "category", label: "Category", type: "text" },
    { name: "tags", label: "Tags (comma separated)", type: "tags" },
    { name: "thumbnailUrl", label: "Thumbnail", type: "image" },
    { name: "videoUrl", label: "Lesson video", type: "video" },
    { name: "readTimeMinutes", label: "Read time (minutes)", type: "number" },
    { name: "status", label: "Status", type: "select", options: ["draft", "published"] },
  ],
  quizzes: [
    { name: "postId", label: "Post ID", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "passingScore", label: "Passing score (%)", type: "number" },
    {
      name: "questions",
      label: 'Questions (JSON array: [{"questionText","options":[],"correctIndex","explanation"}])',
      type: "json",
    },
  ],
  labs: [
    { name: "postId", label: "Post ID", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "scenarioDescription", label: "Scenario description", type: "textarea" },
    {
      name: "commands",
      label: 'Commands (JSON array: [{"inputCmd","expectedOutput","hint","validatesTask"}])',
      type: "json",
    },
  ],
  "interview-questions": [
    { name: "question", label: "Question", type: "text" },
    { name: "answerMarkdown", label: "Written answer (Markdown)", type: "textarea" },
    { name: "videoUrl", label: "Video walkthrough", type: "video" },
    { name: "category", label: "Category", type: "text" },
    { name: "difficulty", label: "Difficulty", type: "select", options: ["junior", "mid", "senior"] },
    { name: "order", label: "Display order", type: "number" },
  ],
};

export const EMPTY_VALUES: Record<string, any> = {
  posts: {
    title: "",
    slug: "",
    summary: "",
    contentMarkdown: "",
    category: "",
    tags: "",
    thumbnailUrl: "",
    videoUrl: "",
    readTimeMinutes: 5,
    status: "draft",
  },
  quizzes: { postId: "", title: "", passingScore: 70, questions: "[]" },
  labs: { postId: "", title: "", scenarioDescription: "", commands: "[]" },
  "interview-questions": {
    question: "",
    answerMarkdown: "",
    videoUrl: "",
    category: "",
    difficulty: "mid",
    order: 0,
  },
};

export function toPayload(tab: string, values: Record<string, any>) {
  const payload = { ...values };
  if (tab === "posts" && typeof payload.tags === "string") {
    payload.tags = payload.tags.split(",").map((s: string) => s.trim()).filter(Boolean);
  }
  if ((tab === "quizzes" || tab === "labs")) {
    const jsonField = tab === "quizzes" ? "questions" : "commands";
    if (typeof payload[jsonField] === "string") {
      payload[jsonField] = JSON.parse(payload[jsonField]); // caller should catch parse errors
    }
  }
  if (payload.readTimeMinutes !== undefined) payload.readTimeMinutes = Number(payload.readTimeMinutes) || 5;
  if (payload.passingScore !== undefined) payload.passingScore = Number(payload.passingScore) || 70;
  if (payload.order !== undefined) payload.order = Number(payload.order) || 0;
  return payload;
}

export function toFormValues(tab: string, item: any) {
  const values = { ...EMPTY_VALUES[tab], ...item };
  if (tab === "posts" && Array.isArray(item.tags)) {
    values.tags = item.tags.join(", ");
  }
  if ((tab === "quizzes" || tab === "labs")) {
    const jsonField = tab === "quizzes" ? "questions" : "commands";
    if (Array.isArray(item[jsonField])) {
      values[jsonField] = JSON.stringify(item[jsonField], null, 2);
    }
  }
  return values;
}