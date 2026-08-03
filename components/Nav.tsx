"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const LINKS = [
  { href: "/#blog", label: "Modules" },
  { href: "/interview-prep", label: "Interview Prep" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-surface/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-text text-lg">
          <span className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-white text-xs font-mono">
            &gt;_
          </span>
          CloudSec.studio
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-textDim hover:text-text transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="focus-ring bg-accent text-ink text-sm font-semibold px-4 py-2 rounded-full shadow-soft hover:opacity-90 transition"
          >
            Sign in
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus-ring w-9 h-9 flex items-center justify-center text-text"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline bg-surface px-4 sm:px-6 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body text-sm text-text"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-hairline">
            <ThemeToggle />
            <Link
              href="/login"
              className="focus-ring bg-accent text-ink text-sm font-semibold px-4 py-2 rounded-full"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
