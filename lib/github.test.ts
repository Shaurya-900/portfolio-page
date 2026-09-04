/**
 * One runnable check for the only real arithmetic in here: the day
 * bucketing. Run with `npx tsx lib/github.test.ts` (or paste into node).
 */
import assert from "node:assert/strict";
import { commitsByDay, type GhEvent } from "./github";

const now = new Date(2026, 8, 4, 9, 0, 0); // 4 Sept 2026, 09:00 local
const push = (iso: string, size: number): GhEvent => ({
  id: iso,
  type: "PushEvent",
  created_at: iso,
  repo: { name: "u/r" },
  payload: { size },
});
const at = (day: number, hour: number, month = 8) =>
  new Date(2026, month, day, hour).toISOString();

const days = commitsByDay(
  [
    push(at(4, 8), 2), // today, an hour ago
    push(at(3, 23), 3), // late last night — must NOT count as today
    push(at(1, 12), 1), // three days back
    push(at(8, 12, 7), 9), // four weeks back, outside the window
    push(at(6, 12), 4), // dated in the future; the feed should not print it
  ],
  14,
  now
);

assert.equal(days.length, 14);
assert.equal(days.at(-1), 2, "today");
assert.equal(days.at(-2), 3, "yesterday, not folded into today");
assert.equal(days.at(-4), 1, "three days back");
assert.equal(
  days.reduce((a, b) => a + b, 0),
  6,
  "pushes outside the window, past or future, are dropped"
);

// A non-push event contributes nothing.
assert.deepEqual(
  commitsByDay([{ ...push(at(4, 8), 5), type: "WatchEvent" }], 14, now).reduce((a, b) => a + b, 0),
  0
);

console.log("commitsByDay: ok");
