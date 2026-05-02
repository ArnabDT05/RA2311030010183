import axios from "axios";
import { Log } from "../logging_middleware/src/index";

const TOKEN = process.env.LOG_TOKEN || "";
const API = "http://20.207.122.201/evaluation-service/notifications";

const TYPE_WEIGHT: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

interface ScoredNotification extends Notification {
  score: number;
}

function calculateScore(notification: Notification): number {
  const weight = TYPE_WEIGHT[notification.Type] || 0;
  const timestamp = new Date(notification.Timestamp).getTime();
  const now = Date.now();
  const ageInSeconds = (now - timestamp) / 1000;
  const recencyScore = 1 / (ageInSeconds + 1);
  return weight + recencyScore;
}

async function getTopNotifications(n: number = 10): Promise<void> {
  await Log("frontend", "info", "api", `Fetching notifications to compute top ${n}`);

  try {
    const response = await axios.get(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const notifications: Notification[] = response.data.notifications;

    await Log("frontend", "debug", "api", `Fetched ${notifications.length} notifications`);

    const scored: ScoredNotification[] = notifications.map((n) => ({
      ...n,
      score: calculateScore(n),
    }));

    const sorted = scored.sort((a, b) => b.score - a.score);
    const topN = sorted.slice(0, n);

    await Log("frontend", "info", "utils", `Top ${n} priority notifications computed`);

    console.log(`\nTop ${n} Priority Notifications:\n`);
    topN.forEach((notif, index) => {
      console.log(
        `${index + 1}. [${notif.Type}] ${notif.Message} | Time: ${notif.Timestamp} | Score: ${notif.score.toFixed(4)}`
      );
    });

  } catch (error: any) {
    await Log("frontend", "error", "api", `Failed to fetch notifications: ${error.message}`);
    console.error("Error:", error.message);
  }
}

getTopNotifications(10);