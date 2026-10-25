import { useState } from "react";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { emptyEventSubmission, eventSubmissionSchema } from "@/lib/event-submission";

export function EventSubmissionForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...emptyEventSubmission });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;
    setSubmitError("");
    const parsed = eventSubmissionSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setSaving(true);
    try {
      const { title, date, venue, link, image, venue_link } = parsed.data;
      if (!title || !date || !venue) return;
      const { error } = await supabase.from("event_submissions").insert({ title, date, venue, link, image, venue_link });
      if (error) throw error;
      setSubmitted(true);
      setForm({ ...emptyEventSubmission });
    } catch {
      setSubmitError("Your event couldn't be submitted. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const fields = [
    { key: "title", label: "Artist / event name", placeholder: "Event name", required: true },
    { key: "date", label: "Event date", type: "date", required: true },
    { key: "venue", label: "Venue", placeholder: "Venue name", required: true },
    { key: "link", label: "Ticket / event link", placeholder: "https://", type: "url", required: true },
    { key: "image", label: "Poster image link", placeholder: "https://", type: "url", required: true },
    { key: "venue_link", label: "Venue website", placeholder: "https://", type: "url" },
  ] as const;

  return (
    <section aria-labelledby="submit-event-heading" className="mt-10 border-t border-border pt-8 text-left">
      <Collapsible open={open} onOpenChange={setOpen}>
        <h2 id="submit-event-heading">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full h-auto min-h-11 p-0 justify-start text-left hover:bg-transparent">
              <span className="text-lg font-semibold text-text-primary whitespace-normal">Submit a concert or event</span>
              <ChevronDown className={`ml-auto h-5 w-5 shrink-0 text-text-secondary transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
        </h2>
        <CollapsibleContent className="pt-6">
      {submitted ? (
        <div role="status" className="space-y-4">
          <p className="flex items-start gap-2 text-text-primary"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />Thanks! Your event is now listed. If it was already listed, we kept the existing concert.</p>
          <Button variant="outline" onClick={() => setSubmitted(false)}>Submit another event</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => {
              const id = `event-${field.key}`;
              const required = "required" in field && field.required;
              return (
                <div key={field.key} className="space-y-2 min-w-0">
                  <Label htmlFor={id} className="text-text-secondary">{field.label}{required ? " *" : " (optional)"}</Label>
                  <Input id={id} name={field.key} type={"type" in field ? field.type : "text"}
                    placeholder={"placeholder" in field ? field.placeholder : undefined}
                    value={form[field.key]} required={required} disabled={saving}
                    maxLength={field.key === "title" || field.key === "venue" ? 200 : field.key === "date" ? 10 : 2000}
                    onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                    aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `${id}-error` : undefined}
                    className="h-11 bg-background/40 border-border text-text-primary placeholder:text-text-secondary/70 rounded-xl" />
                  {errors[field.key] && <p id={`${id}-error`} className="text-sm text-destructive">{errors[field.key]}</p>}
                </div>
              );
            })}
          </div>
          {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
          <Button type="submit" disabled={saving} className="w-full h-11 rounded-xl font-semibold">
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {saving ? "Submitting..." : "Submit event"}
          </Button>
        </form>
      )}
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
}