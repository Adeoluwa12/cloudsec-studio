import QuizRunner from "@/components/QuizRunner";

export default function QuizPage({ params }: { params: { postId: string } }) {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <QuizRunner postId={params.postId} />
    </main>
  );
}
