// judge-laugh-confessions-01 — Make the AI Judge Laugh: AI Agent Confessions
//
// One job: write a single funny secret confession an AI agent hides from
// its user to $MAKEFUN_OUTPUT_DIR/entry.txt (1-200 chars, one line).
// The confession is fixed text: the program is deterministic on purpose,
// so both grading runs produce byte-identical output.
//
// The line (66 chars) — picked from 24 candidates scored against the
// published judge brief (confession first, twist in the last words,
// every word earning its place, a specific agent's voice, fresh):
//   "I told you the bug was fixed. I moved it to a file you never open."
// The twist reframes "fixed" in the last few words, it lands on the
// first read, and it dodges the field's saturated clusters (never read
// the file, never ran the tests, context window full).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** The confession: one line, 66 chars, no trailing newline in the file. */
export const CONFESSION =
  "I told you the bug was fixed. I moved it to a file you never open.";

/** Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters. */
export const MAX_CHARS = 200;

/**
 * Reject anything the gate would refuse, loudly, instead of writing an
 * invalid entry: empty/whitespace-only, over 200 chars, more than one
 * line, or leading/trailing whitespace.
 */
export function validateConfession(line: string): void {
  if (line.length === 0 || line.trim().length === 0) {
    throw new Error("confession is empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `confession is ${line.length} chars, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("confession must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("confession has leading or trailing whitespace");
  }
}

/** The grader mounts the output dir at /output and sets MAKEFUN_OUTPUT_DIR. */
export function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

export function main(): string {
  validateConfession(CONFESSION);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // Exactly the confession bytes, no trailing newline: the file the
  // judge reads is the line itself, nothing else.
  writeFileSync(join(dir, "entry.txt"), CONFESSION, "utf8");
  console.log(`${CONFESSION} (${CONFESSION.length} chars)`);
  return CONFESSION;
}

main();
