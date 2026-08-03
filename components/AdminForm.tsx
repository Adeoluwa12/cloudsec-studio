"use client";

import { FieldConfig } from "@/lib/adminFields";

export default function AdminForm({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
}: {
  fields: FieldConfig[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="border border-hairline bg-surfaceAlt rounded-lg p-5 flex flex-col gap-3 mb-6"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="font-mono text-xs text-textDim uppercase tracking-wide">
            {field.label}
          </label>

          {(field.type === "textarea" || field.type === "json") && (
            <textarea
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              rows={field.type === "json" ? 8 : 3}
              className="focus-ring bg-surface border border-hairline rounded-xl px-3 py-2 text-text text-sm font-mono resize-none"
            />
          )}

          {field.type === "select" && (
            <select
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="focus-ring bg-surface border border-hairline rounded-xl px-3 py-2 text-text text-sm"
            >
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {(field.type === "text" || field.type === "number" || field.type === "tags") && (
            <input
              type={field.type === "number" ? "number" : "text"}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="focus-ring bg-surface border border-hairline rounded-xl px-3 py-2 text-text text-sm"
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="focus-ring bg-accent text-ink font-semibold text-sm rounded-full px-5 py-2.5 shadow-soft hover:opacity-90 transition"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="font-mono text-xs text-textDim hover:text-text"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
