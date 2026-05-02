import { Notification } from "../api/notifications";
const weights: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function getAgeInSeconds(timestamp: string): number {
  return (Date.now() - new Date(timestamp).getTime()) / 1000;
}

export function scoreNotification(n: Notification): number {
  const w = weights[n.Type] ?? 0;
  const age = getAgeInSeconds(n.Timestamp);
  return w + 1 / (age + 1);
}

export function getTopN(list: Notification[], n: number): Notification[] {
  const scored = list.map((item) => ({
    item,
    score: scoreNotification(item),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, n).map((s) => s.item);
}