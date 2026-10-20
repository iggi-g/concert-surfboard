import { test } from "node:test";
import assert from "node:assert/strict";
import { getLatestUpdate, isAddedInLatestUpdate } from "./event-freshness";

test("October 15 additions stop being NEW after the October 20 refresh", () => {
  const existing = { first_seen_at: "2026-10-15T08:34:51Z", last_seen_at: "2026-10-20T06:44:16Z" };
  assert.equal(isAddedInLatestUpdate(existing, getLatestUpdate([existing])), false);
});
test("October 20 additions are NEW throughout the latest multi-venue update", () => {
  assert.equal(isAddedInLatestUpdate({ first_seen_at: "2026-10-20T06:43:26Z" }, "2026-10-20T06:44:16Z"), true);
});
test("latest update comes from the full dataset, not a filtered subset", () => {
  assert.equal(getLatestUpdate([{ last_seen_at: "2026-10-15T08:34:51Z" }, { last_seen_at: "2026-10-20T06:44:16Z" }]), "2026-10-20T06:44:16.000Z");
});
test("missing or invalid first-added timestamps never count as NEW", () => {
  assert.equal(isAddedInLatestUpdate({}, "2026-10-20T06:44:16Z"), false);
  assert.equal(isAddedInLatestUpdate({ first_seen_at: "invalid" }, "2026-10-20T06:44:16Z"), false);
});