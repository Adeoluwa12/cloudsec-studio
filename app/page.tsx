import TerminalHero from "@/components/TerminalHero";
import BlogFeed from "@/components/BlogFeed";
import { getPosts } from "@/lib/api";

export default async function Home() {
  const posts = await getPosts().catch(() => []);

  return (
    <main>
      <TerminalHero />
      <BlogFeed posts={posts} />
      <footer className="border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-text text-sm">CloudSec.studio</span>
          <span className="font-mono text-xs text-textDim">
            Cloud &amp; Security Learning Hub
          </span>
        </div>
      </footer>
    </main>
  );
}
