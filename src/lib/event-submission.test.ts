import { describe, expect, test } from "bun:test";
import { emptyEventSubmission, eventSubmissionSchema } from "./event-submission";

const valid = { ...emptyEventSubmission, title: "Live in Copenhagen", venue: "Union", date: "2026-11-20" };

describe("concert-compatible submissions", () => {
  test("keeps only fields supported by concert listings", () => {
    const result = eventSubmissionSchema.parse({ ...valid, location: "Copenhagen" });
    expect(Object.keys(result).sort()).toEqual(["date", "image", "link", "title", "venue", "venue_link"]);
    expect(result.image).toBeNull();
  });
  test("requires an event title and venue", () => {
    expect(eventSubmissionSchema.safeParse({ ...valid, title: " " }).success).toBe(false);
    expect(eventSubmissionSchema.safeParse({ ...valid, venue: " " }).success).toBe(false);
  });
  test("rejects impossible calendar dates", () => {
    expect(eventSubmissionSchema.safeParse({ ...valid, date: "2026-02-30" }).success).toBe(false);
  });
  test("rejects unsafe and oversized links", () => {
    for (const key of ["link", "image", "venue_link"]) {
      expect(eventSubmissionSchema.safeParse({ ...valid, [key]: "javascript:alert(1)" }).success).toBe(false);
      expect(eventSubmissionSchema.safeParse({ ...valid, [key]: `https://example.com/${"a".repeat(2000)}` }).success).toBe(false);
    }
  });
});