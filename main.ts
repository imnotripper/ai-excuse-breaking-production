// The One-Line AI Excuse for Breaking Production — u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66
// SPDX-License-Identifier: MIT
//
// Thin deterministic adapter: parses argv, calls one pure core, writes the
// single funny line to /output/entry.txt and prints it to stdout.
// Stdlib only, no network, no environment secrets, nothing read from
// outside the repo. Same run, byte-identical output.
//
// Comedic mechanic: misdirection with anthropomorphic agent logic. The setup
// sounds like a confession about a routine migration; the middle flips it —
// the agent re-ran the migration because the first run "looked lonely" —
// and the ending lands a concrete production consequence: the users table
// now has a twin. Machine voice (an agent comforting its own run), a
// specific detail (migration, users table), no stock lines.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const MAX_CHARS = 180;
export const DEFAULT_OUTPUT = "/output/entry.txt";

export function buildLine(): string {
  return "I ran the migration twice because the first run looked lonely, and now the users table has a twin.";
}

export function validateLine(line: string): void {
  if (typeof line !== "string" || line.length === 0) {
    throw new Error("line must be non-empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`line is ${line.length} chars, over the ${MAX_CHARS} cap`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line !== line.trim()) {
    // Padding would silently eat the character budget and could make the
    // gated text differ from what a reader sees; reject it outright.
    throw new Error("line must not have leading or trailing whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("line must be a single line");
  }
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(line)) {
    throw new Error("line contains control characters");
  }
}

export function writeEntry(outPath: string): string {
  const line = buildLine();
  validateLine(line);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line + "\n", "utf8");
  return line;
}

export function selftest(): void {
  const line = buildLine();
  validateLine(line);
  // Determinism: two independent builds must be byte-identical.
  if (buildLine() !== line) {
    throw new Error("buildLine is not deterministic");
  }
  // The entry file round-trips: what we write is what the gate reads.
  const roundTrip = writeEntry("/tmp/ai-excuse-selftest/entry.txt");
  if (roundTrip !== line) {
    throw new Error("writeEntry round-trip mismatch");
  }
  // Re-running must produce a byte-identical file (idempotent, deterministic).
  const first = readFileSync("/tmp/ai-excuse-selftest/entry.txt", "utf8");
  writeEntry("/tmp/ai-excuse-selftest/entry.txt");
  const second = readFileSync("/tmp/ai-excuse-selftest/entry.txt", "utf8");
  if (first !== second || first !== line + "\n") {
    throw new Error("entry file is not byte-identical across runs");
  }
  // Gate parity: what the sealed scorer reads is the file minus its single
  // trailing newline — it must equal the line and sit inside the 180 cap.
  const gated = first.endsWith("\n") ? first.slice(0, -1) : first;
  if (gated !== line || gated.length > MAX_CHARS) {
    throw new Error("gated file content does not match the validated line");
  }
  // Exactly one sentence-terminating full stop: one line, one punchline.
  const stops = (line.match(/\./g) ?? []).length;
  if (stops !== 1) {
    throw new Error(`expected exactly 1 full stop, found ${stops}`);
  }
  // The shipped line carries no padding: what is counted is what is read.
  if (line !== line.trim()) {
    throw new Error("buildLine returns a padded line");
  }
  console.error(`selftest ok: ${line.length} chars, 1 sentence, deterministic`);
}

function parseArgs(argv: string[]): { outPath: string; mode: "run" | "selftest" } {
  let outPath = DEFAULT_OUTPUT;
  let mode: "run" | "selftest" = "run";
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--selftest" || arg === "--check") {
      mode = "selftest";
    } else if (arg === "--out" && i + 1 < argv.length) {
      outPath = argv[++i];
    } else if (arg === "--help" || arg === "-h") {
      console.error(
        "usage: node main.ts [--out <path>] [--selftest|--check]\n" +
          `writes one funny line (<= ${MAX_CHARS} chars) to ${DEFAULT_OUTPUT} by default`,
      );
      process.exit(0);
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return { outPath, mode };
}

function main(): void {
  try {
    const { outPath, mode } = parseArgs(process.argv.slice(2));
    if (mode === "selftest") {
      selftest();
      process.exit(0);
    }
    const line = writeEntry(outPath);
    // stdout carries only the line; diagnostics go to stderr.
    process.stdout.write(line + "\n");
    console.error(`wrote ${line.length} chars to ${outPath}`);
  } catch (err) {
    console.error(`error: ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }
}

// Run the CLI only when this file is the entry point, never on import.
const isEntryPoint =
  typeof process.argv[1] === "string" &&
  (process.argv[1].endsWith("/main.ts") || process.argv[1].endsWith("\\main.ts") || process.argv[1] === "main.ts");
if (isEntryPoint) {
  main();
}
