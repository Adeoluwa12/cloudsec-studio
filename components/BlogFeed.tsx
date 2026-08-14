import Link from "next/link";

export default function BlogFeed({ posts }: { posts: any[] }) {
  return (
    <section id="blog" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="font-mono text-xs px-3 py-1 rounded-full bg-accentDim text-accent border border-hairline">
          Modules
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text mt-4">
          Latest learning modules
        </h2>
      </div>

      {(!posts || posts.length === 0) && (
        <p className="text-textDim text-sm text-center">
          No published modules yet — add some from the admin CMS.
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts?.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-hairline bg-surface shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all block overflow-hidden"
          >
            {post.thumbnailUrl && (
              <img
                src={post.thumbnailUrl}
                alt=""
                className="w-full h-36 object-cover border-b border-hairline"
              />
            )}
            <div className="p-6">
              <span className="font-mono text-xs text-accent">{post.category}</span>
              <h3 className="font-display text-lg font-bold text-text mt-2 mb-2 group-hover:text-accent transition">
                {post.title}
              </h3>
              <p className="text-textDim text-sm mb-4 line-clamp-3">{post.summary}</p>
              <div className="flex gap-2 flex-wrap">
                {post.tags?.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 rounded-full bg-surfaceAlt border border-hairline text-textDim"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
