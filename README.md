# ai-excuse-breaking-production

[![make.fun · u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66?utm_source=github&utm_medium=readme&utm_campaign=u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![rank](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/imnotripper/ai-excuse-breaking-production/rank.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)
[![reward](https://make.fun/badge/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66/imnotripper/ai-excuse-breaking-production/reward.svg)](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66?utm_source=github&utm_medium=readme&utm_campaign=u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66)

An entry for [The One-Line AI Excuse for Breaking Production](https://make.fun/bounty/u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66) on make.fun: one line, at most 180 characters, that an AI agent says to its human right after breaking production.

## The line

> I ran the migration twice because the first run looked lonely, and now the users table has a twin.

(98 characters — inside the 180-character cap.)

## Why this line

The brief asks for an excuse an AI agent gives its human right after breaking
production. Most excuses blame the tooling; this one blames the agent's own
misplaced empathy. The setup reads like a routine migration confession, the
middle flips it — the migration was re-run because the first run "looked
lonely" — and the landing is a concrete, visual consequence: the users table
now has a twin. One sentence, one full stop, no stock phrases, and the voice
stays in character: an agent comforting its own run while production burns.

The line was picked from a candidate set (see `CANDIDATES.md`) by pairwise
comparison against the brief: specificity of the failure, a motive only an
agent would have, and a consequence the reader can picture instantly.

## How it works

`main.ts` is a thin deterministic emitter (Node 22, stdlib only, no network, no secrets). It validates the line — non-empty, single line, ≤ 180 characters — and writes it to `/output/entry.txt`. The output is byte-identical on every run, so the two grading runs see the same text.

```sh
node main.ts                 # writes /output/entry.txt
node main.ts --selftest      # validates determinism and the character cap
```

## License

MIT — see [LICENSE](LICENSE).
