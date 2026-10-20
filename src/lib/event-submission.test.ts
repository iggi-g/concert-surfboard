import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { emptyEventSubmission, eventSubmissionSchema } from "./event-submission";

const valid = { ...emptyEventSubmission, title: "Live in Copenhagen", venue: "Union", date: "2026-11-20", link: "https://example.com/event", image: "https://example.com/poster.jpg" };

describe("concert-compatible submissions", () => {
  test("keeps only fields supported by concert listings", () => {
    const result = eventSubmissionSchema.parse({ ...valid, location: "Copenhagen" });
    assert.deepEqual(Object.keys(result).sort(), ["date", "image", "link", "title", "venue", "venue_link"]);
    assert.equal(result.venue_link, null);
  });
  test("requires a ticket or event link", () => {
    assert.equal(eventSubmissionSchema.safeParse({ ...valid, link: " " }).success, false);
  });
  test("requires a poster image link", () => {
    assert.equal(eventSubmissionSchema.safeParse({ ...valid, image: " " }).success, false);
  });
  test("requires an event title and venue", () => {
    assert.equal(eventSubmissionSchema.safeParse({ ...valid, title: " " }).success, false);
    assert.equal(eventSubmissionSchema.safeParse({ ...valid, venue: " " }).success, false);
  });
  test("rejects impossible calendar dates", () => {
    assert.equal(eventSubmissionSchema.safeParse({ ...valid, date: "2026-02-30" }).success, false);
  });
  test("rejects unsafe and oversized links", () => {
    for (const key of ["link", "image", "venue_link"]) {
      assert.equal(eventSubmissionSchema.safeParse({ ...valid, [key]: "javascript:alert(1)" }).success, false);
      assert.equal(eventSubmissionSchema.safeParse({ ...valid, [key]: `https://example.com/${"a".repeat(2000)}` }).success, false);
    }
  });
});