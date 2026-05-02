import { useEffect, useState } from "react";
import { fetchNotifications, Notification } from "../api/notifications";
import { Log } from "logging_middleware";

interface FetchParams {
    notification_type?: string;
    limit?: number;
    page?: number;
}

export function useNotifications(params: FetchParams = {}) {
    const [data, setData] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        fetchNotifications(params)
            .then((res) => {
                setData(res);
                Log("frontend", "info", "hook", `got ${res.length} notifications`);
            })
            .catch((err) => {
                const msg = err?.message || "unknown error";
                setError("Failed to load notifications");
                Log("frontend", "error", "hook", `fetch failed - ${msg}`);
            })
            .finally(() => setLoading(false));

    }, [params.notification_type, params.limit, params.page]);

    return { data, loading, error };
}