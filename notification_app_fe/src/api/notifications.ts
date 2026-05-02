import axios from "axios";

export interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

const BASE_URL = "http://20.207.122.201/evaluation-service";

// token lives in env, make sure .env.local has it
const getToken = () => process.env.NEXT_PUBLIC_LOG_TOKEN ?? "";

export async function fetchNotifications(params?: {
  limit?: number;
  page?: number;
  notification_type?: string;
}): Promise<Notification[]> {
  const res = await axios.get(`${BASE_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    params,
  });

  return res.data.notifications;
}