"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminForm from "@/components/AdminForm";
import { FIELD_CONFIG, EMPTY_VALUES, toPayload, toFormValues } from "@/lib/adminFields";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
const TABS = ["posts", "quizzes", "labs", "interview-questions", "analytics"] as const;
type Tab = (typeof TABS)[number];

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<Tab>("posts");
  const [items, setItems] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      router.push("/admin/login");
      return;
    }
    fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${t}` } })
      .then((r) => r.json())
      .then((user) => {
        if (user.role !== "admin") {
          router.push("/dashboard");
          return;
        }
        setToken(t);
        setChecked(true);
      })
      .catch(() => router.push("/admin/login"));
  }, [router]);

  useEffect(() => {
    if (!token) return;
    closeForm();
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tab]);

  async function authedFetch(path: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}/api/admin${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
    if (res.status === 401 || res.status === 403) {
      router.push("/admin/login");
      throw new Error("Not authorized");
    }
    return res;
  }

  async function load() {
    setLoading(true);
    if (tab === "analytics") {
      const res = await authedFetch("/analytics");
      setAnalytics(await res.json());
    } else {
      const res = await authedFetch(`/${tab}`);
      setItems(await res.json());
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    await authedFetch(`/${tab}/${id}`, { method: "DELETE" });
    load();
  }

  function openCreateForm() {
    setEditingId(null);
    setFormValues(EMPTY_VALUES[tab] || {});
    setFormError("");
    setFormOpen(true);
  }

  function openEditForm(item: any) {
    setEditingId(item._id);
    setFormValues(toFormValues(tab, item));
    setFormError("");
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
    setFormValues({});
    setFormError("");
  }

  async function handleFormSubmit() {
    setFormError("");
    let payload;
    try {
      payload = toPayload(tab, formValues);
    } catch {
      setFormError("Invalid JSON in one of the fields — check formatting.");
      return;
    }
    try {
      const res = await authedFetch(editingId ? `/${tab}/${editingId}` : `/${tab}`, {
        method: editingId ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }
      closeForm();
      load();
    } catch (err: any) {
      setFormError(err.message || "Save failed");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/admin/login");
  }

  if (!checked) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-textDim text-sm">Checking access…</p>
      </main>
    );
  }

  const isCrudTab = tab !== "analytics";

  return (
    <main className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold text-text">CloudSec.studio CMS</h1>
        <button onClick={logout} className="font-mono text-xs text-warn hover:underline">
          Sign out
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`font-mono text-xs px-3 py-1.5 rounded-full border ${
              tab === t ? "bg-accent text-ink border-accent" : "border-hairline text-textDim"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {isCrudTab && !formOpen && (
        <button
          onClick={openCreateForm}
          className="focus-ring mb-6 font-mono text-xs px-4 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-ink transition"
        >
          + Add {tab.replace("-", " ").slice(0, -1)}
        </button>
      )}

      {isCrudTab && formOpen && (
        <>
          {formError && <p className="text-warn text-sm font-mono mb-3">{formError}</p>}
          <AdminForm
            fields={FIELD_CONFIG[tab]}
            values={formValues}
            onChange={(name, value) => setFormValues((v) => ({ ...v, [name]: value }))}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
            submitLabel={editingId ? "Save changes" : "Create"}
          />
        </>
      )}

      {loading ? (
        <p className="text-textDim text-sm">Loading…</p>
      ) : tab === "analytics" ? (
        <div className="grid sm:grid-cols-3 gap-4">
          {analytics &&
            Object.entries(analytics).map(([key, value]) => (
              <div key={key} className="border border-hairline rounded-lg p-4 bg-surface">
                <p className="font-mono text-xs text-textDim uppercase">{key}</p>
                <p className="font-mono text-2xl text-accent">{String(value)}</p>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.length === 0 && <p className="text-textDim text-sm">Nothing here yet.</p>}
          {items.map((item) => (
            <div
              key={item._id}
              className="border border-hairline bg-surface rounded-2xl p-4 shadow-soft flex items-start justify-between gap-4"
            >
              <div className="text-sm text-text">
                <p className="font-medium">{item.title || item.question || item.name}</p>
                <p className="text-textDim text-xs">{item.summary || item.category || item.postId}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => openEditForm(item)}
                  className="font-mono text-xs text-accent hover:underline"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="font-mono text-xs text-warn hover:underline"
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
