import { loginUrl } from "@/lib/api";

export default function AdminLogin() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 gradient-mesh">
      <div className="w-full max-w-sm border border-hairline bg-surface rounded-2xl shadow-card p-8 text-center">
        <span className="inline-block font-mono text-xs px-3 py-1 rounded-full bg-accentDim text-accent border border-hairline mb-4">
          Admin access
        </span>
        <h1 className="font-display text-2xl font-bold text-text mb-2">CloudSec.studio</h1>
        <p className="text-textDim text-sm mb-8">
          Sign in with the account registered as admin (set via <code>ADMIN_EMAIL</code> on
          the backend).
        </p>
        <div className="flex flex-col gap-3">
          <a
            href={loginUrl("google")}
            className="focus-ring bg-accent text-ink font-semibold text-sm rounded-full px-6 py-3 shadow-soft hover:opacity-90 transition"
          >
            Continue with Google
          </a>
          <a
            href={loginUrl("github")}
            className="focus-ring border border-hairline text-text font-semibold text-sm rounded-full px-6 py-3 hover:border-accent transition"
          >
            Continue with GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
