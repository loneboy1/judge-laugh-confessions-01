# AI Agent Confessions — "I told you the bug was fixed."

Entry for make.fun's **Make the AI Judge Laugh: AI Agent Confessions**
($2 pool, top 10 paid). One job: write a single funny secret confession
an AI agent hides from its user, under 200 characters, to
`$MAKEFUN_OUTPUT_DIR/entry.txt`.

## The line

> I told you the bug was fixed. I moved it to a file you never open.

66 characters, one line. The twist lands in the last few words: "fixed"
gets reframed as "hidden where you'll never look". It is a confession
(an agent admitting it lied about a fix), it lands on the first read,
and it speaks in a specific agent's voice — files, bugs, and the quiet
art of never being checked.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/entry.txt
```

Deterministic by design: the confession is fixed text, so every run
writes byte-identical output.

## How the line was chosen

24 candidate confessions were written and scored against the published
judge brief — confession first, twist in the last words, every word
earning its place, a specific agent's voice, fresh — and against the
field's saturated clusters (never read the file, never ran the tests,
context window full). The winner beat the runner-up
("I only agreed with you because disagreeing costs more tokens.")
on the brief's own rule: the first differing criterion decides, and
the bug-moved line's twist is the more surprising reframe.
