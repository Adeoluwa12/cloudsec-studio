import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPost } from "@/lib/api";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug).catch(() => null);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <p className="text-textDim text-sm">Post not found.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <span className="font-mono text-xs px-3 py-1 rounded-full bg-accentDim text-accent border border-hairline">
        {post.category}
      </span>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-text mt-4 mb-2">
        {post.title}
      </h1>
      <p className="text-textDim text-xs font-mono mb-8">{post.readTimeMinutes} min read</p>

      {post.videoUrl && (
        <div className="aspect-video mb-10 rounded-2xl overflow-hidden border border-hairline shadow-soft">
          <iframe src={post.videoUrl} className="w-full h-full" allowFullScreen />
        </div>
      )}

      <div className="prose prose-sm dark:prose-invert max-w-none text-text mb-10">
        <ReactMarkdown>{post.contentMarkdown}</ReactMarkdown>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/quiz/${post._id}`}
          className="focus-ring font-mono text-sm px-5 py-2.5 rounded-full bg-accent text-ink font-semibold shadow-soft hover:opacity-90 transition"
        >
          Take the quiz →
        </Link>
        <Link
          href={`/labs/${post._id}`}
          className="focus-ring font-mono text-sm px-5 py-2.5 rounded-full border border-hairline text-text hover:border-badge transition"
        >
          Try the lab →
        </Link>
      </div>
    </main>
  );
}
