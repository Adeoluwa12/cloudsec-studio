"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MODULES = ["auth", "posts", "quizzes", "labs", "interview-prep", "badges"];

export default function TerminalHero() {
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    if (loaded >= MODULES.length) return;
    const t = setTimeout(() => setLoaded((n) => n + 1), 260);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <section className="gradient-mesh">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block font-mono text-xs px-3 py-1 rounded-full bg-accentDim text-accent border border-hairline mb-6">
            Cloud &amp; Security Learning Hub
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text leading-[1.1] mb-6">
            Learn cloud security
            <br />
            by actually doing it.
          </h1>

          <p className="text-textDim text-base sm:text-lg max-w-lg mb-8">
            Visual breakdowns, scored quizzes, and a real terminal sandbox for
            patching cloud misconfigurations — plus interview prep broken down
            question by question, written or on video.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 mb-10">
            <a
              href="#blog"
              className="focus-ring px-6 py-3 rounded-full bg-accent text-ink font-semibold text-sm shadow-soft hover:opacity-90 transition"
            >
              Browse modules
            </a>
            <a
              href="/interview-prep"
              className="focus-ring px-6 py-3 rounded-full border border-hairline bg-surface text-text font-semibold text-sm hover:border-accent transition"
            >
              Interview prep
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-textDim">
            <span>✓ Browser-based labs</span>
            <span>✓ Instant grading</span>
            <span>✓ Google / GitHub sign-in</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-hairline bg-surface shadow-lift p-2"
        >
          <div className="rounded-xl overflow-hidden" style={{ background: "#0A0E12", border: "1px solid #26313E" }}>
            <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: "1px solid #26313E" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#F2B15E99" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#5EEAD499" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#A78BFA99" }} />
              <span className="ml-3 font-mono text-[10px]" style={{ color: "#7C8A9A" }}>
                cloudsec-studio --boot
              </span>
            </div>
            <div className="p-5 font-mono text-xs">
              {MODULES.map((mod, i) => (
                <div
                  key={mod}
                  className="mb-1.5 transition-opacity duration-200"
                  style={{ opacity: i < loaded ? 1 : 0 }}
                >
                  <span style={{ color: "#5EEAD4" }}>[ok]</span>{" "}
                  <span style={{ color: "#D6E0EA" }}>{mod}</span>
                </div>
              ))}
              {loaded >= MODULES.length && (
                <div className="mt-2" style={{ color: "#A78BFA" }}>$ ready to learn_</div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
