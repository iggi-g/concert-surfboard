type EventTimestamps = { first_seen_at?: string; last_seen_at?: string };

const updateDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit",
});

export function getLatestUpdate(events: EventTimestamps[]): string | undefined {
  let latest = 0;
  for (const event of events) {
    const timestamp = Date.parse(event.last_seen_at || event.first_seen_at || "");
    if (Number.isFinite(timestamp) && timestamp > latest) latest = timestamp;
  }
  return latest ? new Date(latest).toISOString() : undefined;
}

export function isAddedInLatestUpdate(event: EventTimestamps, latestUpdate?: string): boolean {
  const firstSeen = Date.parse(event.first_seen_at || "");
  const latest = Date.parse(latestUpdate || "");
  if (!Number.isFinite(firstSeen) || !Number.isFinite(latest) || firstSeen > latest) return false;
  return updateDay.format(new Date(firstSeen)) === updateDay.format(new Date(latest));
}