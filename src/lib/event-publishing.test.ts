import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Opt-in live integration check; fixtures are removed through a database migration after running.
test("valid visitor submissions publish without review and duplicates cannot overwrite listings", { skip: process.env.RUN_EVENT_PUBLISHING_TEST !== "1" }, async () => {
  const source = readFileSync("src/integrations/supabase/client.ts", "utf8");
  const url = source.match(/SUPABASE_URL = '([^']+)'/)?.[1];
  const key = source.match(/SUPABASE_PUBLISHABLE_KEY = '([^']+)'/)?.[1];
  assert.ok(url && key);
  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const event = { title: "Automatic publishing integration verification", date: "2026-12-20", venue: "Publishing verification venue", link: "https://example.com/automatic-publishing-verification", image: "https://example.com/original-poster.jpg" };
  async function listings() {
    const response = await fetch(`${url}/rest/v1/events?link=eq.${encodeURIComponent(event.link)}&select=title,image,id,first_seen_at`, { headers });
    assert.equal(response.status, 200);
    return response.json();
  }
  const created = await fetch(`${url}/rest/v1/event_submissions`, { method: "POST", headers, body: JSON.stringify(event) });
  assert.equal(created.status, 201);
  const original = await listings();
  assert.equal(original.length, 1);
  assert.equal(original[0].title, event.title);
  const duplicate = await fetch(`${url}/rest/v1/event_submissions`, { method: "POST", headers, body: JSON.stringify({ ...event, title: "Changed title that must not replace the concert", image: "https://example.com/replacement.jpg" }) });
  assert.equal(duplicate.status, 201);
  assert.deepEqual(await listings(), original);
});