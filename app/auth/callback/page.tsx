"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      router.push("/login?error=missing_token");
      return;
    }
    localStorage.setItem("token", token);

    fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((user) => {
        router.push(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
      })
      .catch(() => router.push("/dashboard"));
  }, [params, router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="font-mono text-textDim text-sm">Signing you in…</p>
    </main>
  );
}
