"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboard } from "@/lib/api";

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
    getDashboard()
      .then(setData)
      .catch(() => router.push("/login"));
  }, [router]);

  if (!data) return <main className="min-h-screen flex items-center justify-center"><p className="text-textDim text-sm font-mono">Loading…</p></main>;

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="font-mono text-xs text-badge uppercase tracking-widest mb-2">
        Your progress
      </div>
      <h1 className="font-display text-3xl font-bold text-text mb-8">Hi, {data.name}</h1>

      <h2 className="font-mono text-sm text-textDim uppercase tracking-wide mb-3">Badges</h2>
      <div className="flex gap-2 flex-wrap mb-10">
        {data.badges.length === 0 && <p className="text-textDim text-sm">None yet — complete a lab to earn one.</p>}
        {data.badges.map((b: string) => (
          <span key={b} className="font-mono text-xs px-3 py-1.5 rounded-full bg-badge/20 border border-badge text-badge">
            {b}
          </span>
        ))}
      </div>

      <h2 className="font-mono text-sm text-textDim uppercase tracking-wide mb-3">Module progress</h2>
      <div className="flex flex-col gap-2">
        {data.progress.length === 0 && <p className="text-textDim text-sm">No modules started yet.</p>}
        {data.progress.map((p: any, i: number) => (
          <div key={i} className="border border-hairline rounded-2xl p-4 bg-surface shadow-soft flex justify-between text-sm">
            <span className="text-text">{p.postId?.title || "Untitled"}</span>
            <span className="font-mono text-xs text-textDim">
              {p.quizScore != null ? `quiz: ${p.quizScore}%` : ""} {p.labPassedAt ? "· lab passed" : ""}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
