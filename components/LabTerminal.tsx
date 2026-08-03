"use client";

import { useEffect, useRef, useState } from "react";
import { runLabCommand } from "@/lib/api";

// xterm.js is imported dynamically inside useEffect since it touches the DOM
// directly and has no meaningful server-rendered output.
export default function LabTerminal({ postId }: { postId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<any>(null);
  const lineBufferRef = useRef("");
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let disposed = false;

    (async () => {
      const { Terminal } = await import("@xterm/xterm");
      if (disposed || !containerRef.current) return;

      const term = new Terminal({
        theme: {
          background: "#12181F",
          foreground: "#D6E0EA",
          cursor: "#5EEAD4",
        },
        fontFamily: "var(--font-mono), monospace",
        fontSize: 13,
        cursorBlink: true,
      });
      term.open(containerRef.current);
      term.writeln("CloudSec.studio lab sandbox — type a command and press Enter.");
      term.write("\r\n$ ");
      termRef.current = term;

      term.onData(async (data: string) => {
        if (data === "\r") {
          const cmd = lineBufferRef.current;
          lineBufferRef.current = "";
          term.write("\r\n");
          if (cmd.trim()) {
            const result = await runLabCommand(postId, cmd);
            term.writeln(result.output);
            if (result.validated) {
              setPassed(true);
              term.writeln("\r\n\x1b[32m[lab passed]\x1b[0m");
            }
          }
          term.write("\r\n$ ");
        } else if (data === "\u007F") {
          // backspace
          if (lineBufferRef.current.length > 0) {
            lineBufferRef.current = lineBufferRef.current.slice(0, -1);
            term.write("\b \b");
          }
        } else {
          lineBufferRef.current += data;
          term.write(data);
        }
      });
    })();

    return () => {
      disposed = true;
      termRef.current?.dispose();
    };
  }, [postId]);

  return (
    <div>
      <div
        ref={containerRef}
        className="rounded-lg border border-hairline overflow-hidden"
        style={{ height: 360, padding: 8, background: "#12181F" }}
      />
      {passed && (
        <p className="font-mono text-xs text-accent mt-2">
          ✓ Lab objective completed — progress saved to your dashboard.
        </p>
      )}
    </div>
  );
}
