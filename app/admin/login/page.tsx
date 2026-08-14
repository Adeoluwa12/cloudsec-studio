"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((user) => {
        if (user.role === "admin") router.replace("/admin/dashboard");
      })
      .catch(() => {});
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      router.push("/admin/dashboard");
    } catch {
      setError("Could not reach server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 gradient-mesh">
      <div className="w-full max-w-sm border border-hairline bg-surface rounded-2xl shadow-card p-8">
        <span className="inline-block font-mono text-xs px-3 py-1 rounded-full bg-accentDim text-accent border border-hairline mb-4">
          Admin access
        </span>
        <h1 className="font-display text-2xl font-bold text-text mb-6">CloudSec.studio</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="font-mono text-xs text-textDim">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border border-hairline rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-mono text-xs text-textDim">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-hairline rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent transition"
            />
          </div>
          {error && <p className="font-mono text-xs text-warn">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="focus-ring bg-accent text-ink font-semibold text-sm rounded-full px-6 py-3 shadow-soft hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing in\u2026" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
