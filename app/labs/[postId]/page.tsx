import LabTerminal from "@/components/LabTerminal";
import { getLab } from "@/lib/api";

export default async function LabPage({ params }: { params: { postId: string } }) {
  const lab = await getLab(params.postId).catch(() => null);

  if (!lab) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <p className="text-textDim text-sm">Lab not found.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <span className="font-mono text-xs px-3 py-1 rounded-full bg-badge/10 text-badge border border-hairline">
        Hands-on lab
      </span>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-4 mb-3">
        {lab.title}
      </h1>
      <p className="text-textDim text-sm mb-8 max-w-xl">{lab.scenarioDescription}</p>
      <div className="rounded-2xl border border-hairline bg-surface p-3 shadow-card">
        <LabTerminal postId={params.postId} />
      </div>
    </main>
  );
}
