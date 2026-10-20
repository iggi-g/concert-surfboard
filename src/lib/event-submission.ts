import { z } from "zod";

const optionalUrl = z.string().trim().max(2000, "Links must be under 2,000 characters.").refine(
  (value) => !value || /^https?:\/\/[a-z0-9]([a-z0-9.-]*[a-z0-9])?(:[0-9]{1,5})?([/?#][^\s]*)?$/i.test(value) && !/[\x00-\x1f\x7f]/.test(value),
  "Enter a valid http:// or https:// link."
).transform((value) => value || null);

export const eventSubmissionSchema = z.object({
  title: z.string().trim().min(1, "Enter an event name.").max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose an event date.").refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Choose a valid date."),
  venue: z.string().trim().min(1, "Enter a venue.").max(200),
  link: optionalUrl,
  image: optionalUrl,
  venue_link: optionalUrl,
});

export const emptyEventSubmission = { title: "", date: "", venue: "", link: "", image: "", venue_link: "" };