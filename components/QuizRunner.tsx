"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

export default function QuizRunner({ postId }: { postId: string }) {
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${postId}/quiz`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(-1));
      })
      .catch((err) => setError(err.message));
  }, [postId]);

  async function submit() {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Sign in to save your quiz results.");
      return;
    }
    const res = await fetch(`${API_URL}/api/quiz/${postId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ answers }),
    });
    setResult(await res.json());
  }

  if (error) return <p className="font-mono text-warn text-sm">{error}</p>;
  if (!quiz) return <p className="text-textDim text-sm">Loading quiz…</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-text">{quiz.title}</h1>

      {quiz.questions.map((q: any, i: number) => (
        <div key={i} className="border border-hairline rounded-2xl p-5 bg-surface shadow-soft">
          <p className="text-text mb-3 font-medium">{q.questionText}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt: string, oi: number) => {
              const isSelected = answers[i] === oi;
              const graded = result?.results?.[i];
              const isCorrect = graded && oi === graded.correctIndex;
              const isWrongPick = graded && isSelected && !graded.correct;

              return (
                <button
                  key={oi}
                  onClick={() => {
                    if (result) return;
                    const next = [...answers];
                    next[i] = oi;
                    setAnswers(next);
                  }}
                  className={`focus-ring text-left px-4 py-2.5 rounded-xl border text-sm transition ${
                    isCorrect
                      ? "border-accent text-accent bg-accentDim"
                      : isWrongPick
                      ? "border-warn text-warn"
                      : isSelected
                      ? "border-accent text-text bg-accentDim"
                      : "border-hairline text-textDim hover:border-accent"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {result?.results?.[i]?.explanation && (
            <p className="text-textDim text-xs font-mono mt-3">
              {result.results[i].explanation}
            </p>
          )}
        </div>
      ))}

      {!result ? (
        <button
          onClick={submit}
          disabled={answers.includes(-1)}
          className="focus-ring bg-accent text-ink font-semibold text-sm rounded-full px-6 py-3 shadow-soft hover:opacity-90 transition disabled:opacity-50 self-start"
        >
          Submit answers
        </button>
      ) : (
        <p className="font-mono text-sm text-text">
          Score: <span className="text-accent">{result.scorePercent}%</span>{" "}
          {result.passed ? "— passed" : "— try again"}
        </p>
      )}
    </div>
  );
}
