const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";

function authHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getPosts(params: Record<string, string> = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/api/posts${qs ? `?${qs}` : ""}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
}

export async function getPost(slug: string) {
  const res = await fetch(`${API_URL}/api/posts/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to load post");
  return res.json();
}

export async function getInterviewQuestions(params: Record<string, string> = {}) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/api/interview-questions${qs ? `?${qs}` : ""}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to load interview questions");
  return res.json();
}

export async function getLab(postId: string) {
  const res = await fetch(`${API_URL}/api/posts/${postId}/lab`);
  if (!res.ok) throw new Error("Failed to load lab");
  return res.json();
}

export async function runLabCommand(postId: string, command: string) {
  const res = await fetch(`${API_URL}/api/lab/${postId}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ command }),
  });
  return res.json();
}

export async function getDashboard() {
  const res = await fetch(`${API_URL}/api/dashboard`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}

export function loginUrl(provider: "google" | "github") {
  return `${API_URL}/api/auth/${provider}`;
}
