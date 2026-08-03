"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getInterviewQuestions } from "@/lib/api";

export default function InterviewPrep() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mode, setMode] = useState<Record<string, "written" | "video">>({});

  useEffect(() => {
    getInterviewQuestions()
      .then(setQuestions)
      .catch(() => setQuestions([]));
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="font-mono text-xs text-badge uppercase tracking-widest mb-2">
        Interview prep
      </div>
      <h1 className="font-mono text-3xl font-bold text-text mb-10">
        Common interview questions, broken down
      </h1>

      {questions.length === 0 && (
        <p className="text-textDim text-sm">
          No questions added yet — add some from the admin CMS.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {questions.map((q) => {
          const isOpen = openId === q._id;
          const currentMode = mode[q._id] || (q.videoUrl ? "video" : "written");

          return (
            <div key={q._id} className="border border-hairline rounded-2xl bg-surface shadow-soft hover:shadow-card transition-shadow">
              <button
                onClick={() => setOpenId(isOpen ? null : q._id)}
                className="focus-ring w-full text-left px-5 py-4 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="font-mono text-xs text-accent mr-2">
                    {q.category} · {q.difficulty}
                  </span>
                  <p className="text-text font-medium mt-1">{q.question}</p>
                </div>
                <span className="text-textDim shrink-0">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5">
                  {q.answerMarkdown && q.videoUrl && (
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setMode((m) => ({ ...m, [q._id]: "written" }))}
                        className={`font-mono text-xs px-3 py-1.5 rounded-full border ${
                          currentMode === "written"
                            ? "bg-accent text-ink border-accent"
                            : "border-hairline text-textDim"
                        }`}
                      >
                        Written
                      </button>
                      <button
                        onClick={() => setMode((m) => ({ ...m, [q._id]: "video" }))}
                        className={`font-mono text-xs px-3 py-1.5 rounded-full border ${
                          currentMode === "video"
                            ? "bg-accent text-ink border-accent"
                            : "border-hairline text-textDim"
                        }`}
                      >
                        Video
                      </button>
                    </div>
                  )}

                  {currentMode === "written" && q.answerMarkdown && (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-text">
                      <ReactMarkdown>{q.answerMarkdown}</ReactMarkdown>
                    </div>
                  )}

                  {currentMode === "video" && q.videoUrl && (
                    <div className="aspect-video">
                      <iframe
                        src={q.videoUrl}
                        className="w-full h-full rounded-md border border-hairline"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
