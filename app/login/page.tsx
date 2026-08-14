"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUrl } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((user) => {
        if (user?.email) router.replace(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
      })
      .catch(() => {});
  }, [router]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 gradient-mesh">
      <div className="w-full max-w-sm border border-hairline bg-surface rounded-2xl shadow-card p-8 text-center">
        <span className="inline-block font-mono text-xs px-3 py-1 rounded-full bg-accentDim text-accent border border-hairline mb-4">
          Sign in
        </span>
        <h1 className="font-display text-2xl font-bold text-text mb-8">CloudSec.studio</h1>
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
