const KEY = "viewed_notif_ids";

export function getViewedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function markViewed(id: string) {
  const current = getViewedIds();
  current.add(id);
  localStorage.setItem(KEY, JSON.stringify(Array.from(current)));
}